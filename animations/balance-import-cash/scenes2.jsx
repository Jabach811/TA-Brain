// scenes2.jsx — Scenes 2, 3, 4, 5

// ─────────────────────────────────────────────────────────────
// Scene 2 — Arrival at Transamerica / Advanced Employer

function Scene2() {
  const { localTime, duration } = useSprite();
  const t = localTime;

  const sceneIn = Easing.easeOutCubic(clamp(t / 0.6, 0, 1));

  // Incoming stream from left (0 -> 1.2s)
  const streamProgress = clamp(t / 1.2, 0, 1);
  const streamEase = Easing.easeInOutCubic(streamProgress);
  const streamActive = t < 1.8;

  // Container materializes at t=1.0
  const containerIn = Easing.easeOutCubic(clamp((t - 1.0) / 0.8, 0, 1));

  // Value count-up 1.4 -> 2.6s
  const countProgress = Easing.easeOutCubic(clamp((t - 1.4) / 1.2, 0, 1));

  // Stabilization pulse at 2.6s
  const stabilize = clamp((t - 2.6) / 0.6, 0, 1);
  const stabilizeEase = Easing.easeOutCubic(stabilize);

  // Scene exit
  const exitStart = duration - 0.5;
  const sceneOut = t > exitStart ? 1 - Easing.easeInCubic(clamp((t - exitStart) / 0.5, 0, 1)) : 1;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <Glow x={700} y={200} size={600} opacity={0.14} />

      {/* Transamerica environment label — top */}
      <div style={{
        position: 'absolute', left: 120, top: 80,
        display: 'flex', alignItems: 'center', gap: 14,
        opacity: Easing.easeOutCubic(clamp(t / 0.6, 0, 1)),
      }}>
        <div style={{
          width: 22, height: 22, borderRadius: 5,
          background: `linear-gradient(135deg, ${ACCENT}, oklch(55% 0.18 260))`,
          boxShadow: `0 0 20px ${ACCENT}`,
        }} />
        <div style={{
          fontFamily: SANS, fontSize: 13, fontWeight: 500,
          color: TEXT, letterSpacing: '-0.005em',
        }}>Transamerica</div>
        <div style={{
          fontFamily: MONO, fontSize: 10, color: TEXT_DIMMER,
          letterSpacing: '0.14em',
        }}>· DESTINATION ENVIRONMENT</div>
      </div>

      {/* Incoming stream from left edge */}
      {streamActive && (
        <StreamFlow
          fromX={0} fromY={360}
          toX={520} toY={360}
          progress={streamEase}
          intensity={Math.min(1, (1.8 - t) / 0.6)}
          count={16}
        />
      )}

      {/* Advanced Employer container — center */}
      <div style={{
        position: 'absolute',
        left: 360, top: 200,
        width: 560, height: 340,
        opacity: containerIn,
        transform: `translateY(${(1 - containerIn) * 10}px) scale(${0.98 + 0.02 * containerIn})`,
        transformOrigin: 'center',
      }}>
        <Panel x={0} y={0} width={560} height={340} elevated glow>
          {/* Pulse ring on stabilize */}
          {stabilize > 0 && (
            <div style={{
              position: 'absolute', inset: -2,
              border: `1px solid ${ACCENT}`,
              borderRadius: 14,
              opacity: (1 - stabilizeEase) * 0.6,
              transform: `scale(${1 + stabilizeEase * 0.04})`,
              pointerEvents: 'none',
            }} />
          )}

          <div style={{
            padding: '20px 28px',
            borderBottom: `1px solid ${BORDER}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 8, height: 8, borderRadius: 4,
                background: ACCENT, boxShadow: `0 0 10px ${ACCENT}`,
              }} />
              <div style={{
                fontFamily: MONO, fontSize: 11,
                color: TEXT_DIM, letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}>Advanced Employer</div>
            </div>
            <div style={{
              fontFamily: MONO, fontSize: 10,
              color: TEXT_DIMMER, letterSpacing: '0.1em',
              padding: '4px 8px',
              border: `1px solid ${BORDER}`,
              borderRadius: 4,
            }}>POOLED · UNALLOCATED</div>
          </div>

          <div style={{ padding: '36px 40px' }}>
            <div style={{
              fontFamily: MONO, fontSize: 10,
              color: TEXT_DIM, letterSpacing: '0.14em',
              textTransform: 'uppercase', marginBottom: 14,
            }}>
              Consolidated Balance · 1 of 1
            </div>
            <div style={{
              fontFamily: SANS, fontSize: 64, fontWeight: 500,
              color: TEXT, letterSpacing: '-0.025em',
              fontVariantNumeric: 'tabular-nums',
              lineHeight: 1,
            }}>
              <CountUp from={0} to={2847500} progress={countProgress} />
            </div>
            <div style={{
              marginTop: 14,
              fontFamily: MONO, fontSize: 12,
              color: TEXT_DIMMER,
              letterSpacing: '0.04em',
            }}>USD · Awaiting allocation instructions</div>

            {/* Single-bar indicator showing "one pool" */}
            <div style={{
              marginTop: 28,
              height: 6, borderRadius: 3,
              background: `linear-gradient(90deg, ${ACCENT}, oklch(68% 0.14 235))`,
              opacity: containerIn,
              boxShadow: `0 0 20px ${ACCENT_SOFT}`,
            }} />
          </div>
        </Panel>
      </div>

      {/* Bottom caption */}
      <div style={{
        position: 'absolute', left: 120, bottom: 80,
        display: 'flex', alignItems: 'center', gap: 14,
        opacity: Easing.easeOutCubic(clamp((t - 0.5) / 0.6, 0, 1)),
      }}>
        <div style={{
          fontFamily: MONO, fontSize: 11,
          color: TEXT_DIMMER, letterSpacing: '0.2em',
        }}>02 / 05</div>
        <div style={{ width: 32, height: 1, background: BORDER_HI }} />
        <div style={{
          fontFamily: SANS, fontSize: 16, fontWeight: 500,
          color: TEXT, letterSpacing: '-0.005em',
        }}>Arrival &amp; consolidation</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Scene 3 — Final Files trigger

function Scene3() {
  const { localTime, duration } = useSprite();
  const t = localTime;

  const sceneIn = Easing.easeOutCubic(clamp(t / 0.5, 0, 1));

  // Final Files notification slides in at 0.3s
  const notifIn = Easing.easeOutCubic(clamp((t - 0.3) / 0.5, 0, 1));

  // Check mark animates in at 0.9s
  const checkIn = Easing.easeOutCubic(clamp((t - 0.9) / 0.4, 0, 1));

  // Trigger signal: line pulses down from notif to container at 1.4s
  const signalStart = 1.4;
  const signalProgress = clamp((t - signalStart) / 0.5, 0, 1);

  // Container "unlocks" — border shifts, lock icon turns -> allocatable at 1.9s
  const unlockStart = 1.9;
  const unlock = clamp((t - unlockStart) / 0.6, 0, 1);
  const unlockEase = Easing.easeOutCubic(unlock);

  // Exit
  const exitStart = duration - 0.5;
  const sceneOut = t > exitStart ? 1 - Easing.easeInCubic(clamp((t - exitStart) / 0.5, 0, 1)) : 1;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <Glow x={700} y={200} size={600} opacity={0.14} />

      {/* Notification card — Final Files Received — top right */}
      <div style={{
        position: 'absolute', right: 120, top: 100,
        width: 360,
        opacity: notifIn,
        transform: `translateY(${(1 - notifIn) * -8}px)`,
      }}>
        <div style={{
          background: PANEL_HI,
          border: `1px solid ${BORDER_HI}`,
          borderRadius: 10,
          padding: '16px 18px',
          display: 'flex', alignItems: 'center', gap: 14,
          boxShadow: '0 20px 60px -20px rgba(0,0,0,0.8)',
          position: 'relative',
        }}>
          {/* Check icon with success ring */}
          <div style={{
            width: 36, height: 36, borderRadius: 18,
            background: SUCCESS_SOFT,
            border: `1px solid ${SUCCESS}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            boxShadow: checkIn > 0 ? `0 0 20px ${SUCCESS_SOFT}` : 'none',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8.5l3.2 3.2L13 5"
                stroke={SUCCESS} strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray="20"
                strokeDashoffset={20 - 20 * checkIn}
              />
            </svg>
          </div>
          <div>
            <div style={{
              fontFamily: MONO, fontSize: 10,
              color: TEXT_DIMMER, letterSpacing: '0.14em',
              textTransform: 'uppercase', marginBottom: 4,
            }}>System Event</div>
            <div style={{
              fontFamily: SANS, fontSize: 14, fontWeight: 500,
              color: TEXT, letterSpacing: '-0.005em',
            }}>Final Files Received</div>
            <div style={{
              fontFamily: MONO, fontSize: 11,
              color: TEXT_DIM, marginTop: 2,
            }}>allocation_instructions.xml</div>
          </div>
        </div>

        {/* Trigger signal line to container */}
        {signalProgress > 0 && (
          <div style={{
            position: 'absolute',
            left: 40, top: '100%',
            width: 2, height: 150 * signalProgress,
            background: `linear-gradient(180deg, ${SUCCESS} 0%, transparent 100%)`,
            opacity: 1 - signalProgress * 0.4,
            boxShadow: `0 0 8px ${SUCCESS}`,
          }} />
        )}
      </div>

      {/* Advanced Employer container — same spot as scene 2, now "unlocking" */}
      <div style={{
        position: 'absolute',
        left: 120, top: 260,
        width: 560, height: 340,
      }}>
        <Panel x={0} y={0} width={560} height={340} elevated glow>
          {/* unlock highlight ring */}
          {unlock > 0 && (
            <div style={{
              position: 'absolute', inset: -1,
              borderRadius: 14,
              border: `1px solid ${SUCCESS}`,
              opacity: Math.sin(unlockEase * Math.PI) * 0.7,
              pointerEvents: 'none',
            }} />
          )}

          <div style={{
            padding: '20px 28px',
            borderBottom: `1px solid ${BORDER}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 8, height: 8, borderRadius: 4,
                background: unlock > 0.5 ? SUCCESS : ACCENT,
                boxShadow: `0 0 10px ${unlock > 0.5 ? SUCCESS : ACCENT}`,
                transition: 'background 200ms',
              }} />
              <div style={{
                fontFamily: MONO, fontSize: 11,
                color: TEXT_DIM, letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}>Advanced Employer</div>
            </div>
            {/* Status pill — toggles from POOLED to READY */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontFamily: MONO, fontSize: 10,
              color: unlock > 0.5 ? SUCCESS : TEXT_DIMMER,
              letterSpacing: '0.1em',
              padding: '4px 10px',
              border: `1px solid ${unlock > 0.5 ? SUCCESS : BORDER}`,
              borderRadius: 4,
              transition: 'all 200ms',
            }}>
              {unlock > 0.5 ? (
                <>
                  <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill={SUCCESS}/></svg>
                  READY TO ALLOCATE
                </>
              ) : (
                <>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <rect x="2" y="4.5" width="6" height="4" rx="0.5" stroke="currentColor" strokeWidth="1"/>
                    <path d="M3.5 4.5V3a1.5 1.5 0 013 0v1.5" stroke="currentColor" strokeWidth="1"/>
                  </svg>
                  LOCKED · POOLED
                </>
              )}
            </div>
          </div>

          <div style={{ padding: '36px 40px' }}>
            <div style={{
              fontFamily: MONO, fontSize: 10,
              color: TEXT_DIM, letterSpacing: '0.14em',
              textTransform: 'uppercase', marginBottom: 14,
            }}>
              Consolidated Balance
            </div>
            <div style={{
              fontFamily: SANS, fontSize: 64, fontWeight: 500,
              color: TEXT, letterSpacing: '-0.025em',
              fontVariantNumeric: 'tabular-nums',
              lineHeight: 1,
            }}>
              $2,847,500
            </div>
            <div style={{
              marginTop: 14,
              fontFamily: MONO, fontSize: 12,
              color: TEXT_DIMMER,
              letterSpacing: '0.04em',
            }}>USD · {unlock > 0.5 ? 'Applying allocation rules…' : 'Awaiting allocation instructions'}</div>

            {/* Bar transitions: solid → segmented */}
            <div style={{ marginTop: 28, position: 'relative', height: 6 }}>
              {/* solid bar fades out */}
              <div style={{
                position: 'absolute', inset: 0,
                borderRadius: 3,
                background: `linear-gradient(90deg, ${ACCENT}, oklch(68% 0.14 235))`,
                opacity: 1 - unlockEase,
              }} />
              {/* segments appear */}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', gap: 2,
                opacity: unlockEase,
              }}>
                {[60, 30, 10].map((pct, i) => (
                  <div key={i} style={{
                    flex: pct,
                    borderRadius: 3,
                    background: `linear-gradient(90deg, ${ACCENT}, oklch(68% 0.14 235))`,
                  }} />
                ))}
              </div>
            </div>
          </div>
        </Panel>
      </div>

      {/* Caption */}
      <div style={{
        position: 'absolute', left: 120, bottom: 80,
        display: 'flex', alignItems: 'center', gap: 14,
        opacity: Easing.easeOutCubic(clamp((t - 0.5) / 0.6, 0, 1)),
      }}>
        <div style={{
          fontFamily: MONO, fontSize: 11,
          color: TEXT_DIMMER, letterSpacing: '0.2em',
        }}>03 / 05</div>
        <div style={{ width: 32, height: 1, background: BORDER_HI }} />
        <div style={{
          fontFamily: SANS, fontSize: 16, fontWeight: 500,
          color: TEXT, letterSpacing: '-0.005em',
        }}>Final files trigger allocation</div>
      </div>
    </div>
  );
}

Object.assign(window, { Scene2, Scene3 });
