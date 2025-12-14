// "use client";
// import React from "react";
// import {
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { motion } from "framer-motion";
// import { IRewardTableProps, useTableData } from "./useRewardTableData";
// import { Variants } from "framer-motion";
// import Loading from "@/app/(auth-pages)/components/loading/Loading";

// const rowVariants: Variants = {
//   hiddenLeft: {
//     opacity: 0,
//     x: -50,
//   },
//   hiddenRight: {
//     opacity: 0,
//     x: 50,
//   },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: {
//       duration: 0.5,
//       ease: "easeOut",
//     },
//   },
// };

// const RewardTable = () => {
//   const { columns, data } = useTableData();

//   const table = useReactTable<IRewardTableProps>({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   /*  if (loading) {
//     return <Loading text="Loading your orders..." />;
//   }
//  */
//   return (
//     <div className="bg-primary/10 rounded-xl p-5">
//       <div className="overflow-x-auto">
//         {data?.length ? (
//           <table className="!w-full min-w-full divide-y-2">
//             <thead>
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <tr key={headerGroup.id}>
//                   {headerGroup.headers.map((header) => (
//                     <th
//                       key={header.id}
//                       className={`text-nowrap text-left font-normal text-sm lg:font-medium py-3 ${
//                         header?.id === "actions" ? "px-4" : "px-2"
//                       }`}
//                     >
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody className="w-full">
//               {table.getRowModel().rows.map((row, index) => (
//                 <React.Fragment key={row.id}>
//                   <tr className="border border-[#E6D8FC] w-full h-[1px]"></tr>
//                   <motion.tr
//                     className="w-full p-2.5"
//                     initial={index % 2 === 0 ? "hiddenLeft" : "hiddenRight"}
//                     animate="visible"
//                     variants={rowVariants}
//                   >
//                     {row.getVisibleCells().map((cell) => (
//                       <td key={cell.id} className="p-2">
//                         {flexRender(
//                           cell.column.columnDef.cell,
//                           cell.getContext()
//                         )}
//                       </td>
//                     ))}
//                   </motion.tr>
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <div className="h-[60vh] flex items-center justify-center">
//             No Order Found!!
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RewardTable;
