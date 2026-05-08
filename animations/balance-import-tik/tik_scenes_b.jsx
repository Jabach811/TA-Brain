// tik_scenes_b.jsx — Scenes 4, 5, 6, 7

// ── Scene 4 — Confirmation / Matching ─────────────────────────

function TIKScene4() {
  const { localTime: t, duration } = useSprite();
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.5, 0, 1));

  // Cards confirm staggered at 0.3, 0.6, 0.9
  const matchIn = (fi) => Easing.easeOutCubic(clamp((t - (0.3 + fi * 0.3)) / 0.5, 0, 1));
  const checkIn = (fi) => Easing.easeOutCubic(clamp((t - (0.7 + fi * 0.3)) / 0.4, 0, 1));
  const pulse = (fi) => {
    const p = clamp((t - (0.7 + fi * 0.3)) / 0.8, 0, 1);
    return 1 - Easing.easeOutCubic(p);
  };

  // "All Verified" banner at 2.4
  const allIn = Easing.easeOutCubic(clamp((t - 2.4) / 0.5, 0, 1));

  const cardW = 330, cardH = 220, gap = 28;
  const totalW = 3 * cardW + 2 * gap;
  const startX = (1280 - totalW) / 2;
  const startY = 190;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={400} y={100} size={700} color={FM.SUCCESS} opacity={0.08} />

      {TIK_FUNDS.map((f, fi) => {
        const inP = matchIn(fi);
        const chk = checkIn(fi);
        const puls = pulse(fi);
        return (
          <div key={f.id} style={{
            position: 'absolute',
            left: startX + fi * (cardW + gap), top: startY,
            width: cardW, height: cardH,
            opacity: inP, transform: `translateY(${(1-inP)*8}px)`,
          }}>
            <FMPanel x={0} y={0} w={cardW} h={cardH} elevated>
              {/* Pulse ring on confirm */}
              {puls > 0 && (
                <div style={{
                  position: 'absolute', inset: -1, borderRadius: 12,
                  border: `1px solid ${FM.SUCCESS}`,
                  opacity: puls * 0.7,
                  transform: `scale(${1 + (1 - puls) * 0.03})`,
                  pointerEvents: 'none',
                }} />
              )}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: `linear-gradient(90deg, transparent, ${FM.SUCCESS}, transparent)`,
                opacity: chk,
              }} />

              <div style={{ padding: '16px 20px', borderBottom: `1px solid ${FM.BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 7,
                    background: f.soft, border: `1px solid ${f.color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: FM.MONO, fontSize: 10, color: f.color,
                  }}>{f.ticker}</div>
                  <div style={{ fontFamily: FM.SANS, fontSize: 13, fontWeight: 500, color: FM.TEXT }}>{f.label}</div>
                </div>
                {chk > 0 && <FMChip label="Verified" color={FM.SUCCESS} soft={FM.SUCCESS_S} />}
              </div>

              <div style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div>
                    <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.14em', marginBottom: 5 }}>EXPECTED</div>
                    <div style={{ fontFamily: FM.SANS, fontSize: 22, fontWeight: 500, color: FM.DIM, fontVariantNumeric: 'tabular-nums' }}>
                      {f.shares.toLocaleString()} sh
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.14em', marginBottom: 5 }}>RECEIVED</div>
                    <div style={{ fontFamily: FM.SANS, fontSize: 22, fontWeight: 500, color: FM.TEXT, fontVariantNumeric: 'tabular-nums' }}>
                      {f.shares.toLocaleString()} sh
                    </div>
                  </div>
                </div>

                {/* Match line */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 0',
                  borderTop: `1px solid ${FM.BORDER}`,
                  opacity: chk,
                }}>
                  <div style={{ width: 18, height: 18, borderRadius: 9, background: FM.SUCCESS, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5.2l2 2L8 3.2" stroke="#08090C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.SUCCESS, letterSpacing: '0.12em' }}>MATCHED · ΔVAR = 0</div>
                </div>

                <div style={{ marginTop: 8, fontFamily: FM.MONO, fontSize: 10, color: FM.DIM, letterSpacing: '0.1em' }}>
                  @ ${f.price.toFixed(2)} · ${Math.round(tikFundValue(TIK_FUNDS.indexOf(f))).toLocaleString('en-US')} total
                </div>
              </div>
            </FMPanel>
          </div>
        );
      })}

      {/* All Verified banner */}
      <div style={{
        position: 'absolute', left: '50%', top: startY + cardH + 36,
        transform: 'translateX(-50%)',
        opacity: allIn,
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 24,
          background: FM.PANEL_HI,
          border: `1px solid ${FM.BORDER_HI}`,
          borderRadius: 10, padding: '12px 24px',
        }}>
          {[
            { label: 'Funds Verified', val: '3 / 3' },
            { label: 'Total Shares', val: TIK_FUNDS.reduce((s, f) => s + f.shares, 0).toLocaleString() + ' sh' },
            { label: 'Variance', val: '0 sh', color: FM.SUCCESS },
          ].map((item, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div style={{ width: 1, height: 28, background: FM.BORDER_HI }} />}
              <div>
                <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.14em', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontFamily: FM.SANS, fontSize: 18, fontWeight: 500, color: item.color || FM.TEXT, fontVariantNumeric: 'tabular-nums' }}>{item.val}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <SceneCaption n={4} total={7} t={t} label="All shares matched — zero variance" />
    </div>
  );
}

