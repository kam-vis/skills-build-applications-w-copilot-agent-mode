"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const index_1 = require("./index");
(0, node_test_1.default)('returns the Codespaces API URL when CODESPACE_NAME is set', () => {
    process.env.CODESPACE_NAME = 'octofit-demo';
    strict_1.default.equal((0, index_1.getApiBaseUrl)(), 'https://octofit-demo-8000.app.github.dev');
});
(0, node_test_1.default)('falls back to localhost when no Codespace is configured', () => {
    delete process.env.CODESPACE_NAME;
    strict_1.default.equal((0, index_1.getApiBaseUrl)(), 'http://localhost:8000');
});
//# sourceMappingURL=index.test.js.map