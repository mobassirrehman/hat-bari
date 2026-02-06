// middleware.js
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  // Protected page routes
  const protectedPages = ["/profile", "/add-item", "/checkout"];
  const isProtectedPage = protectedPages.some((p) => pathname.startsWith(p));

  // Protected API routes (mutating operations)
  const protectedAPIs = [
    { path: "/api/items", methods: ["POST", "PATCH", "DELETE"] },
    { path: "/api/orders", methods: ["POST", "GET"] },
    { path: "/api/user", methods: ["GET", "PATCH"] },
  ];

  // Check protected pages
  if (isProtectedPage && !isLoggedIn) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check protected APIs
  const matchedAPI = protectedAPIs.find(
    (api) => pathname.startsWith(api.path) && api.methods.includes(req.method)
  );

  if (matchedAPI && !isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/profile/:path*",
    "/add-item/:path*",
    "/checkout/:path*",
    "/api/items/:path*",
    "/api/orders/:path*",
    "/api/user/:path*",
  ],
};
