"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PushPage() {
  const router = useRouter();

  useEffect(() => {
    async function ask() {
      try {
        await Notification.requestPermission();
      } catch (e) {
        console.error(e);
      }
      router.replace("/");
    }
    ask();
  }, []);

  return <p>Requesting notification access...</p>;
}
