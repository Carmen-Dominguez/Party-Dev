import type { TeachableElement } from './types';

export const TEACHABLES: Record<string, TeachableElement> = {
  'hero-title': {
    id: 'hero-title',
    lessonId: 'lesson-1',
    label: {
      young: 'The big party name',
      tween: 'Hero title (<h1>)',
    },
    analogy: {
      young: 'HTML is the skeleton — it holds the words up. Change the words and the skeleton stays the same shape!',
      tween: 'HTML builds the structure. This <h1> is the main heading. CSS paints it; JavaScript isn’t needed yet.',
    },
    more: {
      young: 'The page is made of tags like building blocks. <h1> means “biggest title.” You swapped the words inside the block — nice work!',
      tween: 'Tags come in pairs: <h1>…</h1>. The text between them is what visitors read. CSS rules like color, font-size, and font-style dress the same skeleton differently.',
    },
  },
  'hero-bg': {
    id: 'hero-bg',
    lessonId: 'lesson-2',
    label: {
      young: 'The room’s color',
      tween: 'Hero background (.hero)',
    },
    analogy: {
      young: 'CSS is the clothes — same skeleton, different outfit! You’re painting the room behind the party name.',
      tween: 'CSS controls how things look. background lives in stylesheets — completely separate from the HTML words.',
    },
    more: {
      young: 'You didn’t change the party name — only how the room looks. That’s CSS (the clothes)! Try the title next: make it bigger or fancy.',
      tween: 'A linear-gradient blends two colors. Click the title and edit font-size / font-style too — still just CSS.',
    },
  },
  'hero-date': {
    id: 'hero-date',
    lessonId: 'lesson-1',
    label: {
      young: 'The date line',
      tween: 'Date line',
    },
    analogy: {
      young: 'Another piece of the skeleton — smaller words under the big title.',
      tween: 'A <p> paragraph holds supporting text. Same HTML idea as the title, different tag.',
    },
    more: {
      young: 'Websites stack blocks: big title, then smaller info. You can change each block!',
      tween: 'Semantic tags (<h1>, <p>) tell browsers and screen readers what each piece means — not just how it looks.',
    },
  },
  'hero-rsvp': {
    id: 'hero-rsvp',
    lessonId: 'lesson-3',
    label: {
      young: 'The RSVP button',
      tween: 'RSVP button (<button>)',
    },
    analogy: {
      young: 'JavaScript is the muscles! The button was already there (skeleton + clothes). Muscles make it do something when you tap.',
      tween: 'JavaScript handles events. addEventListener("click", …) runs code when the button is pressed — here it calls alert().',
    },
    more: {
      young: 'You didn’t change the words or the color — you taught the button what to do. That’s the muscles!',
      tween: 'alert() is a simple built-in. Real sites often update the page instead, but the idea is the same: listen for a click, then run code.',
    },
  },
};
