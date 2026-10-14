import React, { useEffect } from 'react';
import { X, ExternalLink, Cpu, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import type { Language } from '../translations';
import { featureDetailsByLang } from '../data/featureDetails';
import { PeeklyLogo } from './PeeklyLogo';

interface FeatureModalProps {
  featureId: string | null;
  currentLang: Language;
  onClose: () => void;
  renderTexture?: (id: string) => React.ReactNode;
}

export const FeatureModal: React.FC<FeatureModalProps> = ({
  featureId,
  currentLang,
  onClose,
  renderTexture
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (featureId) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [featureId, onClose]);

  if (!featureId) return null;

  const langKey = currentLang === 'ru' ? 'ru' : 'en';
  const details = (featureDetailsByLang[langKey] && featureDetailsByLang[langKey][featureId])
    || (featureDetailsByLang['en'] && featureDetailsByLang['en'][featureId]);

  if (!details) return null;

  const isRu = currentLang === 'ru';

  // Specific formulas and algorithmic logic per feature
  const formulasMap: Record<string, { label: string; code: string; notes?: string }> = {
    radar: {
      label: isRu ? 'ФОРМУЛА БАЛАНСА МАППУЛА' : 'MAP POOL BIAS ALGORITHM',
      code: 'ΔWR(map) = WR_team(map) - WR_opponents(map)\nScore(map) = Σ [ (Match_Result × Weight_freshness) / Sample_Size ]\nWeight(t) = exp(-0.025 × Δdays)',
      notes: isRu 
        ? 'Выборка глубиной в 30 соревновательных матчей с экспоненциальным затуханием старых игр.'
        : 'Exponential recency decay applied across the 30 most recent competitive matches.'
    },
    stats: {
      label: isRu ? 'ФОРМУЛЫ БОЕВЫХ МЕТРИК' : 'COMBAT METRIC FORMULAS',
      code: 'K/R = Total_Kills / Total_Rounds\nADR = Total_Damage_Dealt / Total_Rounds\nPCR = (1.15 × K/R) + (0.0075 × ADR) + (0.12 × KAST%) - (0.65 × Deaths/R)',
      notes: isRu
        ? 'Объективный расчет боевого импакта независимо от добиваний и мусорных фрагов.'
        : 'Accurate round-normalized firepower and carry potential calculation.'
    },
    autoAcceptMatch: {
      label: isRu ? 'ПЕРЕХВАТ СОБЫТИЯ ГОТОВНОСТИ' : 'ZERO-LATENCY INTERCEPT',
      code: 'WS.onmessage = (packet) => {\n  if (packet.event === "MATCH_READY_CHECK") {\n    setTimeout(() => confirmReady(packet.matchId), userDelayMs);\n  }\n};',
      notes: isRu
        ? 'Мгновенное обнаружение входящего сокета без задержек DOM-рендеринга.'
        : 'Direct WebSocket listener hook with local user-configurable response delay (0-10s).'
    },
    autoAcceptParty: {
      label: isRu ? 'ФИЛЬТР ДОВЕРЕННЫХ ИНВАЙТОВ' : 'TRUSTED WHITELIST VERIFICATION',
      code: 'if (whitelist.has(invite.sender_id)) {\n  dispatchJoinGroup(invite.group_id);\n} else if (blockUnknown) {\n  suppressNotification(invite);\n}',
      notes: isRu
        ? 'Автоматическое присоединение только к друзьям из локального белого списка.'
        : 'Guarantees instant entry for teammates while filtering third-party invite spam.'
    },
    enhancedHistory: {
      label: isRu ? 'ПРЯМОЙ ДОСТУП К GOTV ЗАПИСИ' : 'GOTV DIRECT CDN RESOLUTION',
      code: 'demo_cdn_url = `https://demos-europe.faceit.com/cs2/${match_id}.dem.gz`\ncurl -O demo_cdn_url -> Decompress -> csgo/replays/',
      notes: isRu
        ? 'Скачивание официальных .DEM записей напрямую с серверов Valve/FACEIT без рекламы.'
        : 'One-click direct high-throughput download bypasses ad walls and redirection gateways.'
    },
    autoCopyServer: {
      label: isRu ? 'СИНХРОНИЗАЦИЯ БУФЕРА ОБМЕНА' : 'CLIPBOARD COMMAND GENERATOR',
      code: 'const cmd = `connect ${server.ip}:${server.port}; password ${server.pwd}`;\nnavigator.clipboard.writeText(cmd);\nplayHapticConfirmSound();',
      notes: isRu
        ? 'Автоматическая подготовка консольной строки сразу в момент выделения сервера.'
        : 'Instantly puts ready-to-run connect string directly on the system clipboard.'
    },
    focusMode: {
      label: isRu ? 'ФИЛЬТР ВИЗУАЛЬНОГО ШУМА' : 'DOM OPTIMIZATION MATRIX',
      code: 'document.querySelectorAll(".faceit-banner, .social-feed, .chat-panel")\n  .forEach(el => el.style.display = "none");\n// Preserves: #veto-radar, #server-connect, #player-cards',
      notes: isRu
        ? 'Снижает потребление оперативной памяти браузера и устраняет отвлекающие элементы.'
        : 'Eliminates DOM clutter, lowers browser memory usage, and focuses on core matchroom intel.'
    },
    avgEloPill: {
      label: isRu ? 'РАСЧЕТ СРЕДНЕГО ELO' : 'TEAM AVERAGE ELO',
      code: 'Team_Avg_ELO = (Σ Elo_players) / 5\nΔELO = TeamA_Avg - TeamB_Avg\nRating_Delta = Math.abs(TeamA_Avg - TeamB_Avg)',
      notes: isRu
        ? 'Точный расчет среднего ELO обеих команд и реального баланса сил в лобби до начала матча.'
        : 'Reveals mathematical rating advantage and team balance in the lobby pre-game.'
    },
    mapSelectorStats: {
      label: isRu ? 'ИНЪЕКЦИЯ ВЕТО-ВИНРЕЙТОВ' : 'MAP VETO WINRATE OVERLAY',
      code: 'mapTiles.forEach(tile => {\n  tile.appendBadge({ ourWR: calcWR(tile.map), enemyWR: calcEnemyWR(tile.map) });\n});',
      notes: isRu
        ? 'Отображение шансов на победу прямо на плитках карт в режиме пик-бан.'
        : 'Displays live map advantage percentages directly on the voting cards during queue draft.'
    }
  };

  const formulaData = formulasMap[details.id];

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-[#0c0c0c] border border-white/20 shadow-2xl rounded-none overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 border-b border-white/10 bg-[#111111] shrink-0">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs font-black text-[#FF5500] px-2 py-0.5 bg-[#FF5500]/10 border border-[#FF5500]/30 rounded-none">
              {details.number}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              {details.category}
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

        {/* Scrollable Modal Content */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Main Title & Summary */}
          <div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-2">
              {details.title}
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
              {details.summary}
            </p>
          </div>

          {/* Visual Texture / Graphic Preview */}
          {renderTexture && (
            <div className="w-full h-44 sm:h-52 bg-[#080808] border border-[#222222] overflow-hidden flex items-center justify-center relative">
              {renderTexture(details.id)}
            </div>
          )}

          {/* Detailed Architectural Description */}
          <div className="p-4 sm:p-5 bg-[#111111] border border-[#1f1f1f]">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
              <Cpu className="w-4 h-4 text-[#FF5500]" />
              <span>{isRu ? 'АРХИТЕКТУРА И АЛГОРИТМ' : 'ARCHITECTURE & INTEGRATION'}</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
              {details.description}
            </p>
          </div>

          {/* Bullets / Capabilities */}
          {details.bullets && details.bullets.length > 0 && (
            <div className="space-y-2.5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                {isRu ? 'КЛЮЧЕВЫЕ ВОЗМОЖНОСТИ:' : 'TECHNICAL CAPABILITIES:'}
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {details.bullets.map((b, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3 bg-[#111111] border border-[#1f1f1f]">
                    <CheckCircle2 className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white tracking-tight">{b.label}</div>
                      <div className="text-xs text-neutral-400 leading-relaxed font-sans">{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mathematical Formulas & Algorithmic Code */}
          {formulaData && (
            <div className="p-4 bg-[#0a0a0a] border border-[#262626]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF5500] font-bold">
                  {formulaData.label}
                </span>
                <span className="text-[10px] font-mono text-neutral-500">MATH & LOGIC MATRIX</span>
              </div>
              <pre className="font-mono text-xs text-neutral-200 bg-[#050505] p-3 border border-[#1a1a1a] overflow-x-auto leading-relaxed">
                <code>{formulaData.code}</code>
              </pre>
              {formulaData.notes && (
                <p className="text-[11px] text-neutral-400 font-sans mt-2">
                  {formulaData.notes}
                </p>
              )}
            </div>
          )}

          {/* Tactical Specs Table */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
              {isRu ? 'ТАКТИЧЕСКИЕ СПЕЦИФИКАЦИИ:' : 'SYSTEM SPECIFICATIONS:'}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {details.specs.map((s, idx) => (
                <div key={idx} className="p-3 bg-[#111111] border border-[#1f1f1f]">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">{s.label}</div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-white mt-1 truncate">{s.value}</div>
                </div>
              ))}
              <div className="p-3 bg-[#111111] border border-[#1f1f1f]">
                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                  {isRu ? 'БЕЗОПАСНОСТЬ' : 'ANTI-CHEAT'}
                </div>
                <div className="text-xs sm:text-sm font-mono font-bold text-[#FF5500] mt-1 flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% SAFE</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer Bar */}
        <div className="px-5 sm:px-7 py-4 bg-[#111111] border-t border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400 hidden sm:flex">
            <Zap className="w-3.5 h-3.5 text-[#FF5500]" />
            <span>MANIFEST V3 EXTENSION</span>
          </div>
          
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-transparent border border-white/20 text-neutral-300 font-mono text-xs uppercase tracking-wider hover:text-white hover:border-white transition-colors cursor-pointer rounded-none"
            >
              {isRu ? 'ЗАКРЫТЬ' : 'CLOSE'}
            </button>
            <a
              href="https://chromewebstore.google.com/detail/peekly-for-faceit/cmfgneodcjfofdcglbbhcghijgcjcokk"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center space-x-2.5 px-5 py-2.5 bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-black hover:border hover:border-white hover:text-white transition-all cursor-pointer rounded-none"
            >
              <PeeklyLogo size={18} className="text-black group-hover:text-[#FF5500] transition-colors duration-200" />
              <span>{isRu ? 'УСТАНОВИТЬ В CHROME' : 'ADD TO CHROME'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
