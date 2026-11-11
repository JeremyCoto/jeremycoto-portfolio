"use client";

import { DotLottieReact, setWasmUrl } from "@lottiefiles/dotlottie-react";

// El motor de Lottie se sirve desde el propio sitio (sin CDN externo).
setWasmUrl("/lottie/dotlottie-player-0.81.0.wasm");

/** Gato animado de la demo del componente (LottieFiles), servido desde /public/lottie. */
export default function LottieCat({ animate }: { animate: boolean }) {
  return <DotLottieReact src="/lottie/loader-cat.v1.json" loop={animate} autoplay={animate} className="size-full" />;
}
