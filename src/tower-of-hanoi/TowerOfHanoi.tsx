import { useRef, useLayoutEffect } from 'react';
import { World } from './world/World';

const TowerOfHanoi = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (container === null) return;

    const world = new World(containerRef.current as HTMLDivElement);

    world.init().then(
      () => world.start(),
      (error) => console.log(error)
    );

    return () => {
      world.stop();
      world.dispose();
    };
  }, []);
  return <div ref={containerRef} style={{ height: '100%', width: '100%' }}></div>;
};

export { TowerOfHanoi };
