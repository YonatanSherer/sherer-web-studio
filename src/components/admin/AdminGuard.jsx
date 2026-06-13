import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";

const ALLOWED_EMAIL = "yonatansh103@gmail.com";

export default function AdminGuard({ children }) {
  const [state, setState] = useState("loading"); // loading | allowed | denied | unauthenticated

  useEffect(() => {
    base44.auth.me().then((user) => {
      if (!user) {
        setState("unauthenticated");
      } else if (user.email === ALLOWED_EMAIL) {
        setState("allowed");
      } else {
        setState("denied");
      }
    }).catch(() => {
      setState("unauthenticated");
    });
  }, []);

  if (state === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#00b4ff] rounded-full animate-spin" />
      </div>
    );
  }

  if (state === "unauthenticated") {
    base44.auth.redirectToLogin("/admin/projects");
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#00b4ff] rounded-full animate-spin" />
      </div>
    );
  }

  if (state === "denied") {
    return (
      <div className="min-h-screen bg-[#060a14] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-white/50 mb-6 text-sm">You don't have permission to access the admin area.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00b4ff] text-white text-sm font-semibold hover:bg-[#0099dd] transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return children;
}