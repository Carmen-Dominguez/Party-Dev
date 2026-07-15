import type { HeroPreviewState } from '../types';
import { darkenHex } from '../types';

/**
 * Builds a self-contained HTML document for the learn-mode iframe.
 * Mirrors the dinner-party Hero look without pulling in the React app.
 */
export function buildHeroPreviewDocument(
  state: HeroPreviewState,
  options: { selectedId: string | null; xray: boolean } = {
    selectedId: null,
    xray: false,
  },
): string {
  const {
    titleLine1,
    titleLine2,
    titleColor,
    accentColor,
    bgColor,
    titleFontSize,
    titleItalic,
    rsvpLabel,
    rsvpAlert,
  } = state;
  const bgDark = darkenHex(bgColor);
  const titleStyle = titleItalic ? 'italic' : 'normal';
  const { selectedId, xray } = options;

  const selectedAttr = (id: string) =>
    selectedId === id ? ' data-selected="true"' : '';

  const xrayLabel = (tag: string) =>
    xray ? `<span class="xray" aria-hidden="true">${tag}</span>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Montserrat:wght@300;400&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      height: 100%;
      font-family: 'Montserrat', sans-serif;
      background: ${bgColor};
      color: #F7E7CE;
    }
    body {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100%;
      background: linear-gradient(45deg, ${bgDark}, ${bgColor});
      overflow: hidden;
    }
    .hero {
      position: relative;
      width: 100%;
      min-height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem;
      text-align: center;
      background: linear-gradient(45deg, ${bgDark}, ${bgColor});
    }
    .hero__bg-grid {
      position: absolute;
      inset: 0;
      background-image: radial-gradient(circle 1px at 1px 1px, rgba(171, 157, 3, 0.08) 0%, transparent 0%);
      background-size: 36px 36px;
      pointer-events: none;
    }
    .hero__inner { position: relative; z-index: 1; max-width: 860px; }
    .hero__starburst {
      font-size: 0.7rem;
      letter-spacing: 0.5em;
      color: #ab9d03;
      opacity: 0.65;
      margin-bottom: 1rem;
    }
    .section__overline {
      display: block;
      font-size: 0.7rem;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: rgba(247, 231, 206, 0.72);
      margin-bottom: 1rem;
    }
    .hero__title {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: ${titleFontSize}rem;
      font-style: ${titleStyle};
      font-weight: 300;
      line-height: 1;
      color: ${titleColor};
      letter-spacing: 0.02em;
      margin-bottom: 1rem;
      cursor: pointer;
      outline: none;
      position: relative;
      border-radius: 4px;
      transition: box-shadow 0.2s ease, font-size 0.2s ease;
    }
    .hero__title em {
      font-style: ${titleStyle};
      color: ${accentColor};
      font-size: 0.85em;
      font-weight: 300;
    }
    .hero__date {
      font-size: clamp(0.7rem, 2vw, 0.9rem);
      font-weight: 400;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: rgba(247, 231, 206, 0.72);
      margin-bottom: 0.5rem;
      cursor: pointer;
      border-radius: 4px;
      padding: 0.25rem 0.5rem;
      display: inline-block;
    }
    .hero__location-hint {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: clamp(0.95rem, 2.5vw, 1.2rem);
      font-style: italic;
      color: #e8d4b0;
      opacity: 0.85;
      margin-bottom: 1rem;
    }
    .hero__rsvp {
      display: inline-block;
      margin: 0.5rem 0 1.25rem;
      padding: 0.75rem 1.6rem;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.7rem;
      font-weight: 500;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #0e0e0e;
      background: #ab9d03;
      border: 1px solid transparent;
      cursor: pointer;
      position: relative;
      transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
    }
    .hero__rsvp:hover,
    .hero__rsvp:focus-visible {
      background: #c4b41a;
      transform: scale(1.04);
      outline: none;
    }
    .hero__border {
      width: 100%;
      max-width: 220px;
      height: 1px;
      background: linear-gradient(90deg, transparent, #ab9d03, transparent);
      margin: 0 auto;
      opacity: 0.5;
    }
    .ornament { margin: 1rem 0; color: #ab9d03; }
    [data-teach] { position: relative; }
    [data-teach]:hover {
      box-shadow: 0 0 0 2px rgba(171, 157, 3, 0.55);
    }
    [data-selected="true"] {
      box-shadow: 0 0 0 3px #ab9d03 !important;
    }
    .xray {
      position: absolute;
      top: -0.55rem;
      left: 0;
      font-family: ui-monospace, monospace;
      font-size: 0.55rem;
      letter-spacing: 0.04em;
      background: #ab9d03;
      color: #0e0e0e;
      padding: 0.1rem 0.35rem;
      border-radius: 2px;
      pointer-events: none;
      text-transform: none;
      font-weight: 600;
    }
    .hint {
      position: absolute;
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.7rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(247, 231, 206, 0.45);
      white-space: nowrap;
    }
  </style>
</head>
<body>
  <div class="hero" data-teach="hero-bg"${selectedAttr('hero-bg')}>
    <div class="hero__bg-grid" aria-hidden="true"></div>
    <div class="hero__inner">
      <p class="hero__starburst" aria-hidden="true">✦ &nbsp; ✦ &nbsp; ✦</p>
      <span class="section__overline">You are cordially invited</span>
      <h1 class="hero__title" data-teach="hero-title"${selectedAttr('hero-title')} tabindex="0">
        ${xrayLabel('<h1>')}
        ${escapeHtml(titleLine1)}
        <br />
        <em>${escapeHtml(titleLine2)}</em>
      </h1>
      <div class="ornament" aria-hidden="true">✦</div>
      <p class="hero__date" data-teach="hero-date"${selectedAttr('hero-date')} tabindex="0">
        ${xrayLabel('<p>')}
        27 June — 18:00
      </p>
      <p class="hero__location-hint">Gardens, Cape Town</p>
      <button
        type="button"
        class="hero__rsvp"
        data-teach="hero-rsvp"${selectedAttr('hero-rsvp')}
      >
        ${xrayLabel('<button>')}
        ${escapeHtml(rsvpLabel)}
      </button>
      <div class="hero__border" aria-hidden="true"></div>
    </div>
    <p class="hint">Click something to peek at its code</p>
  </div>
  <script>
    (function () {
      function select(id) {
        window.parent.postMessage({ source: 'party-learn', type: 'select', id: id }, '*');
      }
      document.querySelectorAll('[data-teach]').forEach(function (el) {
        el.addEventListener('click', function (e) {
          e.stopPropagation();
          select(el.getAttribute('data-teach'));
        });
        el.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            select(el.getAttribute('data-teach'));
          }
        });
      });

      var rsvpBtn = document.querySelector('.hero__rsvp');
      if (rsvpBtn) {
        rsvpBtn.addEventListener('click', function () {
          alert('${escapeJs(rsvpAlert)}');
        });
      }
    })();
  </script>
</body>
</html>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeJs(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r/g, '')
    .replace(/\n/g, '\\n');
}

/** Serialized snippets shown in the inspector for the hero title element. */
export function getHeroTitleSnippets(state: HeroPreviewState): {
  html: string;
  css: string;
  js: string;
} {
  return {
    html: `<h1 class="hero__title">
  ${state.titleLine1}
  <br />
  <em>${state.titleLine2}</em>
</h1>`,
    css: `.hero__title {
  font-family: 'Cormorant Garamond', serif;
  font-size: ${state.titleFontSize}rem;
  font-style: ${state.titleItalic ? 'italic' : 'normal'};
  color: ${state.titleColor};
}

.hero__title em {
  color: ${state.accentColor};
  font-style: ${state.titleItalic ? 'italic' : 'normal'};
}`,
    js: `// No JavaScript on this title yet.
// Open Lesson 3 and try the RSVP button!`,
  };
}

