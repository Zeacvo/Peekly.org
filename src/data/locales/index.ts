import type { HumanFeatureData } from './types';
import { enFeatures } from './en';
import { ruFeatures } from './ru';
import { zhFeatures } from './zh';
import { jaFeatures } from './ja';
import { koFeatures } from './ko';
import { deFeatures } from './de';
import { frFeatures } from './fr';
import { esFeatures } from './es';
import { plFeatures } from './pl';
import { ptFeatures } from './pt';
import { daFeatures } from './da';
import { fiFeatures } from './fi';
import { svFeatures } from './sv';
import { trFeatures } from './tr';
import { ukFeatures } from './uk';
import { arFeatures } from './ar';

export type { HumanFeatureData } from './types';

export const featureHumanDetailsByLang: Record<string, Record<string, HumanFeatureData>> = {
  en: enFeatures,
  ru: ruFeatures,
  zh: zhFeatures,
  ja: jaFeatures,
  ko: koFeatures,
  de: deFeatures,
  fr: frFeatures,
  es: esFeatures,
  pl: plFeatures,
  pt: ptFeatures,
  da: daFeatures,
  fi: fiFeatures,
  sv: svFeatures,
  tr: trFeatures,
  uk: ukFeatures,
  ar: arFeatures,
};
