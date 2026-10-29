import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

interface OdometerCounterProps {
  from?: number;
  to: number;
  startFrame?: number;
  durationFrames?: number;
  prefix?: string;
  suffix?: string;
  style?: React.CSSProperties;
  className?: string;
  isIndianCurrency?: boolean;
}

export function formatIndianNumber(val: number): string {
  const rounded = Math.floor(val);
  return rounded.toLocaleString('en-IN');
}

export const OdometerCounter: React.FC<OdometerCounterProps> = ({
  from = 0,
  to,
  startFrame = 0,
  durationFrames = 45,
  prefix = '',
  suffix = '',
  style,
  className = '',
}) => {
  const frame = useCurrentFrame();

  const currentVal = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [from, to],
    {
      easing: Easing.out(Easing.exp),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const formatted = formatIndianNumber(currentVal);

  return (
    <span
      className={className}
      style={{
        fontVariantNumeric: 'tabular-nums',
        fontFamily: 'JetBrains Mono, monospace',
        display: 'inline-flex',
        alignItems: 'baseline',
        ...style,
      }}
    >
      {prefix && <span>{prefix}</span>}
      <span>{formatted}</span>
      {suffix && <span style={{ marginLeft: 4 }}>{suffix}</span>}
    </span>
  );
};
