// loan_setup_scenes.jsx — 6 scenes for the Loan Setup & Processing flow
// Source flow: P3 setup (blue, 7 steps) → Validation (yellow) → Informatica load → Submit/wait → Complete

const PLAN = {
  id: 'PLN-2026-0339',
  name: 'Acme Corp 401(k)',
  caseNum: 'CASE-778421',
  conv: 'CV-2026-0339',
  effective: '2026-04-01',
  loans: 847,
  balance: 1284750.42,
};

const P3_STEPS = [
  { n: '01', label: 'Open P3 — navigate to plan' },
  { n: '02', label: 'Top-right dropdown → Conversions' },
  { n: '03', label: 'Add Record Keeper — enter Name' },
  { n: '04', label: 'Conversion tab → New Conversion' },
  { n: '05', label: 'Enter case number — No Affiliate' },
  { n: '06', label: 'Conversion / assign / effective dates' },
  { n: '07', label: 'Conversion number generated' },
];

const SYS = {
  P3:   { color: 'oklch(72% 0.14 248)', soft: 'oklch(72% 0.14 248 / 0.16)', label: 'P3' },
  INF:  { color: 'oklch(68% 0.18 300)', soft: 'oklch(68% 0.18 300 / 0.16)', label: 'INFORMATICA' },
};

const TOTAL = 6;

// Reusable: SystemTile
function SystemTile({ x, y, sys, active = 1, label }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: 130, padding: '14px 16px',
      background: FM.PANEL,
      border: `1px solid ${active > 0.5 ? sys.color : FM.BORDER}`,
      borderRadius: 10,
      backdropFilter: 'blur(8px)',
      opacity: 0.4 + 0.6 * active,
      boxShadow: active > 0.5 ? `0 0 24px ${sys.soft}` : 'none',
      transition: 'none',
    }}>
      <div style={{ fontFamily: FM.MONO, fontSize: 9, color: sys.color, letterSpacing: '0.18em' }}>
        SYSTEM
      </div>
      <div style={{ fontFamily: FM.SANS, fontSize: 16, fontWeight: 500, color: FM.TEXT, marginTop: 4 }}>
        {sys.label}
      </div>
      {label && (
        <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, marginTop: 6, letterSpacing: '0.1em' }}>
          {label}
        </div>
      )}
    </div>
  );
}