export function getHeroBgSnippets(state: HeroPreviewState): {
  html: string;
  css: string;
  js: string;
} {
  const bgDark = darkenHex(state.bgColor);
  return {
    html: `<section class="hero">
  <!-- Same skeleton as before -->
  <h1>${state.titleLine1}…</h1>
</section>`,
    css: `.hero {
  background: linear-gradient(
    45deg,
    ${bgDark},
    ${state.bgColor}
  );
}`,
    js: `// Backgrounds are styled with CSS.
// No JavaScript needed to paint the room.`,
  };
}

export function getHeroDateSnippets(): {
  html: string;
  css: string;
  js: string;
} {
  return {
    html: `<p class="hero__date">
  27 June — 18:00
</p>`,
    css: `.hero__date {
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(247, 231, 206, 0.72);
}`,
    js: `// Static text — no JavaScript yet.`,
  };
}

export function getHeroRsvpSnippets(state: HeroPreviewState): {
  html: string;
  css: string;
  js: string;
} {
  return {
    html: `<button type="button" class="hero__rsvp">
  ${state.rsvpLabel}
</button>`,
    css: `.hero__rsvp {
  padding: 0.75rem 1.6rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  background: #ab9d03;
  color: #0e0e0e;
  border: none;
  cursor: pointer;
}`,
    js: `const rsvpBtn = document.querySelector('.hero__rsvp');

rsvpBtn.addEventListener('click', function () {
  alert('${escapeJs(state.rsvpAlert)}');
});`,
  };
}
