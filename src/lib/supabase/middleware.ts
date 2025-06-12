import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // public routes
  const authRoutes = ["/login", "/register", "/forgot", "/reset"];
  const isAuthRoute = authRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // not authenticated
  if (!user && !isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  const role = user?.user_metadata.role;

  // admin routes
  // const adminRoutes = ["/dashboard", "/accounts"];

  // const isAdminRoute = adminRoutes.some((route) =>
  //   request.nextUrl.pathname.startsWith(route)
  // );

  // // staff routes
  // const staffRoutes = ["/dashboard", "/inventory"];

  // const isStaffRoute = staffRoutes.some((route) =>
  //   request.nextUrl.pathname.startsWith(route)
  // );

  // authenticated

  if (user && role === "Admin") {
    if (isAuthRoute) {
      const url = request.nextUrl.clone();
      return NextResponse.redirect(url);
    }
  }

  if (user && role === "Staff") {
    if (isAuthRoute) {
      const url = request.nextUrl.clone();
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