// ── Scene 1 — Plan Arrives ───────────────────────────────────
function Scene1() {
  const { localTime: t, duration } = useSprite();
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.5, 0, 1));

  const cardIn = Easing.easeOutCubic(clamp((t - 0.4) / 0.8, 0, 1));
  const sysIn = Easing.easeOutCubic(clamp((t - 1.6) / 0.7, 0, 1));
  const labelIn = Easing.easeOutCubic(clamp((t - 2.4) / 0.6, 0, 1));

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={640} y={360} size={720} opacity={0.10} color={FM.ACCENT} />

      {/* Plan card center */}
      <div style={{
        position: 'absolute', left: 480, top: 240,
        width: 320, padding: '22px 26px',
        background: FM.PANEL_HI,
        border: `1px solid ${FM.BORDER_HI}`,
        borderRadius: 14,
        backdropFilter: 'blur(8px)',
        boxShadow: '0 30px 60px -20px rgba(0,0,0,0.7)',
        opacity: cardIn,
        transform: `translateY(${(1 - cardIn) * 12}px)`,
      }}>
        <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.22em' }}>
          INCOMING PLAN
        </div>
        <div style={{ fontFamily: FM.SANS, fontSize: 22, fontWeight: 500, color: FM.TEXT, marginTop: 8, letterSpacing: '-0.02em' }}>
          {PLAN.name}
        </div>
        <div style={{ fontFamily: FM.MONO, fontSize: 11, color: FM.DIM, marginTop: 4, letterSpacing: '0.1em' }}>
          {PLAN.id}
        </div>
        <div style={{ height: 1, background: FM.BORDER, margin: '14px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.14em' }}>LOANS</div>
            <div style={{ fontFamily: FM.SANS, fontSize: 19, fontWeight: 500, color: FM.TEXT, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em', marginTop: 4 }}>
              {PLAN.loans}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.14em' }}>BALANCE</div>
            <div style={{ fontFamily: FM.SANS, fontSize: 19, fontWeight: 500, color: FM.TEXT, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em', marginTop: 4 }}>
              ${(PLAN.balance / 1000).toFixed(1)}K
            </div>
          </div>
        </div>
      </div>

      {/* System tiles flanking */}
      <div style={{ opacity: sysIn, transform: `translateX(${(1 - sysIn) * -10}px)` }}>
        <SystemTile x={140} y={300} sys={SYS.P3} active={0.5} />
      </div>
      <div style={{ opacity: sysIn, transform: `translateX(${(1 - sysIn) * 10}px)` }}>
        <SystemTile x={1010} y={300} sys={SYS.INF} active={0.5} />
      </div>

      {/* Bottom hint label */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 510,
        textAlign: 'center', opacity: labelIn,
      }}>
        <div style={{ fontFamily: FM.MONO, fontSize: 11, color: FM.DIM, letterSpacing: '0.2em' }}>
          LOAN SETUP &amp; PROCESSING — {PLAN.loans} LOANS PENDING
        </div>
      </div>

      <SceneCaption n={1} total={TOTAL} t={t} label="Plan arrives" />
    </div>
  );
}

// ── Scene 2 — Phase I — P3 Setup (blue) ──────────────────────
function Scene2() {
  const { localTime: t, duration } = useSprite();
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.4, 0, 1));

  const stepIn = (i) => Easing.easeOutCubic(clamp((t - 0.3 - i * 0.45) / 0.55, 0, 1));
  // The conversion record fills as steps complete
  const recordFields = [
    { label: 'Record Keeper', value: 'Acme Corp', stepIdx: 2 },
    { label: 'Case #',         value: PLAN.caseNum, stepIdx: 4 },
    { label: 'Affiliate',      value: 'No Affiliate', stepIdx: 4 },
    { label: 'Conv. Date',     value: '2026-03-28', stepIdx: 5 },
    { label: 'Assign Date',    value: '2026-03-30', stepIdx: 5 },
    { label: 'Effective',      value: PLAN.effective, stepIdx: 5 },
  ];
  const fieldOpacity = (idx) => stepIn(idx);
  const convNumIn = stepIn(6);

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={300} y={360} size={600} opacity={0.10} color={SYS.P3.color} />
      <FMGlow x={950} y={360} size={500} opacity={0.08} color={SYS.P3.color} />

      {/* Phase chip top */}
      <div style={{ position: 'absolute', top: 60, left: 80, opacity: sceneIn }}>
        <FMChip label="Phase I — Setup in P3" color={SYS.P3.color} soft={SYS.P3.soft} />
      </div>

      {/* Steps checklist left */}
      <div style={{ position: 'absolute', left: 80, top: 110, width: 460 }}>
        {P3_STEPS.map((step, i) => {
          const p = stepIn(i);
          const checkP = clamp((p - 0.5) * 2, 0, 1);
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '10px 0',
              opacity: 0.25 + 0.75 * p,
              transform: `translateX(${(1 - p) * 10}px)`,
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: 11,
                border: `1px solid ${checkP > 0.5 ? FM.SUCCESS : FM.BORDER_HI}`,
                background: checkP > 0.5 ? FM.SUCCESS_S : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M2.2 5.5l2.2 2.2L8.8 3.3" stroke={FM.SUCCESS} strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round"
                    strokeDasharray="13" strokeDashoffset={13 - 13 * checkP} />
                </svg>
              </div>
              <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.14em', width: 22 }}>
                {step.n}
              </div>
              <div style={{ fontFamily: FM.SANS, fontSize: 13, color: FM.TEXT }}>
                {step.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Conversion record on right */}
      <FMPanel x={620} y={110} w={580} h={460} elevated>
        <div style={{ padding: '14px 20px', borderBottom: `1px solid ${FM.BORDER}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: FM.MONO, fontSize: 9, color: SYS.P3.color, letterSpacing: '0.18em' }}>
              P3 · NEW CONVERSION
            </div>
            <FMChip label={convNumIn > 0.4 ? PLAN.conv : 'PENDING'} color={convNumIn > 0.4 ? FM.SUCCESS : FM.DIMMER} soft={convNumIn > 0.4 ? FM.SUCCESS_S : 'transparent'} />
          </div>
          <div style={{ fontFamily: FM.SANS, fontSize: 17, fontWeight: 500, color: FM.TEXT, marginTop: 8 }}>
            Conversion Record
          </div>
        </div>
        <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {recordFields.map((f, i) => {
            const p = fieldOpacity(f.stepIdx);
            return (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between',
                paddingBottom: 10, borderBottom: `1px solid ${FM.BORDER}`,
                opacity: 0.2 + 0.8 * p,
              }}>
                <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.14em' }}>
                  {f.label}
                </div>
                <div style={{ fontFamily: FM.SANS, fontSize: 13, color: p > 0.5 ? FM.TEXT : FM.DIMMER, fontVariantNumeric: 'tabular-nums' }}>
                  {p > 0.5 ? f.value : '—'}
                </div>
              </div>
            );
          })}
          {/* Conv number generated badge */}
          <div style={{
            marginTop: 8, padding: '12px 14px',
            background: FM.SUCCESS_S, border: `1px solid ${FM.SUCCESS}`,
            borderRadius: 8,
            opacity: convNumIn,
            transform: `scale(${0.95 + 0.05 * convNumIn})`,
          }}>
            <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.SUCCESS, letterSpacing: '0.18em' }}>
              CONVERSION # GENERATED
            </div>
            <div style={{ fontFamily: FM.SANS, fontSize: 19, fontWeight: 500, color: FM.TEXT, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em', marginTop: 4 }}>
              {PLAN.conv}
            </div>
          </div>
        </div>
      </FMPanel>

      <SceneCaption n={2} total={TOTAL} t={t} label="Phase I — P3 setup" />
    </div>
  );
}

// ── Scene 3 — Validation (yellow) ────────────────────────────
function Scene3() {
  const { localTime: t, duration } = useSprite();
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.4, 0, 1));

  // Counter ticks up
  const counterP = Easing.easeOutCubic(clamp((t - 0.6) / 2.2, 0, 1));
  const headerVal = PLAN.balance * counterP;
  const sourceVal = PLAN.balance * counterP;
  const matched = counterP >= 0.99;
  const matchIn = matched ? Easing.easeOutCubic(clamp((t - 3.0) / 0.6, 0, 1)) : 0;

  const Money = (v) => '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={640} y={360} size={700} opacity={0.10} color={matched ? FM.SUCCESS : FM.WARN} />

      <div style={{ position: 'absolute', top: 60, left: 80 }}>
        <FMChip label="Phase II — Validate Balances" color={FM.WARN} soft={FM.WARN_S} />
      </div>

      {/* Loan Header (top) */}
      <FMPanel x={240} y={130} w={800} h={170} elevated>
        <div style={{ padding: '14px 22px', borderBottom: `1px solid ${FM.BORDER}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.WARN, letterSpacing: '0.18em' }}>
              LOAN HEADER
            </div>
            <FMChip label={`${PLAN.loans} loans`} color={FM.DIM} soft="transparent" />
          </div>
        </div>
        <div style={{ padding: '20px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.14em' }}>TOTAL BALANCE</div>
            <div style={{ fontFamily: FM.SANS, fontSize: 32, fontWeight: 500, color: FM.TEXT, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em', marginTop: 6 }}>
              {Money(headerVal)}
            </div>
          </div>
          <div style={{
            width: 68, height: 4, borderRadius: 2,
            background: FM.BORDER_HI, overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', width: `${counterP * 100}%`,
              background: matched ? FM.SUCCESS : FM.WARN,
              boxShadow: `0 0 8px ${matched ? FM.SUCCESS : FM.WARN}`,
            }} />
          </div>
        </div>
      </FMPanel>

      {/* = sign middle */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 318,
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 52, height: 52, borderRadius: 26,
          background: matched ? FM.SUCCESS_S : FM.PANEL,
          border: `1px solid ${matched ? FM.SUCCESS : FM.BORDER_HI}`,
          fontFamily: FM.SANS, fontSize: 22, fontWeight: 500,
          color: matched ? FM.SUCCESS : FM.DIM,
          boxShadow: matched ? `0 0 30px ${FM.SUCCESS_S}` : 'none',
          transform: `scale(${1 + matchIn * 0.1})`,
        }}>
          =
        </div>
      </div>

      {/* Loan Source (bottom) */}
      <FMPanel x={240} y={400} w={800} h={170} elevated>
        <div style={{ padding: '14px 22px', borderBottom: `1px solid ${FM.BORDER}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.WARN, letterSpacing: '0.18em' }}>
              LOAN SOURCE
            </div>
            <FMChip label={`${PLAN.loans} loans`} color={FM.DIM} soft="transparent" />
          </div>
        </div>
        <div style={{ padding: '20px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.14em' }}>TOTAL BALANCE</div>
            <div style={{ fontFamily: FM.SANS, fontSize: 32, fontWeight: 500, color: FM.TEXT, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em', marginTop: 6 }}>
              {Money(sourceVal)}
            </div>
          </div>
          <div style={{
            width: 68, height: 4, borderRadius: 2,
            background: FM.BORDER_HI, overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', width: `${counterP * 100}%`,
              background: matched ? FM.SUCCESS : FM.WARN,
              boxShadow: `0 0 8px ${matched ? FM.SUCCESS : FM.WARN}`,
            }} />
          </div>
        </div>
      </FMPanel>

      {/* Match confirmation */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 600,
        textAlign: 'center',
        opacity: matchIn,
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '8px 16px',
          background: FM.SUCCESS_S, border: `1px solid ${FM.SUCCESS}`,
          borderRadius: 100,
        }}>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M2.2 5.5l2.2 2.2L8.8 3.3" stroke={FM.SUCCESS} strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="13" strokeDashoffset={13 - 13 * matchIn} />
          </svg>
          <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.SUCCESS, letterSpacing: '0.18em' }}>
            HEADER = SOURCE — BALANCED
          </div>
        </div>
      </div>

      <SceneCaption n={3} total={TOTAL} t={t} label="Phase II — Validate balances" />
    </div>
  );
}

// ── Scene 4 — Informatica Load ───────────────────────────────
function Scene4() {
  const { localTime: t, duration } = useSprite();
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.4, 0, 1));

  const streamStart = 0.6;
  const streamP = clamp((t - streamStart) / 3.0, 0, 1);
  const counterP = Easing.easeInOutCubic(streamP);
  const rows = Math.floor(PLAN.loans * counterP);
  const done = rows >= PLAN.loans;
  const completeIn = done ? Easing.easeOutCubic(clamp((t - 4.0) / 0.5, 0, 1)) : 0;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={640} y={360} size={700} opacity={0.12} color={SYS.INF.color} />

      <div style={{ position: 'absolute', top: 60, left: 80 }}>
        <FMChip label="Phase II — Informatica Load" color={SYS.INF.color} soft={SYS.INF.soft} />
      </div>

      {/* Source data box left */}
      <FMPanel x={120} y={280} w={220} h={180}>
        <div style={{ padding: '14px 18px' }}>
          <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.18em' }}>
            SOURCE
          </div>
          <div style={{ fontFamily: FM.SANS, fontSize: 16, fontWeight: 500, color: FM.TEXT, marginTop: 6 }}>
            Loan Source File
          </div>
          <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIM, marginTop: 8, letterSpacing: '0.1em' }}>
            {PLAN.loans} records
          </div>
          <div style={{ marginTop: 14, height: 4, borderRadius: 2, background: FM.BORDER_HI, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${counterP * 100}%`, background: done ? FM.SUCCESS : SYS.INF.color }} />
          </div>
        </div>
      </FMPanel>

      {/* Particle stream */}
      <FMStream fromX={340} fromY={370} toX={580} toY={370} progress={streamP} color={SYS.INF.color} count={10} active={!done} />

      {/* Informatica engine center */}
      <div style={{
        position: 'absolute', left: 580, top: 260, width: 220, height: 220,
        background: FM.PANEL_HI,
        border: `1px solid ${done ? FM.SUCCESS : SYS.INF.color}`,
        borderRadius: 14,
        backdropFilter: 'blur(8px)',
        boxShadow: `0 0 40px ${done ? FM.SUCCESS_S : SYS.INF.soft}`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Spinning ring */}
        <div style={{
          width: 80, height: 80, borderRadius: 40,
          border: `2px solid ${FM.BORDER_HI}`,
          borderTopColor: done ? FM.SUCCESS : SYS.INF.color,
          transform: `rotate(${t * 220}deg)`,
          marginBottom: 14,
        }} />
        <div style={{ fontFamily: FM.MONO, fontSize: 9, color: SYS.INF.color, letterSpacing: '0.18em' }}>
          INFORMATICA
        </div>
        <div style={{ fontFamily: FM.SANS, fontSize: 13, color: FM.TEXT, marginTop: 4 }}>
          {done ? 'Load Complete' : 'Loading…'}
        </div>
      </div>

      {/* Output — P3 right */}
      <FMPanel x={940} y={280} w={220} h={180}>
        <div style={{ padding: '14px 18px' }}>
          <div style={{ fontFamily: FM.MONO, fontSize: 9, color: SYS.P3.color, letterSpacing: '0.18em' }}>
            DESTINATION · P3
          </div>
          <div style={{ fontFamily: FM.SANS, fontSize: 16, fontWeight: 500, color: FM.TEXT, marginTop: 6 }}>
            Loan Records
          </div>
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <div style={{ fontFamily: FM.SANS, fontSize: 28, fontWeight: 500, color: FM.TEXT, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}>
              {rows}
            </div>
            <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIMMER, letterSpacing: '0.14em' }}>
              / {PLAN.loans}
            </div>
          </div>
        </div>
      </FMPanel>

      {/* Stream from engine to destination */}
      <FMStream fromX={800} fromY={370} toX={940} toY={370} progress={streamP} color={done ? FM.SUCCESS : SYS.INF.color} count={6} active={!done} />

      {/* Complete pill */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 530,
        textAlign: 'center', opacity: completeIn,
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '8px 16px',
          background: FM.SUCCESS_S, border: `1px solid ${FM.SUCCESS}`,
          borderRadius: 100,
        }}>
          <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.SUCCESS, letterSpacing: '0.18em' }}>
            {PLAN.loans} ROWS LOADED
          </div>
        </div>
      </div>

      <SceneCaption n={4} total={TOTAL} t={t} label="Informatica load" />
    </div>
  );
}

