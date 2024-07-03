import { useRef, useState } from 'react'
import { PlaybackControls, TowerOfHanoi } from './tower-of-hanoi/TowerOfHanoi';

import './App.css'

function App() {
  const controlsRef = useRef<PlaybackControls>();
  const [runState, setRunState] = useState({ canPlay: true, canPause: false, canReset: false });

  const doControlAction = (action: (controls: PlaybackControls) => void): void => {
    const controls = controlsRef.current;
    if (controls) action(controls);
    setRunState({
      canPlay: !!controls && !controls.isPlaying(),
      canPause: !!controls && controls.isPlaying(),
      canReset: !!controls && !controls.isStopped()
    });
  };

  return (
    <>
      <header>
        <h1>Tower of Hanoi</h1>
      </header>
      <section id="main">
        <TowerOfHanoi ref={controlsRef} />
      </section>
      <section id="controls">
        <button onClick={() => doControlAction(c => runState.canPause ? c.pause() : c.play())}>{runState.canPause ? "Pause" : "Play"}</button>
        <button disabled={!runState.canReset} onClick={() => doControlAction(c => c.stopAndReset())}>Reset</button>
      </section>
    </>
  );
}

export default App
