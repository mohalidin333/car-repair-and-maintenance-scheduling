import { createAdminClient } from "@/lib/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const { role, firstname, lastname, email, password } = await request.json();

  const { data, error } = await createAdminClient().auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      role,
      firstname,
      lastname,
    },
  });

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  return NextResponse.json(data);
}

export async function GET() {
  const { data, error } = await createAdminClient().auth.admin.listUsers();

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  // Extract metadata for each user
  const users = data.users.map((user) => ({
    id: user.id,
    email: user.email,
    role: user.user_metadata?.role || null,
    firstname: user.user_metadata?.firstname || null,
    lastname: user.user_metadata?.lastname || null,
    created_at: user.created_at,
  }));

  return NextResponse.json({ users });
}

export async function PUT(request: NextRequest) {
  const supabase = createAdminClient();

  const { id, role, firstname, lastname, email, password } =
    await request.json();

  const { error: updateError } = await supabase.auth.admin.updateUserById(id, {
    email,
    ...(password && { password }),
    user_metadata: {
      role,
      firstname,
      lastname,
    },
  });

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 400 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const supabase = createAdminClient();

  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const { error: deleteError } = await supabase.auth.admin.deleteUser(userId);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 400 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
