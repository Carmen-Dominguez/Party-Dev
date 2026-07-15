import type { AgeMode, CodeTab, TeachableId } from './types';

export type LessonId = 'lesson-1' | 'lesson-2' | 'lesson-3';

export interface Lesson {
  id: LessonId;
  number: number;
  focusId: TeachableId;
  defaultTab: CodeTab;
  title: Record<AgeMode, string>;
  prompt: Record<AgeMode, string>;
  /** Short label for the “Next” button when this lesson is the destination */
  nextCta: Record<AgeMode, string>;
}

export const LESSONS: Lesson[] = [
  {
    id: 'lesson-1',
    number: 1,
    focusId: 'hero-title',
    defaultTab: 'html',
    title: {
      young: 'The skeleton (HTML)',
      tween: 'HTML — structure',
    },
    prompt: {
      young: 'Change the party name — HTML is the skeleton that holds the words.',
      tween: 'Edit the hero <h1>. Structure (HTML) and style (CSS) are separate layers.',
    },
    nextCta: {
      young: 'Next: skeleton →',
      tween: 'Lesson 1 →',
    },
  },
  {
    id: 'lesson-2',
    number: 2,
    focusId: 'hero-bg',
    defaultTab: 'css',
    title: {
      young: 'The clothes (CSS)',
      tween: 'CSS — style',
    },
    prompt: {
      young:
        'Dress the page! Paint the room, then click the title — try size and fancy (italic) clothes.',
      tween:
        'Change background, font-size, and font-style with CSS. The HTML skeleton stays the same.',
    },
    nextCta: {
      young: 'Next: clothes →',
      tween: 'Lesson 2 →',
    },
  },
  {
    id: 'lesson-3',
    number: 3,
    focusId: 'hero-rsvp',
    defaultTab: 'js',
    title: {
      young: 'The muscles (JavaScript)',
      tween: 'JavaScript — behavior',
    },
    prompt: {
      young: 'Tap the RSVP button — JavaScript is the muscles that make something happen!',
      tween: 'Add a click listener. alert() pops a message — that’s JavaScript in action.',
    },
    nextCta: {
      young: 'Next: muscles →',
      tween: 'Lesson 3 →',
    },
  },
];

/** Preset room colors for Young Explorers (from the party palette). */
export const BG_SWATCHES: { label: string; color: string }[] = [
  { label: 'Teal', color: '#0a7261' },
  { label: 'Wine', color: '#611a22' },
  { label: 'Gold', color: '#5c5420' },
  { label: 'Ocean', color: '#0d5c6b' },
];

/** Preset alert messages for Lesson 3 (Young Explorers). */
export const RSVP_ALERT_PRESETS: string[] = [
  "You're invited! See you on 27 June.",
  'Yay! See you at the dinner party!',
  'Thanks for coming — dress smart casual!',
  'Saved! Carmen & Shirley can’t wait.',
];