// ── Scene 5 — Final Files Trigger ─────────────────────────────

function TIKScene5() {
  const { localTime: t, duration } = useSprite();
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.5, 0, 1));

  // Fund containers (verified state) — left
  const notifIn = Easing.easeOutCubic(clamp((t - 0.3) / 0.5, 0, 1));
  const checkIn = Easing.easeOutCubic(clamp((t - 0.8) / 0.4, 0, 1));
  const signalP = clamp((t - 1.3) / 0.5, 0, 1);
  const unlock = Easing.easeOutCubic(clamp((t - 1.8) / 0.7, 0, 1));

  const cardW = 240, cardH = 110, gap = 12;
  const startX = 80, startY = 210;
  const totalH = 3 * cardH + 2 * gap;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={400} y={150} size={600} color={FM.SUCCESS} opacity={0.08} />

      {/* Verified fund containers — left */}
      {TIK_FUNDS.map((f, fi) => (
        <div key={f.id} style={{
          position: 'absolute', left: startX, top: startY + fi * (cardH + gap),
          width: cardW, height: cardH,
        }}>
          <FMPanel x={0} y={0} w={cardW} h={cardH} elevated>
            {unlock > 0 && (
              <div style={{
                position: 'absolute', inset: -1, borderRadius: 12,
                border: `1px solid ${FM.ACCENT}`,
                opacity: unlock * 0.5,
                pointerEvents: 'none',
              }} />
            )}
            <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 5, height: 5, borderRadius: 3, background: unlock > 0.5 ? FM.ACCENT : FM.SUCCESS }} />
                  <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIM, letterSpacing: '0.12em' }}>{f.ticker}</div>
                </div>
                <div style={{ fontFamily: FM.SANS, fontSize: 20, fontWeight: 500, color: FM.TEXT, fontVariantNumeric: 'tabular-nums' }}>
                  {f.shares.toLocaleString()} sh
                </div>
              </div>
              {unlock > 0.5
                ? <FMChip label="Ready" color={FM.ACCENT} soft={FM.ACCENT_S} />
                : <FMChip label="Verified" color={FM.SUCCESS} soft={FM.SUCCESS_S} />
              }
            </div>
          </FMPanel>
        </div>
      ))}

      {/* Signal line from notif to containers */}
      {signalP > 0 && (
        <div style={{
          position: 'absolute', left: 780, top: 220,
          width: 2,
          height: Math.min((startY + totalH/2 - 220) * signalP * 1.5, startY - 220 + totalH/2),
          background: `linear-gradient(180deg, ${FM.SUCCESS} 0%, transparent 100%)`,
          boxShadow: `0 0 8px ${FM.SUCCESS}`,
          opacity: 1 - signalP * 0.5,
        }} />
      )}

      {/* Final Files notification — right */}
      <div style={{
        position: 'absolute', right: 100, top: 130,
        width: 380,
        opacity: notifIn, transform: `translateY(${(1-notifIn)*-8}px)`,
      }}>
        <div style={{
          background: FM.PANEL_HI, border: `1px solid ${FM.BORDER_HI}`,
          borderRadius: 10, padding: '16px 18px',
          display: 'flex', alignItems: 'center', gap: 14,
          boxShadow: '0 24px 80px -20px rgba(0,0,0,0.9)',
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: 19,
            background: FM.SUCCESS_S, border: `1px solid ${FM.SUCCESS}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8.5l3.2 3.2L13 5" stroke={FM.SUCCESS} strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray="20" strokeDashoffset={20 - 20 * checkIn} />
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.14em', marginBottom: 4 }}>System Event</div>
            <div style={{ fontFamily: FM.SANS, fontSize: 14, fontWeight: 500, color: FM.TEXT }}>Final Files Received</div>
            <div style={{ fontFamily: FM.MONO, fontSize: 11, color: FM.DIM, marginTop: 2 }}>tik_participant_detail_2026-04-17.xml</div>
          </div>
        </div>
      </div>

      <SceneCaption n={5} total={7} t={t} label="Final files received — ready to apply" />
    </div>
  );
}

// ── Scene 6 — Apply to Plan & Participants ─────────────────────

function TIKScene6() {
  const { localTime: t, duration } = useSprite();
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.4, 0, 1));

  const fundCardW = 200, fundCardH = 100, fundGap = 10;
  const fundX = 60, fundStartY = 210;

  // Participant cards stagger in
  const pCardIn = (pi) => Easing.easeOutCubic(clamp((t - (0.3 + pi * 0.2)) / 0.6, 0, 1));
  const pCardX = 460, pCardW = 760, pCardH = 168, pCardGap = 14;

  // Per-fund per-participant flow: fi * 0.2 offset + pi * 0.3
  const flowStart = (pi, fi) => 1.0 + pi * 0.5 + fi * 0.18;
  const flowDur = 1.4;
  const flowP = (pi, fi) => Easing.easeInOutCubic(clamp((t - flowStart(pi, fi)) / flowDur, 0, 1));

  // Fund cards drain
  const fundDrain = (fi) => {
    const total = TIK_PARTICIPANTS.reduce((s, _, pi) => s + tikParticipantShares(pi, fi) * flowP(pi, fi), 0);
    return total / TIK_FUNDS[fi].shares;
  };

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={200} y={200} size={500} opacity={0.08} />
      <FMGlow x={900} y={400} size={600} color={FM.ACCENT} opacity={0.09} />

      {/* Fund containers — left, draining */}
      {TIK_FUNDS.map((f, fi) => {
        const drain = fundDrain(fi);
        const remaining = Math.round(f.shares * (1 - drain));
        return (
          <div key={f.id} style={{
            position: 'absolute', left: fundX, top: fundStartY + fi * (fundCardH + fundGap),
            width: fundCardW, height: fundCardH,
            opacity: Math.max(0.2, 1 - drain * 0.7),
          }}>
            <FMPanel x={0} y={0} w={fundCardW} h={fundCardH}>
              <div style={{ padding: '10px 14px', borderBottom: `1px solid ${FM.BORDER}`, display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{ width: 5, height: 5, borderRadius: 3, background: f.color }} />
                <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIM, letterSpacing: '0.12em' }}>{f.ticker}</div>
                <FMChip label="Applying" color={FM.ACCENT} soft={FM.ACCENT_S} />
              </div>
              <div style={{ padding: '10px 14px' }}>
                <div style={{ fontFamily: FM.SANS, fontSize: 20, fontWeight: 500, color: FM.TEXT, fontVariantNumeric: 'tabular-nums' }}>
                  {remaining.toLocaleString()} sh
                </div>
                <div style={{ marginTop: 8, height: 3, borderRadius: 2, background: FM.BORDER_HI, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(1 - drain) * 100}%`, background: f.color }} />
                </div>
              </div>
            </FMPanel>
          </div>
        );
      })}

      {/* Flow arcs */}
      {TIK_PARTICIPANTS.map((p, pi) => {
        const cardTop = 100 + pi * (pCardH + pCardGap);
        return TIK_FUNDS.map((f, fi) => {
          const fp = flowP(pi, fi);
          if (fp <= 0) return null;
          return (
            <FMArc key={`${pi}-${fi}`}
              fromX={fundX + fundCardW} fromY={fundStartY + fi * (fundCardH + fundGap) + fundCardH / 2}
              toX={pCardX} toY={cardTop + pCardH / 2}
              progress={fp} color={f.color}
              curveDir={pi === 0 ? -1 : (pi === 1 ? 0.5 : 1.5)}
            />
          );
        });
      })}

      {/* Participant account cards */}
      {TIK_PARTICIPANTS.map((p, pi) => {
        const cardTop = 100 + pi * (pCardH + pCardGap);
        const inP = pCardIn(pi);
        const allDone = TIK_FUNDS.every((_, fi) => flowP(pi, fi) >= 0.98);
        const totalShares = TIK_FUNDS.reduce((s, _, fi) => s + tikParticipantShares(pi, fi) * flowP(pi, fi), 0);

        return (
          <div key={p.id} style={{
            position: 'absolute', left: pCardX, top: cardTop,
            width: pCardW, height: pCardH,
            opacity: inP, transform: `translateX(${(1-inP)*12}px)`,
          }}>
            <FMPanel x={0} y={0} w={pCardW} h={pCardH} elevated={allDone}>
              {allDone && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: `linear-gradient(90deg, transparent, ${FM.ACCENT}, transparent)`,
                  opacity: 0.6,
                }} />
              )}
              <div style={{
                padding: '12px 20px', borderBottom: `1px solid ${FM.BORDER}`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: 3, background: allDone ? FM.SUCCESS : FM.ACCENT }} />
                  <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIM, letterSpacing: '0.12em' }}>{p.id}</div>
                  <div style={{ fontFamily: FM.SANS, fontSize: 13, fontWeight: 500, color: FM.TEXT }}>{p.label}</div>
                </div>
                <div style={{ fontFamily: FM.SANS, fontSize: 20, fontWeight: 500, color: FM.TEXT, fontVariantNumeric: 'tabular-nums' }}>
                  {Math.round(totalShares).toLocaleString()} sh total
                </div>
              </div>

              <div style={{ padding: '10px 20px', display: 'flex', gap: 0 }}>
                {TIK_FUNDS.map((f, fi) => {
                  const shares = tikParticipantShares(pi, fi) * flowP(pi, fi);
                  return (
                    <div key={f.id} style={{
                      flex: 1, padding: '8px 10px',
                      borderRight: fi < TIK_FUNDS.length - 1 ? `1px solid ${FM.BORDER}` : 'none',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
                        <div style={{ width: 4, height: 4, borderRadius: 2, background: f.color }} />
                        <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER }}>{f.ticker}</div>
                        <div style={{ fontFamily: FM.MONO, fontSize: 9, color: f.color, marginLeft: 'auto' }}>{p.pct}%</div>
                      </div>
                      <div style={{ fontFamily: FM.MONO, fontSize: 13, color: FM.TEXT, fontVariantNumeric: 'tabular-nums' }}>
                        {Math.round(shares).toLocaleString()} sh
                      </div>
                      <div style={{ marginTop: 5, height: 2, borderRadius: 1, background: FM.BORDER_HI, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${flowP(pi, fi) * 100}%`, background: f.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </FMPanel>
          </div>
        );
      })}

      <SceneCaption n={6} total={7} t={t} label="Shares applied to participant accounts — no trading" />
    </div>
  );
}

// ── Scene 7 — Final State ──────────────────────────────────────

function TIKScene7() {
  const { localTime: t } = useSprite();
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.6, 0, 1));

  const cardIn = (pi) => Easing.easeOutCubic(clamp((t - 0.2 - pi * 0.12) / 0.7, 0, 1));
  const checkIn = (pi) => Easing.easeOutCubic(clamp((t - 1.8 - pi * 0.15) / 0.4, 0, 1));
  const confIn = Easing.easeOutCubic(clamp((t - 1.5) / 0.5, 0, 1));
  const summaryIn = Easing.easeOutCubic(clamp(t / 0.5, 0, 1));
  const pulse = Math.sin(t * 1.6) * 0.5 + 0.5;

  const cardW = 340, cardH = 260, cardGap = 24;
  const totalW = TIK_PARTICIPANTS.length * cardW + (TIK_PARTICIPANTS.length - 1) * cardGap;
  const startX = Math.max(60, (1280 - totalW) / 2);
  const totalShares = TIK_FUNDS.reduce((s, f) => s + f.shares, 0);

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn }}>
      <FMGlow x={400} y={50} size={700} color={FM.SUCCESS} opacity={0.07 + pulse * 0.04} />
      <FMGlow x={750} y={500} size={500} opacity={0.07} />

      {/* Summary — top */}
      <div style={{
        position: 'absolute', left: startX, top: 88,
        width: totalW,
        display: 'flex', alignItems: 'center', gap: 28,
        opacity: summaryIn,
      }}>
        {[
          { label: 'Total Shares Applied', val: totalShares.toLocaleString() + ' sh' },
          { label: 'Participants', val: '3' },
          { label: 'Fund Lines', val: '9' },
          { label: 'Share Variance', val: '0 sh', color: FM.SUCCESS },
        ].map((item, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div style={{ width: 1, height: 34, background: FM.BORDER_HI }} />}
            <div>
              <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.14em', marginBottom: 5 }}>{item.label}</div>
              <div style={{ fontFamily: FM.SANS, fontSize: 24, fontWeight: 500, color: item.color || FM.TEXT, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}>{item.val}</div>
            </div>
          </React.Fragment>
        ))}
        {/* Transfer Complete pill */}
        <div style={{ marginLeft: 'auto', opacity: confIn }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: FM.SUCCESS_S, border: `1px solid ${FM.SUCCESS}`,
            borderRadius: 100, padding: '9px 14px 9px 12px',
            boxShadow: `0 0 24px ${FM.SUCCESS_S}`,
          }}>
            <div style={{ width: 18, height: 18, borderRadius: 9, background: FM.SUCCESS, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5.2l2 2L8 3.2" stroke="#08090C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ fontFamily: FM.SANS, fontSize: 13, fontWeight: 500, color: FM.SUCCESS }}>Transfer Complete</div>
          </div>
        </div>
      </div>

      {/* Participant cards */}
      {TIK_PARTICIPANTS.map((p, pi) => {
        const inP = cardIn(pi);
        const chk = checkIn(pi);
        const pTotal = tikParticipantValue(pi);
        const pShares = TIK_FUNDS.reduce((s, _, fi) => s + tikParticipantShares(pi, fi), 0);

        return (
          <div key={p.id} style={{
            position: 'absolute',
            left: startX + pi * (cardW + cardGap), top: 185,
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
                  <div style={{ fontFamily: FM.SANS, fontSize: 14, fontWeight: 500, color: FM.TEXT }}>{p.label} · {p.pct}%</div>
                </div>
                <div style={{
                  width: 22, height: 22, borderRadius: 11,
                  background: chk > 0 ? FM.SUCCESS_S : 'transparent',
                  border: `1px solid ${chk > 0 ? FM.SUCCESS : FM.BORDER}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M2.2 5.5l2.2 2.2L8.8 3.3" stroke={FM.SUCCESS} strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round"
                      strokeDasharray="13" strokeDashoffset={13 - 13 * chk} />
                  </svg>
                </div>
              </div>

              <div style={{ padding: '14px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, marginBottom: 4, letterSpacing: '0.12em' }}>TOTAL SHARES</div>
                    <div style={{ fontFamily: FM.SANS, fontSize: 22, fontWeight: 500, color: FM.TEXT, fontVariantNumeric: 'tabular-nums' }}>
                      {Math.round(pShares).toLocaleString()} sh
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, marginBottom: 4, letterSpacing: '0.12em' }}>MARKET VALUE</div>
                    <div style={{ fontFamily: FM.SANS, fontSize: 22, fontWeight: 500, color: FM.TEXT, fontVariantNumeric: 'tabular-nums' }}>
                      ${Math.round(pTotal).toLocaleString()}
                    </div>
                  </div>
                </div>

                {TIK_FUNDS.map((f, fi) => {
                  const sh = tikParticipantShares(pi, fi);
                  return (
                    <div key={f.id} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '5px 0', borderTop: `1px solid ${FM.BORDER}`,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 4, height: 4, borderRadius: 2, background: f.color }} />
                        <span style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIM }}>{f.ticker}</span>
                      </div>
                      <span style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.TEXT, fontVariantNumeric: 'tabular-nums' }}>
                        {Math.round(sh).toLocaleString()} sh
                      </span>
                    </div>
                  );
                })}

                {/* Allocation bar */}
                <div style={{ marginTop: 10, display: 'flex', gap: 2, height: 3 }}>
                  {TIK_FUNDS.map((f, fi) => (
                    <div key={fi} style={{ flex: 1, borderRadius: 2, background: f.color }} />
                  ))}
                </div>
              </div>
            </FMPanel>
          </div>
        );
      })}

      <div style={{
        position: 'absolute', left: startX, bottom: 70,
        display: 'flex', alignItems: 'center', gap: 14,
        opacity: Easing.easeOutCubic(clamp((t - 2.0) / 0.5, 0, 1)),
      }}>
        <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.22em' }}>07 / 07</div>
        <div style={{ width: 28, height: 1, background: FM.BORDER_HI }} />
        <div style={{ fontFamily: FM.SANS, fontSize: 15, fontWeight: 500, color: FM.TEXT }}>All positions applied · no cash conversion</div>
        <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.1em' }}>TIK-2026-04-17-00339</div>
      </div>
    </div>
  );
}

Object.assign(window, { TIKScene4, TIKScene5, TIKScene6, TIKScene7 });
