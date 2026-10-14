import type { HumanFeatureData } from './types';

export const enFeatures: Record<string, HumanFeatureData> = {
  "radar": {
    "id": "radar",
    "number": "01",
    "title": "Map Pool Radar Chart",
    "category": "MATCHROOM",
    "summary": "Renders team map pool radar chart in matchroom based on last 30 matches.",
    "overview": "During map veto voting, Peekly generates an intuitive radar chart based on the last 30 competitive matches of every player in the lobby. You immediately spot enemy comfort zones and exploitable map weaknesses, giving your captain clear data to ban hazardous opponent picks and secure your highest-winrate battleground.",
    "benefits": [
      {
        "title": "Instant Map Pool Overview",
        "desc": "Side-by-side readiness breakdown across all CS2 active duty maps."
      },
      {
        "title": "Eliminate Unwanted Picks",
        "desc": "Prevent accidental matches on maps where opponents hold an 80% winrate."
      },
      {
        "title": "Pre-Match Confidence",
        "desc": "Your squad aligns on tactics before loading onto the server."
      }
    ],
    "audience": "Team captains, 5-stacks, and tactical solo-queue players."
  },
  "stats": {
    "id": "stats",
    "number": "02",
    "title": "Match Player Stats Overlay",
    "category": "MATCHROOM",
    "summary": "Displays 30-match performance stats and map breakdown under each player in the matchroom.",
    "overview": "No more opening 10 separate browser tabs. Peekly renders essential stats directly under each player card: K/D ratio, Average Damage (ADR), Headshot percentage, and recent 30-match winrate. Spot the opponent hot-streakers and identify unstable aimers in two seconds.",
    "benefits": [
      {
        "title": "Evaluate Opponent Form",
        "desc": "Instantly identify dangerous entry fraggers and impact snipers."
      },
      {
        "title": "Save Valuable Time",
        "desc": "All player insights on one screen without clicking profile links."
      },
      {
        "title": "Minimalist HUD",
        "desc": "Sleek design integrates smoothly into the matchroom without visual clutter."
      }
    ],
    "audience": "Competitive players who value pre-round preparation."
  },
  "avgEloPill": {
    "id": "avgEloPill",
    "number": "03",
    "title": "Team Average ELO Badge",
    "category": "MATCHROOM",
    "summary": "Displays high-contrast team average ELO pills with rank icons in match banner.",
    "overview": "Calculates and displays the true average ELO for both rosters directly in the matchroom header with rank icons. You immediately see the genuine balance of power in the lobby, helping you prepare mentally for tough opponents or play carefully to protect your rating.",
    "benefits": [
      {
        "title": "Lobby Balance Clarity",
        "desc": "Understand the rating gap between rosters before round one."
      },
      {
        "title": "Match Stakes Awareness",
        "desc": "Understand the competitive stakes and challenge level before round one."
      },
      {
        "title": "Tactical Mindset",
        "desc": "Gauge opponent experience and adapt your team game pace."
      }
    ],
    "audience": "ELO grinders, competitive solo-queuers, and Level 10 aspirants."
  },
  "autoCopyServer": {
    "id": "autoCopyServer",
    "number": "04",
    "title": "Auto-Copy Server IP",
    "category": "MATCHROOM",
    "summary": "Automatically copies connect command to clipboard when IP is assigned.",
    "overview": "As soon as FACEIT allocates your dedicated match server, the ready-to-run console connect command is copied straight to your clipboard. Launch CS2, open console (~), press Ctrl+V, and connect before anyone else to warm up your aim.",
    "benefits": [
      {
        "title": "Fast Server Connect",
        "desc": "Join the game in 3 seconds without searching for server buttons."
      },
      {
        "title": "Clipboard-Ready",
        "desc": "Full console string with IP, port, and password ready on paste."
      },
      {
        "title": "Warmup Advantage",
        "desc": "Get on the server early and get your crosshair warm before pistol round."
      }
    ],
    "audience": "All competitive FACEIT CS2 players."
  },
  "focusMode": {
    "id": "focusMode",
    "number": "05",
    "title": "Lobby Focus Mode",
    "category": "MATCHROOM",
    "summary": "Hides team rosters and score banner, keeping server, map, and radar visible.",
    "overview": "Hides player rosters and score banners from the matchroom, leaving only essential elements in focus: the selected map, server connect string, and tactical map pool radar. Reduces memory overhead and keeps attention strictly on the upcoming match.",
    "benefits": [
      {
        "title": "Zero Distractions",
        "desc": "Keep your focus entirely on map, server, and radar."
      },
      {
        "title": "Low Memory Overhead",
        "desc": "Reduces browser memory usage in the background while CS2 runs."
      },
      {
        "title": "High-Contrast View",
        "desc": "Tactical, clean dark theme engineered for fast reading."
      }
    ],
    "audience": "Players who prioritize clean interfaces and maximum CS2 FPS."
  },
  "autoAcceptMatch": {
    "id": "autoAcceptMatch",
    "number": "06",
    "title": "Auto-Accept Match Check",
    "category": "AUTOMATION",
    "summary": "Automatically confirms ready check dialog upon match creation.",
    "overview": "Never suffer queue cooldowns from missing the match check button again. Peekly confirms the dialog automatically when a match is found, even if you stepped away or tabbed out. You can also configure a realistic delay from 0 to 10 seconds via the intuitive slider.",
    "benefits": [
      {
        "title": "Cooldown Protection",
        "desc": "Zero queue penalties from missing an unexpected ready check."
      },
      {
        "title": "Peace of Mind",
        "desc": "Step away safely during long late-night queue times."
      },
      {
        "title": "Configurable Slider (0–10s)",
        "desc": "Choose between instantaneous 0s response or a human-like delay up to 10 seconds."
      }
    ],
    "audience": "Anyone playing long sessions who values queue safety."
  },
  "autoAcceptParty": {
    "id": "autoAcceptParty",
    "number": "07",
    "title": "Auto-Accept Party Invites",
    "category": "AUTOMATION",
    "summary": "Automatically accepts incoming party invitations with configurable delay.",
    "overview": "When teammates or your captain send a party invite, Peekly accepts it immediately in the background with a configurable delay from 0 to 10 seconds. You join your squad without hunting down notifications.",
    "benefits": [
      {
        "title": "Rapid Stack Assembly",
        "desc": "Your full 5-stack gathers in seconds without waiting on manual clicks."
      },
      {
        "title": "Configurable Slider (0–10s)",
        "desc": "Customizable response interval from 0 to 10 seconds."
      },
      {
        "title": "Background Reliability",
        "desc": "Invites are accepted seamlessly even if the browser is minimized."
      }
    ],
    "audience": "Premade teams, friend groups, and tournament squads."
  },
  "enhancedHistory": {
    "id": "enhancedHistory",
    "number": "08",
    "title": "Enhanced Match History",
    "category": "PROFILE",
    "summary": "Adds K/R, ADR, PCR columns and a direct Demo download button to the match history table.",
    "overview": "Enhances standard FACEIT match history with competitive metrics K/R, ADR, proprietary PCR (Peekly Contribution Rating), and instant one-click official demo replay downloads (.DEM). PCR measures each player's percentage contribution to team round wins and impactful actions, replacing the outdated and less accurate RWS system. The algorithm factors in kills, assists, average damage per round (ADR), entry frags, clutches won, and effective utility usage. The sum across all 5 squad players always equals 100%, meaning the balanced baseline for an individual player is exactly 20%. Replay files download directly at full CDN speed without third-party redirects or ads.",
    "benefits": [
      {
        "title": "1-Click Demo Download",
        "desc": "Direct access to official CS2 .DEM files from FACEIT CDN relays."
      },
      {
        "title": "PCR Contribution Metric (20% Baseline)",
        "desc": "PCR replaces RWS to evaluate genuine impact (kills, ADR, entry frags, clutches, utility). Squad total is 100%; individual baseline is 20%."
      },
      {
        "title": "Fast VOD Review",
        "desc": "Analyze rounds, clutch decisions, and utility right after the game."
      }
    ],
    "audience": "Players reviewing demos, tactical coaches, and highlight creators."
  },
  "sidebarElo": {
    "id": "sidebarElo",
    "number": "09",
    "title": "Sidebar ELO Widget",
    "category": "PROFILE",
    "summary": "Displays compact 2-element ELO widget with skill level icon and live score in rail.",
    "overview": "Integrates a sleek 2-element widget directly into the FACEIT profile sidebar. Keep track of your exact competitive ELO rating, level badge, and tier progress at a glance without navigating through multiple pages.",
    "benefits": [
      {
        "title": "Instant ELO Visibility",
        "desc": "Your current rating and rank badge are always visible in the sidebar."
      },
      {
        "title": "Compact 2-Element Block",
        "desc": "Clean minimalist footprint blends seamlessly into the native FACEIT layout."
      },
      {
        "title": "Fast Progress Tracking",
        "desc": "Easily monitor your rating gains and losses after every match."
      }
    ],
    "audience": "All players actively tracking their FACEIT CS2 rating progress."
  },
  "mapSelectorStats": {
    "id": "mapSelectorStats",
    "number": "10",
    "title": "Map Selector Win Rates",
    "category": "PROFILE",
    "summary": "Displays team and personal win rate badges directly on matchmaking queue map tiles.",
    "overview": "Overlays your personal and team win rates straight onto the map selection draft tiles in matchmaking queue. In seconds, decide which maps to enable with your squad and avoid queueing into maps where your winrate is low.",
    "benefits": [
      {
        "title": "Clear Win Percentages",
        "desc": "See your real win record right on the queue map cards."
      },
      {
        "title": "Quick Squad Consensus",
        "desc": "Align map picks with friends in seconds before hitting search."
      },
      {
        "title": "Boost LongTerm Winrate",
        "desc": "Play only your strongest maps to climb ranks faster."
      }
    ],
    "audience": "Players who want a calculated, data-driven queue pool."
  }
};
