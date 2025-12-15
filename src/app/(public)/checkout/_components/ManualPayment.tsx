"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Info, ShieldCheck } from "lucide-react";

export type ManualPaymentFields = {
  senderPhone: string;
  trxId: string;
  amount: number;
};

type Mode = "cod" | "full";

type Props = {
  mode: Mode;
  amountNow: number;
  fields: ManualPaymentFields;
  onChange: (patch: Partial<ManualPaymentFields>) => void;
  payToNumber?: string;
  instructionImageSrc?: string;
};

const DEFAULT_PAY_TO = "01700000000";

export default function ManualPayment({
  mode,
  amountNow,
  fields,
  onChange,
  payToNumber = DEFAULT_PAY_TO,
}: Props) {
  // lock the amount box to expected value
  useEffect(() => {
    if (fields.amount !== amountNow) onChange({ amount: amountNow });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountNow]);

  return (
    <Card className="rounded-xl border-0  shadow-none">
      <CardHeader className="pb-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Manual Payment
          </CardTitle>
          <ShieldCheck className="h-5 w-5 text-emerald-600" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          <div className="flex items-start gap-2">
            <Info className="mt-0.5 h-4 w-4" />
            <p className="leading-relaxed">
              {mode === "cod" ? (
                <>
                  <strong>Cash on Delivery:</strong> please send{" "}
                  <span className="font-semibold">৳200 advance</span> to confirm
                  your order.
                </>
              ) : (
                <>
                  <strong>Full Payment:</strong> please pay the full amount to
                  confirm your order.
                </>
              )}{" "}
              Send money to{" "}
              <span className="font-semibold">{payToNumber} (bKash)</span> and
              provide the details below.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label className="mb-2 block text-gray-600 text-xs">
              Your bKash Number *
            </Label>
            <Input
              inputMode="numeric"
              pattern="[0-9]*"
              className="h-12 rounded-lg focus-visible:ring-[#ff5c00]"
              placeholder="01XXXXXXXXX"
              value={fields.senderPhone}
              onChange={(e) => onChange({ senderPhone: e.target.value })}
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Number you used to send money
            </p>
          </div>

          <div>
            <Label className="mb-2 block text-gray-600 text-xs">
              Paid Amount (locked)
            </Label>
            <Input
              className="h-12 rounded-lg bg-gray-50"
              value={fields.amount}
              readOnly
            />
          </div>

          <div className="md:col-span-2">
            <Label className="mb-2 block text-gray-600 text-xs">
              Transaction ID (bKash/Nagad) *
            </Label>
            <Input
              className="h-12 rounded-lg focus-visible:ring-[#ff5c00]"
              placeholder="e.g., 7ABC1D2E3"
              value={fields.trxId}
              onChange={(e) => onChange({ trxId: e.target.value })}
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              You’ll get this after completing the payment
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
