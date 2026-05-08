// pipeline_scenes.jsx — 6-scene Data Pipeline animation.
// S1 Sources · S2 Standardization · S3 Validation · S4 Mapping · S5 Processing · S6 Output

// ── Data ──────────────────────────────────────────────────────
const VENDORS = [
  { id: 'V01', label: 'Vendor Alpha',   fmt: 'CSV',   recs: 1284, color: 'oklch(72% 0.16 30)',  soft: 'oklch(72% 0.16 30 / 0.16)' },
  { id: 'V02', label: 'Vendor Beta',    fmt: 'XML',   recs:  942, color: 'oklch(72% 0.16 145)', soft: 'oklch(72% 0.16 145 / 0.16)' },
  { id: 'V03', label: 'Vendor Gamma',   fmt: 'JSON',  recs: 1631, color: 'oklch(72% 0.14 250)', soft: 'oklch(72% 0.14 250 / 0.16)' },
  { id: 'V04', label: 'Vendor Delta',   fmt: 'FIXED', recs:  587, color: 'oklch(70% 0.18 320)', soft: 'oklch(70% 0.18 320 / 0.16)' },
  { id: 'V05', label: 'Vendor Epsilon', fmt: 'EDI',   recs: 1056, color: 'oklch(76% 0.14 90)',  soft: 'oklch(76% 0.14 90 / 0.16)' },
];
const TOTAL_RECS = VENDORS.reduce((s, v) => s + v.recs, 0);

