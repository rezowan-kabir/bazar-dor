"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

export default function AuthNotice() {
  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const authMessage = currentUrl.searchParams.get("auth");

    if (authMessage === "required") {
      toast.error("এই পেজটি দেখতে আগে সাইন ইন করুন।");
    }

    if (authMessage === "success") {
      toast.success("সফলভাবে সাইন ইন করা হয়েছে!");
    }

    if (authMessage) {
      currentUrl.searchParams.delete("auth");
      const cleanUrl = `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`;
      window.history.replaceState(window.history.state, "", cleanUrl);
    }
  }, []);

  return null;
}
