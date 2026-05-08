// fm_scenes_b.jsx — Scenes 4, 5, 6

// ─────────────────────────────────────────────────────────────
// SCENE 4 — Final Files Arrive

function FMScene4() {
  const { localTime: t, duration } = useSprite();
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.5, 0, 1));
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;

  // Holding record — left, same as scene 3 final state
  const holdIn = Easing.easeOutCubic(clamp(t / 0.5, 0, 1));

  // Final files notification slides in from top at 0.4
  const notifIn = Easing.easeOutCubic(clamp((t - 0.4) / 0.5, 0, 1));
  const checkIn = Easing.easeOutCubic(clamp((t - 0.9) / 0.4, 0, 1));

  // Signal pulse from notif → holding at 1.3
  const signalP = clamp((t - 1.3) / 0.5, 0, 1);

  // Holding unlocks at 1.8: border shifts to accent, status changes
  const unlockStart = 1.8;
  const unlock = Easing.easeOutCubic(clamp((t - unlockStart) / 0.7, 0, 1));

  // Dissolve/fragment effect: holding starts to split at 2.2
  const dissolveStart = 2.2;
  const dissolve = Easing.easeInCubic(clamp((t - dissolveStart) / 1.0, 0, 1));

  const holdX = 100, holdY = 220, holdW = 500, holdH = 300;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={400} y={100} size={600} color={FM.SUCCESS} opacity={0.08} />

      {/* Holding record (unlocking) */}
      <div style={{
        position: 'absolute', left: holdX, top: holdY,
        width: holdW, height: holdH,
        opacity: holdIn * (1 - dissolve * 0.5),
        transform: `scale(${1 - dissolve * 0.04})`,
        transformOrigin: 'center',
      }}>
        <FMPanel x={0} y={0} w={holdW} h={holdH} elevated>
          {/* Unlock glow ring */}
          {unlock > 0 && (
            <div style={{
              position: 'absolute', inset: -1,
              borderRadius: 12,
              border: `1px solid ${unlock > 0.5 ? FM.ACCENT : FM.WARN}`,
              opacity: unlock > 0.5 ? 0.7 : (1 - (unlock / 0.5)) * 0.6,
              pointerEvents: 'none',
              transition: 'border-color 200ms',
            }} />
          )}

          <div style={{
            padding: '16px 22px',
            borderBottom: `1px solid ${FM.BORDER}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 7, height: 7, borderRadius: 4,
                background: unlock > 0.5 ? FM.ACCENT : FM.WARN,
                boxShadow: `0 0 10px ${unlock > 0.5 ? FM.ACCENT : FM.WARN}`,
                transition: 'background 300ms, box-shadow 300ms',
              }} />
              <div style={{ fontFamily: FM.MONO, fontSize: 11, color: FM.DIM, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                Initial Load · Holding Record
              </div>
            </div>
            <div style={{ transition: 'all 300ms' }}>
              {unlock > 0.5
                ? <FMChip label="Unlocked" color={FM.ACCENT} soft={FM.ACCENT_S} />
                : <FMChip label="Staging" color={FM.WARN} soft={FM.WARN_S} />
              }
            </div>
          </div>

          <div style={{ padding: '16px 22px' }}>
            <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.14em', marginBottom: 8 }}>STAGED TOTAL</div>
            <div style={{
              fontFamily: FM.SANS, fontSize: 42, fontWeight: 500,
              color: FM.TEXT, letterSpacing: '-0.025em', fontVariantNumeric: 'tabular-nums', marginBottom: 14,
            }}>${WIRE_TOTAL.toLocaleString('en-US')}</div>

            {FUNDS.map((f, fi) => (
              <div key={f.id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '8px 0',
                borderBottom: fi < FUNDS.length - 1 ? `1px solid ${FM.BORDER}` : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 5, height: 5, borderRadius: 3, background: FM.FUND_COLORS[fi].accent }} />
                  <span style={{ fontFamily: FM.MONO, fontSize: 11, color: FM.DIM }}>{f.label}</span>
                </div>
                <span style={{ fontFamily: FM.MONO, fontSize: 11, color: FM.TEXT, fontVariantNumeric: 'tabular-nums' }}>
                  ${Math.round(fundValue(fi)).toLocaleString('en-US')}
                </span>
              </div>
            ))}

            <div style={{
              marginTop: 14, fontFamily: FM.MONO, fontSize: 10,
              color: unlock > 0.5 ? FM.ACCENT : FM.DIMMER,
              letterSpacing: '0.12em', transition: 'color 300ms',
            }}>
              {unlock > 0.5 ? '→ Applying participant allocations…' : 'STAGED · AWAITING FINAL FILES'}
            </div>
          </div>
        </FMPanel>
      </div>

      {/* Signal line from notif to holding */}
      {signalP > 0 && (
        <div style={{
          position: 'absolute',
          left: 710, top: 200,
          width: 2,
          height: Math.min(holdY - 200, 220) * signalP,
          background: `linear-gradient(180deg, ${FM.SUCCESS} 0%, transparent 100%)`,
          boxShadow: `0 0 8px ${FM.SUCCESS}`,
          opacity: 1 - signalP * 0.5,
        }} />
      )}

      {/* Final Files notification — top right */}
      <div style={{
        position: 'absolute', right: 100, top: 100,
        width: 380,
        opacity: notifIn,
        transform: `translateY(${(1-notifIn) * -8}px)`,
      }}>
        <div style={{
          background: FM.PANEL_HI,
          border: `1px solid ${FM.BORDER_HI}`,
          borderRadius: 10,
          padding: '16px 18px',
          display: 'flex', alignItems: 'center', gap: 14,
          boxShadow: '0 24px 80px -20px rgba(0,0,0,0.9)',
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: 19,
            background: FM.SUCCESS_S,
            border: `1px solid ${FM.SUCCESS}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            boxShadow: checkIn > 0 ? `0 0 20px ${FM.SUCCESS_S}` : 'none',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8.5l3.2 3.2L13 5" stroke={FM.SUCCESS} strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray="20" strokeDashoffset={20 - 20 * checkIn} />
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>System Event</div>
            <div style={{ fontFamily: FM.SANS, fontSize: 14, fontWeight: 500, color: FM.TEXT }}>Final Files Received</div>
            <div style={{ fontFamily: FM.MONO, fontSize: 11, color: FM.DIM, marginTop: 2 }}>participant_elections_2026-04-17.xml</div>
          </div>
        </div>
      </div>

      <SceneCaption n={4} t={t} label="Final files received — holding record unlocked" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SCENE 5 — Participant Application

function FMScene5() {
  const { localTime: t, duration } = useSprite();
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.5, 0, 1));
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;

  // Holding record (source, shrinking)
  const holdX = 60, holdY = 210, holdW = 340, holdH = 300;

  // Participant cards: stagger in at 0.3, 0.5, 0.7
  const cardIn = (pi) => Easing.easeOutCubic(clamp((t - (0.3 + pi * 0.2)) / 0.6, 0, 1));

  // Flows per fund per participant start at staggered times
  const flowStart = (pi, fi) => 1.0 + pi * 0.4 + fi * 0.15;
  const flowDur = 1.2;
  const flowP = (pi, fi) => Easing.easeInOutCubic(clamp((t - flowStart(pi, fi)) / flowDur, 0, 1));

  // Holding total drains as flows leave
  const totalFlowed = PARTICIPANTS.reduce((sum, _, pi) =>
    sum + FUNDS.reduce((s2, _, fi) =>
      s2 + participantFundValue(pi, fi) * flowP(pi, fi), 0), 0);
  const holdRemaining = Math.max(0, WIRE_TOTAL - totalFlowed);
  const holdDepleteP = totalFlowed / WIRE_TOTAL;

  const cardX = 480, cardW = 720, cardH = 168, cardGap = 10;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={350} y={200} size={500} color={FM.WARN} opacity={0.06} />
      <FMGlow x={900} y={300} size={600} opacity={0.1} />

      {/* Holding record — left, draining */}
      <div style={{
        position: 'absolute', left: holdX, top: holdY,
        width: holdW, height: holdH,
        opacity: Math.max(0.1, 1 - holdDepleteP * 0.8),
      }}>
        <FMPanel x={0} y={0} w={holdW} h={holdH} elevated>
          <div style={{
            padding: '14px 18px',
            borderBottom: `1px solid ${FM.BORDER}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: FM.WARN, boxShadow: `0 0 8px ${FM.WARN}` }} />
              <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIM, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                Holding Record
              </div>
            </div>
            <FMChip label="Reversing" color={FM.WARN} soft={FM.WARN_S} />
          </div>
          <div style={{ padding: '14px 18px' }}>
            <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.12em', marginBottom: 8 }}>REMAINING</div>
            <div style={{ fontFamily: FM.SANS, fontSize: 32, fontWeight: 500, color: FM.TEXT, fontVariantNumeric: 'tabular-nums', marginBottom: 12 }}>
              ${Math.round(holdRemaining).toLocaleString('en-US')}
            </div>
            {/* Draining bar */}
            <div style={{ height: 4, borderRadius: 2, background: FM.BORDER_HI, overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${(1 - holdDepleteP) * 100}%`,
                background: `linear-gradient(90deg, ${FM.WARN}, oklch(75% 0.10 55))`,
                transition: 'width 50ms',
              }} />
            </div>

            {FUNDS.map((f, fi) => {
              const amountLeft = fundValue(fi) - PARTICIPANTS.reduce((s, _, pi) => s + participantFundValue(pi, fi) * flowP(pi, fi), 0);
              return (
                <div key={f.id} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '7px 0',
                  borderTop: `1px solid ${FM.BORDER}`,
                  marginTop: fi === 0 ? 12 : 0,
                  fontFamily: FM.MONO, fontSize: 10,
                }}>
                  <span style={{ color: FM.DIMMER, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ display: 'inline-block', width: 4, height: 4, borderRadius: 2, background: FM.FUND_COLORS[fi].accent }} />
                    {f.ticker}
                  </span>
                  <span style={{ color: FM.DIM, fontVariantNumeric: 'tabular-nums' }}>
                    ${Math.round(Math.max(0, amountLeft)).toLocaleString('en-US')}
                  </span>
                </div>
              );
            })}
          </div>
        </FMPanel>
      </div>

      {/* Flow arcs from holding to participant cards */}
      {PARTICIPANTS.map((p, pi) => {
        const cardTop = 100 + pi * (cardH + cardGap);
        return FUNDS.map((f, fi) => {
          const fp = flowP(pi, fi);
          if (fp <= 0) return null;
          return (
            <FMArc key={`${pi}-${fi}`}
              fromX={holdX + holdW} fromY={holdY + holdH / 2}
              toX={cardX} toY={cardTop + cardH / 2}
              progress={fp}
              color={FM.FUND_COLORS[fi].accent}
              curveDir={pi === 1 ? 0.5 : (pi === 0 ? -1 : 1.5)}
            />
          );
        });
      })}

      {/* Participant account cards */}
      {PARTICIPANTS.map((p, pi) => {
        const cardTop = 100 + pi * (cardH + cardGap);
        const inP = cardIn(pi);
        const pTotal = FUNDS.reduce((s, _, fi) => s + participantFundValue(pi, fi) * flowP(pi, fi), 0);
        const allDone = FUNDS.every((_, fi) => flowP(pi, fi) >= 0.98);

        return (
          <div key={p.id} style={{
            position: 'absolute', left: cardX, top: cardTop,
            width: cardW, height: cardH,
            opacity: inP, transform: `translateX(${(1-inP)*12}px)`,
          }}>
            <FMPanel x={0} y={0} w={cardW} h={cardH} elevated={allDone}>
              {allDone && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: `linear-gradient(90deg, transparent, ${FM.ACCENT}, transparent)`,
                  opacity: 0.7,
                }} />
              )}
              <div style={{ padding: '14px 20px', borderBottom: `1px solid ${FM.BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: 3, background: allDone ? FM.SUCCESS : FM.ACCENT, boxShadow: `0 0 8px ${allDone ? FM.SUCCESS : FM.ACCENT}`, transition: 'background 300ms' }} />
                  <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIM, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{p.id}</div>
                  <div style={{ fontFamily: FM.SANS, fontSize: 13, fontWeight: 500, color: FM.TEXT }}>{p.label}</div>
                </div>
                <div style={{ fontFamily: FM.SANS, fontSize: 22, fontWeight: 500, color: FM.TEXT, fontVariantNumeric: 'tabular-nums' }}>
                  ${Math.round(pTotal).toLocaleString('en-US')}
                </div>
              </div>
              <div style={{ padding: '10px 20px', display: 'flex', gap: 0 }}>
                {FUNDS.map((f, fi) => {
                  const val = participantFundValue(pi, fi) * flowP(pi, fi);
                  const fColor = FM.FUND_COLORS[fi];
                  return (
                    <div key={f.id} style={{
                      flex: 1,
                      padding: '8px 10px',
                      borderRight: fi < FUNDS.length - 1 ? `1px solid ${FM.BORDER}` : 'none',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
                        <div style={{ width: 4, height: 4, borderRadius: 2, background: fColor.accent }} />
                        <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.1em' }}>{f.ticker}</div>
                        <div style={{ fontFamily: FM.MONO, fontSize: 9, color: fColor.accent, marginLeft: 'auto' }}>{p.allocations[fi]}%</div>
                      </div>
                      <div style={{ fontFamily: FM.MONO, fontSize: 12, color: FM.TEXT, fontVariantNumeric: 'tabular-nums' }}>
                        ${Math.round(val).toLocaleString('en-US')}
                      </div>
                      <div style={{ marginTop: 6, height: 2, borderRadius: 1, background: FM.BORDER_HI, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${flowP(pi, fi) * 100}%`, background: fColor.accent }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </FMPanel>
          </div>
        );
      })}

      <SceneCaption n={5} t={t} label="Participant application — holding record reversal" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SCENE 6 — Final State

