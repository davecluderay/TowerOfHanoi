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

const TowerOfHanoi = forwardRef((props: PropsWithoutRef<any>, controlsRef: Ref<PlaybackControls | undefined>) => {
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
      (error) => console.log(error)
    );

    worldRef.current = world;

    return () => {
      world.stop();
      world.dispose();
    };
  }, []);

  useImperativeHandle(controlsRef, () => worldRef.current?.getPlaybackControls());

  return <div ref={containerRef} style={{ height: '100%', width: '100%' }}></div>;
});

export { TowerOfHanoi };
