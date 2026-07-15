import React, { useEffect, useMemo, useState } from 'react';
import { useLearn } from './LearnContext';
import { BG_SWATCHES, LESSONS, RSVP_ALERT_PRESETS } from './lessons';
import { TEACHABLES } from './teachables';
import {
  getHeroBgSnippets,
  getHeroDateSnippets,
  getHeroRsvpSnippets,
  getHeroTitleSnippets,
} from './sandbox/heroPreview';
import type { CodeTab, HeroPreviewState, TeachableId } from './types';
import {
  TITLE_FONT_SIZE_MAX,
  TITLE_FONT_SIZE_MIN,
} from './types';
import './InspectorPanel.scss';

const TABS: { id: CodeTab; young: string; tween: string; icon: string }[] = [
  { id: 'html', young: 'Skeleton', tween: 'HTML', icon: '📦' },
  { id: 'css', young: 'Clothes', tween: 'CSS', icon: '🎨' },
  { id: 'js', young: 'Muscles', tween: 'JS', icon: '⚡' },
];

function snippetsFor(id: TeachableId | null, heroState: HeroPreviewState) {
  if (id === 'hero-title') return getHeroTitleSnippets(heroState);
  if (id === 'hero-bg') return getHeroBgSnippets(heroState);
  if (id === 'hero-date') return getHeroDateSnippets();
  if (id === 'hero-rsvp') return getHeroRsvpSnippets(heroState);
  return null;
}

