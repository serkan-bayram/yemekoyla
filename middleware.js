import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req: req });
  const pathname = req.nextUrl.pathname;

  // User is authenticated if there is a token.
  if (!!token) {
    const permission = token.user.record.permission;

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

    if (permission === "almostUser") {
      if (pathname.startsWith("/profilolustur")) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/profilolustur", req.url));
      }
    }
  } else {
    if (pathname.startsWith("/oyla")) {
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
