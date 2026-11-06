import React, { useState } from 'react';
import { TechnicalSkillsCategory, IdentifiedSkill } from '../types';
import { Code2, Search, CheckCircle2, ListFilter, HelpCircle, Layers } from 'lucide-react';

interface TechnicalSkillsSectionProps {
  categories: TechnicalSkillsCategory[];
}

export const TechnicalSkillsSection: React.FC<TechnicalSkillsSectionProps> = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allSkills = categories.flatMap((cat) =>
    cat.skills.map((skill) => ({ ...skill, categoryName: cat.category }))
  );

  const filteredCategories = categories
    .map((cat) => {
      const filtered = cat.skills.filter((s) => {
        const matchesCategory = selectedCategory === 'all' || cat.category === selectedCategory;
        const matchesSearch =
          searchQuery.trim() === '' ||
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.contextQuoteOrNote.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });
      return { ...cat, skills: filtered };
    })
    .filter((cat) => cat.skills.length > 0);

  const totalIdentified = allSkills.length;
  const demonstratedCount = allSkills.filter((s) => s.levelOfEvidence === 'Demonstrated in Projects').length;
  const listedOnlyCount = allSkills.filter((s) => s.levelOfEvidence === 'Listed in Skills Only').length;

  const getEvidenceBadge = (level: IdentifiedSkill['levelOfEvidence']) => {
    switch (level) {
      case 'Demonstrated in Projects':
        return (
          <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Demonstrated with Project Evidence
          </span>
        );
      case 'Listed in Skills Only':
        return (
          <span className="text-[11px] font-medium text-amber-700 dark:text-amber-400 flex items-center gap-1">
            <ListFilter className="w-3.5 h-3.5" />
            Listed in Skills Bank Only
          </span>
        );
      case 'Implied':
      default:
        return (
          <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" />
            Implied from Context
          </span>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
      {/* Header & Metric Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Code2 className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Identified Technical Skills
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
            <span>
              <strong className="font-mono tabular-nums font-semibold text-slate-700 dark:text-slate-300">
                {totalIdentified}
              </strong>{' '}
              Technical Skills Detected
            </span>
            <span aria-hidden="true">·</span>
            <span>
              <strong className="font-mono tabular-nums font-semibold text-emerald-600 dark:text-emerald-400">
                {demonstratedCount}
              </strong>{' '}
              Demonstrated
            </span>
            <span aria-hidden="true">·</span>
            <span>
              <strong className="font-mono tabular-nums font-semibold text-amber-600 dark:text-amber-400">
                {listedOnlyCount}
              </strong>{' '}
              Listed Only
            </span>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skill (e.g. React, Docker)..."
            className="w-full text-xs pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-100"
          />
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          All Categories ({totalIdentified})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.category}
            onClick={() => setSelectedCategory(cat.category)}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              selectedCategory === cat.category
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {cat.category} ({cat.skills.length})
          </button>
        ))}
      </div>

      {/* Skills Grid by Category */}
      {filteredCategories.length === 0 ? (
        <div className="text-center py-8 text-xs text-slate-500 dark:text-slate-400">
          No skills matched your search query "{searchQuery}".
        </div>
      ) : (
        <div className="space-y-5">
          {filteredCategories.map((catGroup) => (
            <div key={catGroup.category} className="space-y-2.5">
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  {catGroup.category}
                </h4>
                <span className="text-[11px] text-slate-400 font-mono tabular-nums">
                  ({catGroup.skills.length})
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {catGroup.skills.map((skill, idx) => (
                  <div
                    key={`${skill.name}-${idx}`}
                    className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 hover:bg-white dark:hover:bg-slate-900 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {skill.name}
                      </span>
                      {getEvidenceBadge(skill.levelOfEvidence)}
                    </div>
                    {skill.contextQuoteOrNote && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                        {skill.contextQuoteOrNote}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Honest Tip footer */}
      <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
        <strong className="text-slate-900 dark:text-slate-100">ATS Recruiter Insight:</strong> Skills marked as "Listed in Skills Bank Only" pass initial keyword filters, but human hiring managers search for concrete project outcomes (e.g. latency reductions, scale, user adoption) before scheduling interviews.
      </div>
    </div>
  );
};
