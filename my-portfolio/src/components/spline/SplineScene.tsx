"use client";

import { Suspense, lazy } from "react";
import { cn } from "@/lib/utils";

const Spline = lazy(() => import("@splinetool/react-spline"));

type SplineSceneProps = {
  scene: string;
  className?: string;
  onLoad?: () => void;
};

/**
 * Lazy-loaded Spline 3D scene wrapper.
 * Adapted from the spline-3d-demo. Wrapped in <Suspense> so it never blocks
 * initial paint, and only mounts on the client.
 */
export default function SplineScene({ scene, className, onLoad }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className={cn("flex items-center justify-center", className)}>
          <span className="loader" aria-label="Loading 3D scene" />
        </div>
      }
    >
      <Spline scene={scene} className={className} onLoad={onLoad} />
    </Suspense>
  );
}
