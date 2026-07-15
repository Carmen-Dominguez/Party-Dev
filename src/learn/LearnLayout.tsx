import React, { useMemo } from 'react';
import { useLearn } from './LearnContext';
import { LESSONS } from './lessons';
import PreviewSandbox from './PreviewSandbox';
import InspectorPanel from './InspectorPanel';
import './LearnLayout.scss';

/**
 * Learn mode shell: age toggle, lesson rail, live preview, and inspector.
 */
const LearnLayout: React.FC = () => {
  const { ageMode, setAgeMode, setView, xray, setXray, lessonId, goToLesson } =
    useLearn();

  const lesson = useMemo(
    () => LESSONS.find((item) => item.id === lessonId) ?? LESSONS[0],
    [lessonId],
  );

  return (
    <div className="learn-layout">
      <header className="learn-header">
        <div className="learn-header__brand">
          <span className="learn-header__kicker">Web playground</span>
          <span className="learn-header__name">Party Page Lab</span>
        </div>

        <div className="learn-header__controls">
          <div className="learn-toggle" role="group" aria-label="Age mode">
            <button
              type="button"
              className={`learn-toggle__btn${ageMode === 'young' ? ' is-active' : ''}`}
              onClick={() => setAgeMode('young')}
            >
              Young Explorers
            </button>
            <button
              type="button"
              className={`learn-toggle__btn${ageMode === 'tween' ? ' is-active' : ''}`}
              onClick={() => setAgeMode('tween')}
            >
              Code Builders
            </button>
          </div>

          {ageMode === 'tween' && (
            <label className="learn-header__xray">
              <input
                type="checkbox"
                checked={xray}
                onChange={(e) => setXray(e.target.checked)}
              />
              X-ray tags
            </label>
          )}

          <button
            type="button"
            className="learn-toggle__btn"
            onClick={() => setView('tour')}
          >
            See finished party
          </button>
        </div>

        <div className="learn-header__lesson-row">
          <nav className="learn-lessons" aria-label="Lessons">
            {LESSONS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`learn-lessons__btn${lessonId === item.id ? ' is-active' : ''}`}
                aria-current={lessonId === item.id ? 'step' : undefined}
                onClick={() => goToLesson(item.id)}
              >
                {item.number}
              </button>
            ))}
          </nav>
          <p className="learn-header__lesson">
            <strong>
              Lesson {lesson.number}: {lesson.title[ageMode]}
            </strong>{' '}
            {lesson.prompt[ageMode]}
          </p>
        </div>
      </header>

      <div className="learn-body">
        <PreviewSandbox />
        <InspectorPanel />
      </div>
    </div>
  );
};

export default LearnLayout;
