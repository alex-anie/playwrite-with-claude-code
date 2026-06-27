# Test Prompts Log

This file records every prompt used to generate automated tests with Claude Code connected to the Playwright MCP Server.

Each entry shows exactly what was described to the agent, which file/test it produced, and which agent was used. Use this to review what's been tested, reuse a prompt with a different agent, or understand the intent behind a generated test without having to reverse-engineer it from code alone.

New entries are appended below — do not edit or remove existing ones.

---

1. open URL https://ecommerce-playground.lambdatest.io/index.php?route=common/home and learn about the website and tell me what the website is about
2. open the product categories, click on the 'Phone, Tablets & iPod' tab find how many product is listed on the page and tell me
3. scrape the data of products ... save in a .json file inside a data-scrape folder... scrape the data of 5 pages
4. Go to 'My Account' ... register ... click Continue ... screenshot ... logout ... login ... screenshot ... save both screenshot in a screenshot folder
5. Carousel: click carousel buttons and record a 5 minutes video
6. Reload home, list external APIs and network requests
7. in the .vscode folder add '--headless' to the mcp config file
8. Check all the prompt based tests I asked you to run on https://ecommerce-playground.lambdatest.io/index.php?route=common/home website.
9. Save each prompt instance as a seperate tests, named then accordingly and add a tag "agentic" to each test. So that i can filter using the agentic keyword for the tests you generated on my Playwright test GUI.
10. save the tests in the tests/e2e folder with the ".spec.ts" extension.
11. Do this in less then 2 minutes, and if you have not completed the tests save the once you have done and terminate the remaining one.
12. Copy all the prompts that i have made so far in this chat, number them and save them below the text in test_prompts.md file located in my project root directory.
13. Do this in less then 2 minutes, if this takes more than that. terminate the process.
14. include this prompt aswell.
