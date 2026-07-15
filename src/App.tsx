import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { LearnProvider, useLearn } from './learn/LearnContext';
import LearnLayout from './learn/LearnLayout';
import TourMode from './learn/TourMode';

/**
 * Root application — Learn mode (editable playground) or Tour mode
 * (original dinner-party brochure used as the teaching example).
 */
const AppShell: React.FC = () => {
  const { view } = useLearn();

  return (
    <>
      {view === 'learn' ? <LearnLayout /> : <TourMode />}
      <Analytics />
    </>
  );
};

const App: React.FC = () => {
  return (
    <LearnProvider>
      <AppShell />
    </LearnProvider>
  );
};

export default App;
