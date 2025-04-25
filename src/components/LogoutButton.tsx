"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import logout from "@/actions/logout";

export default function LogoutButton({className}: {className?: string}) {
  const router = useRouter();

  const onClick = async () => {
    await logout();
    router.push("/");
  }

  return <Button variant="ghost" size="icon" onClick={onClick} className={className}>
    <LogOut size={16} />
  </Button>}