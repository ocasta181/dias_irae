export function createAutosave(initial, { hash, send, onState, onSaved, schedule = setTimeout, cancel = clearTimeout }) {
  let confirmed = initial;
  let latest = initial;
  let baseline = hash(initial);
  let active = false;
  let conflict;
  let retryTimer;

  async function flush() {
    if (active || conflict || latest === confirmed) return;
    if (retryTimer) cancel(retryTimer);
    retryTimer = undefined;
    active = true;
    onState({ status: "saving" });
    while (latest !== confirmed) {
      const snapshot = latest;
      try {
        const result = await send(snapshot, await baseline);
        confirmed = snapshot;
        baseline = Promise.resolve(result.baseline);
        onSaved(snapshot);
      } catch (error) {
        active = false;
        if (error.status === 409) conflict = error;
        onState({ status: "error", error });
        if (!error.status || error.status >= 500) retryTimer = schedule(flush, 2000);
        return;
      }
    }
    active = false;
    onState({ status: "saved" });
  }

  return {
    update(content) {
      latest = content;
      if (conflict) onState({ status: "error", error: conflict });
      return flush();
    },
    retry: flush,
  };
}
