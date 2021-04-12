import { CSSProperties } from 'react';
import { TowerOfHanoi } from './tower-of-hanoi/TowerOfHanoi';

function App() {
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
  return (
    <>
      <header style={headerStyle}>
        <h1>Tower of Hanoi</h1>
      </header>
      <section style={sectionStyle}>
        <TowerOfHanoi />
      </section>
    </>
  );
}

export default App;
