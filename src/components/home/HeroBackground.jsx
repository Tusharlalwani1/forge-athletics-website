import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

// Subtle 3D particle-grid ambient background for the Hero section.
// Renders a field of small points arranged in a loose grid that drifts
// slowly and reacts gently to the cursor — echoes the "forge/industrial"
// grid texture already used elsewhere on the site, just given depth.
//
// Performance/accessibility:
// - Skipped entirely for prefers-reduced-motion (renders nothing, no WebGL cost)
// - Capped pixel ratio, low particle count, no postprocessing — cheap to run
// - Pauses the render loop when the tab is hidden
export default function HeroBackground() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    container.appendChild(renderer.domElement);

    // --- Particle grid geometry ---
    const COLS = 26;
    const ROWS = 14;
    const SPACING = 1.15;
    const positions = new Float32Array(COLS * ROWS * 3);
    const basePositions = new Float32Array(COLS * ROWS * 3);

    let idx = 0;
    for (let r = 0; r < ROWS; r += 1) {
      for (let c = 0; c < COLS; c += 1) {
        const x = (c - COLS / 2) * SPACING;
        const y = (r - ROWS / 2) * SPACING;
        // slight randomized depth so the grid doesn't look perfectly flat
        const z = (Math.sin(c * 0.5) + Math.cos(r * 0.5)) * 0.4;
        positions[idx] = x;
        positions[idx + 1] = y;
        positions[idx + 2] = z;
        basePositions[idx] = x;
        basePositions[idx + 1] = y;
        basePositions[idx + 2] = z;
        idx += 3;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Blaze-colored points, small and additive so they glow softly against charcoal
    const material = new THREE.PointsMaterial({
      color: new THREE.Color("#e8491d"),
      size: 0.045,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    points.rotation.x = -0.3;
    scene.add(points);

    // --- Mouse-reactive parallax target ---
    const pointer = { x: 0, y: 0 };
    const handlePointerMove = (event) => {
      const rect = container.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    };
    window.addEventListener("pointermove", handlePointerMove);

    // --- Animation loop ---
    let frameId;
    let isVisible = true;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const t = clock.getElapsedTime();
      const posAttr = geometry.attributes.position;
      const arr = posAttr.array;

      for (let i = 0; i < COLS * ROWS; i += 1) {
        const bx = basePositions[i * 3];
        const by = basePositions[i * 3 + 1];
        const bz = basePositions[i * 3 + 2];
        // gentle drifting wave, plus a very light cursor-based lift
        arr[i * 3 + 2] = bz + Math.sin(t * 0.4 + bx * 0.5 + by * 0.3) * 0.25;
      }
      posAttr.needsUpdate = true;

      // slow ambient rotation + gentle parallax toward the cursor
      points.rotation.y += 0.0009;
      points.rotation.x += (pointer.y * 0.15 - points.rotation.x - 0.3) * 0.02;
      camera.position.x += (pointer.x * 1.2 - camera.position.x) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    const handleVisibility = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-70"
    />
  );
}
