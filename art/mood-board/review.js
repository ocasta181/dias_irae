(() => {
  const manifest = JSON.parse(document.getElementById("review-manifest").textContent);
  const cards = [...document.querySelectorAll(".card[data-reference]")];
  const referenceIds = new Set(cards.map((card) => card.dataset.reference));
  const decisions = ["pending", "accepted", "rejected", "revise"];
  const labels = { pending: "Pending", accepted: "Accept", rejected: "Reject", revise: "Revise" };
  const reviews = new Map();
  const storageKey = `dias-irae:mood-board:${location.pathname}`;
  const summary = document.getElementById("review-summary");
  const saveStatus = document.getElementById("review-save-status");
  let draft = {};
  let storageAvailable = true;

  try {
    draft = JSON.parse(localStorage.getItem(storageKey) || "{}");
    if (!draft || typeof draft !== "object" || Array.isArray(draft)) throw new Error("Invalid draft");
  } catch {
    storageAvailable = false;
  }

  for (const line of manifest.split("\n")) {
    const match = line.match(/^\| ([A-Z]\d+) \|/);
    if (!match || !referenceIds.has(match[1])) continue;
    const cells = line.split("|");
    const decoder = document.createElement("textarea");
    decoder.innerHTML = cells.at(-2).trim().replace(/<br\s*\/?\s*>/gi, "\n");
    const decision = cells.at(-3).trim();
    const note = decoder.value;
    const baseline = JSON.stringify([decision, note]);
    const saved = draft[match[1]];
    reviews.set(match[1], {
      baseline,
      decision: saved?.baseline === baseline && decisions.includes(saved.decision) ? saved.decision : decision,
      note: saved?.baseline === baseline && typeof saved.note === "string" ? saved.note : note,
    });
  }

  function updateSummary() {
    const counts = Object.fromEntries(decisions.map((decision) => [decision, 0]));
    for (const review of reviews.values()) counts[review.decision]++;
    summary.textContent = `${counts.accepted} accepted · ${counts.rejected} rejected · ${counts.revise} to revise · ${counts.pending} pending`;
  }

  function showSaveStatus() {
    saveStatus.textContent = storageAvailable
      ? "Draft saved in this browser. Download the manifest when ready to share your review."
      : "This browser cannot save the draft. Download the manifest to keep your decisions and commentary.";
  }

  function saveDraft() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(Object.fromEntries(reviews)));
      storageAvailable = true;
    } catch {
      storageAvailable = false;
    }
    showSaveStatus();
  }

  for (const card of cards) {
    const id = card.dataset.reference;
    const review = reviews.get(id);
    const controls = document.createElement("div");
    controls.className = "review-controls";
    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = `Decision for ${id}`;
    fieldset.append(legend);
    const buttons = [];
    const meta = card.querySelector(".meta");
    const metaPrefix = meta.textContent.slice(0, meta.textContent.lastIndexOf(" · "));

    function updateCard() {
      card.dataset.decision = review.decision;
      meta.textContent = `${metaPrefix} · ${review.decision}`;
      for (const button of buttons) {
        button.setAttribute("aria-pressed", String(button.dataset.decision === review.decision));
      }
      updateSummary();
    }

    for (const decision of decisions) {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.decision = decision;
      button.textContent = labels[decision];
      button.addEventListener("click", () => {
        review.decision = decision;
        updateCard();
        saveDraft();
      });
      buttons.push(button);
      fieldset.append(button);
    }

    const label = document.createElement("label");
    label.htmlFor = `commentary-${id}`;
    label.textContent = "Your commentary";
    const textarea = document.createElement("textarea");
    textarea.id = label.htmlFor;
    textarea.rows = 3;
    textarea.value = review.note;
    textarea.placeholder = "What fits, what feels wrong, or what should change…";
    textarea.addEventListener("input", () => {
      review.note = textarea.value;
      saveDraft();
    });
    controls.append(fieldset, label, textarea);
    card.querySelector(".body").append(controls);
    updateCard();
  }

  function markdownNote(note) {
    return note.replace(/&/g, "&amp;")
      .replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/\\/g, "&#92;").replace(/\|/g, "&#124;")
      .replace(/\r?\n/g, "<br>");
  }

  document.getElementById("download-manifest").addEventListener("click", () => {
    const updated = manifest.split("\n").map((line) => {
      const match = line.match(/^\| ([A-Z]\d+) \|/);
      if (!match || !reviews.has(match[1])) return line;
      const review = reviews.get(match[1]);
      const cells = line.split("|");
      cells[cells.length - 3] = ` ${review.decision} `;
      cells[cells.length - 2] = ` ${markdownNote(review.note)} `;
      return cells.join("|");
    }).join("\n");
    const url = URL.createObjectURL(new Blob([updated], { type: "text/markdown;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "manifest.md";
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    const manifestPath = document.body.dataset.manifestPath || "art/mood-board/manifest.md";
    saveStatus.textContent = `Manifest download started. Save it as ${manifestPath} to share your review.`;
  });

  saveDraft();
})();
