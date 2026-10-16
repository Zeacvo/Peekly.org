import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SUPPORTED_LANGUAGES,
  matchLanguageFromCandidates,
  getSafeInitialLanguage,
  saveLanguagePreference,
} from '../src/translations.ts';

test('SUPPORTED_LANGUAGES contains all 16 defined locales', () => {
  const expectedCodes = [
    'en', 'da', 'de', 'es', 'fr', 'pl', 'pt', 'fi',
    'sv', 'tr', 'ru', 'uk', 'ar', 'ja', 'ko', 'zh',
  ];
  assert.strictEqual(SUPPORTED_LANGUAGES.length, 16);
  for (const code of expectedCodes) {
    assert.ok(
      SUPPORTED_LANGUAGES.some((l) => l.code === code),
      `Missing locale: ${code}`
    );
  }
});

test('matchLanguageFromCandidates matches required locales and falls back to en', () => {
  // Required user test cases:
  assert.strictEqual(matchLanguageFromCandidates(['pl-PL']), 'pl');
  assert.strictEqual(matchLanguageFromCandidates(['de-DE']), 'de');
  assert.strictEqual(matchLanguageFromCandidates(['uk-UA']), 'uk');
  assert.strictEqual(matchLanguageFromCandidates(['es-AR']), 'es');
  assert.strictEqual(matchLanguageFromCandidates(['ja-JP']), 'ja');
  assert.strictEqual(matchLanguageFromCandidates(['it-IT']), 'en');
});

test('matchLanguageFromCandidates correctly resolves all 16 supported locales with regional variants', () => {
  const regionalPairs = [
    { input: 'en-US', expected: 'en' },
    { input: 'da-DK', expected: 'da' },
    { input: 'de-AT', expected: 'de' },
    { input: 'es-ES', expected: 'es' },
    { input: 'fr-FR', expected: 'fr' },
    { input: 'pl-PL', expected: 'pl' },
    { input: 'pt-BR', expected: 'pt' },
    { input: 'fi-FI', expected: 'fi' },
    { input: 'sv-SE', expected: 'sv' },
    { input: 'tr-TR', expected: 'tr' },
    { input: 'ru-RU', expected: 'ru' },
    { input: 'uk-UA', expected: 'uk' },
    { input: 'ar-SA', expected: 'ar' },
    { input: 'ja-JP', expected: 'ja' },
    { input: 'ko-KR', expected: 'ko' },
    { input: 'zh-CN', expected: 'zh' },
  ];

  for (const { input, expected } of regionalPairs) {
    assert.strictEqual(
      matchLanguageFromCandidates([input]),
      expected,
      `Failed matching ${input} -> ${expected}`
    );
  }
});

test('matchLanguageFromCandidates handles multi-candidate preference priority', () => {
  // First supported candidate wins
  assert.strictEqual(matchLanguageFromCandidates(['it-IT', 'pl-PL', 'en-US']), 'pl');
  assert.strictEqual(matchLanguageFromCandidates(['nl-NL', 'de-CH', 'en']), 'de');
  assert.strictEqual(matchLanguageFromCandidates(['unknown-LANG', 'ro-RO']), 'en');
  assert.strictEqual(matchLanguageFromCandidates([]), 'en');
});

test('getSafeInitialLanguage prioritizes localStorage over browser language', () => {
  const originalNavDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  const originalWindow = globalThis.window;
  const originalDoc = globalThis.document;

  const storageMap = new Map();
  globalThis.window = {
    localStorage: {
      getItem: (key) => storageMap.get(key) ?? null,
      setItem: (key, val) => storageMap.set(key, String(val)),
      removeItem: (key) => storageMap.delete(key),
      clear: () => storageMap.clear(),
    },
  };

  Object.defineProperty(globalThis, 'navigator', {
    value: {
      languages: ['pl-PL'],
      language: 'pl-PL',
    },
    configurable: true,
    writable: true,
  });

  globalThis.document = {
    documentElement: {
      lang: 'en',
      dir: 'ltr',
    },
  };

  try {
    // 1. First visit with no localStorage: navigator 'pl-PL' is detected
    const firstVisit = getSafeInitialLanguage();
    assert.strictEqual(firstVisit, 'pl');

    // 2. User explicitly selected 'de': localStorage overrides navigator
    saveLanguagePreference('de');
    assert.strictEqual(storageMap.get('peekly_language'), 'de');
    assert.strictEqual(globalThis.document.documentElement.lang, 'de');
    assert.strictEqual(globalThis.document.documentElement.dir, 'ltr');

    const subsequentVisit = getSafeInitialLanguage();
    assert.strictEqual(subsequentVisit, 'de');

    // 3. User selects Arabic: RTL is applied
    saveLanguagePreference('ar');
    assert.strictEqual(globalThis.document.documentElement.lang, 'ar');
    assert.strictEqual(globalThis.document.documentElement.dir, 'rtl');
  } finally {
    globalThis.window = originalWindow;
    globalThis.document = originalDoc;
    if (originalNavDescriptor) {
      Object.defineProperty(globalThis, 'navigator', originalNavDescriptor);
    }
  }
});
