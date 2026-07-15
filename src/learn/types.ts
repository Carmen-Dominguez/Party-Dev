export type AgeMode = 'young' | 'tween';

export type AppView = 'learn' | 'tour';

export type CodeTab = 'html' | 'css' | 'js';

export type TeachableId = 'hero-title' | 'hero-bg' | 'hero-date' | 'hero-rsvp';

export interface TeachableElement {
  id: TeachableId;
  label: { young: string; tween: string };
  analogy: { young: string; tween: string };
  more: { young: string; tween: string };
  lessonId: string;
}

export interface HeroPreviewState {
  /** First line of the title, e.g. "Shirley's" */
  titleLine1: string;
  /** Emphasized second line, e.g. "Dinner Party" */
  titleLine2: string;
  /** Title text color (champagne by default) */
  titleColor: string;
  /** Emphasized line color (gold by default) */
  accentColor: string;
  /** Hero room / background color */
  bgColor: string;
  /** Title font size in rem */
  titleFontSize: number;
  /** Whether the whole title uses italic (fancy) style */
  titleItalic: boolean;
  /** RSVP button label */
  rsvpLabel: string;
  /** Message shown in alert() when RSVP is clicked */
  rsvpAlert: string;
}

export const DEFAULT_HERO_STATE: HeroPreviewState = {
  titleLine1: "Shirley's",
  titleLine2: 'Dinner Party',
  titleColor: '#F7E7CE',
  accentColor: '#ab9d03',
  bgColor: '#0a7261',
  titleFontSize: 3.5,
  titleItalic: false,
  rsvpLabel: 'RSVP',
  rsvpAlert: "You're invited! See you on 27 June.",
};

/** Clamp title size for the Lesson 2 slider / CSS parsing. */
export const TITLE_FONT_SIZE_MIN = 1.5;
export const TITLE_FONT_SIZE_MAX = 6;

/** Darken a #rrggbb color for the gradient's second stop. */
export function darkenHex(hex: string, amount = 0.18): string {
  const normalized = /^#[0-9a-fA-F]{6}$/.test(hex) ? hex : '#0a7261';
  const r = parseInt(normalized.slice(1, 3), 16);
  const g = parseInt(normalized.slice(3, 5), 16);
  const b = parseInt(normalized.slice(5, 7), 16);
  const darken = (channel: number) =>
    Math.max(0, Math.round(channel * (1 - amount)))
      .toString(16)
      .padStart(2, '0');
  return `#${darken(r)}${darken(g)}${darken(b)}`;
}
