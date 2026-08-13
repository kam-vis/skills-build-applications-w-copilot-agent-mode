import test from 'node:test';
import assert from 'node:assert/strict';

import { getApiBaseUrl } from './index';

test('returns the Codespaces API URL when CODESPACE_NAME is set', () => {
  process.env.CODESPACE_NAME = 'octofit-demo';
  assert.equal(getApiBaseUrl(), 'https://octofit-demo-8000.app.github.dev');
});

test('falls back to localhost when no Codespace is configured', () => {
  delete process.env.CODESPACE_NAME;
  assert.equal(getApiBaseUrl(), 'http://localhost:8000');
});
