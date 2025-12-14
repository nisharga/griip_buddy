export const SIDEBAR_MENUS = [
  {
    id: 1,
    label: "Profile Details",
    route: "/dashboard/profile-details",
  },
  {
    id: 3,
    label: "Order",
    route: "/dashboard/order",
  },
  ,
  {
    id: 4,
    label: "Change Password",
    route: "/dashboard/change-password",
  },
  {
    id: 5,
    label: "Logout",
    route: "",
  },
];
export const SIDEBAR_MENUS_VENDOR = [
  {
    id: 1,
    label: "Dashboard",
    route: "/dashboard",
  },
  {
    id: 2,
    label: "Products",
    route: "/dashboard/products",
  },
  {
    id: 3,
    label: "Orders",
    route: "/dashboard/orders",
  },
  {
    id: 4,
    label: "Withdraw",
    route: "/dashboard/withdraw",
  },
  {
    id: 5,
    label: "Logout",
    route: "",
  },
];
export const NON_AUTH_ROUTES = ["/login", "/signup"];


export const ProfileDetailsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const ProfileDetailsItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};