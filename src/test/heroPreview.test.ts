import { describe, it, expect } from 'vitest';
import {
  buildHeroPreviewDocument,
  getHeroBgSnippets,
  getHeroRsvpSnippets,
  getHeroTitleSnippets,
} from '../learn/sandbox/heroPreview';
import { DEFAULT_HERO_STATE, darkenHex } from '../learn/types';

describe('heroPreview sandbox', () => {
  it('builds a document with teachable data attributes', () => {
    const doc = buildHeroPreviewDocument(DEFAULT_HERO_STATE, {
      selectedId: 'hero-title',
      xray: false,
    });

    expect(doc).toContain('data-teach="hero-title"');
    expect(doc).toContain('data-teach="hero-bg"');
    expect(doc).toContain('data-teach="hero-rsvp"');
    expect(doc).toContain('data-selected="true"');
    expect(doc).toContain("Shirley's");
    expect(doc).toContain('Dinner Party');
    expect(doc).toContain('party-learn');
    expect(doc).toContain('#0a7261');
    expect(doc).toContain('alert(');
  });

  it('escapes HTML in title lines', () => {
    const doc = buildHeroPreviewDocument(
      { ...DEFAULT_HERO_STATE, titleLine1: '<script>', titleLine2: 'Party & Fun' },
      { selectedId: null, xray: false },
    );

    expect(doc).toContain('&lt;script&gt;');
    expect(doc).toContain('Party &amp; Fun');
    expect(doc).not.toContain("titleLine1: '<script>'");
  });

  it('serializes title snippets for the inspector', () => {
    const snippets = getHeroTitleSnippets({
      ...DEFAULT_HERO_STATE,
      titleColor: '#ff0000',
      titleFontSize: 4.5,
      titleItalic: true,
    });

    expect(snippets.html).toContain('<h1');
    expect(snippets.css).toContain('color: #ff0000');
    expect(snippets.css).toContain('font-size: 4.5rem');
    expect(snippets.css).toContain('font-style: italic');
    expect(snippets.js).toMatch(/rsvp/i);
  });

  it('applies title size and italic in the preview document', () => {
    const doc = buildHeroPreviewDocument(
      { ...DEFAULT_HERO_STATE, titleFontSize: 5, titleItalic: true },
      { selectedId: 'hero-title', xray: false },
    );

    expect(doc).toContain('font-size: 5rem');
    expect(doc).toContain('font-style: italic');
  });

  it('serializes background snippets with the chosen room color', () => {
    const snippets = getHeroBgSnippets({
      ...DEFAULT_HERO_STATE,
      bgColor: '#611a22',
    });

    expect(snippets.css).toContain('#611a22');
    expect(snippets.css).toContain(darkenHex('#611a22'));
    expect(snippets.css).toMatch(/linear-gradient/i);
  });

  it('darkens hex colors for the gradient stop', () => {
    expect(darkenHex('#0a7261')).toMatch(/^#[0-9a-f]{6}$/i);
    expect(darkenHex('#0a7261')).not.toBe('#0a7261');
  });

  it('serializes RSVP snippets with alert', () => {
    const snippets = getHeroRsvpSnippets({
      ...DEFAULT_HERO_STATE,
      rsvpLabel: 'Count me in',
      rsvpAlert: 'Hello party!',
    });

    expect(snippets.html).toContain('Count me in');
    expect(snippets.js).toContain("alert('Hello party!')");
    expect(snippets.js).toContain('addEventListener');
  });

  it('escapes alert text in the preview script', () => {
    const doc = buildHeroPreviewDocument(
      { ...DEFAULT_HERO_STATE, rsvpAlert: "It's party time!" },
      { selectedId: 'hero-rsvp', xray: false },
    );

    expect(doc).toContain("alert('It\\'s party time!')");
  });
});