function FMScene6() {
  const { localTime: t, duration } = useSprite();
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.6, 0, 1));

  const cardIn = (pi) => Easing.easeOutCubic(clamp((t - 0.2 - pi * 0.12) / 0.7, 0, 1));
  const checkIn = (pi) => Easing.easeOutCubic(clamp((t - 1.8 - pi * 0.18) / 0.4, 0, 1));
  const confIn = Easing.easeOutCubic(clamp((t - 1.6) / 0.5, 0, 1));
  const summaryIn = Easing.easeOutCubic(clamp(t / 0.5, 0, 1));
  const pulse = Math.sin(t * 1.8) * 0.5 + 0.5;

  const cardW = 360, cardH = 250, cardGap = 20;
  const totalW = PARTICIPANTS.length * cardW + (PARTICIPANTS.length - 1) * cardGap;
  const startX = (1280 - totalW) / 2;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn }}>
      <FMGlow x={400} y={50} size={700} color={FM.SUCCESS} opacity={0.07 + pulse * 0.04} />
      <FMGlow x={700} y={500} size={500} opacity={0.07} />

      {/* Summary bar — top */}
      <div style={{
        position: 'absolute', left: startX, top: 90,
        display: 'flex', alignItems: 'center', gap: 28,
        opacity: summaryIn,
      }}>
        {[
          { label: 'Total Applied', val: `$${WIRE_TOTAL.toLocaleString('en-US')}`, color: FM.TEXT },
          { label: 'Participants', val: '3', color: FM.TEXT },
          { label: 'Funds', val: '3', color: FM.TEXT },
          { label: 'Variance', val: '$0.00', color: FM.SUCCESS },
        ].map((item, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div style={{ width: 1, height: 36, background: FM.BORDER_HI }} />}
            <div>
              <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.14em', marginBottom: 5 }}>{item.label}</div>
              <div style={{ fontFamily: FM.SANS, fontSize: 26, fontWeight: 500, color: item.color, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{item.val}</div>
            </div>
          </React.Fragment>
        ))}

        {/* Mapping Complete pill */}
        <div style={{ marginLeft: 'auto', opacity: confIn, transform: `translateY(${(1-confIn)*-5}px)` }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: FM.SUCCESS_S,
            border: `1px solid ${FM.SUCCESS}`,
            borderRadius: 100,
            padding: '9px 14px 9px 12px',
            boxShadow: `0 0 24px ${FM.SUCCESS_S}`,
          }}>
            <div style={{ width: 18, height: 18, borderRadius: 9, background: FM.SUCCESS, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5.2l2 2L8 3.2" stroke="#08090C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ fontFamily: FM.SANS, fontSize: 13, fontWeight: 500, color: FM.SUCCESS }}>Mapping Complete</div>
          </div>
        </div>
      </div>

      {/* Participant cards in a row */}
      {PARTICIPANTS.map((p, pi) => {
        const inP = cardIn(pi);
        const chk = checkIn(pi);
        const pTotal = participantTotal(pi);

        return (
          <div key={p.id} style={{
            position: 'absolute',
            left: startX + pi * (cardW + cardGap),
            top: 190,
            width: cardW, height: cardH,
            opacity: inP, transform: `translateY(${(1-inP)*10}px)`,
          }}>
            <FMPanel x={0} y={0} w={cardW} h={cardH} elevated>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: `linear-gradient(90deg, transparent, ${FM.ACCENT}, transparent)`,
                opacity: 0.5,
              }} />

              <div style={{ padding: '16px 20px', borderBottom: `1px solid ${FM.BORDER}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.12em', marginBottom: 3 }}>{p.id}</div>
                  <div style={{ fontFamily: FM.SANS, fontSize: 14, fontWeight: 500, color: FM.TEXT }}>{p.label}</div>
                </div>
                <div style={{
                  width: 22, height: 22, borderRadius: 11,
                  background: chk > 0 ? FM.SUCCESS_S : 'transparent',
                  border: `1px solid ${chk > 0 ? FM.SUCCESS : FM.BORDER}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 200ms',
                }}>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M2.2 5.5l2.2 2.2L8.8 3.3" stroke={FM.SUCCESS} strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round"
                      strokeDasharray="13" strokeDashoffset={13 - 13 * chk} />
                  </svg>
                </div>
              </div>

              <div style={{ padding: '14px 20px' }}>
                <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.12em', marginBottom: 6 }}>TOTAL BALANCE</div>
                <div style={{ fontFamily: FM.SANS, fontSize: 28, fontWeight: 500, color: FM.TEXT, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em', marginBottom: 14 }}>
                  ${Math.round(pTotal).toLocaleString('en-US')}
                </div>

                {FUNDS.map((f, fi) => {
                  const val = participantFundValue(pi, fi);
                  const fColor = FM.FUND_COLORS[fi];
                  return (
                    <div key={f.id} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '5px 0',
                      borderTop: `1px solid ${FM.BORDER}`,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 4, height: 4, borderRadius: 2, background: fColor.accent }} />
                        <span style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIM }}>{f.ticker}</span>
                      </div>
                      <span style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.TEXT, fontVariantNumeric: 'tabular-nums' }}>
                        ${Math.round(val).toLocaleString('en-US')}
                      </span>
                    </div>
                  );
                })}

                {/* Total allocation bar */}
                <div style={{ marginTop: 10, display: 'flex', gap: 2, height: 3 }}>
                  {FUNDS.map((_, fi) => (
                    <div key={fi} style={{
                      flex: p.allocations[fi],
                      borderRadius: 2,
                      background: FM.FUND_COLORS[fi].accent,
                    }} />
                  ))}
                </div>
              </div>
            </FMPanel>
          </div>
        );
      })}

      {/* Audit footer */}
      <div style={{
        position: 'absolute', left: startX, bottom: 72,
        display: 'flex', alignItems: 'center', gap: 14,
        opacity: Easing.easeOutCubic(clamp((t - 2.0) / 0.5, 0, 1)),
      }}>
        <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.22em' }}>06 / 06</div>
        <div style={{ width: 28, height: 1, background: FM.BORDER_HI }} />
        <div style={{ fontFamily: FM.SANS, fontSize: 15, fontWeight: 500, color: FM.TEXT, letterSpacing: '-0.005em' }}>Reconciled · all fund positions applied</div>
        <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.1em' }}>REF-FM-2026-04-17-00471</div>
      </div>
    </div>
  );
}

Object.assign(window, { FMScene4, FMScene5, FMScene6 });