const InspectorPanel: React.FC = () => {
  const {
    ageMode,
    selectedId,
    activeTab,
    setActiveTab,
    heroState,
    setHeroState,
    resetHero,
    lessonId,
    goToLesson,
  } = useLearn();

  const teachable = selectedId ? TEACHABLES[selectedId] : null;
  const snippets = useMemo(
    () => snippetsFor(selectedId, heroState),
    [selectedId, heroState],
  );

  const lessonIndex = LESSONS.findIndex((lesson) => lesson.id === lessonId);
  const nextLesson = LESSONS[lessonIndex + 1];
  const prevLesson = LESSONS[lessonIndex - 1];

  const canonicalCode = snippets ? snippets[activeTab] : '';
  const canEditCode =
    ageMode === 'tween' &&
    ((selectedId === 'hero-title' && activeTab !== 'js') ||
      (selectedId === 'hero-bg' && activeTab === 'css') ||
      (selectedId === 'hero-rsvp' && (activeTab === 'html' || activeTab === 'js')));

  const [draft, setDraft] = useState(canonicalCode);

  useEffect(() => {
    setDraft(canonicalCode);
  }, [canonicalCode, selectedId, activeTab, ageMode]);

  const applyTitleHtml = (raw: string) => {
    const line1Match = raw.match(/<h1[^>]*>\s*([^<\n]+)/i);
    const emMatch = raw.match(/<em>([^<]*)<\/em>/i);
    if (!line1Match && !emMatch) return;
    setHeroState((prev) => ({
      ...prev,
      titleLine1: line1Match ? line1Match[1].trim() : prev.titleLine1,
      titleLine2: emMatch ? emMatch[1].trim() : prev.titleLine2,
    }));
  };

  const applyTitleCss = (raw: string) => {
    const block = raw.match(/\.hero__title\s*\{([^}]*)\}/i)?.[1] ?? '';
    const titleColor = block.match(/(?:^|;)\s*color:\s*([^;}\s]+)/i);
    const fontSize = block.match(/font-size:\s*([\d.]+)\s*rem/i);
    const fontStyle = block.match(/font-style:\s*(italic|normal)/i);
    const accentColor = raw.match(/\.hero__title\s+em\s*\{[^}]*color:\s*([^;}\s]+)/i);

    setHeroState((prev) => {
      const next = { ...prev };
      if (titleColor) next.titleColor = titleColor[1].trim();
      if (accentColor) next.accentColor = accentColor[1].trim();
      if (fontSize) {
        const size = Number.parseFloat(fontSize[1]);
        if (!Number.isNaN(size)) {
          next.titleFontSize = Math.min(
            TITLE_FONT_SIZE_MAX,
            Math.max(TITLE_FONT_SIZE_MIN, size),
          );
        }
      }
      if (fontStyle) next.titleItalic = fontStyle[1].toLowerCase() === 'italic';
      return next;
    });
  };

  const applyBgCss = (raw: string) => {
    const gradient = raw.match(
      /linear-gradient\s*\(\s*[^,]+,\s*([^,\s)]+)\s*,\s*([^)\s]+)\s*\)/i,
    );
    const solid = raw.match(/background(?:-color)?:\s*([^;}\s]+)/i);
    const next =
      gradient?.[2]?.trim() ||
      gradient?.[1]?.trim() ||
      solid?.[1]?.trim();
    if (!next || next.startsWith('linear')) return;
    setHeroState((prev) => ({ ...prev, bgColor: next }));
  };

  const applyRsvpHtml = (raw: string) => {
    const labelMatch = raw.match(/<button[^>]*>\s*([^<]+?)\s*<\/button>/i);
    if (!labelMatch) return;
    const label = labelMatch[1].trim();
    if (!label) return;
    setHeroState((prev) => ({ ...prev, rsvpLabel: label.slice(0, 40) }));
  };

  const applyRsvpJs = (raw: string) => {
    const alertMatch = raw.match(/alert\s*\(\s*['"]([\s\S]*?)['"]\s*\)/);
    if (!alertMatch) return;
    const message = alertMatch[1]
      .replace(/\\'/g, "'")
      .replace(/\\n/g, '\n')
      .replace(/\\\\/g, '\\');
    setHeroState((prev) => ({ ...prev, rsvpAlert: message.slice(0, 120) }));
  };

  const onCodeChange = (value: string) => {
    setDraft(value);
    if (!canEditCode) return;
    if (selectedId === 'hero-title' && activeTab === 'html') applyTitleHtml(value);
    if (selectedId === 'hero-title' && activeTab === 'css') applyTitleCss(value);
    if (selectedId === 'hero-bg' && activeTab === 'css') applyBgCss(value);
    if (selectedId === 'hero-rsvp' && activeTab === 'html') applyRsvpHtml(value);
    if (selectedId === 'hero-rsvp' && activeTab === 'js') applyRsvpJs(value);
  };

  const displayedCode = canEditCode ? draft : canonicalCode;

  const codeLabel =
    ageMode === 'young'
      ? 'Behind the scenes'
      : canEditCode
        ? `Editable ${activeTab.toUpperCase()}`
        : activeTab === 'js'
          ? 'JavaScript'
          : activeTab.toUpperCase();

  return (
    <aside className="inspector" aria-label="Code inspector">
      {!teachable || !snippets ? (
        <div className="inspector__empty">
          <p className="inspector__empty-title">
            {ageMode === 'young' ? 'Tap something on the party page!' : 'Select an element'}
          </p>
          <p className="inspector__empty-body">
            {ageMode === 'young'
              ? 'Click the title, the room, or the RSVP button.'
              : 'Click the hero title, background, or RSVP button to inspect HTML, CSS, and JS.'}
          </p>
        </div>
      ) : (
        <>
          <header className="inspector__header">
            <p className="inspector__eyebrow">
              {ageMode === 'young' ? 'You picked' : 'Selected'}
            </p>
            <h2 className="inspector__title">{teachable.label[ageMode]}</h2>
            <p className="inspector__analogy">{teachable.analogy[ageMode]}</p>
          </header>

          <div className="inspector__tabs" role="tablist" aria-label="Code layers">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`inspector__tab${activeTab === tab.id ? ' is-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span aria-hidden="true">{tab.icon}</span>
                {tab[ageMode === 'young' ? 'young' : 'tween']}
              </button>
            ))}
          </div>

          {selectedId === 'hero-title' && activeTab === 'html' && ageMode === 'young' && (
            <div className="inspector__controls">
              <label className="inspector__field">
                <span>First line of the name</span>
                <input
                  type="text"
                  value={heroState.titleLine1}
                  onChange={(e) =>
                    setHeroState((prev) => ({ ...prev, titleLine1: e.target.value }))
                  }
                  maxLength={40}
                />
              </label>
              <label className="inspector__field">
                <span>Fancy second line</span>
                <input
                  type="text"
                  value={heroState.titleLine2}
                  onChange={(e) =>
                    setHeroState((prev) => ({ ...prev, titleLine2: e.target.value }))
                  }
                  maxLength={40}
                />
              </label>
              <p className="inspector__hint">
                Watch the party page update — and peek at the code below!
              </p>
            </div>
          )}

          {selectedId === 'hero-title' && activeTab === 'css' && ageMode === 'young' && (
            <div className="inspector__controls">
              <label className="inspector__field inspector__field--inline">
                <span>Title color</span>
                <input
                  type="color"
                  value={toHexColor(heroState.titleColor)}
                  onChange={(e) =>
                    setHeroState((prev) => ({ ...prev, titleColor: e.target.value }))
                  }
                  aria-label="Title color"
                />
              </label>
              <label className="inspector__field inspector__field--inline">
                <span>Fancy line color</span>
                <input
                  type="color"
                  value={toHexColor(heroState.accentColor)}
                  onChange={(e) =>
                    setHeroState((prev) => ({ ...prev, accentColor: e.target.value }))
                  }
                  aria-label="Accent color"
                />
              </label>
              <label className="inspector__field">
                <span className="inspector__slider-label">
                  How big?
                  <em>{heroState.titleFontSize.toFixed(1)} rem</em>
                </span>
                <input
                  type="range"
                  min={TITLE_FONT_SIZE_MIN}
                  max={TITLE_FONT_SIZE_MAX}
                  step={0.25}
                  value={heroState.titleFontSize}
                  onChange={(e) =>
                    setHeroState((prev) => ({
                      ...prev,
                      titleFontSize: Number.parseFloat(e.target.value),
                    }))
                  }
                  aria-label="Title size"
                />
              </label>
              <label className="inspector__toggle">
                <input
                  type="checkbox"
                  checked={heroState.titleItalic}
                  onChange={(e) =>
                    setHeroState((prev) => ({
                      ...prev,
                      titleItalic: e.target.checked,
                    }))
                  }
                />
                <span>Fancy italic</span>
              </label>
              <p className="inspector__hint">
                Same words, new outfit — size, color, and fancy tilt are all CSS clothes!
              </p>
            </div>
          )}

          {selectedId === 'hero-bg' && activeTab === 'css' && ageMode === 'young' && (
            <div className="inspector__controls">
              <p className="inspector__swatch-label">Pick a room color</p>
              <div className="inspector__swatches" role="group" aria-label="Background colors">
                {BG_SWATCHES.map((swatch) => (
                  <button
                    key={swatch.color}
                    type="button"
                    className={`inspector__swatch${
                      heroState.bgColor.toLowerCase() === swatch.color.toLowerCase()
                        ? ' is-active'
                        : ''
                    }`}
                    style={{ backgroundColor: swatch.color }}
                    aria-label={swatch.label}
                    aria-pressed={
                      heroState.bgColor.toLowerCase() === swatch.color.toLowerCase()
                    }
                    onClick={() =>
                      setHeroState((prev) => ({ ...prev, bgColor: swatch.color }))
                    }
                  />
                ))}
              </div>
              <label className="inspector__field inspector__field--inline">
                <span>Or mix your own</span>
                <input
                  type="color"
                  value={toHexColor(heroState.bgColor)}
                  onChange={(e) =>
                    setHeroState((prev) => ({ ...prev, bgColor: e.target.value }))
                  }
                  aria-label="Background color"
                />
              </label>
              <p className="inspector__hint">
                The party name stayed put — you only changed the clothes (CSS)!
              </p>
            </div>
          )}

          {selectedId === 'hero-rsvp' && activeTab === 'js' && ageMode === 'young' && (
            <div className="inspector__controls">
              <label className="inspector__field">
                <span>Button says</span>
                <input
                  type="text"
                  value={heroState.rsvpLabel}
                  onChange={(e) =>
                    setHeroState((prev) => ({ ...prev, rsvpLabel: e.target.value }))
                  }
                  maxLength={24}
                  aria-label="RSVP button label"
                />
              </label>
              <label className="inspector__field">
                <span>When tapped, alert says</span>
                <select
                  value={
                    RSVP_ALERT_PRESETS.includes(heroState.rsvpAlert)
                      ? heroState.rsvpAlert
                      : RSVP_ALERT_PRESETS[0]
                  }
                  onChange={(e) =>
                    setHeroState((prev) => ({ ...prev, rsvpAlert: e.target.value }))
                  }
                  aria-label="RSVP alert message"
                >
                  {RSVP_ALERT_PRESETS.map((message) => (
                    <option key={message} value={message}>
                      {message}
                    </option>
                  ))}
                </select>
              </label>
              <p className="inspector__hint">
                Now tap the gold RSVP button on the party page — a pop-up appears. Muscles!
              </p>
            </div>
          )}

          <div className="inspector__code-wrap">
            <label className="inspector__code-label" htmlFor="inspector-code">
              {codeLabel}
            </label>
            <textarea
              id="inspector-code"
              className="inspector__code"
              value={displayedCode}
              readOnly={!canEditCode}
              spellCheck={false}
              onChange={(e) => onCodeChange(e.target.value)}
              rows={12}
              aria-label={`${activeTab} code`}
            />
          </div>

          <details className="inspector__more">
            <summary>
              {ageMode === 'young' ? 'Tell me more' : 'Learn more'}
            </summary>
            <p>{teachable.more[ageMode]}</p>
          </details>

          <div className="inspector__actions">
            <button type="button" className="inspector__reset" onClick={resetHero}>
              {ageMode === 'young' ? 'Start over' : 'Reset'}
            </button>
            {prevLesson && (
              <button
                type="button"
                className="inspector__nav"
                onClick={() => goToLesson(prevLesson.id)}
              >
                ← Lesson {prevLesson.number}
              </button>
            )}
            {nextLesson && (
              <button
                type="button"
                className="inspector__nav inspector__nav--next"
                onClick={() => goToLesson(nextLesson.id)}
              >
                {nextLesson.nextCta[ageMode]}
              </button>
            )}
          </div>
        </>
      )}
    </aside>
  );
};

/** Normalize named/partial colors to #rrggbb for <input type="color">. */
function toHexColor(value: string): string {
  if (/^#[0-9a-fA-F]{6}$/.test(value)) return value;
  if (/^#[0-9a-fA-F]{3}$/.test(value)) {
    const r = value[1];
    const g = value[2];
    const b = value[3];
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  return '#F7E7CE';
}

export default InspectorPanel;
