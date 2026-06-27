# Generating Automated Tests

1. **Explore before writing code.** Use the Playwright MCP Server to navigate to the site and observe real behavior first. Do not generate test code based on assumptions about element names, classes, or IDs — verify them against the live DOM via the MCP snapshot/inspection tools.

2. **Write tests in TypeScript only.** All generated test files must use the `.spec.ts` extension — never `.spec.js` or plain `.js`. This project standardises on TypeScript for type safety and consistency across the suite.

3. **Save all generated tests to `tests/e2e/`.** Do not create test files in the project root, in `tests/` directly, or in any other directory.

4. **Name files descriptively, based on the feature under test**, following the existing pattern in this repo:
   - `homepage.spec.ts`
   - `product-search.spec.ts`
   - `auth.spec.ts`

   Use lowercase, hyphen-separated names that describe the feature, not the agent or the date.

5. **Tag every agent-generated test with `@agentic`.** Add the tag to the test title itself, following Playwright's tag convention:

   ```typescript
   test('should display the search bar @agentic', async ({ page }) => {
     // ...
   });
   ```

   This allows anyone on the team to filter and run only agent-generated tests:

   ```bash
   npx playwright test --grep @agentic
   ```

6. **Do not overwrite existing test files.** If a test for the described scenario already exists in `tests/e2e/`, add a new `test()` block inside the relevant `test.describe()` group rather than replacing the file.

7. **Every generated test must be runnable independently.** Avoid relying on state left behind by other tests.

8. **Comment any non-obvious locator choice.** If a selector exists because of a site-specific quirk, leave a one-line comment explaining why.

9. **If a feature appears broken on the live site**, do not write a test that asserts broken behavior as if it were correct, and do not silently skip it either. Report back to the user and ask for guidance.

10. **Log every prompt used to generate a test in `test_prompts.md`** (at the project root). Append an entry in this format:

    ```markdown
    ## [Test file name] — [Test title]

    **Date:** YYYY-MM-DD
    **Agent used:** Claude Code

    **Prompt:**
    > [The exact prompt text, copied verbatim]

    ---
    ```
