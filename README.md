# Next.jsApp Router Starter for Uniform DXP

Featuring `Cache Components` support (disabled in this starter, read later on how to enable).

## 🚧 Release Candidate
This is a late release candidate of the SDK. While we don't anticipate any breaking changes at this point, there may be additional fixes and changes before GA.

## Important: Uniform Preview support

In order to support Uniform preview for Next.js 16, you need to leave `middleware.ts` named as such, don't rename it to `proxy.ts` and keep this export in it:

```
export const runtime = 'experimental-edge';
```

## Demo

See [this live url](https://nextjs-app-router-v2.vercel.app/) to experience personalization and edge personalization.

## Getting Started

1. Prepare an empty Uniform project.

1. Set your Uniform env vars with developer permission API key in .env.

1. Add `UNIFORM_PREVIEW_SECRET` with desired value to protect preview/draft mode content:
    ```bash

    UNIFORM_PREVIEW_SECRET=hello-world
    ```
    
1. Finally, specify which Uniform instance this app needs to connect to - US or EU:
    ```bash
    # Connect to US region
    UNIFORM_CLI_BASE_EDGE_URL=https://uniform.global
    UNIFORM_CLI_BASE_URL=https://uniform.app

    # or switch to EU region:
    # UNIFORM_CLI_BASE_EDGE_URL=https://eu.uniform.global
    # UNIFORM_CLI_BASE_URL=https://eu.uniform.app

    ```

1. Install dependencies:
    ```bash
    pnpm install
    ```

1. One-time: push content into your empty project with this command:
    ```bash
    pnpm push
    ```

1. Run the dev server:

    ```bash
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to enable cache components support

1. Enable `cache components` feature in next.config
```bash
    const nextConfig: NextConfig = {
        cacheComponents: true,
    };
```

2. Update your `page.tsx` to import `resolveRouteFromCode` function from another path:
```bash
import { resolveRouteFromCode } from '@uniformdev/next-app-router/cache';
```