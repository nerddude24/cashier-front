"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DirectCashier() {
  const router = useRouter();

  useEffect(() => {
    document.cookie = "dev_mode=true; path=/";

    router.push("/cashier");
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">bypassiiiiiiiiiiiiiiiing</h1>
      <p className="text-lg">
        Redirecting to cashier interface without login :) ...
      </p>
    </div>
  );
}
