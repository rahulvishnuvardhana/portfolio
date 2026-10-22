/**
 * Code-drawn preview for the robot-trajectory project: observed history,
 * ground-truth future, and a model forecast that re-draws while active.
 * Stylized, not plotted from the dataset; the metrics are the real results.
 */
const HISTORY =
  "M60 262 C 120 257, 170 232, 220 216 S 280 197, 300 191";
const TRUTH = "M300 191 C 360 173, 420 151, 470 141 S 540 119, 572 113";
const PRED = "M300 191 C 362 177, 418 161, 468 151 S 536 133, 568 129";
const DOTS: [number, number][] = [
  [60, 262], [96, 259], [131, 252], [166, 240],
  [201, 226], [236, 211], [269, 200], [300, 191],
];
const VIOLET = "#a78bfa";

export default function TrajectoryPreview({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 640 360"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label="Illustrative trajectory forecast: observed path, ground truth, and model prediction"
    >
      <defs>
        <pattern id="traj-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        </pattern>
        <radialGradient id="traj-glow" cx="70%" cy="35%" r="60%">
          <stop offset="0%" stopColor={VIOLET} stopOpacity="0.16" />
          <stop offset="100%" stopColor={VIOLET} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="640" height="360" fill="#0b0b10" />
      <rect width="640" height="360" fill="url(#traj-grid)" />
      <rect width="640" height="360" fill="url(#traj-glow)" />

      <path d={HISTORY} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
      {DOTS.map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="3.5" fill="rgba(255,255,255,0.85)" />
      ))}

      <path
        d={TRUTH}
        fill="none"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="2"
        strokeDasharray="2 6"
        strokeLinecap="round"
      />
      <path
        key={active ? "drawing" : "static"}
        d={PRED}
        fill="none"
        stroke={VIOLET}
        strokeWidth="3"
        strokeLinecap="round"
        pathLength={1}
        className={active ? "traj-draw" : undefined}
      />
      <circle cx="572" cy="113" r="5" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />

      {active && (
        <circle r="6" fill={VIOLET}>
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path={PRED}
            keyPoints="0;1;1"
            keyTimes="0;0.7;1"
            calcMode="linear"
          />
        </circle>
      )}

      <g fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="11" letterSpacing="1.5">
        <text x="608" y="34" textAnchor="end" fill="rgba(255,255,255,0.45)">
          NCLT · ILLUSTRATIVE
        </text>
        <g transform="translate(32 318)" fill="rgba(255,255,255,0.6)">
          <circle cx="4" cy="-4" r="3.5" fill="rgba(255,255,255,0.85)" />
          <text x="14" y="0">OBSERVED</text>
          <line x1="104" y1="-4" x2="124" y2="-4" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeDasharray="2 4" />
          <text x="132" y="0">TRUTH</text>
          <line x1="198" y1="-4" x2="218" y2="-4" stroke={VIOLET} strokeWidth="3" />
          <text x="226" y="0">FORECAST</text>
        </g>
        <text x="608" y="322" textAnchor="end" fill={VIOLET}>
          ADE 0.1494 m · FDE 0.3509 m
        </text>
      </g>
    </svg>
  );
}
