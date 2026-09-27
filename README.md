# Comment Idea Generator

Next.js demo that groups pasted comments into questions, pain points, praise, and other text, then drafts hooks and outlines. Export Markdown or CSV. All text is processed in the browser.

Run `pnpm install` and `pnpm --filter comment-idea-generator dev` from the workspace root. Open `http://127.0.0.1:3006`. Run `pnpm --filter comment-idea-generator test` for the clustering test.

This is a working local analysis demo. YouTube and Instagram ingestion, AI clustering, persistent storage, and Notion export from the supplied prompt are not connected. Public site scraping requires API permissions and rate limits; the app intentionally uses direct text input until those are configured. Do not claim this is a production social media integration.
