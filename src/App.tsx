import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { getSafeInitialLanguage, saveLanguagePreference } from './translations';
import type { Language } from './translations';

const FeatureDetailPage = lazy(() =>
  import('./components/FeatureDetailPage').then((m) => ({ default: m.FeatureDetailPage }))
);
const ChangelogPage = lazy(() =>
  import('./components/ChangelogPage').then((m) => ({ default: m.ChangelogPage }))
);
const PrivacyPage = lazy(() =>
  import('./components/PrivacyPage').then((m) => ({ default: m.PrivacyPage }))
);

export const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    return getSafeInitialLanguage();
  });

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    saveLanguagePreference(lang);
  };

  useEffect(() => {
    try {
      if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
      }
    } catch {
      // Ignore DOM property update errors in restricted frames
    }
  }, [currentLang]);

  const [activeFeatureId, setActiveFeatureId] = useState<string | null>(() => {
    try {
      const hash = typeof window !== 'undefined' ? window.location.hash : '';
      if (hash && hash.startsWith('#feature/')) {
        return hash.replace('#feature/', '');
      }
    } catch {}
    return null;
  });

  const [isChangelog, setIsChangelog] = useState<boolean>(() => {
    try {
      if (typeof window === 'undefined') return false;
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      return path === '/changelog' || path === '/changelog/' || hash === '#changelog';
    } catch {
      return false;
    }
  });

  const [isPrivacy, setIsPrivacy] = useState<boolean>(() => {
    try {
      if (typeof window === 'undefined') return false;
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      return path === '/privacy' || path === '/privacy/' || hash === '#privacy';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const handleLocationChange = () => {
      try {
        const path = window.location.pathname.toLowerCase();
        const hash = window.location.hash.toLowerCase();

        if (path === '/privacy' || path === '/privacy/' || hash === '#privacy') {
          setIsPrivacy(true);
          setIsChangelog(false);
          setActiveFeatureId(null);
        } else if (path === '/changelog' || path === '/changelog/' || hash === '#changelog') {
          setIsChangelog(true);
          setIsPrivacy(false);
          setActiveFeatureId(null);
        } else if (hash.startsWith('#feature/')) {
          setActiveFeatureId(window.location.hash.replace('#feature/', ''));
          setIsChangelog(false);
          setIsPrivacy(false);
        } else {
          setActiveFeatureId(null);
          setIsChangelog(false);
          setIsPrivacy(false);
        }
      } catch {}
    };

    try {
      window.addEventListener('hashchange', handleLocationChange);
      window.addEventListener('popstate', handleLocationChange);
    } catch {}
    return () => {
      try {
        window.removeEventListener('hashchange', handleLocationChange);
        window.removeEventListener('popstate', handleLocationChange);
      } catch {}
    };
  }, []);

  const handleSelectFeature = (id: string) => {
    setIsPrivacy(false);
    setIsChangelog(false);
    setActiveFeatureId(id);
    try {
      const path = window.location.pathname.toLowerCase();
      if (path === '/privacy' || path === '/privacy/' || path === '/changelog' || path === '/changelog/') {
        history.pushState(null, '', `/#feature/${id}`);
      } else {
        window.location.hash = `#feature/${id}`;
      }
    } catch {}
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {}
  };

  const handleOpenChangelog = () => {
    setActiveFeatureId(null);
    setIsPrivacy(false);
    setIsChangelog(true);
    try {
      history.pushState(null, '', '/changelog');
    } catch {}
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {}
  };

  const handleOpenPrivacy = () => {
    setActiveFeatureId(null);
    setIsChangelog(false);
    setIsPrivacy(true);
    try {
      history.pushState(null, '', '/privacy');
    } catch {}
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {}
  };

  const handleGoHome = () => {
    setActiveFeatureId(null);
    setIsChangelog(false);
    setIsPrivacy(false);
    try {
      const path = window.location.pathname.toLowerCase();
      if (
        window.location.hash.startsWith('#feature/') ||
        window.location.hash === '#changelog' ||
        window.location.hash === '#privacy' ||
        path === '/privacy' ||
        path === '/privacy/' ||
        path === '/changelog' ||
        path === '/changelog/'
      ) {
        history.pushState(null, '', '/');
      }
    } catch {}
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {}
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-white selection:bg-[#FF5500] selection:text-black font-sans antialiased relative">
      {/* 1. Fixed Header with logo, terminal changelog & language selector */}
      <Header 
        currentLang={currentLang} 
        onLanguageChange={handleLanguageChange}
        onGoHome={handleGoHome}
        onOpenChangelog={handleOpenChangelog}
      />

      {/* Main Content: Dynamic View Routing with Lazy Suspense */}
      <main className="min-h-screen flex-1 flex flex-col w-full relative z-10">
        <Suspense fallback={<div className="min-h-screen flex-1 flex flex-col w-full bg-black" />}>
          {isPrivacy ? (
            <PrivacyPage 
              currentLang={currentLang}
              onBack={handleGoHome}
            />
          ) : isChangelog ? (
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
            <div className="flex-1 w-full flex flex-col">
              <Hero currentLang={currentLang} />
              <Features 
                currentLang={currentLang} 
                onSelectFeature={handleSelectFeature}
              />
            </div>
          )}
        </Suspense>
      </main>

      {/* Footer */}
      <Footer 
        currentLang={currentLang} 
        onOpenChangelog={handleOpenChangelog}
        onOpenPrivacy={handleOpenPrivacy}
        onGoHome={handleGoHome}
      />
    </div>
  );
};

export default App;