// ── Scene 5 — Submit & Wait ──────────────────────────────────
function Scene5() {
  const { localTime: t, duration } = useSprite();
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.4, 0, 1));

  const submitP = Easing.easeOutCubic(clamp((t - 0.4) / 0.5, 0, 1));
  const submitPulse = t > 0.9 && t < 1.6 ? Math.sin((t - 0.9) * 8) * 0.5 + 0.5 : 0;
  const arcP = clamp((t - 1.4) / 1.0, 0, 1);
  const waitStart = 2.2;
  const breathe = t > waitStart ? Math.sin((t - waitStart) * 1.6) * 0.5 + 0.5 : 0;
  const emailIn = Easing.easeOutCubic(clamp((t - 3.6) / 0.6, 0, 1));

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={640} y={360} size={700} opacity={0.10} color={emailIn > 0.3 ? FM.SUCCESS : SYS.P3.color} />

      <div style={{ position: 'absolute', top: 60, left: 80 }}>
        <FMChip label="Phase III — Submit Takeover Loans" color={SYS.P3.color} soft={SYS.P3.soft} />
      </div>

      {/* Left: P3 takeover button */}
      <FMPanel x={120} y={200} w={340} h={280} elevated>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${FM.BORDER}` }}>
          <div style={{ fontFamily: FM.MONO, fontSize: 9, color: SYS.P3.color, letterSpacing: '0.18em' }}>
            P3 · TAKEOVER LOANS
          </div>
          <div style={{ fontFamily: FM.SANS, fontSize: 16, fontWeight: 500, color: FM.TEXT, marginTop: 6 }}>
            Conversion {PLAN.conv}
          </div>
        </div>
        <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Submit button — pulses */}
          <div style={{
            padding: '14px 20px',
            background: SYS.P3.color,
            borderRadius: 8,
            textAlign: 'center',
            opacity: submitP,
            boxShadow: `0 0 ${20 + submitPulse * 30}px ${SYS.P3.soft}`,
            transform: `scale(${1 + submitPulse * 0.03})`,
          }}>
            <div style={{ fontFamily: FM.SANS, fontSize: 13, fontWeight: 500, color: '#08090C', letterSpacing: '0.06em' }}>
              SUBMIT
            </div>
          </div>
          {/* Upload button */}
          <div style={{
            padding: '14px 20px',
            background: arcP > 0.05 ? FM.SUCCESS_S : FM.PANEL,
            border: `1px solid ${arcP > 0.05 ? FM.SUCCESS : FM.BORDER_HI}`,
            borderRadius: 8,
            textAlign: 'center',
            opacity: submitP,
          }}>
            <div style={{ fontFamily: FM.SANS, fontSize: 13, fontWeight: 500, color: arcP > 0.05 ? FM.SUCCESS : FM.DIM, letterSpacing: '0.06em' }}>
              UPLOAD
            </div>
          </div>
        </div>
      </FMPanel>

      {/* Arc to right */}
      <FMArc fromX={460} fromY={340} toX={820} toY={340} progress={arcP} color={SYS.P3.color} curveDir={-1} />

      {/* Right: Awaiting confirmation */}
      <FMPanel x={820} y={200} w={340} h={280} elevated>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${FM.BORDER}` }}>
          <div style={{ fontFamily: FM.MONO, fontSize: 9, color: emailIn > 0.3 ? FM.SUCCESS : FM.WARN, letterSpacing: '0.18em' }}>
            STATUS
          </div>
          <div style={{ fontFamily: FM.SANS, fontSize: 16, fontWeight: 500, color: FM.TEXT, marginTop: 6 }}>
            {emailIn > 0.3 ? 'Confirmation Received' : 'Awaiting Confirmation'}
          </div>
        </div>
        <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 180 }}>
          {emailIn < 0.3 ? (
            <>
              {/* Breathing dot */}
              <div style={{
                width: 60, height: 60, borderRadius: 30,
                background: `oklch(80% 0.14 75 / ${0.15 + breathe * 0.35})`,
                border: `1px solid ${FM.WARN}`,
                boxShadow: `0 0 ${10 + breathe * 30}px oklch(80% 0.14 75 / ${0.4 + breathe * 0.4})`,
                marginBottom: 14,
              }} />
              <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.DIM, letterSpacing: '0.18em' }}>
                T+ {Math.floor(t * 10) / 10}s · HOLDING
              </div>
            </>
          ) : (
            <div style={{ opacity: emailIn, transform: `translateY(${(1 - emailIn) * 8}px)`, textAlign: 'center' }}>
              <div style={{
                width: 44, height: 44, borderRadius: 22,
                background: FM.SUCCESS_S, border: `1px solid ${FM.SUCCESS}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 14px',
              }}>
                <svg width="18" height="18" viewBox="0 0 11 11" fill="none">
                  <path d="M2.2 5.5l2.2 2.2L8.8 3.3" stroke={FM.SUCCESS} strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round"
                    strokeDasharray="13" strokeDashoffset={13 - 13 * emailIn} />
                </svg>
              </div>
              <div style={{ fontFamily: FM.MONO, fontSize: 10, color: FM.SUCCESS, letterSpacing: '0.18em' }}>
                EMAIL · LOAD SUCCESSFUL
              </div>
            </div>
          )}
        </div>
      </FMPanel>

      <SceneCaption n={5} total={TOTAL} t={t} label="Phase III — Submit & confirm" />
    </div>
  );
}

// ── Scene 6 — Complete ───────────────────────────────────────
function Scene6() {
  const { localTime: t, duration } = useSprite();
  const exitT = duration - 0.5;
  const sceneOut = t > exitT ? 1 - Easing.easeInCubic(clamp((t - exitT) / 0.5, 0, 1)) : 1;
  const sceneIn = Easing.easeOutCubic(clamp(t / 0.5, 0, 1));

  const cardIn = Easing.easeOutCubic(clamp((t - 0.3) / 0.7, 0, 1));
  const metricsIn = (i) => Easing.easeOutCubic(clamp((t - 1.2 - i * 0.18) / 0.6, 0, 1));
  const queryIn = (i) => Easing.easeOutCubic(clamp((t - 2.4 - i * 0.2) / 0.5, 0, 1));
  const pillIn = Easing.easeOutCubic(clamp((t - 3.8) / 0.7, 0, 1));
  const pulse = Math.sin(t * 1.6) * 0.5 + 0.5;

  const metrics = [
    { label: 'PLAN', val: PLAN.id },
    { label: 'CONVERSION', val: PLAN.conv },
    { label: 'LOANS', val: String(PLAN.loans) },
    { label: 'BALANCE', val: '$' + (PLAN.balance / 1000).toFixed(1) + 'K' },
    { label: 'EFFECTIVE', val: PLAN.effective },
  ];

  const queries = [
    'SELECT count(*) FROM loans → 847',
    'SELECT sum(balance) FROM loans → $1,284,750.42',
    'SELECT status FROM conv → ACTIVE',
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: sceneIn * sceneOut }}>
      <FMGlow x={640} y={340} size={780} opacity={0.14} color={FM.SUCCESS} />

      {/* Final summary card */}
      <div style={{
        position: 'absolute', left: 220, top: 110, width: 840,
        background: FM.PANEL_HI,
        border: `1px solid ${FM.BORDER_HI}`,
        borderRadius: 14,
        backdropFilter: 'blur(8px)',
        boxShadow: '0 30px 60px -20px rgba(0,0,0,0.7)',
        opacity: cardIn,
        transform: `translateY(${(1 - cardIn) * 12}px)`,
        overflow: 'hidden',
      }}>
        {/* Top gradient line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent, ${FM.SUCCESS}, transparent)`,
          opacity: cardIn * 0.8,
        }} />
        <div style={{ padding: '20px 26px', borderBottom: `1px solid ${FM.BORDER}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.SUCCESS, letterSpacing: '0.22em' }}>
                LOAN SETUP SUMMARY
              </div>
              <div style={{ fontFamily: FM.SANS, fontSize: 22, fontWeight: 500, color: FM.TEXT, marginTop: 6, letterSpacing: '-0.02em' }}>
                {PLAN.name}
              </div>
            </div>
            <FMChip label="ACTIVE" color={FM.SUCCESS} soft={FM.SUCCESS_S} />
          </div>
        </div>
        {/* Metrics row */}
        <div style={{ padding: '20px 26px', display: 'flex', alignItems: 'center', gap: 22 }}>
          {metrics.map((m, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div style={{ width: 1, height: 36, background: FM.BORDER_HI, opacity: metricsIn(i) }} />}
              <div style={{ opacity: metricsIn(i), transform: `translateY(${(1 - metricsIn(i)) * 6}px)` }}>
                <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.14em', marginBottom: 4 }}>
                  {m.label}
                </div>
                <div style={{ fontFamily: FM.SANS, fontSize: 16, fontWeight: 500, color: FM.TEXT, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}>
                  {m.val}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
        {/* Verification queries */}
        <div style={{ padding: '16px 26px 22px', borderTop: `1px solid ${FM.BORDER}` }}>
          <div style={{ fontFamily: FM.MONO, fontSize: 9, color: FM.DIMMER, letterSpacing: '0.18em', marginBottom: 10 }}>
            VERIFICATION QUERIES
          </div>
          {queries.map((q, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '6px 0',
              opacity: queryIn(i),
              transform: `translateX(${(1 - queryIn(i)) * 8}px)`,
            }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M2.2 5.5l2.2 2.2L8.8 3.3" stroke={FM.SUCCESS} strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round"
                  strokeDasharray="13" strokeDashoffset={13 - 13 * queryIn(i)} />
              </svg>
              <div style={{ fontFamily: FM.MONO, fontSize: 11, color: FM.DIM, letterSpacing: '0.04em' }}>
                {q}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final complete pill */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 130,
        textAlign: 'center', opacity: pillIn,
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          background: FM.SUCCESS_S, border: `1px solid ${FM.SUCCESS}`,
          borderRadius: 100, padding: '11px 22px 11px 14px',
          boxShadow: `0 0 ${30 + pulse * 20}px ${FM.SUCCESS_S}`,
          transform: `scale(${0.95 + pillIn * 0.05})`,
        }}>
          <div style={{
            width: 22, height: 22, borderRadius: 11,
            border: `1px solid ${FM.SUCCESS}`,
            background: FM.SUCCESS_S,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M2.2 5.5l2.2 2.2L8.8 3.3" stroke={FM.SUCCESS} strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray="13" strokeDashoffset={13 - 13 * pillIn} />
            </svg>
          </div>
          <div style={{ fontFamily: FM.MONO, fontSize: 11, color: FM.SUCCESS, letterSpacing: '0.18em' }}>
            PIPELINE COMPLETE · LOANS LOADED
          </div>
        </div>
      </div>

      <SceneCaption n={6} total={TOTAL} t={t} label="Loans live in P3" />
    </div>
  );
}

Object.assign(window, { PLAN, P3_STEPS, SYS, SystemTile, Scene1, Scene2, Scene3, Scene4, Scene5, Scene6 });
