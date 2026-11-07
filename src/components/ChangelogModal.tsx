import React, { useEffect } from 'react';
import { X, Check, Terminal } from 'lucide-react';
import { translations } from '../translations';
import type { Language } from '../translations';

interface ChangelogModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang?: Language;
}

const closeLabelMap: Record<Language, string> = {
  en: 'Close',
  ru: 'Закрыть',
  uk: 'Закрити',
  de: 'Schließen',
  pl: 'Zamknij',
  fr: 'Fermer',
  es: 'Cerrar',
  da: 'Luk',
  pt: 'Fechar',
  fi: 'Sulje',
  sv: 'Stäng',
  tr: 'Kapat',
  zh: '关闭',
  ar: 'إغلاق',
  ja: '閉じる',
  ko: '닫기',
};

const releaseHighlightsMap: Record<Language, string> = {
  en: 'Release highlights & architecture:',
  ru: 'Основные нововведения и возможности:',
  uk: 'Основні нововведення та можливості:',
  de: 'Release-Highlights und Architektur:',
  pl: 'Główne nowości i architektura:',
  fr: 'Points forts de la version et architecture :',
  es: 'Aspectos destacados y arquitectura:',
  da: 'Højdepunkter og arkitektur:',
  pt: 'Destaques do lançamento e arquitetura:',
  fi: 'Julkaisun kohokohdat ja arkkitehtuuri:',
  sv: 'Höjdpunkter och arkitektur:',
  tr: 'Sürüm öne çıkanları ve mimari:',
  zh: '版本亮点与架构：',
  ar: 'أبرز مميزات الإصدار والهندسة:',
  ja: 'リリースのハイライトとアーキテクチャ:',
  ko: '릴리스 주요 특징 및 아키텍처:',
};

export const ChangelogModal: React.FC<ChangelogModalProps> = ({ isOpen, onClose, currentLang = 'en' }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const t = translations[currentLang] || translations.en;

  const changes = [
    {
      title: t.changelogPage?.initialReleaseTitle || 'Initial Public Release 1.0.0',
      desc: t.changelogPage?.initialReleaseDesc || 'Full-featured tactical interface extension suite for competitive FACEIT CS2.',
    },
    ...(t.features?.items?.map((item) => ({
      title: item.title,
      desc: item.desc,
    })) || []),
  ];

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-[#0c0c0c] border border-white/20 shadow-2xl rounded-none overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#111111] shrink-0">
          <div className="flex items-center space-x-3">
            <Terminal className="w-4 h-4 text-[#FF5500]" />
            <span className="font-mono text-xs text-neutral-400">
              {t.nav.changelog}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors p-1 rounded-none hover:bg-white/10 cursor-pointer"
            aria-label={closeLabelMap[currentLang] || 'Close'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Version Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <span className="px-2.5 py-1 bg-white text-black font-mono font-bold text-sm tracking-wide rounded-none">
                v1.0.0
              </span>
              <span className="text-white font-bold text-base sm:text-lg tracking-normal font-sans">
                {t.changelogPage?.version || 'Version 1.0.0'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse"></span>
              <span className="font-mono text-xs text-neutral-400">
                2026
              </span>
            </div>
          </div>

          {/* Release Notes List */}
          <div className="space-y-3.5">
            <div className="text-[11px] font-mono text-neutral-400 mb-2">
              {releaseHighlightsMap[currentLang] || 'Release highlights & architecture:'}
            </div>

            {changes.map((item, idx) => (
              <div 
                key={idx}
                className="flex items-start space-x-3 p-3 bg-[#111111] border border-[#1f1f1f] hover:border-white/30 transition-colors"
              >
                <div className="w-5 h-5 rounded-none bg-white/5 border border-white/15 flex items-center justify-center shrink-0 mt-0.5 text-[#FF5500]">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-white tracking-normal font-sans">
                    {item.title}
                  </div>
                  <div className="text-xs text-neutral-400 leading-relaxed font-sans">
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-500">
            <span>Peekly Engine</span>
            <span>v1.0.0</span>
          </div>
        </div>

        {/* Modal Bottom CTA */}
        <div className="px-6 py-4 bg-[#111111] border-t border-white/10 flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="btn-brand-interactive px-5 py-2 text-xs font-semibold cursor-pointer rounded-none"
          >
            {closeLabelMap[currentLang] || 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
