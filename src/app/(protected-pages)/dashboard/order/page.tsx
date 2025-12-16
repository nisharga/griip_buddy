// import { RewardTable } from "./components";

const OrderPage = () => {
  return (
    <div>
      <div className="mb-4">{/* <RewardTable /> */}</div>
    </div>
  );
};

export default OrderPage;

const TableSkeleton = () => (
  <tbody>
    {[...Array(5)].map((_, index) => (
      <tr key={index} className="animate-pulse">
        <td className="p-3">
          <div className="h-4 bg-gray-300 rounded w-full mb-4" />
        </td>
        <td className="p-3 mb-4">
          <div className="h-4 bg-gray-300 rounded w-full mb-4" />
        </td>
        <td className="p-3 mb-4">
          <div className="h-4 bg-gray-300 rounded w-full mb-4" />
        </td>
        <td className="p-3 mb-4">
          <div className="h-4 bg-gray-300 rounded w-full mb-4" />
        </td>
      </tr>
    ))}
  </tbody>
);
