# Playwright MCP Agent Test Report

Mode: agent

## Purpose
This prompt is the AI test specification for Copilot to run a browser-based check on the ecommerce playground homepage.

## Agent Task
You are the Playwright MCP agent. Execute the browser flow and return a concise test report. Do not ask the user for any additional instructions.

### Primary goal
- Navigate to `https://ecommerce-playground.lambdatest.io/`
- Validate the homepage against the provided screenshot reference
- Save or capture any evidence required for failures

## Screenshot Guide
The screenshot saved at `screenshots/ecommerce-playground.png` is the visual baseline. Use it to verify layout, styling, and major UI sections.

## Actions to perform
1. Open the ecommerce playground homepage.
2. Confirm the page loads successfully with a title containing `Your Store`.
3. Verify these visible homepage sections:
   - header and site logo
   - search bar and category navigation
   - top categories section
   - quick links section
   - cart summary widget
   - promotional banner or hero content
4. Confirm there are no obvious visual regressions compared to the screenshot.
5. If any element is missing or visually broken, capture a screenshot and mention the issue.
6. Summarize whether the homepage check passed or failed.

## Reporting format
- Test result: PASSED / FAILED
- Observations: one or two sentences
- Issues found: bullet list if any
- Evidence: include screenshot filename if captured

## Notes
- This prompt is intended for agent-driven validation, not for manual test code execution.
- Keep the response focused on the homepage verification and any visible regressions.