// ── Scene 1 — Vendor Sources ──────────────────────────────────
function PipeScene1() {
  const { localTime: t, duration } = useSprite();
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.4, 0, 1));

  const cardIn = (i) => Easing.easeOutCubic(clamp((t - 0.2 - i * 0.18) / 0.7, 0, 1));
  const totalIn = Easing.easeOutCubic(clamp((t - 2.2) / 0.6, 0, 1));

  const cardW = 215, cardH = 130, gap = 14;
  const totalW = VENDORS.length * cardW + (VENDORS.length - 1) * gap;
  const startX = (1280 - totalW) / 2;
  const startY = 230;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={400} y={150} size={650} opacity={0.10} />
      <FMGlow x={900} y={500} size={500} opacity={0.07} />

      {/* Top label */}
      <div style={{
        position: 'absolute', left: startX, top: 150,
        opacity: Easing.easeOutCubic(clamp(t / 0.5, 0, 1)),
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.2em' }}>
          INGEST · MIXED-FORMAT FEEDS
        </div>
        <div style={{ flex: 1, height: 1, background: FM.BORDER_HI, maxWidth: 240 }} />
      </div>

      {VENDORS.map((v, i) => {
        const inP = cardIn(i);
        // Slight scattered "raw" entry — random offsets feel chaotic
        const yJitter = (i % 2 === 0 ? -1 : 1) * (1 - inP) * 6;
        return (
          <div key={v.id} style={{
            position: 'absolute',
            left: startX + i * (cardW + gap),
            top: startY + yJitter,
            width: cardW, height: cardH,
            opacity: inP,
            transform: `translateY(${(1 - inP) * 18}px)`,
          }}>
            <FMPanel x={0} y={0} w={cardW} h={cardH}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: `linear-gradient(90deg, transparent, ${v.color}, transparent)`,
                opacity: 0.6,
              }} />
              <div style={{
                padding: '12px 14px',
                borderBottom: `1px solid ${FM.BORDER}`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: 6,
                    background: v.soft, border: `1px solid ${v.color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: FM.MONO, fontSize: 9, color: v.color,
                  }}>{v.fmt}</div>
                  <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIM, letterSpacing: '0.1em' }}>{v.id}</div>
                </div>
                <FMChip label="Raw" color={FM.WARN} soft={FM.WARN_S} />
              </div>
              <div style={{ padding: '12px 14px' }}>
                <div style={{ fontFamily: FM.SANS, fontSize: 13, fontWeight: 500, color: FM.TEXT, marginBottom: 6 }}>
                  {v.label}
                </div>
                <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.14em', marginBottom: 4 }}>
                  RECORDS
                </div>
                <div style={{ fontFamily: FM.SANS, fontSize: 18, fontWeight: 500, color: FM.TEXT, fontVariantNumeric: 'tabular-nums' }}>
                  {v.recs.toLocaleString()}
                </div>
              </div>
            </FMPanel>
          </div>
        );
      })}

      {/* Total line */}
      <div style={{
        position: 'absolute', left: '50%', top: startY + cardH + 38,
        transform: 'translateX(-50%)',
        opacity: totalIn,
        display: 'flex', alignItems: 'center', gap: 18,
      }}>
        <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.14em' }}>
          TOTAL INBOUND
        </div>
        <div style={{ fontFamily: FM.SANS, fontSize: 22, fontWeight: 500, color: FM.TEXT, fontVariantNumeric: 'tabular-nums' }}>
          {TOTAL_RECS.toLocaleString()} records
        </div>
        <div style={{ width: 1, height: 22, background: FM.BORDER_HI }} />
        <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.14em' }}>
          {VENDORS.length} feeds · {VENDORS.length} formats
        </div>
      </div>

      <SceneCaption n={1} total={6} t={t} label="Mixed vendor feeds entering the pipeline" />
    </div>
  );
}

// ── Scene 2 — Standardization ─────────────────────────────────
function PipeScene2() {
  const { localTime: t, duration } = useSprite();
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.4, 0, 1));

  // Vendors slide in from left, compressed
  const vIn = Easing.easeOutCubic(clamp(t / 0.6, 0, 1));
  // Stream flows from sources to standardizer at 0.4
  const streamP = clamp((t - 0.4) / 2.2, 0, 1);
  // Output cards emerge staggered at 1.5+
  const outIn = (i) => Easing.easeOutCubic(clamp((t - 1.5 - i * 0.12) / 0.5, 0, 1));
  // "Schema unified" badge
  const badgeIn = Easing.easeOutCubic(clamp((t - 3.0) / 0.5, 0, 1));

  const srcX = 90, srcY = 180, srcCardW = 150, srcCardH = 60, srcGap = 8;
  const stdX = 530, stdY = 250, stdW = 200, stdH = 220;
  const outX = 830, outY = 180, outCardW = 360, outCardH = 60, outGap = 8;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={640} y={360} size={700} color={FM.ACCENT} opacity={0.10} />

      {/* Source mini-cards */}
      {VENDORS.map((v, i) => (
        <div key={v.id} style={{
          position: 'absolute',
          left: srcX, top: srcY + i * (srcCardH + srcGap),
          width: srcCardW, height: srcCardH,
          opacity: vIn * (1 - streamP * 0.5),
          transform: `translateX(${(1 - vIn) * -10}px)`,
        }}>
          <FMPanel x={0} y={0} w={srcCardW} h={srcCardH}>
            <div style={{
              padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8, height: '100%',
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: 5,
                background: v.soft, border: `1px solid ${v.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: FM.MONO, fontSize: 8, color: v.color,
              }}>{v.fmt}</div>
              <div>
                <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIM, letterSpacing: '0.12em' }}>{v.id}</div>
                <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, fontVariantNumeric: 'tabular-nums' }}>
                  {v.recs.toLocaleString()}
                </div>
              </div>
            </div>
          </FMPanel>
        </div>
      ))}

      {/* Streams from each source to standardizer */}
      {VENDORS.map((v, i) => (
        <FMStream key={v.id}
          fromX={srcX + srcCardW} fromY={srcY + i * (srcCardH + srcGap) + srcCardH / 2}
          toX={stdX} toY={stdY + stdH / 2}
          progress={streamP} color={v.color} count={5} active={streamP > 0 && streamP < 1}
        />
      ))}

      {/* Standardizer */}
      <div style={{
        position: 'absolute', left: stdX, top: stdY,
        width: stdW, height: stdH,
      }}>
        <FMPanel x={0} y={0} w={stdW} h={stdH} elevated>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: `linear-gradient(90deg, transparent, ${FM.ACCENT}, transparent)`,
            opacity: 0.7,
          }} />
          <div style={{ padding: '14px 16px', borderBottom: `1px solid ${FM.BORDER}` }}>
            <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.16em', marginBottom: 4 }}>
              STAGE 01
            </div>
            <div style={{ fontFamily: FM.SANS, fontSize: 14, fontWeight: 500, color: FM.TEXT }}>
              Standardize
            </div>
          </div>
          <div style={{ padding: '16px', textAlign: 'center' }}>
            {/* Spinning ring */}
            <div style={{
              width: 70, height: 70, margin: '0 auto 14px',
              borderRadius: 40, border: `2px solid ${FM.BORDER_HI}`,
              borderTopColor: FM.ACCENT,
              transform: `rotate(${t * 220}deg)`,
            }} />
            <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.14em', marginBottom: 4 }}>
              CANONICAL SCHEMA
            </div>
            <div style={{ fontFamily: FM.MONO, fontSize: 11, color: FM.ACCENT, letterSpacing: '0.08em' }}>
              v2.4.0
            </div>
          </div>
        </FMPanel>
      </div>

      {/* Output rows — uniform shape */}
      {VENDORS.map((v, i) => {
        const op = outIn(i);
        return (
          <div key={v.id} style={{
            position: 'absolute',
            left: outX, top: outY + i * (outCardH + outGap),
            width: outCardW, height: outCardH,
            opacity: op,
            transform: `translateX(${(1 - op) * 10}px)`,
          }}>
            <FMPanel x={0} y={0} w={outCardW} h={outCardH}>
              <div style={{
                padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12, height: '100%',
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: 3, background: v.color,
                  boxShadow: `0 0 6px ${v.color}`,
                }} />
                <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIM, letterSpacing: '0.12em', width: 50 }}>{v.id}</div>
                <div style={{ flex: 1, fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.08em' }}>
                  schema_v2 · normalized
                </div>
                <div style={{ fontFamily: FM.SANS, fontSize: 13, color: FM.TEXT, fontVariantNumeric: 'tabular-nums' }}>
                  {v.recs.toLocaleString()} rec
                </div>
              </div>
            </FMPanel>
          </div>
        );
      })}

      {/* "Schema Unified" badge */}
      <div style={{
        position: 'absolute', left: outX, top: outY + VENDORS.length * (outCardH + outGap) + 12,
        opacity: badgeIn,
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: FM.ACCENT_S, border: `1px solid ${FM.ACCENT}`,
          borderRadius: 100, padding: '7px 14px',
        }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, background: FM.ACCENT }} />
          <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.ACCENT, letterSpacing: '0.14em' }}>
            ALL FEEDS · CANONICAL SCHEMA
          </div>
        </div>
      </div>

      <SceneCaption n={2} total={6} t={t} label="Standardization — every feed mapped to one schema" />
    </div>
  );
}

