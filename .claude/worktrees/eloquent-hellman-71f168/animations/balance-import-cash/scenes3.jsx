// scenes3.jsx — Scene 4 & 5

// Participant accounts for scenes 4/5
const PARTICIPANTS = [
  { id: 'ACCT-10472', label: 'Participant A', pct: 60 },
  { id: 'ACCT-10473', label: 'Participant B', pct: 30 },
  { id: 'ACCT-10474', label: 'Participant C', pct: 10 },
];
const TOTAL = 2847500;

// ─────────────────────────────────────────────────────────────
// Scene 4 — Distribution logic

function Scene4() {
  const { localTime, duration } = useSprite();
  const t = localTime;

  const sceneIn = Easing.easeOutCubic(clamp(t / 0.5, 0, 1));

  // Source container stays visible (same position, smaller) — top
  // Participant cards appear staggered 0.3, 0.5, 0.7s
  // Flows start staggered 1.2, 1.5, 1.8s
  // Count-ups in cards finish around 3.5s

  const cardIn = (i) => Easing.easeOutCubic(clamp((t - (0.3 + i * 0.2)) / 0.6, 0, 1));
  const flowStart = (i) => 1.2 + i * 0.3;
  const flowDur = 1.4;
  const flowProgress = (i) => clamp((t - flowStart(i)) / flowDur, 0, 1);
  const flowEase = (i) => Easing.easeInOutCubic(flowProgress(i));

  // Value in source decreases as amounts flow out
  const totalFlowed = PARTICIPANTS.reduce((sum, p, i) => {
    return sum + (TOTAL * p.pct / 100) * flowEase(i);
  }, 0);
  const remaining = TOTAL - totalFlowed;

  // Count up in participant cards = same as flow ease (value arrives as flow completes)
  const cardProgress = (i) => flowEase(i);

  // Exit
  const exitStart = duration - 0.5;
  const sceneOut = t > exitStart ? 1 - Easing.easeInCubic(clamp((t - exitStart) / 0.5, 0, 1)) : 1;

  const sourceX = 120, sourceY = 140, sourceW = 480, sourceH = 200;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <Glow x={0} y={0} size={500} opacity={0.1} />
      <Glow x={900} y={400} size={600} opacity={0.12} />

      {/* Source pool (smaller, top-left) */}
      <div style={{
        position: 'absolute', left: sourceX, top: sourceY,
        width: sourceW, height: sourceH,
      }}>
        <Panel x={0} y={0} width={sourceW} height={sourceH} elevated>
          <div style={{
            padding: '14px 20px',
            borderBottom: `1px solid ${BORDER}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 7, height: 7, borderRadius: 4,
                background: SUCCESS, boxShadow: `0 0 10px ${SUCCESS}`,
              }} />
              <div style={{
                fontFamily: MONO, fontSize: 11,
                color: TEXT_DIM, letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}>Advanced Employer</div>
            </div>
            <div style={{
              fontFamily: MONO, fontSize: 10,
              color: SUCCESS, letterSpacing: '0.1em',
              padding: '3px 8px',
              border: `1px solid ${SUCCESS}`,
              borderRadius: 4,
            }}>ALLOCATING</div>
          </div>
          <div style={{ padding: '20px 24px' }}>
            <div style={{
              fontFamily: MONO, fontSize: 10,
              color: TEXT_DIM, letterSpacing: '0.14em',
              textTransform: 'uppercase', marginBottom: 8,
            }}>Remaining pool</div>
            <div style={{
              fontFamily: SANS, fontSize: 38, fontWeight: 500,
              color: TEXT, letterSpacing: '-0.02em',
              fontVariantNumeric: 'tabular-nums',
              lineHeight: 1,
            }}>
              ${Math.round(remaining).toLocaleString('en-US')}
            </div>
            {/* segmented depleting bar */}
            <div style={{ marginTop: 18, height: 5, display: 'flex', gap: 2 }}>
              {PARTICIPANTS.map((p, i) => {
                const prog = flowEase(i);
                return (
                  <div key={p.id} style={{
                    flex: p.pct,
                    borderRadius: 3,
                    background: prog > 0.98
                      ? 'rgba(255,255,255,0.06)'
                      : `linear-gradient(90deg, ${ACCENT}, oklch(68% 0.14 235))`,
                    opacity: prog > 0.98 ? 1 : (1 - prog * 0.3),
                    transition: 'opacity 200ms',
                  }} />
                );
              })}
            </div>
          </div>
        </Panel>
      </div>

      {/* Participant account cards — right side, stacked */}
      {PARTICIPANTS.map((p, i) => {
        const cardY = 140 + i * 155;
        const cardX = 740;
        const cardW = 420;
        const cardH = 130;
        const inP = cardIn(i);
        const cp = cardProgress(i);
        const targetVal = TOTAL * p.pct / 100;
        const val = targetVal * cp;
        const arrived = cp >= 0.98;

        return (
          <React.Fragment key={p.id}>
            {/* Flow line from source to card */}
            <FlowArc
              fromX={sourceX + sourceW} fromY={sourceY + sourceH / 2}
              toX={cardX} toY={cardY + cardH / 2}
              progress={flowEase(i)}
              startAt={flowStart(i)}
              currentTime={t}
              active={flowProgress(i) > 0 && flowProgress(i) < 1}
              color={ACCENT}
            />

            <div style={{
              position: 'absolute', left: cardX, top: cardY,
              width: cardW, height: cardH,
              opacity: inP,
              transform: `translateX(${(1 - inP) * 12}px)`,
            }}>
              <Panel x={0} y={0} width={cardW} height={cardH} elevated={arrived}>
                {/* arrival pulse */}
                {arrived && cp < 1.05 && (
                  <div style={{
                    position: 'absolute', inset: -1,
                    border: `1px solid ${ACCENT}`,
                    borderRadius: 14,
                    opacity: Math.max(0, 1 - (cp - 0.98) * 20) * 0.7,
                    pointerEvents: 'none',
                  }} />
                )}
                <div style={{
                  padding: '16px 22px',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  height: '100%',
                }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <div>
                      <div style={{
                        fontFamily: MONO, fontSize: 10,
                        color: TEXT_DIMMER, letterSpacing: '0.14em',
                        marginBottom: 4,
                      }}>{p.id}</div>
                      <div style={{
                        fontFamily: SANS, fontSize: 13, fontWeight: 500,
                        color: TEXT,
                      }}>{p.label}</div>
                    </div>
                    <div style={{
                      fontFamily: MONO, fontSize: 11,
                      color: ACCENT, letterSpacing: '0.08em',
                      padding: '4px 8px',
                      background: ACCENT_SOFT,
                      border: `1px solid ${ACCENT_SOFT}`,
                      borderRadius: 4,
                    }}>{p.pct}%</div>
                  </div>

                  <div style={{
                    display: 'flex', alignItems: 'baseline', gap: 10,
                  }}>
                    <div style={{
                      fontFamily: SANS, fontSize: 26, fontWeight: 500,
                      color: TEXT, letterSpacing: '-0.02em',
                      fontVariantNumeric: 'tabular-nums',
                    }}>
                      ${Math.round(val).toLocaleString('en-US')}
                    </div>
                    <div style={{
                      fontFamily: MONO, fontSize: 10,
                      color: TEXT_DIMMER, letterSpacing: '0.1em',
                    }}>USD</div>
                  </div>

                  {/* fill progress bar */}
                  <div style={{
                    height: 3, borderRadius: 2,
                    background: 'rgba(255,255,255,0.06)',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%', width: `${cp * 100}%`,
                      background: ACCENT,
                      boxShadow: `0 0 8px ${ACCENT_SOFT}`,
                    }} />
                  </div>
                </div>
              </Panel>
            </div>
          </React.Fragment>
        );
      })}

      {/* Caption */}
      <div style={{
        position: 'absolute', left: 120, bottom: 80,
        display: 'flex', alignItems: 'center', gap: 14,
        opacity: Easing.easeOutCubic(clamp(t / 0.6, 0, 1)),
      }}>
        <div style={{
          fontFamily: MONO, fontSize: 11,
          color: TEXT_DIMMER, letterSpacing: '0.2em',
        }}>04 / 05</div>
        <div style={{ width: 32, height: 1, background: BORDER_HI }} />
        <div style={{
          fontFamily: SANS, fontSize: 16, fontWeight: 500,
          color: TEXT, letterSpacing: '-0.005em',
        }}>Proportional distribution</div>
      </div>
    </div>
  );
}

// Arc flow between two points (curved bezier path with animated dash + particles)
function FlowArc({ fromX, fromY, toX, toY, progress, startAt, currentTime, active, color = ACCENT }) {
  const cpX = (fromX + toX) / 2;
  // SVG canvas covers full stage
  const W = 1280, H = 720;
  const pathD = `M ${fromX} ${fromY} C ${cpX} ${fromY}, ${cpX} ${toY}, ${toX} ${toY}`;
  const pathRef = React.useRef(null);
  const [len, setLen] = React.useState(0);

  React.useEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength());
  }, []);

  const dash = len;
  const offset = len * (1 - progress);

  // particle positions
  const particleCount = 6;
  const particles = [];
  if (len > 0 && active) {
    for (let i = 0; i < particleCount; i++) {
      const stagger = i / particleCount;
      const p = ((currentTime - startAt) * 0.8 - stagger) % 1;
      if (p < 0 || p > progress) continue;
      try {
        const pt = pathRef.current.getPointAtLength(len * p);
        particles.push({ x: pt.x, y: pt.y, key: i, op: Math.sin(p * Math.PI) });
      } catch {}
    }
  }

  return (
    <svg width={W} height={H} style={{
      position: 'absolute', left: 0, top: 0, pointerEvents: 'none',
      overflow: 'visible',
    }}>
      <path
        ref={pathRef}
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeDasharray={dash}
        strokeDashoffset={offset}
        opacity={progress > 0 ? 0.45 : 0}
      />
      {particles.map(pt => (
        <circle key={pt.key} cx={pt.x} cy={pt.y} r={3}
          fill={color}
          opacity={pt.op * 0.9}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      ))}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Scene 5 — Final state

function Scene5() {
  const { localTime, duration } = useSprite();
  const t = localTime;

  const sceneIn = Easing.easeOutCubic(clamp(t / 0.6, 0, 1));

  // Layout shifts to clean grid; all cards populated
  const cardIn = (i) => Easing.easeOutCubic(clamp((t - 0.2 - i * 0.1) / 0.6, 0, 1));

  // Confirmation banner appears at 1.6s
  const confIn = Easing.easeOutCubic(clamp((t - 1.6) / 0.6, 0, 1));

  // Checkmarks per card at 2.2, 2.4, 2.6s
  const checkIn = (i) => Easing.easeOutCubic(clamp((t - (2.2 + i * 0.2)) / 0.3, 0, 1));

  // Stable glow pulse subtle
  const pulse = Math.sin(t * 2) * 0.5 + 0.5;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn }}>
      <Glow x={400} y={100} size={700} color={SUCCESS} opacity={0.08 + pulse * 0.04} />
      <Glow x={800} y={500} size={500} opacity={0.08} />

      {/* Top summary: pooled → distributed */}
      <div style={{
        position: 'absolute', left: 120, top: 110,
        display: 'flex', alignItems: 'center', gap: 20,
        opacity: Easing.easeOutCubic(clamp(t / 0.5, 0, 1)),
      }}>
        <div>
          <div style={{
            fontFamily: MONO, fontSize: 10,
            color: TEXT_DIMMER, letterSpacing: '0.14em',
            marginBottom: 6,
          }}>RECONCILED</div>
          <div style={{
            fontFamily: SANS, fontSize: 34, fontWeight: 500,
            color: TEXT, letterSpacing: '-0.02em',
            fontVariantNumeric: 'tabular-nums',
          }}>$2,847,500.00</div>
        </div>
        <div style={{ width: 1, height: 40, background: BORDER_HI }} />
        <div>
          <div style={{
            fontFamily: MONO, fontSize: 10,
            color: TEXT_DIMMER, letterSpacing: '0.14em',
            marginBottom: 6,
          }}>ACCOUNTS</div>
          <div style={{
            fontFamily: SANS, fontSize: 34, fontWeight: 500,
            color: TEXT, letterSpacing: '-0.02em',
            fontVariantNumeric: 'tabular-nums',
          }}>3</div>
        </div>
        <div style={{ width: 1, height: 40, background: BORDER_HI }} />
        <div>
          <div style={{
            fontFamily: MONO, fontSize: 10,
            color: TEXT_DIMMER, letterSpacing: '0.14em',
            marginBottom: 6,
          }}>VARIANCE</div>
          <div style={{
            fontFamily: SANS, fontSize: 34, fontWeight: 500,
            color: SUCCESS, letterSpacing: '-0.02em',
            fontVariantNumeric: 'tabular-nums',
          }}>$0.00</div>
        </div>
      </div>

      {/* Confirmation pill — top right */}
      <div style={{
        position: 'absolute', right: 120, top: 120,
        opacity: confIn,
        transform: `translateY(${(1 - confIn) * -6}px)`,
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: SUCCESS_SOFT,
          border: `1px solid ${SUCCESS}`,
          borderRadius: 100,
          padding: '10px 16px 10px 14px',
          boxShadow: `0 0 24px ${SUCCESS_SOFT}`,
        }}>
          <div style={{
            width: 18, height: 18, borderRadius: 9,
            background: SUCCESS,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5.2l2 2L8 3.2" stroke="#0A0B0E" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{
            fontFamily: SANS, fontSize: 13, fontWeight: 500,
            color: SUCCESS, letterSpacing: '-0.005em',
          }}>Balances Applied</div>
        </div>
      </div>

      {/* Three cards in clean row */}
      <div style={{
        position: 'absolute', left: 120, top: 260,
        width: 1040,
        display: 'flex', gap: 20,
      }}>
        {PARTICIPANTS.map((p, i) => {
          const val = TOTAL * p.pct / 100;
          const inP = cardIn(i);
          const chk = checkIn(i);
          return (
            <div key={p.id} style={{
              flex: 1,
              opacity: inP,
              transform: `translateY(${(1 - inP) * 10}px)`,
            }}>
              <div style={{
                background: PANEL_HI,
                border: `1px solid ${BORDER_HI}`,
                borderRadius: 14,
                padding: '26px 26px 24px',
                position: 'relative',
                boxShadow: '0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 60px -20px rgba(0,0,0,0.8)',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
                  opacity: 0.5,
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
                  <div>
                    <div style={{
                      fontFamily: MONO, fontSize: 10,
                      color: TEXT_DIMMER, letterSpacing: '0.14em',
                      marginBottom: 5,
                    }}>{p.id}</div>
                    <div style={{
                      fontFamily: SANS, fontSize: 14, fontWeight: 500,
                      color: TEXT,
                    }}>{p.label}</div>
                  </div>
                  {/* Check circle */}
                  <div style={{
                    width: 24, height: 24, borderRadius: 12,
                    background: chk > 0 ? SUCCESS_SOFT : 'transparent',
                    border: `1px solid ${chk > 0 ? SUCCESS : BORDER}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 200ms',
                  }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.5 6.3l2.5 2.5 4.5-5"
                        stroke={SUCCESS} strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round"
                        strokeDasharray="14"
                        strokeDashoffset={14 - 14 * chk}
                      />
                    </svg>
                  </div>
                </div>

                <div style={{
                  fontFamily: MONO, fontSize: 10,
                  color: TEXT_DIM, letterSpacing: '0.14em',
                  marginBottom: 6,
                }}>ALLOCATED</div>
                <div style={{
                  fontFamily: SANS, fontSize: 32, fontWeight: 500,
                  color: TEXT, letterSpacing: '-0.02em',
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1,
                  marginBottom: 16,
                }}>
                  ${val.toLocaleString('en-US')}
                </div>

                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  fontFamily: MONO, fontSize: 11,
                  color: TEXT_DIM,
                  paddingTop: 14,
                  borderTop: `1px solid ${BORDER}`,
                }}>
                  <span>Allocation</span>
                  <span style={{ color: TEXT }}>{p.pct}%</span>
                </div>

                {/* bar */}
                <div style={{
                  marginTop: 10, height: 3, borderRadius: 2,
                  background: 'rgba(255,255,255,0.06)',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%', width: `${p.pct}%`,
                    background: `linear-gradient(90deg, ${ACCENT}, oklch(68% 0.14 235))`,
                  }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Audit line */}
      <div style={{
        position: 'absolute', left: 120, bottom: 80,
        display: 'flex', alignItems: 'center', gap: 14,
        opacity: Easing.easeOutCubic(clamp((t - 1.8) / 0.6, 0, 1)),
      }}>
        <div style={{
          fontFamily: MONO, fontSize: 11,
          color: TEXT_DIMMER, letterSpacing: '0.2em',
        }}>05 / 05</div>
        <div style={{ width: 32, height: 1, background: BORDER_HI }} />
        <div style={{
          fontFamily: SANS, fontSize: 16, fontWeight: 500,
          color: TEXT, letterSpacing: '-0.005em',
        }}>Reconciled · posted to ledger</div>
        <div style={{
          marginLeft: 12,
          fontFamily: MONO, fontSize: 11,
          color: TEXT_DIMMER, letterSpacing: '0.1em',
        }}>TX-2026-04-17-00471</div>
      </div>
    </div>
  );
}

Object.assign(window, { Scene4, Scene5, FlowArc, PARTICIPANTS, TOTAL });
