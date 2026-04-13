"use client";

import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

export default function InputOTPPage() {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Input OTP</h1>
        <p className="text-muted-foreground">一次性密碼輸入框，適用於驗證碼、PIN 碼輸入場景。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">6 位數 OTP</h2>
        <div className="p-6 border rounded-xl bg-card space-y-4">
          <InputOTP maxLength={6} value={value} onChange={setValue}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-muted-foreground">
            已輸入：{value || "（尚未輸入）"}
            {value.length === 6 && (
              <span className="ml-2 text-green-600 font-medium">✓ 驗證完成</span>
            )}
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">4 位數 PIN 碼</h2>
        <div className="p-6 border rounded-xl bg-card">
          <InputOTP maxLength={4}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </section>
    </div>
  );
}
