import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
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
const TermsPage = lazy(() =>
  import('./components/TermsPage').then((m) => ({ default: m.TermsPage }))
);
const NotFoundPage = lazy(() =>
  import('./components/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);
const AuthErrorPage = lazy(() =>
  import('./components/AuthErrorPage').then((m) => ({ default: m.AuthErrorPage }))
);
const AdminDashboard = lazy(() =>
  import('./pages/AdminDashboard').then((m) => ({ default: m.AdminDashboard }))
);
const AccountPrivacy = lazy(() =>
  import('./pages/AccountPrivacy').then((m) => ({ default: m.AccountPrivacy }))
);
const LoginPage = lazy(() =>
  import('./pages/LoginPage').then((m) => ({ default: m.LoginPage }))
);
const RegisterPage = lazy(() =>
  import('./pages/RegisterPage').then((m) => ({ default: m.RegisterPage }))
);

const checkRoutes = () => {
  try {
    if (typeof window === 'undefined') {
      return { isAdmin: false, isLogin: false, isRegister: false, isTerms: false, isPrivacy: false, isAccountPrivacy: false, isChangelog: false, featureId: null, isNotFound: false, isAuthError: false, authErrorStatus: '400', authErrorMessage: '' };
    }
    const rawPath = window.location.pathname.toLowerCase();
    const path = rawPath.replace(/\/$/, '') || '/';
    const hash = window.location.hash.toLowerCase();

    if (path === '/admin' || hash === '#admin') {
      return {
        isAdmin: true,
        isLogin: false,
        isRegister: false,
        isTerms: false,
        isPrivacy: false,
        isAccountPrivacy: false,
        isChangelog: false,
        featureId: null,
        isNotFound: false,
        isAuthError: false,
        authErrorStatus: '400',
        authErrorMessage: '',
      };
    }
    if (path === '/login' || path === '/login.html' || hash === '#login') {
      return {
        isAdmin: false,
        isLogin: true,
        isRegister: false,
        isTerms: false,
        isPrivacy: false,
        isAccountPrivacy: false,
        isChangelog: false,
        featureId: null,
        isNotFound: false,
        isAuthError: false,
        authErrorStatus: '400',
        authErrorMessage: '',
      };
    }
    if (path === '/register' || path === '/register.html' || hash === '#register') {
      return {
        isAdmin: false,
        isLogin: false,
        isRegister: true,
        isTerms: false,
        isPrivacy: false,
        isAccountPrivacy: false,
        isChangelog: false,
        featureId: null,
        isNotFound: false,
        isAuthError: false,
        authErrorStatus: '400',
        authErrorMessage: '',
      };
    }
    if (path === '/auth/error') {
      const searchParams = new URLSearchParams(window.location.search);
      return {
        isAdmin: false,
        isLogin: false,
        isRegister: false,
        isTerms: false,
        isPrivacy: false,
        isAccountPrivacy: false,
        isChangelog: false,
        featureId: null,
        isNotFound: false,
        isAuthError: true,
        authErrorStatus: searchParams.get('status') || '400',
        authErrorMessage: searchParams.get('message') || 'Missing required authorization code parameter.',
      };
    }
    if (
      path === '/legal/account-privacy' ||
      path === '/legal/account-privacy.html' ||
      path === '/account-privacy' ||
      hash === '#legal/account-privacy' ||
      hash === '#account-privacy'
    ) {
      return { isAdmin: false, isLogin: false, isRegister: false, isTerms: false, isPrivacy: false, isAccountPrivacy: true, isChangelog: false, featureId: null, isNotFound: false, isAuthError: false, authErrorStatus: '400', authErrorMessage: '' };
    }
    if (path === '/terms' || path === '/terms.html' || hash === '#terms') {
      return { isAdmin: false, isLogin: false, isRegister: false, isTerms: true, isPrivacy: false, isAccountPrivacy: false, isChangelog: false, featureId: null, isNotFound: false, isAuthError: false, authErrorStatus: '400', authErrorMessage: '' };
    }
    if (path === '/privacy' || hash === '#privacy') {
      return { isAdmin: false, isLogin: false, isRegister: false, isTerms: false, isPrivacy: true, isAccountPrivacy: false, isChangelog: false, featureId: null, isNotFound: false, isAuthError: false, authErrorStatus: '400', authErrorMessage: '' };
    }
    if (path === '/changelog' || hash === '#changelog') {
      return { isAdmin: false, isLogin: false, isRegister: false, isTerms: false, isPrivacy: false, isAccountPrivacy: false, isChangelog: true, featureId: null, isNotFound: false, isAuthError: false, authErrorStatus: '400', authErrorMessage: '' };
    }
    if (window.location.hash.startsWith('#feature/')) {
      const id = window.location.hash.replace('#feature/', '');
      return { isAdmin: false, isLogin: false, isRegister: false, isTerms: false, isPrivacy: false, isAccountPrivacy: false, isChangelog: false, featureId: id, isNotFound: false, isAuthError: false, authErrorStatus: '400', authErrorMessage: '' };
    }
    if (path === '/auth/extension-success') {
      return { isAdmin: false, isLogin: false, isRegister: false, isTerms: false, isPrivacy: false, isAccountPrivacy: false, isChangelog: false, featureId: null, isNotFound: false, isAuthError: false, authErrorStatus: '400', authErrorMessage: '' };
    }
    if (path === '/') {
      return { isAdmin: false, isLogin: false, isRegister: false, isTerms: false, isPrivacy: false, isAccountPrivacy: false, isChangelog: false, featureId: null, isNotFound: false, isAuthError: false, authErrorStatus: '400', authErrorMessage: '' };
    }

    // Any other path is treated as 404 Not Found
    return { isAdmin: false, isLogin: false, isRegister: false, isTerms: false, isPrivacy: false, isAccountPrivacy: false, isChangelog: false, featureId: null, isNotFound: true, isAuthError: false, authErrorStatus: '400', authErrorMessage: '' };
  } catch {
    return { isAdmin: false, isLogin: false, isRegister: false, isTerms: false, isPrivacy: false, isAccountPrivacy: false, isChangelog: false, featureId: null, isNotFound: false, isAuthError: false, authErrorStatus: '400', authErrorMessage: '' };
  }
};

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

  const [activeFeatureId, setActiveFeatureId] = useState<string | null>(() => checkRoutes().featureId);
  const [isChangelog, setIsChangelog] = useState<boolean>(() => checkRoutes().isChangelog);
  const [isPrivacy, setIsPrivacy] = useState<boolean>(() => checkRoutes().isPrivacy);
  const [isTerms, setIsTerms] = useState<boolean>(() => checkRoutes().isTerms);
  const [isAccountPrivacy, setIsAccountPrivacy] = useState<boolean>(() => checkRoutes().isAccountPrivacy);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => checkRoutes().isAdmin);
  const [isLogin, setIsLogin] = useState<boolean>(() => checkRoutes().isLogin);
  const [isRegister, setIsRegister] = useState<boolean>(() => checkRoutes().isRegister);
  const [isNotFound, setIsNotFound] = useState<boolean>(() => checkRoutes().isNotFound);
  const [isAuthError, setIsAuthError] = useState<boolean>(() => checkRoutes().isAuthError);
  const [authErrorStatus, setAuthErrorStatus] = useState<string>(() => checkRoutes().authErrorStatus);
  const [authErrorMessage, setAuthErrorMessage] = useState<string>(() => checkRoutes().authErrorMessage);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authErrorParam, setAuthErrorParam] = useState<string | null>(null);

  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      const authErr = sp.get('auth_error');
      if (authErr) {
        setAuthErrorParam(decodeURIComponent(authErr));
        setIsLogin(true);
        try {
          history.replaceState(null, '', '/login');
        } catch {}
      }
    } catch {}
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      const routes = checkRoutes();
      setIsAdmin(routes.isAdmin);
      setIsLogin(routes.isLogin);
      setIsRegister(routes.isRegister);
      setIsTerms(routes.isTerms);
      setIsPrivacy(routes.isPrivacy);
      setIsAccountPrivacy(routes.isAccountPrivacy);
      setIsChangelog(routes.isChangelog);
      setActiveFeatureId(routes.featureId);
      setIsNotFound(routes.isNotFound);
      setIsAuthError(routes.isAuthError);
      setAuthErrorStatus(routes.authErrorStatus);
      setAuthErrorMessage(routes.authErrorMessage);
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
    setIsNotFound(false);
    setIsAuthError(false);
    setIsAdmin(false);
    setIsTerms(false);
    setIsPrivacy(false);
    setIsAccountPrivacy(false);
    setIsChangelog(false);
    setIsLogin(false);
    setIsRegister(false);
    setActiveFeatureId(id);
    try {
      const path = window.location.pathname.toLowerCase();
      if (
        path === '/privacy' || 
        path === '/privacy/' || 
        path === '/terms' || 
        path === '/terms/' || 
        path === '/terms.html' || 
        path === '/legal/account-privacy' ||
        path === '/account-privacy' ||
        path === '/changelog' || 
        path === '/changelog/' ||
        isNotFound ||
        isAuthError ||
        isAdmin ||
        isLogin ||
        isRegister
      ) {
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
    setIsNotFound(false);
    setIsAuthError(false);
    setIsAdmin(false);
    setIsTerms(false);
    setIsPrivacy(false);
    setIsAccountPrivacy(false);
    setIsLogin(false);
    setIsRegister(false);
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
    setIsNotFound(false);
    setIsAuthError(false);
    setIsAdmin(false);
    setIsTerms(false);
    setIsAccountPrivacy(false);
    setIsChangelog(false);
    setIsLogin(false);
    setIsRegister(false);
    setIsPrivacy(true);
    try {
      history.pushState(null, '', '/privacy');
    } catch {}
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {}
  };

  const handleOpenTerms = () => {
    setActiveFeatureId(null);
    setIsNotFound(false);
    setIsAuthError(false);
    setIsAdmin(false);
    setIsChangelog(false);
    setIsPrivacy(false);
    setIsAccountPrivacy(false);
    setIsLogin(false);
    setIsRegister(false);
    setIsTerms(true);
    try {
      history.pushState(null, '', '/terms');
    } catch {}
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {}
  };

  const handleOpenLogin = () => {
    setActiveFeatureId(null);
    setIsNotFound(false);
    setIsAuthError(false);
    setIsAdmin(false);
    setIsChangelog(false);
    setIsPrivacy(false);
    setIsAccountPrivacy(false);
    setIsTerms(false);
    setIsRegister(false);
    setIsLogin(true);
    try {
      history.pushState(null, '', '/login');
    } catch {}
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {}
  };

  const handleOpenRegister = () => {
    setActiveFeatureId(null);
    setIsNotFound(false);
    setIsAuthError(false);
    setIsAdmin(false);
    setIsChangelog(false);
    setIsPrivacy(false);
    setIsAccountPrivacy(false);
    setIsTerms(false);
    setIsLogin(false);
    setIsRegister(true);
    try {
      history.pushState(null, '', '/register');
    } catch {}
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {}
  };

  const handleGoHome = () => {
    setActiveFeatureId(null);
    setIsNotFound(false);
    setIsAuthError(false);
    setIsAdmin(false);
    setIsChangelog(false);
    setIsPrivacy(false);
    setIsAccountPrivacy(false);
    setIsTerms(false);
    setIsLogin(false);
    setIsRegister(false);
    setAuthErrorParam(null);
    try {
      history.pushState(null, '', '/');
    } catch {}
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {}
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-white selection:bg-[#FF5500] selection:text-black font-sans antialiased relative">
      {/* 1. Fixed Header (hidden on CEO admin dashboard, login and register pages) */}
      {!isAdmin && !isLogin && !isRegister && (
        <Header 
          currentLang={currentLang} 
          onLanguageChange={handleLanguageChange}
          onGoHome={handleGoHome}
          onOpenChangelog={handleOpenChangelog}
          onOpenAuthModal={handleOpenLogin}
          onOpenAdmin={() => {
            setIsAdmin(true);
            try {
              history.pushState(null, '', '/admin');
            } catch {}
            try {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch {}
          }}
        />
      )}

      {/* Main Content: Dynamic View Routing with Lazy Suspense */}
      <main className={`min-h-screen flex-1 flex flex-col w-full relative z-10 ${isNotFound || isAuthError ? 'overflow-hidden' : ''}`}>
        <Suspense fallback={<div className="min-h-screen flex-1 flex flex-col w-full bg-black" />}>
          {isAdmin ? (
            <AdminDashboard
              currentLang={currentLang}
              onGoHome={handleGoHome}
            />
          ) : isLogin ? (
            <LoginPage
              onGoHome={handleGoHome}
              onNavigateRegister={handleOpenRegister}
              initialError={authErrorParam}
            />
          ) : isRegister ? (
            <RegisterPage
              onGoHome={handleGoHome}
              onNavigateLogin={handleOpenLogin}
            />
          ) : isAuthError ? (
            <div className="flex flex-col min-h-screen justify-between overflow-hidden">
              <AuthErrorPage
                status={authErrorStatus}
                errorMessage={authErrorMessage}
                currentLang={currentLang}
                onBack={handleGoHome}
              />
            </div>
          ) : isNotFound ? (
            <div className="flex flex-col min-h-screen justify-between overflow-hidden">
              <NotFoundPage 
                currentLang={currentLang}
                onBack={handleGoHome}
              />
            </div>
          ) : isTerms ? (
            <TermsPage 
              currentLang={currentLang}
              onBack={handleGoHome}
            />
          ) : isPrivacy ? (
            <PrivacyPage 
              currentLang={currentLang}
              onBack={handleGoHome}
            />
          ) : isAccountPrivacy ? (
            <AccountPrivacy 
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

      {/* Footer (hidden on 404, auth error, admin dashboard, login and register for clean minimalist layout) */}
      {!isNotFound && !isAuthError && !isAdmin && !isLogin && !isRegister && (
        <Footer 
          currentLang={currentLang} 
          onOpenChangelog={handleOpenChangelog}
          onOpenPrivacy={handleOpenPrivacy}
          onOpenTerms={handleOpenTerms}
          onGoHome={handleGoHome}
        />
      )}

      {/* Apple-Style Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialError={authErrorParam}
        onClose={() => {
          setIsAuthModalOpen(false);
          setAuthErrorParam(null);
        }}
        onLoginSuccess={(session) => {
          if (session.nickname.toLowerCase() === 'zeacvo') {
            setIsAdmin(true);
            try {
              history.pushState(null, '', '/admin');
            } catch {}
          }
        }}
      />
    </div>
  );
};

export default App;
