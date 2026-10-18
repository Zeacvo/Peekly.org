import test from 'node:test';
import assert from 'node:assert/strict';
import { getInstallUrl, CHROME_STORE_URL, FIREFOX_STORE_URL } from '../src/utils/installUrl.ts';

test('getInstallUrl correctly detects Firefox', () => {
  const firefoxUAs = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:123.0) Gecko/20100101 Firefox/123.0',
    'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0',
  ];

  for (const ua of firefoxUAs) {
    assert.strictEqual(getInstallUrl(ua), FIREFOX_STORE_URL, `Failed to detect Firefox: ${ua}`);
  }
});

test('getInstallUrl correctly routes Chromium and other browsers to Chrome Web Store', () => {
  const chromiumUAs = [
    // Chrome
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    // Opera / Opera GX
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 OPR/109.0.0.0',
    // Microsoft Edge
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0',
    // Brave (usually identical to Chrome in UA)
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    // Yandex
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 YaBrowser/24.1.0.0 Safari/537.36',
  ];

  for (const ua of chromiumUAs) {
    assert.strictEqual(getInstallUrl(ua), CHROME_STORE_URL, `Failed to route Chromium browser: ${ua}`);
  }
});
