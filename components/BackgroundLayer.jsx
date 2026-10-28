"use client";

import dynamic from "next/dynamic";

const GlassBackground = dynamic(() => import("./GlassBackground"), { ssr: false });

export default function BackgroundLayer() {
  return <GlassBackground />;
}
