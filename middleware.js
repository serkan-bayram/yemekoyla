import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req: req });
  const pathname = req.nextUrl.pathname;

  // User is authenticated if there is a token.
  if (!!token) {
    const permission = token.user.record.permission;

    if (permission === "banned" && !pathname.startsWith("/banned")) {
      return NextResponse.redirect(new URL("/banned", req.url));
    }

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
    const cantGoIfNotAuth = ["/oyla", "/profilolustur", "/cikis", "/profilim"];
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
//   // `withAuth` augments your `req` with the user's token.
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

// console.log("on the update auth ");

// if (pathname.startsWith("/api/update/session")) {
//   const cookiesList = req.cookies.getAll();
//   const sessionCookie = "next-auth.session-token";

//   // session token present, check if it's valid
//   const session = await fetch(`http://localhost:3000/api/auth/session`, {
//     headers: {
//       "content-type": "application/json",
//       cookie: req.cookies.toString(),
//     },
//   });
//   const json = await session.json();
//   const data = Object.keys(json).length > 0 ? json : null;

//   const email = data.user.record.email;

//   const pb = await authAsAdmin();

//   console.log(data);

//   // session token is valid so we can continue
//   const record = await fetchUserByEmail(pb, email); // or a server-side function call
//   record.username = "abc";
//   const newToken = { record };
//   const response = NextResponse.next();
//   const newSessionToken = await encode({
//     secret: process.env.NEXTAUTH_SECRET,
//     token: {
//       user: newToken,
//     },
//     maxAge: 30 * 24 * 60 * 60, // 30 days, or get the previous token's exp
//   });

//   // update session token with new access token
//   response.cookies.set(sessionCookie, newSessionToken);

//   return response;
// }
