"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DevBypass() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to cashier page (drtlk bypass)
    router.push("/cashier");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to cashier interface...</p>
    </div>
  );
}
