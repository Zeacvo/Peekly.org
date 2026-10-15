import React, { useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { translations } from '../translations';
import type { Language } from '../translations';
import { featureHumanDetailsByLang } from '../data/featureHumanDetails';
import { FeatureHeroAnimation } from './FeatureHeroAnimation';
import { ChromeLogo } from './ChromeLogo';

interface FeatureDetailPageProps {
  featureId: string;
  currentLang: Language;
  onBack: () => void;
}

export const FeatureDetailPage: React.FC<FeatureDetailPageProps> = ({
  featureId,
  currentLang,
  onBack
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [featureId]);

  const data = (featureHumanDetailsByLang[currentLang] && featureHumanDetailsByLang[currentLang][featureId])
    || (featureHumanDetailsByLang['en'] && featureHumanDetailsByLang['en'][featureId]);

  if (!data) return null;

  // Strict synchronization: card title & summary match 1-to-1 in current language
  const tLang = translations[currentLang] || translations.en;
  const cardIndex = tLang.features.items.findIndex(i => i.id === featureId);
  const cardItem = cardIndex !== -1 
    ? tLang.features.items[cardIndex] 
    : translations.en.features.items.find(i => i.id === featureId);
  const cardNumber = cardIndex !== -1 
    ? String(cardIndex + 1).padStart(2, '0') 
    : data.number.slice(-2);
  const displayTitle = cardItem?.title || data.title;

  const backLabelMap: Record<Language, string> = {
    en: 'Back to features',
    ru: 'Назад к возможностям',
    zh: '返回功能列表',
    ja: '機能一覧に戻る',
    ko: '기능 목록으로 돌아가기',
    ar: 'العودة إلى الميزات',
    de: 'Zurück zu Funktionen',
    fr: 'Retour aux fonctionnalités',
    es: 'Volver a funciones',
    pl: 'Powrót do funkcji',
    pt: 'Voltar às funcionalidades',
    da: 'Tilbage til funktioner',
    fi: 'Takaisin ominaisuuksiin',
    sv: 'Tillbaka till funktioner',
    tr: 'Özelliklere geri dön',
    uk: 'Назад до можливостей',
  };
  const backLabel = backLabelMap[currentLang] || 'Back to features';
  const ctaLabel = (tLang.hero.cta || 'ADD TO CHROME').toUpperCase();

  const benefitTitleMap: Record<Language, string> = {
    en: 'Team & match advantages',
    ru: 'Преимущества для команды',
    zh: '团队战力与对局优势',
    de: 'Team- & Match-Vorteile',
    pl: 'Korzyści dla drużyny',
    fr: 'Avantages d\'équipe et de match',
    es: 'Ventajas para el equipo y la partida',
    da: 'Hold- og kampfordele',
    pt: 'Vantagens para a equipe e a partida',
    fi: 'Joukkue- ja otteluedut',
    sv: 'Lag- och matchfördelar',
    tr: 'Takım ve maç avantajları',
    uk: 'Переваги для команди',
    ar: 'مزايا الفريق والمباراة',
    ja: 'チーム＆マッチのアドバンテージ',
    ko: '팀 및 매치 경쟁 우위',
  };
  const benefitSectionTitle = benefitTitleMap[currentLang] || 'Team & match advantages';

  const howItWorksMap: Record<Language, string> = {
    en: 'How it works in the match',
    ru: 'Как это работает в матче',
    zh: '在对局中的运作机制',
    de: 'Wie es im Match funktioniert',
    pl: 'Jak to działa w meczu',
    fr: 'Fonctionnement en match',
    es: 'Cómo funciona en la partida',
    da: 'Sådan fungerer det i kampen',
    pt: 'Como funciona na partida',
    fi: 'Miten se toimii ottelussa',
    sv: 'Hur det fungerar i matchen',
    tr: 'Maç içinde nasıl çalışır',
    uk: 'Як це працює в матчі',
    ar: 'كيف يعمل أثناء المباراة',
    ja: 'マッチでの動作メカニズム',
    ko: '실제 매치에서의 작동 방식',
  };
  const howItWorksTitle = howItWorksMap[currentLang] || 'How it works in the match';

  const audienceTitleMap: Record<Language, string> = {
    en: 'Ideal for',
    ru: 'Кому особенно полезно',
    zh: '适用对象',
    de: 'Ideal für',
    pl: 'Dla kogo przydatne',
    fr: 'Idéal pour',
    es: 'Ideal para',
    da: 'Ideel til',
    pt: 'Ideal para',
    fi: 'Ihanteellinen käyttäjille',
    sv: 'Perfekt för',
    tr: 'Kimler için ideal',
    uk: 'Кому особливо корисно',
    ar: 'مثالي لـ',
    ja: '対象プレイヤー',
    ko: '추천 대상',
  };
  const audienceTitle = audienceTitleMap[currentLang] || 'Ideal for';

  return (
    <main className="pt-[calc(5rem+env(safe-area-inset-top,0px))] sm:pt-24 pb-0 w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-stretch z-10 animate-apple-reveal">
      
      {/* 1. Back Navigation Button */}
      <div className="w-full flex justify-start mb-6">
        <button
          onClick={onBack}
          className="h-10 px-4 sm:px-5 text-sm font-semibold border border-transparent bg-white text-black hover:bg-[#FF5500] hover:border-white transition-all duration-150 rounded-none inline-flex items-center gap-2 cursor-pointer shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2] shrink-0" />
          <span>{backLabel}</span>
        </button>
      </div>

      {/* 2. Hero Animation Block (Clean Presentation with Monolithic Dark Canvas - UNTOUCHED) */}
      <div className="w-full bg-[#0d0d0d] border border-white/20 overflow-hidden mb-10 shadow-2xl relative">
        <div className="h-72 sm:h-96 w-full flex items-center justify-center p-4 bg-[#0d0d0d]">
          <FeatureHeroAnimation featureId={data.id} />
        </div>
      </div>

      {/* 3. Text Content — ровно 100% ширины контейнера, БЕЗ max-w-* и БЕЗ px-* */}
      <div className="w-full max-w-none px-0 mx-0 flex flex-col items-start text-left cursor-default select-text mb-0">

        {/* Номер фичи: Точная оптическая пропорция к карточке */}
        <div className="w-full max-w-none font-mono text-xl sm:text-2xl font-bold tracking-wider text-neutral-500 mb-2 leading-none select-none">
          {cardNumber}
        </div>
        
        {/* Заголовок фичи: Шрифт 1 */}
        <h1 className="w-full max-w-none font-sans text-3xl md:text-4xl font-bold tracking-tight text-white mb-6 cursor-text select-text">
          {displayTitle}
        </h1>

        {/* Секция 1: Как это работает в матче */}
        <div className="w-full max-w-none">
          <h2 className="w-full max-w-none font-sans text-base md:text-lg font-bold tracking-tight text-white mb-2 mt-8 cursor-text select-text">
            {howItWorksTitle}
          </h2>
          <p className="w-full max-w-none font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text">
            {data.overview}
          </p>
        </div>

        {/* Секция 2: Кому особенно полезно */}
        <div className="w-full max-w-none">
          <h2 className="w-full max-w-none font-sans text-base md:text-lg font-bold tracking-tight text-white mb-2 mt-8 cursor-text select-text">
            {audienceTitle}
          </h2>
          <p className="w-full max-w-none font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify cursor-text select-text">
            {data.audience}
          </p>
        </div>

        {/* Секция 3: Преимущества для команды */}
        <div className="w-full max-w-none">
          <h2 className="w-full max-w-none font-sans text-base md:text-lg font-bold tracking-tight text-white mb-2 mt-8 cursor-text select-text">
            {benefitSectionTitle}
          </h2>
          <div className="w-full max-w-none space-y-3 font-sans">
            {data.benefits.map((b, idx) => (
              <div key={idx} className="w-full max-w-none flex items-baseline gap-2.5 cursor-text select-text">
                <span className="font-mono text-sm md:text-[15px] font-bold text-neutral-500 select-none shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="w-full max-w-none font-sans text-sm md:text-[15px] font-normal text-neutral-400 leading-relaxed text-justify">
                  {b.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. Bottom Prominent Action CTA Button (100% exact replica of Hero CTA button, mt-12 mb-12) */}
      <div className="w-full flex justify-center mt-12 mb-12">
        <a
          href="https://chromewebstore.google.com/detail/peekly-for-faceit/cmfgneodcjfofdcglbbhcghijgcjcokk"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 sm:gap-3.5 px-5 sm:px-7 py-3 sm:py-3.5 bg-white text-black font-sans text-xs md:text-sm font-bold tracking-wider uppercase rounded-none border border-white hover:bg-[#FF5500] hover:text-black hover:border-white transition-colors duration-150 btn-chrome-action cursor-pointer shadow-2xl active:scale-95 w-full sm:w-auto max-w-xs sm:max-w-none"
        >
          {/* Large Google Chrome Vector Icon */}
          <ChromeLogo className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 shrink-0 fill-current" />
          <span>{ctaLabel}</span>
        </a>
      </div>

    </main>
  );
};
