/**
 * An in-house job queue that happens to spell its API `messages.create` — the same shape the
 * Anthropic SDK uses. Nothing here is wrong; the collision is simply what real codebases look
 * like, and it is the reason a receiver has to be resolved rather than pattern-matched.
 */
export class MessageQueue {
  readonly messages = {
    create(payload: { topic: string }) {
      return { id: `job:${payload.topic}`, queued: true };
    },
  };
}
