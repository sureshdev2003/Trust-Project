"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
// @ts-ignore: no declaration file for 'bar-of-progress'
import ProgressBar from "bar-of-progress";

const progress = new ProgressBar({
  size: 2,
  color: "#29d",
  className: "bar-of-progress",
  delay: 100,
});

export default function ProgressProvider() {
  const router = useRouter();

  useEffect(() => {
    const start = () => progress.start();
    const done = () => progress.finish();

    router.events?.on("routeChangeStart", start);
    router.events?.on("routeChangeComplete", done);
    router.events?.on("routeChangeError", done);

    return () => {
      router.events?.off("routeChangeStart", start);
      router.events?.off("routeChangeComplete", done);
      router.events?.off("routeChangeError", done);
    };
  }, [router]);

  return null;
}
