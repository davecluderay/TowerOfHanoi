import { useRef, useLayoutEffect, useImperativeHandle, forwardRef, Ref, PropsWithoutRef } from 'react';
import { World } from './world/World';

export interface PlaybackControls {
  reset(): void;
  play(): void;
  pause(): void;
  stopAndReset(): void;
  isPlaying(): boolean;
  isPaused(): boolean;
  isStopped(): boolean;
}

const TowerOfHanoi = forwardRef((_: PropsWithoutRef<any>, controlsRef: Ref<PlaybackControls | undefined>) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const worldRef = useRef<World | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container === null) return;

    const world = new World({
      container: containerRef.current as HTMLElement,
    });

    world.init().then(
      () => world.start(),
      (error) => console.error(error)
    );

    worldRef.current = world;

    return () => {
      world.stop();
      world.dispose();
    };
  }, []);

  useImperativeHandle(controlsRef, () => worldRef.current?.getPlaybackControls());

  return <div ref={containerRef}></div>;
});

export { TowerOfHanoi };
