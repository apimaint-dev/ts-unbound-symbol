# ts-unbound-symbol

A synthetic TypeScript service used to exercise `apimaint`'s scanner. Not a real application —
it exists so the indexer has something honest to be right or wrong about.

`src/gateway.ts` calls `this.client.messages.create(...)` **twice**. The two calls are
textually near-identical, and only one of them is an Anthropic SDK call:

- **line 22** — `this.client` is a real `Anthropic` client.
- **line 34** — `this.client` is the in-house `MessageQueue` from `src/queue.ts`.

A scanner that reports both is generating false positives; a scanner that reports neither has
no recall. Telling them apart is the point.
