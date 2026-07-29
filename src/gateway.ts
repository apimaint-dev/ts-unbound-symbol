import Anthropic from '@anthropic-ai/sdk';

import { MessageQueue } from './queue.js';

/**
 * The unbound-symbol fixture (F-2).
 *
 * Two classes, each with a private field named `client`. Only the first is an Anthropic client;
 * the second is the in-house queue from `./queue.ts`. Tier 1 keys its alias bindings on the flat
 * string `this.client` for the whole file, so it reports **both** `messages.create` calls as
 * `sdk_call` at 0.5 — the second is a false positive against code that has nothing to do with
 * the API.
 *
 * This is the shape Tier 2 exists to adjudicate: resolving each receiver to its own declaration
 * binds `ask()` to `@anthropic-ai/sdk` (+0.4) and refuses `enqueue()`, which is demoted below
 * the patch floor rather than left at Tier-1 confidence.
 */
export class AnthropicGateway {
  private readonly client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  async ask(prompt: string) {
    return this.client.messages.create({
      model: 'claude-opus-4-20250514',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });
  }
}

export class JobDispatcher {
  private readonly client = new MessageQueue();

  enqueue(topic: string) {
    return this.client.messages.create({ topic });
  }
}
