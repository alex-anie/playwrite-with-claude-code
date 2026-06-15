# Playwright MCP Project Template

This repository demonstrates a professional folder structure for a Playwright MCP project.
It combines traditional automated test artifacts with an AI-driven prompt workflow.

## Project Layout

- `.vscode/mcp.json` — Playwright MCP server configuration used by Copilot
- `.github/prompts/playwright-test-report.md` — Prompt file for agent-guided testing
- `tests/e2e/` — Manual Playwright test specs and regression suites
- `mock_data/` — Test fixture data for controlled scenarios
- `screenshots/` — Visual references and guided screenshots
- `logs/` — Runtime logs and test diagnostics
- `reports/` — Generated reports, artifacts, and results
- `playwright.config.js` — Playwright configuration for local test execution
- `package.json` — Scripts and dependencies for both local and AI workflows

## How to Use This Project

### 1. Traditional Playwright Tests
- Run `npm test` to execute sample Playwright tests in `tests/e2e`
- Use `playwright.config.js` to configure browser behavior, screenshots, and traces

### 2. MCP / Copilot Agent Workflow
- Keep `.vscode/mcp.json` configured for the Playwright MCP server
- Add prompt files under `.github/prompts/`
- Describe the test case to Copilot in natural language
- Use the screenshot guide in `screenshots/ecommerce-playground.png` for validation

## Example Commands

```bash
npm install
npm test
npx @playwright/mcp@latest
```

## Notes

A Playwright MCP project can still use standard test files and mock data. The AI workflow is an additional layer that helps you drive tests by description, not by hand-writing every browser action.
