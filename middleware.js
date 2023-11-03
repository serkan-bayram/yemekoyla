import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req: req });
  const pathname = req.nextUrl.pathname;

  // User is authenticated if there is a token.
  if (!!token) {
    const permission = token.user.record.permission;

    // Admin can go anywhere
    if (permission === "admin") {
      return NextResponse.next();
    }

    // User can't go these pages if authenticated
    const cantGoIfAuth = ["/giris", "/kaydol", "/sifremiunuttum"];
    if (cantGoIfAuth.includes(pathname)) {
      return NextResponse.redirect(new URL("/oyla", req.url));
    }

    if (pathname.startsWith("/api/auth/signout")) {
      return NextResponse.next();
    }

    if (pathname.startsWith("/api/auth/session")) {
      if (permission !== "admin") {
        return NextResponse.redirect(new URL("/giris", req.url));
      }
    }

    // User should be able to go / no matter what
    if (pathname === "/") {
      return NextResponse.next();
    }

    // If user does not have almostUser permission it can not go /profilolustur
    if (pathname.startsWith("/profilolustur") && permission !== "almostUser") {
      return NextResponse.redirect(new URL("/oyla", req.url));
    }

    if (permission === "almostUser") {
      if (
        pathname.startsWith("/profilolustur") ||
        pathname.startsWith("/api/auth/csrf")
      ) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/profilolustur", req.url));
      }
    }
  } else {
    const cantGoIfNotAuth = ["/oyla", "/profilolustur", "/cikis"];
    if (cantGoIfNotAuth.includes(pathname)) {
      return NextResponse.redirect(new URL("/giris", req.url));
    }
  }
}

// Disable middleware for images and static
export const config = {
  matcher: "/((?!static|.*\\..*|_next).*)",
};

// // User should be able to see these pages only if it has not authenticated
// const noAuthPaths = ["/", "/giris", "/kaydol", "/dogrula"];

// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(req) {
//     const pathname = req.nextUrl.pathname;
//     const session = req.nextauth;
//     const permission = session.token?.user.record.permission || null;

//     // Not authenticated
//     if (!session.token) {
//       if (noAuthPaths.includes(pathname)) {
//         return NextResponse.next();
//       } else {
//         return NextResponse.redirect(new URL("/giris", req.url));
//       }
//     }

//     // After here, user is authenticated

//     // The user should be able to go / no matter what
//     if (pathname === "/") {
//       return NextResponse.next();
//     }

//     // If a user has almostUser permission
//     // it has to create a profile before going anywhere
//     if (permission === "almostUser") {
//       if (pathname === "/profilolustur") {
//         return NextResponse.next();
//       } else {
//         return NextResponse.redirect(new URL("/profilolustur", req.url));
//       }
//     }
//   },
//   {
//     callbacks: {
//       authorized({ token }) {
//         return true; // If there is a token, the user is authenticated
//       },
//     },
//   }
// );