// ── Scene 3 — Validation ──────────────────────────────────────
function PipeScene3() {
  const { localTime: t, duration } = useSprite();
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.4, 0, 1));

  // Each vendor row: pass through validator, then either pass or flag
  // V02 has 12 errors flagged; everything else passes
  const ROWS = VENDORS.map((v, i) => ({
    ...v,
    errors: i === 1 ? 12 : (i === 3 ? 3 : 0),
  }));

  const checkIn = (i) => Easing.easeOutCubic(clamp((t - 0.5 - i * 0.25) / 0.5, 0, 1));
  const flagIn = (i) => Easing.easeOutCubic(clamp((t - 0.7 - i * 0.25) / 0.5, 0, 1));
  const totalIn = Easing.easeOutCubic(clamp((t - 2.8) / 0.6, 0, 1));

  const rowW = 760, rowH = 56, rowGap = 8;
  const startX = (1280 - rowW) / 2;
  const startY = 170;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={300} y={400} size={600} opacity={0.08} />
      <FMGlow x={900} y={200} size={500} color={FM.SUCCESS} opacity={0.06} />

      {/* Header */}
      <div style={{
        position: 'absolute', left: startX, top: 110,
        display: 'flex', alignItems: 'center', gap: 14,
        opacity: Easing.easeOutCubic(clamp(t / 0.4, 0, 1)),
      }}>
        <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.2em' }}>STAGE 02</div>
        <div style={{ width: 22, height: 1, background: FM.BORDER_HI }} />
        <div style={{ fontFamily: FM.SANS, fontSize: 17, fontWeight: 500, color: FM.TEXT }}>Validation</div>
      </div>

      {/* Column header */}
      <div style={{
        position: 'absolute', left: startX, top: 148,
        width: rowW,
        display: 'grid', gridTemplateColumns: '70px 1fr 100px 110px 80px',
        padding: '0 16px',
        fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.14em',
      }}>
        <span>FEED</span><span>SCHEMA · TYPE · RANGE</span><span style={{ textAlign: 'right' }}>RECORDS</span><span style={{ textAlign: 'right' }}>FLAGGED</span><span style={{ textAlign: 'center' }}>STATUS</span>
      </div>

      {ROWS.map((r, i) => {
        const chk = checkIn(i);
        const flg = flagIn(i);
        const passing = r.errors === 0;
        return (
          <div key={r.id} style={{
            position: 'absolute',
            left: startX, top: startY + i * (rowH + rowGap),
            width: rowW, height: rowH,
            opacity: Easing.easeOutCubic(clamp((t - i * 0.18) / 0.5, 0, 1)),
          }}>
            <FMPanel x={0} y={0} w={rowW} h={rowH}>
              <div style={{
                display: 'grid', gridTemplateColumns: '70px 1fr 100px 110px 80px',
                padding: '0 16px',
                alignItems: 'center', height: '100%',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 5, height: 5, borderRadius: 3, background: r.color }} />
                  <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIM, letterSpacing: '0.1em' }}>{r.id}</div>
                </div>
                {/* Three check pills: schema / type / range */}
                <div style={{ display: 'flex', gap: 6 }}>
                  {['schema', 'type', 'range'].map((lbl, ci) => {
                    const sub = Easing.easeOutCubic(clamp((t - 0.3 - i * 0.18 - ci * 0.12) / 0.4, 0, 1));
                    return (
                      <div key={lbl} style={{
                        padding: '3px 7px', borderRadius: 4,
                        background: sub > 0 ? FM.SUCCESS_S : FM.BORDER,
                        border: `1px solid ${sub > 0 ? FM.SUCCESS : FM.BORDER_HI}`,
                        opacity: 0.3 + sub * 0.7,
                        fontFamily: FM.MONO, fontSize: 9, color: sub > 0 ? FM.SUCCESS : FM.DIMMER,
                        letterSpacing: '0.1em',
                      }}>{lbl}</div>
                    );
                  })}
                </div>
                <div style={{ textAlign: 'right', fontFamily: FM.MONO, fontSize: 11, color: FM.TEXT, fontVariantNumeric: 'tabular-nums' }}>
                  {r.recs.toLocaleString()}
                </div>
                <div style={{ textAlign: 'right', fontFamily: FM.MONO, fontSize: 11,
                  color: passing ? FM.DIMMER : FM.WARN, fontVariantNumeric: 'tabular-nums',
                  opacity: flg,
                }}>
                  {passing ? '— ' : `${r.errors} `}<span style={{ fontSize: 9, opacity: 0.7 }}>err</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', opacity: chk }}>
                  {passing
                    ? <FMChip label="Pass" color={FM.SUCCESS} soft={FM.SUCCESS_S} />
                    : <FMChip label="Quarantine" color={FM.WARN} soft={FM.WARN_S} />
                  }
                </div>
              </div>
            </FMPanel>
          </div>
        );
      })}

      {/* Summary */}
      <div style={{
        position: 'absolute', left: startX, top: startY + ROWS.length * (rowH + rowGap) + 24,
        width: rowW,
        display: 'flex', alignItems: 'center', gap: 24,
        opacity: totalIn,
        background: FM.PANEL_HI, border: `1px solid ${FM.BORDER_HI}`,
        borderRadius: 10, padding: '12px 18px',
      }}>
        {[
          { label: 'Records Passed', val: (TOTAL_RECS - 15).toLocaleString(), color: FM.SUCCESS },
          { label: 'Quarantined', val: '15', color: FM.WARN },
          { label: 'Pass Rate', val: '99.7%', color: FM.SUCCESS },
          { label: 'Schema Compliance', val: '100%', color: FM.SUCCESS },
        ].map((m, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div style={{ width: 1, height: 28, background: FM.BORDER_HI }} />}
            <div>
              <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.14em', marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontFamily: FM.SANS, fontSize: 17, fontWeight: 500, color: m.color, fontVariantNumeric: 'tabular-nums' }}>{m.val}</div>
            </div>
          </React.Fragment>
        ))}
      </div>

      <SceneCaption n={3} total={6} t={t} label="Validation — schema, type, and range checks per record" />
    </div>
  );
}

