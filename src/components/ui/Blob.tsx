"use client"; // Needed for Next.js App Router (if using pages router, just ensure it's client-side)

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color("transparent");
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0); 
    mountRef.current.appendChild(renderer.domElement);

    // Add a cube
    const geometry = new THREE.BoxGeometry(3, 3, 3);
    const material = new THREE.MeshBasicMaterial({ color: "skyblue" });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Light
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.03;
      cube.rotation.y += 0.05;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on unmount
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-[500px]" />;
}
