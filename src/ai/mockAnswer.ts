// TEMPORARY scripted answers so we can build and test the UI.
// Week 4+ replaces this with the real on-device pipeline (same return shape).
export type Trace = { c: number; signals: [string, number][]; why: string };
export type Answer = { text: string; source: string; trace: Trace };

export function mockAnswer(question: string, online: boolean): Answer {
  const q = question.toLowerCase();
  if (q.includes('sky')) {
    return {
      text: 'Sunlight contains all colors. Air molecules scatter short blue light far more than red, so blue reaches your eyes from every direction.',
      source: 'Simple Wikipedia: Rayleigh scattering',
      trace: { c: 88, signals: [['Library match', 92], ['Matches source', 90], ['Model certainty', 81]], why: 'Close library match, and the answer agrees with the source text.' },
    };
  }
  if (q.includes('photo')) {
    return {
      text: 'Plants use sunlight, water and carbon dioxide to make sugar (food) and release oxygen. It happens in chloroplasts, using chlorophyll.',
      source: 'Offline pack: Biology Basics',
      trace: { c: 84, signals: [['Library match', 88], ['Matches source', 86], ['Model certainty', 78]], why: 'Good match found and the answer stays within the source.' },
    };
  }
  if (/news|score|latest|price/.test(q)) {
    return online
      ? {
          text: 'Live search found a fresh result (demo). Summarized by the on-device model.',
          source: 'Web search',
          trace: { c: 62, signals: [['Source freshness', 80], ['Sources agree', 55], ['Model certainty', 52]], why: 'Live pages can disagree, so check the linked source yourself.' },
        }
      : {
          text: "I can't check live information while offline. Switch to Online mode for this.",
          source: 'No source',
          trace: { c: 5, signals: [['Library match', 0], ['Fresh data', 0], ['Model certainty', 20]], why: 'Live facts need the internet, so I decline instead of guessing.' },
        };
  }
  return {
    text: "I couldn't find this in my offline library, so I won't guess.",
    source: 'Library: no match',
    trace: { c: 10, signals: [['Library match', 14], ['Matches source', 0], ['Model certainty', 35]], why: 'No library match, so any answer would be a guess.' },
  };
}
