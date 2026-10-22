import React from 'react';
import { KANDS } from '../data/chaptersData';

interface KandFilterProps {
  activeKand: string;
  onSelectKand: (kandId: string) => void;
}

export const KandFilter: React.FC<KandFilterProps> = ({ activeKand, onSelectKand }) => {
  const currentKandObj = KANDS.find((k) => k.id === activeKand);

  return (
    <div className="space-y-4">
      {/* Interactive horizontal filter strip */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {KANDS.map((kand) => {
          const isActive = activeKand === kand.id;
          return (
            <button
              key={kand.id}
              onClick={() => onSelectKand(kand.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm shadow-amber-950'
                  : 'text-stone-300 hover:text-amber-200 bg-stone-900/60 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              {kand.name} ({kand.count})
            </button>
          );
        })}
      </div>

      {/* Selected Kand spiritual synopsis */}
      {currentKandObj && currentKandObj.desc && (
        <div className="text-xs text-amber-300/80 font-serif-in bg-amber-950/20 border border-amber-900/30 rounded-lg p-2.5 px-3.5">
          <span className="font-semibold text-amber-400">{currentKandObj.name}: </span>
          {currentKandObj.desc}
        </div>
      )}
    </div>
  );
};
