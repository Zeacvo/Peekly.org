import React from 'react';
import { translations } from '../translations';
import type { Language } from '../translations';
import { PeeklyLogo } from './PeeklyLogo';

interface FooterProps {
  currentLang: Language;
  onOpenChangelog?: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
  onGoHome?: () => void;
  hideChangelog?: boolean;
}

const termsLabelMap: Record<Language, string> = {
  en: 'Terms of Service',
  da: 'Servicevilkår',
  de: 'Nutzungsbedingungen',
  es: 'Términos de servicio',
  fr: "Conditions d'utilisation",
  pl: 'Warunki korzystania',
  pt: 'Termos de serviço',
  fi: 'Käyttöehdot',
  sv: 'Användarvillkor',
  tr: 'Kullanım Şartları',
  ru: 'Условия использования',
  uk: 'Умови використання',
  ar: 'شروط الخدمة',
  ja: '利用規約',
  ko: '이용약관',
  zh: '服务条款',
};

const privacyLabelMap: Record<Language, string> = {
  en: 'Privacy Policy',
  da: 'Privatlivspolitik',
  de: 'Datenschutzerklärung',
  es: 'Política de privacidad',
  fr: 'Politique de confidentialité',
  pl: 'Polityka prywatności',
  pt: 'Política de privacidade',
  fi: 'Tietosuojakäytäntö',
  sv: 'Integritetspolicy',
  tr: 'Gizlilik Politikası',
  ru: 'Политика конфиденциальности',
  uk: 'Політика конфіденційності',
  ar: 'سياسة الخصوصية',
  ja: 'プライバシーポリシー',
  ko: '개인정보 처리방침',
  zh: '隐私政策',
};

export const Footer: React.FC<FooterProps> = ({ 
  currentLang, 
  onOpenPrivacy,
  onOpenTerms,
  onGoHome 
}) => {
  const t = translations[currentLang] || translations.en;

  return (
    <footer className="w-full bg-[#000000] border-t border-[#1A1A1F] relative z-10 mt-auto py-8 sm:py-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 text-xs text-[#929292]">
        
        {/* Left Column: Logo & Legal Disclaimer */}
        <div className="flex flex-col items-start text-left max-w-md gap-3">
          <div 
            onClick={onGoHome}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (onGoHome) onGoHome();
                else window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="h-5 flex items-center space-x-2 text-xs text-[#929292] hover:text-white transition-colors cursor-pointer group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white w-fit"
          >
            <PeeklyLogo size={14} className="group-hover:text-[#FF5500] transition-colors" />
            <span className="font-bold tracking-wider uppercase font-sans text-white">Peekly</span>
          </div>
          <p className="text-left text-[11px] text-[#929292] leading-relaxed m-0">
            {t.footer.disclaimer}
          </p>
        </div>

        {/* Right Column: Navigation Links & Copyright */}
        <div className="flex flex-col items-start sm:items-end text-left sm:text-right gap-1.5 text-[12px]">
          {/* Row 1: Privacy Policy Link */}
          <a
            href="/privacy"
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
              e.preventDefault();
              if (onOpenPrivacy) onOpenPrivacy();
              else {
                history.pushState(null, '', '/privacy');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }
            }}
            className="text-xs text-[#929292] hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            {privacyLabelMap[currentLang] || 'Privacy Policy'}
          </a>

          {/* Row 2: Terms of Service Link */}
          <a
            href="/terms"
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
              e.preventDefault();
              if (onOpenTerms) onOpenTerms();
              else {
                history.pushState(null, '', '/terms');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }
            }}
            className="text-xs text-[#929292] hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            {termsLabelMap[currentLang] || 'Terms of Service'}
          </a>

          {/* Row 3: Copyright (at the very bottom) */}
          <p className="text-[11px] text-[#929292] font-sans whitespace-nowrap m-0 mt-1">
            © 2026 Peekly. {t.footer.allRightsReserved || t.footer.rights}
          </p>
        </div>

      </div>
    </footer>
  );
};
