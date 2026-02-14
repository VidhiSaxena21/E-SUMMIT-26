"use client";

import Spline from "@splinetool/react-spline/next";

const SCENE_URL =
  "https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode";

export default function SplineSceneClient() {
  return <Spline scene={SCENE_URL} className="w-full h-full" />;
}
