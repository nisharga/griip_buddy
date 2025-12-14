// "use client";
// import { useMemo, useState } from "react";
// import { createColumnHelper } from "@tanstack/react-table";
// import OrderActions from "./OrderActions";
// import { API_BASE_URL } from "@/config";
// import { formatDateTime } from "../../utils/formatDate";

// export interface IRewardTableProps {
//   status: string;
//   payment_info: any;
//   order_id: string;
//   invoice_number: string;
//   total_amount: string;
//   payment_status: string;
//   order_status: string;
//   order_date: string;
//   actions: string;
// }

// const columnHelper = createColumnHelper<IRewardTableProps>();

// export const useTableData = () => {
//   const { loading, refetch, setData } = useFetchData<IRewardTableProps>({
//     url: `${API_BASE_URL}/order/user`,
//   });

//   const columns = useMemo(
//     () => [
//       columnHelper.accessor("order_id", {
//         id: "order_id",
//         header: "Order ID",
//         cell: (info) => {
//           return <span className="text-sm font-normal">{info.getValue()}</span>;
//         },
//       }),
//       columnHelper.accessor("invoice_number", {
//         id: "invoice_number",
//         header: "Invoice Number",
//         cell: ({ getValue }) => (
//           <span className="text-sm font-normal">{getValue()}</span>
//         ),
//       }),
//       columnHelper.accessor("total_amount", {
//         id: "total_amount",
//         header: "Amount",
//         cell: ({ getValue }) => (
//           <span className="text-sm font-normal">${getValue()}</span>
//         ),
//       }),
//       columnHelper.accessor("payment_status", {
//         id: "payment_status",
//         header: "Payment Status",
//         cell: (info) => {
//           const status = info?.row.original?.payment_info?.payment_status;

//           const statusColorMap: Record<string, string> = {
//             PAID: "text-green-500",
//             UNPAID: "text-red-500",
//             PENDING: "text-yellow-500",
//             REFUNDED: "text-blue-500",
//             FAILED: "text-red-600",
//           };

//           const textColor =
//             statusColorMap[status.toUpperCase()] || "text-black/40";

//           return (
//             <span className={`${textColor} text-sm font-normal`}>
//               {status.toUpperCase()}
//             </span>
//           );
//         },
//       }),
//       columnHelper.accessor("order_status", {
//         id: "order_status",
//         header: "Order Status",
//         cell: (info) => {
//           const status = info.row.original.status;

//           const statusColorMap: Record<string, string> = {
//             PLACED: "text-gray-800",
//             CONFIRMED: "text-purple-800",
//             IN_TRANSIT: "text-blue-500",
//             DELIVERED: "text-green-500",
//             RETURNED: "text-red-500",
//           };

//           const textColor = statusColorMap[status] || "text-black/40";

//           return (
//             <span className={`${textColor} text-sm font-normal`}>
//               {status.replace("_", " ")} {/* Optional: cleaner display */}
//             </span>
//           );
//         },
//       }),
//       columnHelper.accessor("order_date", {
//         id: "order_date",
//         header: "Date",
//         cell: (info) => (
//           <span className="text-sm font-normal min-w-[200px] block">
//             {formatDateTime(info.row.original?.order_date)}
//           </span>
//         ),
//       }),
//       columnHelper.accessor("actions", {
//         id: "actions",
//         header: "Actions",
//         cell: (info) => <OrderActions id={info.row.original?.order_id} />,
//       }),
//     ],
//     []
//   );

//   return { columns };
//   // data, setData, loading
// };
