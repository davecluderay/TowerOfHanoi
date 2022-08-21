import { CSSProperties, useRef, useState } from 'react';
import { PlaybackControls, TowerOfHanoi } from './tower-of-hanoi/TowerOfHanoi';

function App() {
  const controlsRef = useRef<PlaybackControls>();
  const [runState, setRunState] = useState({ canPlay: true, canPause: false, canReset: false });
  const applyToRunState = (controls: PlaybackControls | undefined): void =>
    setRunState({
      canPlay: !!controls && !controls.isPlaying(),
      canPause: !!controls && controls.isPlaying(),
      canReset: !!controls && !controls.isStopped()
    });

  const headerStyle: CSSProperties = {
    color: '#f0f0f0',
    fontFamily: 'sans-serif',
    textAlign: 'center',
    position: 'relative',
    zIndex: 99,
  };
  const sectionStyle: CSSProperties = {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: 'radial-gradient(circle, rgba(68,68,68,1) 0%, rgba(34,34,34,1) 50%, rgba(0,0,0,1) 100%)',
    zIndex: 0,
  };
  const buttonContainerStyles: CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    backgroundColor: 'black',
    opacity: 0.75,
  };
  const buttonStyles: CSSProperties = {
    position: 'relative',
    textAlign: 'center',
    padding: '5px 10px',
    width: '6em',
    fontSize: 'medium',
    margin: '1em 0.5em',
    textTransform: 'uppercase',
  };

  const playPauseButtonLabel = runState.canPause ? 'Pause' : 'Play';
  const playPauseButtonAction = runState.canPause
    ? () => controlsRef.current?.pause()
    : () => controlsRef.current?.play();
  const buttonContainer = (
    <div style={buttonContainerStyles}>
      <button
        style={buttonStyles}
        onClick={() => {
          playPauseButtonAction();
          applyToRunState(controlsRef.current);
        }}
      >
        {playPauseButtonLabel}
      </button>
      <button
        style={buttonStyles}
        onClick={() => {
          controlsRef.current?.stopAndReset();
          applyToRunState(controlsRef.current);
        }}
        disabled={!runState.canReset}
      >
        Reset
      </button>
    </div>
  );
  return (
    <>
      <header style={headerStyle}>
        <h1>Tower of Hanoi</h1>
      </header>
      <section style={sectionStyle}>
        <TowerOfHanoi ref={controlsRef} />
      </section>
      {buttonContainer}
    </>
  );
}

export default App;
