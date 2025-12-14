// // utils/user.ts

// interface User {
//   _id: string;
//   name: string;
//   phone_number: string;
//   role: string;
//   status: string;
//   last_login_at: string;
//   createdAt: string;
//   updatedAt: string;
//   id: string;
// }

// const USER_KEY = "user";
// const VENDOR_KEY = "vendor";

// export const setUser = (user: User) => {
//   if (typeof window !== "undefined") {
//     localStorage.setItem(USER_KEY, JSON.stringify(user));
//   }
// };

// export const getUser = (): User | null => {
//   if (typeof window !== "undefined") {
//     const storedUser = localStorage.getItem(USER_KEY);
//     return storedUser ? (JSON.parse(storedUser) as User) : null;
//   }
//   return null;
// };

// export const removeUser = () => {
//   if (typeof window !== "undefined") {
//     localStorage.removeItem(USER_KEY);
//   }
// };

// // ==== set vendor id

// export const setVendorId = (user: User) => {
//   if (typeof window !== "undefined") {
//     localStorage.setItem(VENDOR_KEY, JSON.stringify(user));
//   }
// };

// export const getVendorId = (): User | null => {
//   if (typeof window !== "undefined") {
//     const storedUser = localStorage.getItem(VENDOR_KEY);
//     return storedUser ? (JSON.parse(storedUser) as User) : null;
//   }
//   return null;
// };

// export const removeVendorId = () => {
//   if (typeof window !== "undefined") {
//     localStorage.removeItem(VENDOR_KEY);
//   }
// };