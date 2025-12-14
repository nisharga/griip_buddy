/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Receipt } from "lucide-react";

interface PurchaseExpensesProps {
  expenses: any[];
}

const PurchaseExpenses = ({ expenses }: PurchaseExpensesProps) => {
  if (!expenses || expenses.length === 0) {
    return null;
  }

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + (expense?.amount || 0),
    0
  );

  return (
    <Card>
      <CardHeader className="pb-3 md:pb-4">
        <CardTitle className="text-base md:text-lg flex items-center gap-2">
          <Receipt className="h-4 w-4" />
          Additional Expenses ({expenses.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {expenses.map((expense, index) => (
          <div
            key={expense?._id || index}
            className="flex items-center justify-between p-3 border rounded-lg"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs">
                  {expense?.type || "Expense"}
                </Badge>
              </div>
              <p className="text-sm md:text-base font-medium">
                {expense?.note || "No description"}
              </p>
              <p className="text-xs text-muted-foreground">
                {expense?.createdAt
                  ? new Date(expense.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm md:text-base font-semibold text-primary">
                ৳{expense?.amount?.toFixed(2) || "0.00"}
              </p>
            </div>
          </div>
        ))}

        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between items-center">
            <p className="text-sm md:text-base font-medium">
              Total Additional Expenses
            </p>
            <p className="text-base md:text-lg font-bold text-primary">
              ৳{totalExpenses.toFixed(2)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PurchaseExpenses;
