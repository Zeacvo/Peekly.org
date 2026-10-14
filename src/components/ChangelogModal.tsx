import React, { useEffect } from 'react';
import { X, Check, Terminal } from 'lucide-react';
import type { Language } from '../translations';

interface ChangelogModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang?: Language;
}

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

  const isRu = currentLang === 'ru';

  const changes = [
    {
      title: isRu ? 'Первый публичный релиз' : 'Initial Public Release',
      desc: isRu ? 'Полнофункциональный релиз расширения для соревновательного FACEIT CS2.' : 'Complete competitive intelligence and automation extension suite for FACEIT CS2.'
    },
    {
      title: 'Map Pool Radar Chart',
      desc: isRu ? 'Тактическая паутина винрейтов маппула команд с глубиной анализа в 30 матчей.' : 'Tactical team map pool winrate radar chart analyzing depth of last 30 competitive matches.'
    },
    {
      title: 'Match Player Stats Overlay',
      desc: isRu ? 'Отображение боевых метрик игроков (K/R, ADR, PCR) прямо в лобби матча.' : 'Direct matchroom HUD overlay rendering K/R, ADR, and PCR combat metrics.'
    },
    {
      title: 'Auto-Accept Match & Auto-Checkin',
      desc: isRu ? 'Автоподтверждение готовности к матчу с нулевой задержкой и настраиваемым таймером.' : 'Zero-latency match ready check confirmation with configurable response timer.'
    },
    {
      title: 'Lobby Focus Mode & Visual Noise Filter',
      desc: isRu ? 'Фокусировка на главном: скрытие лишних баннеров и визуального шума FACEIT.' : 'Distraction-free lobby mode suppressing noise and highlighting essential match intel.'
    },
    {
      title: 'Party Grouping Detection & Premade Nodes',
      desc: isRu ? 'Определение сыгранных пати и стаков соперника с графом взаимосвязей.' : 'Identification of premade stacks and party constellations in the opposing roster.'
    },
    {
      title: 'Auto-Copy Server IP upon Match Launch',
      desc: isRu ? 'Мгновенное копирование команды connect в буфер обмена при распределении сервера.' : 'Instant clipboard sync of the console connect command upon server allocation.'
    },
    {
      title: 'Player Profile Peak ELO Tracker',
      desc: isRu ? 'Отслеживание максимального пика ELO и динамики роста рейтинга игрока.' : 'Peak rating progression tracker and tier advancement indicators on profiles.'
    },
    {
      title: 'Tactical Match History & Map Winrates',
      desc: isRu ? 'Расширенная таблица истории матчей с детальной статистикой по каждой карте.' : 'Comprehensive match history logs with per-map winrates and rating adjustments.'
    },
    {
      title: 'Instant GOTV Demo Downloader',
      desc: isRu ? 'Прямое скачивание .DEM записей матча в 1 клик через CDN-серверы FACEIT.' : 'One-click direct .DEM replay downloads via high-speed FACEIT CDN relays.'
    }
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
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              {isRu ? 'ИСТОРИЯ ВЕРСИЙ // CHANGELOG' : 'SYSTEM // CHANGELOG'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors p-1 rounded-none hover:bg-white/10 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Version Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <span className="px-2.5 py-1 bg-white text-black font-mono font-black text-sm tracking-wider rounded-none">
                v1.0.0
              </span>
              <span className="text-white font-bold text-base sm:text-lg tracking-tight font-sans">
                {isRu ? 'Публичный релиз v1.0.0' : 'Public Release v1.0.0'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse"></span>
              <span className="font-mono text-xs text-neutral-400">
                October 10, 2026
              </span>
            </div>
          </div>

          {/* Release Notes List */}
          <div className="space-y-3.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
              {isRu ? 'ОСНОВНЫЕ НОВОВВЕДЕНИЯ И ВОЗМОЖНОСТИ:' : 'RELEASE HIGHLIGHTS & ARCHITECTURE:'}
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
                  <div className="text-xs sm:text-sm font-bold text-white tracking-tight">
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
            <span>PEEKLY ARCHITECTURE ENGINE</span>
            <span>BUILD: 2026.10.10</span>
          </div>
        </div>

        {/* Modal Bottom CTA */}
        <div className="px-6 py-4 bg-[#111111] border-t border-white/10 flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer rounded-none"
          >
            {isRu ? 'ЗАКРЫТЬ' : 'CLOSE'}
          </button>
        </div>
      </div>
    </div>
  );
};