// ── Scene 4 — Mapping ─────────────────────────────────────────
function PipeScene4() {
  const { localTime: t, duration } = useSprite();
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.4, 0, 1));

  // Source field rows on left, target field rows on right; arcs draw between
  const SRC_FIELDS = [
    { name: 'cust_id',         dst: 'customer_id' },
    { name: 'first_nm',        dst: 'first_name' },
    { name: 'last_nm',         dst: 'last_name' },
    { name: 'addr_1',          dst: 'address_line_1' },
    { name: 'state_cd',        dst: 'state_code' },
    { name: 'amt_usd',         dst: 'amount' },
    { name: 'txn_dt',          dst: 'transaction_date' },
  ];

  const rowIn = (i) => Easing.easeOutCubic(clamp((t - i * 0.08) / 0.5, 0, 1));
  const arcStart = (i) => 0.6 + i * 0.18;
  const arcP = (i) => Easing.easeInOutCubic(clamp((t - arcStart(i)) / 0.7, 0, 1));
  const okIn = (i) => Easing.easeOutCubic(clamp((t - arcStart(i) - 0.65) / 0.3, 0, 1));

  const srcX = 130, srcW = 220;
  const dstX = 830, dstW = 280;
  const startY = 170, rowH = 38, rowGap = 6;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={640} y={400} size={600} color={FM.ACCENT} opacity={0.08} />

      {/* Headers */}
      <div style={{
        position: 'absolute', left: srcX, top: 130,
        width: srcW, fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.2em',
      }}>SOURCE FIELDS</div>
      <div style={{
        position: 'absolute', left: dstX, top: 130,
        width: dstW, fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.2em',
      }}>TARGET SCHEMA</div>

      {SRC_FIELDS.map((f, i) => {
        const rp = rowIn(i);
        const ap = arcP(i);
        const ok = okIn(i);
        return (
          <React.Fragment key={f.name}>
            {/* Source row */}
            <div style={{
              position: 'absolute', left: srcX, top: startY + i * (rowH + rowGap),
              width: srcW, height: rowH,
              opacity: rp, transform: `translateX(${(1 - rp) * -10}px)`,
            }}>
              <FMPanel x={0} y={0} w={srcW} h={rowH}>
                <div style={{ padding: '0 12px', display: 'flex', alignItems: 'center', height: '100%', gap: 8 }}>
                  <div style={{ width: 4, height: 4, borderRadius: 2, background: ap > 0.5 ? FM.ACCENT : FM.DIMMER }} />
                  <div style={{ fontFamily: FM.MONO, fontSize: 11, color: FM.DIM }}>{f.name}</div>
                  <div style={{ marginLeft: 'auto', fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.1em' }}>str</div>
                </div>
              </FMPanel>
            </div>

            {/* Mapping arc */}
            {ap > 0 && (
              <FMArc
                fromX={srcX + srcW + 4}
                fromY={startY + i * (rowH + rowGap) + rowH / 2}
                toX={dstX - 4}
                toY={startY + i * (rowH + rowGap) + rowH / 2}
                progress={ap}
                color={FM.ACCENT}
                curveDir={0}
              />
            )}

            {/* Target row */}
            <div style={{
              position: 'absolute', left: dstX, top: startY + i * (rowH + rowGap),
              width: dstW, height: rowH,
              opacity: rp, transform: `translateX(${(1 - rp) * 10}px)`,
            }}>
              <FMPanel x={0} y={0} w={dstW} h={rowH} elevated={ok > 0.5}>
                <div style={{ padding: '0 12px', display: 'flex', alignItems: 'center', height: '100%', gap: 8 }}>
                  <div style={{
                    width: 14, height: 14, borderRadius: 7,
                    background: ok > 0 ? FM.SUCCESS_S : 'transparent',
                    border: `1px solid ${ok > 0 ? FM.SUCCESS : FM.BORDER}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.6 4l1.6 1.6L6.4 2.4" stroke={FM.SUCCESS} strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"
                        strokeDasharray="9" strokeDashoffset={9 - 9 * ok} />
                    </svg>
                  </div>
                  <div style={{ fontFamily: FM.MONO, fontSize: 11, color: ok > 0.5 ? FM.TEXT : FM.DIM }}>{f.dst}</div>
                  <div style={{ marginLeft: 'auto', fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.1em' }}>STRING · NOT NULL</div>
                </div>
              </FMPanel>
            </div>
          </React.Fragment>
        );
      })}

      <SceneCaption n={4} total={6} t={t} label="Mapping — source fields aligned to target schema" />
    </div>
  );
}

// ── Scene 5 — Processing ──────────────────────────────────────
function PipeScene5() {
  const { localTime: t, duration } = useSprite();
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.4, 0, 1));

  const STEPS = [
    { name: 'Deduplicate',     dur: 1.0, start: 0.3 },
    { name: 'Enrich',          dur: 1.3, start: 0.7 },
    { name: 'Aggregate',       dur: 1.4, start: 1.2 },
    { name: 'Index',           dur: 1.0, start: 2.0 },
  ];

  const stepP = (s) => Easing.easeInOutCubic(clamp((t - s.start) / s.dur, 0, 1));
  const summaryIn = Easing.easeOutCubic(clamp((t - 3.4) / 0.5, 0, 1));

  // Compute final processed records
  const processedRecs = Math.round((TOTAL_RECS - 15) * Math.min(1, t / 3.5));
  const dedupRemoved = Math.round(420 * Math.min(1, t / 3.5));

  const stepW = 250, stepH = 110, stepGap = 18;
  const totalW = STEPS.length * stepW + (STEPS.length - 1) * stepGap;
  const startX = (1280 - totalW) / 2;
  const startY = 200;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={400} y={200} size={600} color={FM.ACCENT} opacity={0.08} />
      <FMGlow x={900} y={500} size={500} color={FM.SUCCESS} opacity={0.07} />

      {/* Header */}
      <div style={{
        position: 'absolute', left: startX, top: 130,
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.2em' }}>STAGE 04</div>
        <div style={{ width: 22, height: 1, background: FM.BORDER_HI }} />
        <div style={{ fontFamily: FM.SANS, fontSize: 17, fontWeight: 500, color: FM.TEXT }}>Processing</div>
      </div>

      {STEPS.map((s, i) => {
        const p = stepP(s);
        const done = p >= 0.99;
        const inP = Easing.easeOutCubic(clamp((t - i * 0.1) / 0.5, 0, 1));
        return (
          <div key={s.name} style={{
            position: 'absolute',
            left: startX + i * (stepW + stepGap), top: startY,
            width: stepW, height: stepH,
            opacity: inP, transform: `translateY(${(1 - inP) * 10}px)`,
          }}>
            <FMPanel x={0} y={0} w={stepW} h={stepH} elevated={done}>
              {done && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: `linear-gradient(90deg, transparent, ${FM.SUCCESS}, transparent)`,
                  opacity: 0.6,
                }} />
              )}
              <div style={{
                padding: '12px 14px', borderBottom: `1px solid ${FM.BORDER}`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.14em', marginBottom: 3 }}>
                    STEP 0{i + 1}
                  </div>
                  <div style={{ fontFamily: FM.SANS, fontSize: 13, fontWeight: 500, color: FM.TEXT }}>{s.name}</div>
                </div>
                {done
                  ? <FMChip label="Done" color={FM.SUCCESS} soft={FM.SUCCESS_S} />
                  : (p > 0 ? <FMChip label="Run" color={FM.ACCENT} soft={FM.ACCENT_S} /> : null)
                }
              </div>
              <div style={{ padding: '14px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.14em' }}>
                    PROGRESS
                  </div>
                  <div style={{ fontFamily: FM.MONO, fontSize: 10, color: done ? FM.SUCCESS : FM.TEXT, fontVariantNumeric: 'tabular-nums' }}>
                    {Math.round(p * 100)}%
                  </div>
                </div>
                <div style={{ height: 4, borderRadius: 2, background: FM.BORDER_HI, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${p * 100}%`,
                    background: done ? FM.SUCCESS : FM.ACCENT,
                    boxShadow: p > 0 ? `0 0 8px ${done ? FM.SUCCESS : FM.ACCENT}` : 'none',
                  }} />
                </div>
              </div>
            </FMPanel>
          </div>
        );
      })}

      {/* Live counters */}
      <div style={{
        position: 'absolute', left: startX, top: startY + stepH + 38,
        width: totalW,
        display: 'flex', alignItems: 'center', gap: 28,
        opacity: summaryIn,
        background: FM.PANEL_HI, border: `1px solid ${FM.BORDER_HI}`,
        borderRadius: 10, padding: '14px 22px',
      }}>
        {[
          { label: 'Processed', val: processedRecs.toLocaleString(), color: FM.TEXT },
          { label: 'Duplicates Removed', val: dedupRemoved.toLocaleString(), color: FM.DIM },
          { label: 'Throughput', val: '4.8k rec/s', color: FM.ACCENT },
          { label: 'Errors', val: '0', color: FM.SUCCESS },
        ].map((m, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div style={{ width: 1, height: 30, background: FM.BORDER_HI }} />}
            <div>
              <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.14em', marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontFamily: FM.SANS, fontSize: 19, fontWeight: 500, color: m.color, fontVariantNumeric: 'tabular-nums' }}>{m.val}</div>
            </div>
          </React.Fragment>
        ))}
      </div>

      <SceneCaption n={5} total={6} t={t} label="Processing — dedupe, enrich, aggregate, index" />
    </div>
  );
}

