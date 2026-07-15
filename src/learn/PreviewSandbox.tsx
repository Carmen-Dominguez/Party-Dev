import React, { useEffect, useMemo, useRef } from 'react';
import { useLearn } from './LearnContext';
import { buildHeroPreviewDocument } from './sandbox/heroPreview';
import type { TeachableId } from './types';

const VALID_IDS: TeachableId[] = [
  'hero-title',
  'hero-bg',
  'hero-date',
  'hero-rsvp',
];

/**
 * Live preview iframe. Receives click selections from the sandboxed document
 * via postMessage and rebuilds srcDoc whenever hero state changes.
 */
const PreviewSandbox: React.FC = () => {
  const { heroState, selectedId, selectElement, xray } = useLearn();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const srcDoc = useMemo(
    () =>
      buildHeroPreviewDocument(heroState, {
        selectedId,
        xray,
      }),
    [heroState, selectedId, xray],
  );

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || data.source !== 'party-learn' || data.type !== 'select') {
        return;
      }
      if (typeof data.id === 'string' && VALID_IDS.includes(data.id as TeachableId)) {
        selectElement(data.id as TeachableId);
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [selectElement]);

  return (
    <div className="preview-sandbox">
      <iframe
        ref={iframeRef}
        className="preview-sandbox__frame"
        title="Live party preview — click elements to inspect"
        srcDoc={srcDoc}
        sandbox="allow-scripts allow-modals"
      />
    </div>
  );
};

export default PreviewSandbox;
