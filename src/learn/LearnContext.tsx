import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { LESSONS, type LessonId } from './lessons';
import {
  DEFAULT_HERO_STATE,
  type AgeMode,
  type AppView,
  type CodeTab,
  type HeroPreviewState,
  type TeachableId,
} from './types';

interface LearnContextValue {
  ageMode: AgeMode;
  setAgeMode: (mode: AgeMode) => void;
  view: AppView;
  setView: (view: AppView) => void;
  lessonId: LessonId;
  setLessonId: (id: LessonId) => void;
  goToLesson: (id: LessonId) => void;
  selectedId: TeachableId | null;
  selectElement: (id: TeachableId | null) => void;
  activeTab: CodeTab;
  setActiveTab: (tab: CodeTab) => void;
  xray: boolean;
  setXray: (on: boolean) => void;
  heroState: HeroPreviewState;
  setHeroState: React.Dispatch<React.SetStateAction<HeroPreviewState>>;
  resetHero: () => void;
}

const LearnContext = createContext<LearnContextValue | null>(null);

export const LearnProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ageMode, setAgeMode] = useState<AgeMode>('young');
  const [view, setView] = useState<AppView>('learn');
  const [lessonId, setLessonId] = useState<LessonId>('lesson-1');
  const [selectedId, setSelectedId] = useState<TeachableId | null>('hero-title');
  const [activeTab, setActiveTab] = useState<CodeTab>('html');
  const [xray, setXray] = useState(false);
  const [heroState, setHeroState] = useState<HeroPreviewState>(DEFAULT_HERO_STATE);

  const selectElement = useCallback((id: TeachableId | null) => {
    setSelectedId(id);
    if (id === 'hero-title') setActiveTab('html');
    if (id === 'hero-bg') setActiveTab('css');
    if (id === 'hero-date') setActiveTab('html');
    if (id === 'hero-rsvp') setActiveTab('js');
  }, []);

  const goToLesson = useCallback((id: LessonId) => {
    const lesson = LESSONS.find((item) => item.id === id);
    if (!lesson) return;
    setLessonId(id);
    setSelectedId(lesson.focusId);
    setActiveTab(lesson.defaultTab);
  }, []);

  const resetHero = useCallback(() => {
    setHeroState(DEFAULT_HERO_STATE);
  }, []);

  const value = useMemo(
    () => ({
      ageMode,
      setAgeMode,
      view,
      setView,
      lessonId,
      setLessonId,
      goToLesson,
      selectedId,
      selectElement,
      activeTab,
      setActiveTab,
      xray,
      setXray,
      heroState,
      setHeroState,
      resetHero,
    }),
    [
      ageMode,
      view,
      lessonId,
      goToLesson,
      selectedId,
      selectElement,
      activeTab,
      xray,
      heroState,
      resetHero,
    ],
  );

  return (
    <LearnContext.Provider value={value}>{children}</LearnContext.Provider>
  );
};

export function useLearn(): LearnContextValue {
  const ctx = useContext(LearnContext);
  if (!ctx) {
    throw new Error('useLearn must be used within LearnProvider');
  }
  return ctx;
}
