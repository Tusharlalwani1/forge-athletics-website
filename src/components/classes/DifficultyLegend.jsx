import React from 'react';

export function DifficultyBadge({ level, className = '', compact = false }) {
  const norm = (level || '').toLowerCase();
  
  let styles = 'bg-charcoal-line text-steel border-charcoal-line';
  let label = compact ? 'ALL' : 'All Levels';

  if (norm === 'beginner') {
    styles = 'bg-steel-dim/20 text-chalk border-steel-dim/40';
    label = compact ? 'BEG' : 'Beginner';
  } else if (norm === 'intermediate') {
    styles = 'bg-amber-500/15 text-amber-300 border-amber-500/40';
    label = compact ? 'INT' : 'Intermediate';
  } else if (norm === 'advanced') {
    styles = 'bg-blaze/15 text-blaze border-blaze/40';
    label = compact ? 'ADV' : 'Advanced';
  }

  return (
    <span
      className={`inline-flex items-center gap-1 max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-bold uppercase tracking-wider rounded border shrink-0 ${
        compact ? 'px-1.5 py-0.5 text-[9px]' : 'px-2 py-0.5 text-[11px]'
      } ${styles} ${className}`}
    >
      <span className="h-1 w-1 shrink-0 rounded-full bg-current" />
      <span className="truncate">{label}</span>
    </span>
  );
}

export default function DifficultyLegend() {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-steel">
      <span className="font-semibold uppercase tracking-wider text-steel-dim text-[11px]">
        Difficulty:
      </span>
      <div className="flex items-center gap-2">
        <DifficultyBadge level="beginner" />
        <DifficultyBadge level="intermediate" />
        <DifficultyBadge level="advanced" />
      </div>
    </div>
  );
}
