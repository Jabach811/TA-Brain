// app.jsx — Main app with tweaks panel

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "orbScale": 2.2,
  "cubeScale": 2.0,
  "glowIntensity": 1.4,
  "particleCount": 24,
  "rotationSpeed": 0.15,
  "beamBrightness": 1.0,
  "pulseSpeed": 1.5
}/*EDITMODE-END*/;

function CanvasScene() {
  const { time } = useTimeline();
  const canvasRef = React.useRef(null);
  const W = 1920;
  const H = 1080;

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    renderFrame(ctx, W, H, time);
  }, [time]);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  );
}

function MoodOverlay() {
  const { time } = useTimeline();

  const moods = [
    { start: 0, end: 7, text: 'CHAOS', sub: 'Fragmented. Disconnected. Drifting.' },
    { start: 9, end: 15, text: 'AWARENESS', sub: 'Patterns emerge. Orbits tighten.' },
    { start: 17, end: 23, text: 'STRUCTURE', sub: 'Systems align. Frameworks crystallize.' },
    { start: 25, end: 33, text: 'CONNECTION', sub: 'Bridges form. Departments converge.' },
    { start: 35, end: 43, text: 'UNITY', sub: 'Five departments. One network.' },
    { start: 45, end: 50, text: 'TA BRAIN', sub: 'Connected. Distinct. Alive.' },
  ];

  const softStep = (x) => {
    const t = Math.max(0, Math.min(1, x));
    return t * t * t * (t * (t * 6 - 15) + 10);
  };
  const blend = (start, end, fade = 1.05) => {
    const fadeIn = start <= 0
      ? softStep((time - start) / fade)
      : softStep((time - (start - fade)) / (fade * 2));
    const fadeOut = 1 - softStep((time - (end - fade)) / (fade * 2));
    return Math.min(fadeIn, fadeOut);
  };
  const activeMoods = moods
    .map((m) => ({ ...m, alpha: blend(m.start, m.end) }))
    .filter((m) => m.alpha > 0.01);

  if (!activeMoods.length) return null;

  return (
    <div style={{
      position: 'absolute', top: 60, left: 0, right: 0,
      textAlign: 'center',
      pointerEvents: 'none', zIndex: 10,
    }}>
      {activeMoods.map((m) => {
        const yShift = (1 - m.alpha) * 14;
        return (
          <div key={m.text} style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            opacity: m.alpha,
            transform: `translateY(${yShift}px)`,
            willChange: 'transform, opacity',
          }}>
            <div style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: 44, fontWeight: 700,
              color: 'rgba(200, 215, 255, 0.7)',
              letterSpacing: '0.2em', marginBottom: 8,
              textShadow: '0 0 40px rgba(100, 140, 255, 0.4)',
            }}>
              {m.text}
            </div>
            <div style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: 17, fontWeight: 400,
              color: 'rgba(180, 195, 240, 0.45)',
              letterSpacing: '0.08em',
            }}>
              {m.sub}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AppTweaks() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Push tweaks to global for canvas renderer
  React.useEffect(() => {
    window.__TWEAKS = tweaks;
  }, [tweaks]);

  return (
    <TweaksPanel title="Animation Tweaks">
      <TweakSection title="Scale">
        <TweakSlider label="Orb Size" value={tweaks.orbScale} min={0.8} max={4} step={0.1}
          onChange={v => setTweak('orbScale', v)} />
        <TweakSlider label="Cube Size" value={tweaks.cubeScale} min={0.8} max={4} step={0.1}
          onChange={v => setTweak('cubeScale', v)} />
        <TweakSlider label="Glow Intensity" value={tweaks.glowIntensity} min={0.3} max={3} step={0.1}
          onChange={v => setTweak('glowIntensity', v)} />
      </TweakSection>
      <TweakSection title="Motion">
        <TweakSlider label="Rotation Speed" value={tweaks.rotationSpeed} min={0.02} max={0.5} step={0.01}
          onChange={v => setTweak('rotationSpeed', v)} />
        <TweakSlider label="Pulse Speed" value={tweaks.pulseSpeed} min={0.3} max={4} step={0.1}
          onChange={v => setTweak('pulseSpeed', v)} />
      </TweakSection>
      <TweakSection title="Connections">
        <TweakSlider label="Beam Brightness" value={tweaks.beamBrightness} min={0.2} max={3} step={0.1}
          onChange={v => setTweak('beamBrightness', v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

function App() {
  // Initialize tweaks globally
  window.__TWEAKS = window.__TWEAKS || TWEAK_DEFAULTS;

  return (
    <React.Fragment>
      <Stage width={1920} height={1080} duration={DURATION} background="#030308" loop={true} autoplay={true} persistKey="ta-brain">
        <CanvasScene />
        <MoodOverlay />
      </Stage>
      <AppTweaks />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
