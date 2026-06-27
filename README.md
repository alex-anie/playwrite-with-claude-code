# Playwright with Claude Code

> AI-powered test automation using Playwright MCP Server + Claude Code  
> Test site: [LambdaTest Ecommerce Playground](https://ecommerce-playground.lambdatest.io/)

This project demonstrates how to use **Claude Code** with the **Playwright MCP Server** to describe, generate, and run end-to-end tests — without writing test code manually. It accompanies the TestMu AI blog post: _"Using Playwright with Claude Code: Complete Guide to AI Test Automation."_

---

## Project Structure

```
playwright-claude-code/
├── .claude/
│   └── commands/
│       ├── manual-test-report.md   # /manual-test-report slash command
│       └── generate-test.md        # /generate-test slash command
├── .mcp.json                        # Playwright MCP Server config for Claude Code
├── tests/
│   └── e2e/
│       ├── homepage.spec.ts         # Homepage tests
│       ├── product-search.spec.ts   # Search & navigation tests
│       ├── auth.spec.ts             # Login & registration tests
│       ├── categories.spec.ts       # Category browsing tests
│       └── scrape.spec.ts           # Data scraping tests
├── screenshots/                     # Captured screenshots (on failure)
├── videos/                          # Recorded videos (on failure)
├── test-results/                    # Raw test output & JSON results
├── playwright.config.ts             # Playwright configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # Project dependencies & scripts
└── .gitignore
```

---

## Prerequisites

Before you begin, make sure you have:

- **Node.js 18+** — [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Claude Code** — Install via npm (see below)
- A **Claude.ai account** (Pro plan or API key)

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/playwright-claude-code.git
cd playwright-claude-code
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

This installs Chromium, Firefox, and WebKit browser binaries.

### 4. Install Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

Authenticate with your Claude.ai account:

```bash
claude
```

Follow the login prompt in your browser.

---

## Connecting the Playwright MCP Server

The Playwright MCP Server gives Claude Code browser automation tools. This project ships with `.mcp.json` at the project root — Claude Code picks it up automatically when you run `claude` inside the directory:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--headless"]
    }
  }
}
```

If you prefer to add it to your global Claude Code config instead, run:

```bash
claude mcp add playwright -- npx @playwright/mcp@latest
```

To verify the MCP server is active, start Claude Code and type `/mcp` — the Playwright server should appear in the list.

---

## Using Claude Code with Playwright MCP

This is the core workflow the blog demonstrates. Instead of writing test code, you **describe** what you want to test and Claude Code handles the rest.

### Step 1: Start Claude Code in the project directory

```bash
cd playwright-claude-code
claude
```

### Step 2: Describe your test scenario

Once Claude Code is running with the Playwright MCP Server connected, describe what you want tested in plain English:

```
Navigate to https://ecommerce-playground.lambdatest.io/ and test the
search functionality. Search for "MacBook", verify results appear,
click the first product, and confirm the product detail page loads
with an Add to Cart button.
```

Claude Code will:
1. Use the Playwright MCP tools to navigate and explore the site
2. Identify the relevant DOM elements and page structure
3. Generate a TypeScript test file in `tests/e2e/`
4. Optionally run the test and report results

---

## Claude Code Slash Commands

This project includes two custom slash commands in `.claude/commands/`. Run them from inside a Claude Code session:

### `/manual-test-report`

Triggers a guided manual testing workflow using the Playwright MCP Server. Claude navigates to the URL you specify, explores the page, performs the described scenario, and generates a structured markdown report in `manual-tests/`.

```
/manual-test-report
```

Then provide your URL and scenario when prompted.

### `/generate-test`

Loads the project's test generation guidelines (TypeScript only, `tests/e2e/` directory, `@agentic` tag, prompt logging). Use this before asking Claude Code to write a new test to ensure it follows the project conventions.

```
/generate-test
```

---

## Running Tests Locally (Traditional Playwright)

If you prefer to run the pre-written TypeScript test files without Claude Code, use these commands:

### Run all tests

```bash
npx playwright test
```

### Run tests with the Playwright UI (interactive mode)

```bash
npx playwright test --ui
```

### Run a specific test file

```bash
npx playwright test tests/e2e/homepage.spec.ts
```

### Run tests in headed mode (visible browser)

```bash
npx playwright test --headed
```

### Run tests in debug mode

```bash
npx playwright test --debug
```

### Run a specific test by name

```bash
npx playwright test -g "should load homepage and display site title"
```

### Run tests for a specific browser only

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run only agent-generated tests

```bash
npx playwright test --grep @agentic
```

### Run only e2e tests

```bash
npx playwright test tests/e2e/
```

### View the HTML test report

```bash
npx playwright show-report
```

---

## Test Coverage

| File | Description |
|---|---|
| `homepage.spec.ts` | Page title, navigation, search bar |
| `product-search.spec.ts` | Search results, empty states, product navigation |
| `auth.spec.ts` | Login form, invalid credentials, registration validation |
| `categories.spec.ts` | Category browsing, product count |
| `scrape.spec.ts` | Data scraping — products to JSON |

---

## Debug and Refactor Example

The `scrape.spec.ts` file shows a before/after refactor that the blog covers. The original agentic version used `.catch(() => {})` to silently swallow locator failures and brittle `h4 a` tag selectors:

```typescript
// Before — silent failure, brittle selector
const title = await p.locator('h4 a').innerText().catch(() => '');
const price = await p.locator('.price').innerText().catch(() => '');
```

The refactored version uses explicit count checks and `getByRole` selectors:

```typescript
// After — explicit, role-based, no silent swallowing
const titleEl = card.getByRole('heading').getByRole('link');
const title = (await titleEl.count()) > 0 ? await titleEl.innerText() : '';
```

---

## Configuration

Key settings in `playwright.config.ts`:

| Setting | Value |
|---|---|
| Base URL | `https://ecommerce-playground.lambdatest.io/` |
| Test directory | `./tests/e2e` |
| Screenshots | On failure only |
| Videos | Retained on failure |
| Trace | On first retry |
| Browsers | Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari |

---

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright MCP Server](https://github.com/microsoft/playwright-mcp)
- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code/overview)
- [Claude Code MCP Setup](https://docs.anthropic.com/en/docs/claude-code/mcp)
- [TestMu AI Blog](https://www.testmuai.com/blog/)
- [LambdaTest Ecommerce Playground](https://ecommerce-playground.lambdatest.io/)
