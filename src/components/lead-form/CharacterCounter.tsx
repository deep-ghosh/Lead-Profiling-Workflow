/**
 * Character counter for the message textarea.
 * Shows count and changes color near limits.
 */

interface CharacterCounterProps {
  current: number;
  min: number;
  max: number;
}

export function CharacterCounter({ current, min, max }: CharacterCounterProps) {
  const isUnderMin = current > 0 && current < min;
  const isNearMax = current >= max * 0.9;
  const isOverMax = current > max;

  let color = "var(--color-text-muted)";
  if (isOverMax) color = "#ef4444";
  else if (isNearMax) color = "#f59e0b";
  else if (isUnderMin) color = "var(--color-text-secondary)";

  return (
    <div
      style={{
        fontSize: "0.75rem",
        color,
        textAlign: "right",
        marginTop: "0.25rem",
        transition: "color var(--transition-fast)",
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      {current} / {max}
      {isUnderMin && (
        <span style={{ marginLeft: "0.5rem" }}>
          (minimum {min} characters)
        </span>
      )}
    </div>
  );
}
