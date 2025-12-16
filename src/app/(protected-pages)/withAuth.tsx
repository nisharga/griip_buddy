// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { useRouter, usePathname } from "next/navigation";
// import { useEffect, ReactNode } from "react";
// // import { getUser } from "./store/user";

// interface WithAuthProps {
//   children: ReactNode;
// }

// // ❌ routes anyone can visit without login
// export const NON_AUTH_ROUTES = ["/login", "/signup"];

// // ✅ routes only for customers
// export const CUSTOMER_ROUTES = [
//   "/profile-details",
//   "/order",
//   "/change-password",
// ];

// // ✅ routes only for vendors
// export const VENDOR_ROUTES = [
//   "/dashboard",
//   "/products",
//   "/orders",
//   "/withdraw",
// ];

// export function withAuth(Component: React.ComponentType<any>) {
//   return function ProtectedRoute(props: WithAuthProps) {
//     const router = useRouter();
//     const pathname = usePathname();
//     // const user = getUser();

//     useEffect(() => {
//       // Not logged in → block all except login/signup
//       if (!user && !NON_AUTH_ROUTES.includes(pathname)) {
//         router.replace("/login");
//         return;
//       }

//       // Already logged in → block login/signup
//       if (user && NON_AUTH_ROUTES.includes(pathname)) {
//         if (user.role === "customer") {
//           router.replace("/profile-details");
//         } else {
//           router.replace("/dashboard");
//         }
//         return;
//       }

//       // ✅ Role based route access
//       if (user) {
//         if (user.role === "customer" && !CUSTOMER_ROUTES.includes(pathname)) {
//           router.replace("/profile-details"); // fallback
//         }

//         if (user.role !== "customer" && !VENDOR_ROUTES.includes(pathname)) {
//           router.replace("/dashboard"); // fallback
//         }
//       }
//     }, [user, pathname, router]);

//     return <Component {...props} user={user} />;
//   };
// }