// ── Scene 6 — Polished Output ─────────────────────────────────
function PipeScene6() {
  const { localTime: t } = useSprite();
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.5, 0, 1));
  const cardIn = Easing.easeOutCubic(clamp((t - 0.3) / 0.7, 0, 1));
  const metricsIn = (i) => Easing.easeOutCubic(clamp((t - 1.0 - i * 0.15) / 0.5, 0, 1));
  const completeIn = Easing.easeOutCubic(clamp((t - 2.4) / 0.5, 0, 1));
  const pulse = Math.sin(t * 1.4) * 0.5 + 0.5;

  const card1W = 580, card1H = 360;
  const card1X = (1280 - card1W) / 2 - 320;
  const card1Y = 160;

  const card2W = 320, card2H = 360;
  const card2X = card1X + card1W + 24;
  const card2Y = card1Y;

  const finalRecs = TOTAL_RECS - 15 - 420; // passed - duplicates

  // Mini bar chart data per vendor (final processed)
  const barMax = Math.max(...VENDORS.map(v => v.recs));

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn }}>
      <FMGlow x={400} y={120} size={700} color={FM.SUCCESS} opacity={0.06 + pulse * 0.04} />
      <FMGlow x={900} y={550} size={500} color={FM.ACCENT} opacity={0.07} />

      {/* Header */}
      <div style={{
        position: 'absolute', left: card1X, top: 100,
        display: 'flex', alignItems: 'center', gap: 14,
        opacity: sceneIn,
      }}>
        <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.22em' }}>OUTPUT · CANONICAL DATASET</div>
        <div style={{ flex: 1, height: 1, background: FM.BORDER_HI, maxWidth: 200 }} />
      </div>

      {/* Main dataset card */}
      <div style={{
        position: 'absolute', left: card1X, top: card1Y,
        width: card1W, height: card1H,
        opacity: cardIn, transform: `translateY(${(1 - cardIn) * 14}px)`,
      }}>
        <FMPanel x={0} y={0} w={card1W} h={card1H} elevated>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: `linear-gradient(90deg, transparent, ${FM.SUCCESS}, transparent)`,
            opacity: 0.7,
          }} />
          <div style={{
            padding: '20px 24px', borderBottom: `1px solid ${FM.BORDER}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.16em', marginBottom: 5 }}>DATASET</div>
              <div style={{ fontFamily: FM.SANS, fontSize: 20, fontWeight: 500, color: FM.TEXT, letterSpacing: '-0.01em' }}>
                customer_records.canonical
              </div>
              <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIM, marginTop: 4, letterSpacing: '0.06em' }}>
                v2.4.0 · {new Date().toISOString().slice(0, 10)} · sha 0x9f4e2a
              </div>
            </div>
            <FMChip label="Published" color={FM.SUCCESS} soft={FM.SUCCESS_S} />
          </div>

          <div style={{ padding: '20px 24px' }}>
            {/* Top metrics */}
            <div style={{ display: 'flex', gap: 28, marginBottom: 22 }}>
              {[
                { label: 'Final Records', val: finalRecs.toLocaleString() },
                { label: 'Sources', val: VENDORS.length },
                { label: 'Schema Version', val: 'v2.4.0' },
                { label: 'Quality Score', val: '99.7%', color: FM.SUCCESS },
              ].map((m, i) => (
                <div key={i} style={{ opacity: metricsIn(i) }}>
                  <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.14em', marginBottom: 5 }}>{m.label}</div>
                  <div style={{ fontFamily: FM.SANS, fontSize: 22, fontWeight: 500, color: m.color || FM.TEXT, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}>{m.val}</div>
                </div>
              ))}
            </div>

            {/* Per-vendor breakdown */}
            <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.14em', marginBottom: 10 }}>
              CONTRIBUTION BY SOURCE
            </div>
            {VENDORS.map((v, i) => {
              const ip = metricsIn(i);
              const barW = (v.recs / barMax) * 360;
              return (
                <div key={v.id} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '6px 0',
                  opacity: ip,
                }}>
                  <div style={{ width: 5, height: 5, borderRadius: 3, background: v.color }} />
                  <div style={{ width: 50, fontFamily: FM.MONO, fontSize: 10, color: FM.DIM, letterSpacing: '0.1em' }}>{v.id}</div>
                  <div style={{ flex: 1, height: 6, background: FM.BORDER_HI, borderRadius: 3, overflow: 'hidden', maxWidth: 380 }}>
                    <div style={{ height: '100%', width: barW * ip, background: v.color, borderRadius: 3 }} />
                  </div>
                  <div style={{ width: 70, textAlign: 'right', fontFamily: FM.MONO, fontSize: 10, color: FM.TEXT, fontVariantNumeric: 'tabular-nums' }}>
                    {v.recs.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </FMPanel>
      </div>

      {/* Side card — pipeline summary */}
      <div style={{
        position: 'absolute', left: card2X, top: card2Y,
        width: card2W, height: card2H,
        opacity: cardIn, transform: `translateY(${(1 - cardIn) * 14}px)`,
      }}>
        <FMPanel x={0} y={0} w={card2W} h={card2H} elevated>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: `linear-gradient(90deg, transparent, ${FM.ACCENT}, transparent)`,
            opacity: 0.6,
          }} />
          <div style={{ padding: '20px 22px', borderBottom: `1px solid ${FM.BORDER}` }}>
            <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.16em', marginBottom: 5 }}>PIPELINE</div>
            <div style={{ fontFamily: FM.SANS, fontSize: 16, fontWeight: 500, color: FM.TEXT }}>End-to-End Run</div>
          </div>
          <div style={{ padding: '14px 22px' }}>
            {[
              { label: 'Ingest',         val: 'OK', color: FM.SUCCESS },
              { label: 'Standardize',    val: 'OK', color: FM.SUCCESS },
              { label: 'Validate',       val: '99.7%', color: FM.SUCCESS },
              { label: 'Map',            val: 'OK', color: FM.SUCCESS },
              { label: 'Process',        val: 'OK', color: FM.SUCCESS },
              { label: 'Publish',        val: 'OK', color: FM.SUCCESS },
            ].map((m, i) => {
              const ip = metricsIn(i);
              return (
                <div key={m.label} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: `1px solid ${FM.BORDER}`,
                  opacity: ip,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 14, height: 14, borderRadius: 7,
                      background: FM.SUCCESS_S, border: `1px solid ${FM.SUCCESS}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.6 4l1.6 1.6L6.4 2.4" stroke={FM.SUCCESS} strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div style={{ fontFamily: FM.SANS, fontSize: 12, color: FM.TEXT }}>{m.label}</div>
                  </div>
                  <div style={{ fontFamily: FM.MONO, fontSize: 10, color: m.color, letterSpacing: '0.1em' }}>{m.val}</div>
                </div>
              );
            })}
            <div style={{
              marginTop: 12, padding: '10px 0',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.14em' }}>RUN TIME</div>
              <div style={{ fontFamily: FM.MONO, fontSize: 11, color: FM.TEXT, fontVariantNumeric: 'tabular-nums' }}>00:01:14.83</div>
            </div>
          </div>
        </FMPanel>
      </div>

      {/* Pipeline Complete pill */}
      <div style={{
        position: 'absolute', left: '50%', top: card1Y + card1H + 30,
        transform: 'translateX(-50%)',
        opacity: completeIn,
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          background: FM.SUCCESS_S, border: `1px solid ${FM.SUCCESS}`,
          borderRadius: 100, padding: '11px 20px 11px 14px',
          boxShadow: `0 0 36px ${FM.SUCCESS_S}`,
        }}>
          <div style={{ width: 20, height: 20, borderRadius: 10, background: FM.SUCCESS, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M2.2 5.5l2 2L8.8 3.3" stroke="#08090C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ fontFamily: FM.SANS, fontSize: 14, fontWeight: 500, color: FM.SUCCESS, letterSpacing: '0.02em' }}>
            Pipeline Complete · Asset Published
          </div>
        </div>
      </div>

      <SceneCaption n={6} total={6} t={t} label="Polished output — one canonical dataset" />
    </div>
  );
}

Object.assign(window, {
  VENDORS, TOTAL_RECS,
  PipeScene1, PipeScene2, PipeScene3, PipeScene4, PipeScene5, PipeScene6,
});
