import { createClient } from "@/lib/supabase/client";

export const handleChangeImage = async (
  event: React.ChangeEvent<HTMLInputElement>,
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const supabase = await createClient();
  const file = event.target.files?.[0];
  if (!file) return;

  setImageUrl(null);

  // 1. Get current user
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    console.error("User fetch failed:", userError);
    return;
  }

  const userId = userData.user.id;

  // 2. Generate file path
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}-${Date.now()}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  // 3. Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (uploadError) {
    console.error("Upload failed:", uploadError);
    return;
  }

  // 4. Get the public URL (assumes bucket is public)
  const { data: publicUrlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  const url = publicUrlData?.publicUrl;
  if (!url) {
    console.error("Failed to get public URL.");
    return;
  }

  setImageUrl(url);

  // 5. Check if profile row exists
  const { data: existingProfile, error: fetchError } = await supabase
    .from("avatars")
    .select("user_id")
    .eq("user_id", userId)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    console.error("Failed to check existing profile:", fetchError);
    return;
  }

  if (existingProfile) {
    // ✅ Row exists → update avatar_url
    const { error: updateError } = await supabase
      .from("avatars")
      .update({ avatar: url })
      .eq("user_id", userId);

    if (updateError) {
      console.error("DB update failed:", updateError);
    }
  } else {
    // 🚨 No row exists → insert one
    const { error: insertError } = await supabase
      .from("avatars")
      .insert([{ avatar: url }]);

    if (insertError) {
      console.error("DB insert failed:", insertError);
    }
  }
};
