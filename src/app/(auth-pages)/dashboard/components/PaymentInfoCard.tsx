import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Building, Hash } from "lucide-react";

interface PaymentInfoCardProps {
 payment?: {
  account_name?: string;
  account_number?: string;
  account_type?: string;
  bank_name?: string;
  branch_name?: string;
  routing_number?: string;
 };
}

const PaymentInfoCard: React.FC<PaymentInfoCardProps> = ({ payment }) => {
 const isConfigured = payment?.account_name && payment?.account_number;

 return (
  <Card>
   <CardHeader>
    <div className='flex items-center justify-between'>
     <CardTitle className='text-secondary'>Payment Information</CardTitle>
     {/* <Badge variant={isConfigured ? "default" : "destructive"}>{isConfigured ? "Configured" : "Incomplete"}</Badge> */}
    </div>
   </CardHeader>
   <CardContent className='space-y-4'>
    {isConfigured ? (
     <>
      <div className='space-y-3'>
       <div className='flex items-center gap-2'>
        <CreditCard className='h-4 w-4 text-muted-foreground' />
        <div>
         <p className='font-medium'>{payment?.account_name}</p>
         <p className='text-sm text-muted-foreground'>Account Holder</p>
        </div>
       </div>

       <div className='flex items-center gap-2'>
        <Hash className='h-4 w-4 text-muted-foreground' />
        <div>
         <p className='font-mono'>
          {payment?.account_number?.replace(/(.{4})/g, "$1 ") || "N/A"}
         </p>
         <p className='text-sm text-muted-foreground'>
          {payment?.account_type?.toUpperCase()} Account
         </p>
        </div>
       </div>

       <div className='flex items-center gap-2'>
        <Building className='h-4 w-4 text-muted-foreground' />
        <div>
         <p className='font-medium'>{payment?.bank_name}</p>
         <p className='text-sm text-muted-foreground'>{payment?.branch_name}</p>
         {payment?.routing_number && (
          <p className='text-xs text-muted-foreground'>
           Routing: {payment.routing_number}
          </p>
         )}
        </div>
       </div>
      </div>
     </>
    ) : (
     <div className='text-center py-4'>
      <CreditCard className='h-12 w-12 text-muted-foreground mx-auto mb-2' />
      <p className='text-muted-foreground'>
       Payment information not configured
      </p>
      <p className='text-sm text-muted-foreground'>
       Please complete your payment setup to receive payments
      </p>
     </div>
    )}
   </CardContent>
  </Card>
 );
};

export default PaymentInfoCard;
