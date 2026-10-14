import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import type { Language } from './translations';

const FeatureDetailPage = lazy(() =>
  import('./components/FeatureDetailPage').then((m) => ({ default: m.FeatureDetailPage }))
);
const ChangelogPage = lazy(() =>
  import('./components/ChangelogPage').then((m) => ({ default: m.ChangelogPage }))
);

export const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    const saved = localStorage.getItem('peekly_lang') as Language;
    return saved || 'en';
  });

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('peekly_lang', lang);
  };

  useEffect(() => {
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const [activeFeatureId, setActiveFeatureId] = useState<string | null>(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#feature/')) {
      return hash.replace('#feature/', '');
    }
    return null;
  });
  const [isChangelog, setIsChangelog] = useState<boolean>(() => {
    return window.location.hash === '#changelog';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#feature/')) {
        setActiveFeatureId(hash.replace('#feature/', ''));
        setIsChangelog(false);
      } else if (hash === '#changelog') {
        setIsChangelog(true);
        setActiveFeatureId(null);
      } else {
        setActiveFeatureId(null);
        setIsChangelog(false);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectFeature = (id: string) => {
    setIsChangelog(false);
    setActiveFeatureId(id);
    window.location.hash = `#feature/${id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenChangelog = () => {
    setActiveFeatureId(null);
    setIsChangelog(true);
    window.location.hash = '#changelog';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setActiveFeatureId(null);
    setIsChangelog(false);
    if (window.location.hash.startsWith('#feature/') || window.location.hash === '#changelog') {
      history.pushState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-[#FF5500] selection:text-black font-sans antialiased relative">
      {/* 1. Fixed Header with separated logo hover, white online dot & terminal changelog */}
      <Header 
        currentLang={currentLang} 
        onLanguageChange={handleLanguageChange}
        onGoHome={handleGoHome}
        onOpenChangelog={handleOpenChangelog}
      />

      {/* Main Content: Dynamic View Routing with Lazy Suspense */}
      <div className="relative z-10">
        <Suspense fallback={<div className="min-h-[70vh] bg-black" />}>
          {isChangelog ? (
            <ChangelogPage 
              currentLang={currentLang}
              onBack={handleGoHome}
            />
          ) : activeFeatureId ? (
            <FeatureDetailPage 
              featureId={activeFeatureId}
              currentLang={currentLang}
              onBack={handleGoHome}
            />
          ) : (
            <main>
              <Hero currentLang={currentLang} />
              <Features 
                currentLang={currentLang} 
                onSelectFeature={handleSelectFeature}
              />
            </main>
          )}
        </Suspense>
      </div>

      {/* Footer */}
      <Footer 
        currentLang={currentLang} 
        onOpenChangelog={handleOpenChangelog}
        onGoHome={handleGoHome}
      />
    </div>
  );
};

export default App;

