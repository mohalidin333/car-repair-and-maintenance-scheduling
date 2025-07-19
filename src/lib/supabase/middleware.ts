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
          cookiesToSet.forEach(({ name, value }) =>
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

  const publicRoutes = [
    "/",
    ...(!user
      ? [
          "/schedule",
          "/schedule/appointment",
          "/schedule/select-service",
          "/schedule/appointment-details",
          "/login",
        ]
      : []),
    "/register",
    "/forgot",
    "/reset",
    "/error",
  ];

  const adminRoutes = [
    "/admin/dashboard",
    "/admin/profile",
    "/admin/customers",
    "/admin/customers/walk-in",
    "/admin/customers/[id]",
    "/admin/inventory",
    "/admin/services",
    "/admin/reports",
    "/admin/user-management",
    "/admin/scheduling-settings",
    "/admin/payment-settings",
  ];
  
  const customerRoutes = [
    "/customer",
    "/customer/profile",
    "/schedule",
    "/schedule/appointment",
    "/schedule/select-service",
    "/schedule/appointment-details",
    "/login",
  ];

  const pathname = request.nextUrl.pathname;

  const isPublicRoutes = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  const isAdminRoutes = adminRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  const cleanPathname = pathname.split("?")[0].split("#")[0].replace(/\/$/, ""); // Remove trailing slash

  const isUserRoutes = customerRoutes.some(
    (route) => cleanPathname === route || cleanPathname.startsWith(route + "/")
  );

  // not authenticated
  if (!user && !isPublicRoutes) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // role
  const role = user?.user_metadata.role;

  // authenticated
  if (user && isPublicRoutes) {
    if (role === "Admin" || role === "Staff") {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/dashboard";
      return NextResponse.redirect(url);
    }

    const url = request.nextUrl.clone();
    url.pathname = "/customer";
    return NextResponse.redirect(url);
  }

  // admin redirection
  if ((role === "Admin" || role === "Staff") && !isAdminRoutes) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  // customer redirection
  if (role === "Customer" && !isUserRoutes) {
    const url = request.nextUrl.clone();
    url.pathname = "/customer";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
