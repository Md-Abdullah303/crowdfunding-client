"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";

export default function DashboardRoot() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;
    
    if (!session) {
      router.push("/login");
      return;
    }

    const role = session.user.role;
    if (role === "admin") {
      router.push("/dashboard/admin");
    } else if (role === "creator") {
      router.push("/dashboard/creator");
    } else {
      router.push("/dashboard/supporter");
    }
  }, [session, isPending, router]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        style={{ width: "40px", height: "40px", border: "3px solid rgba(168,85,247,0.3)", borderTopColor: "#a855f7", borderRadius: "50%" }}
      />
    </div>
  );
}
