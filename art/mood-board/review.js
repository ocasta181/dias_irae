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
  const exportButton = document.getElementById("download-manifest");
  const preferenceGrid = document.getElementById("preference-grid");
  const unsortedGrid = document.getElementById("unsorted-grid");
  const emptyRanking = document.getElementById("empty-ranking");
  const orderStorageKey = `${storageKey}:preference-order`;
  let preferenceOrder = [];
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
    if (!match) continue;
    const cells = line.split("|");
    const decoder = document.createElement("textarea");
    decoder.innerHTML = cells.at(-2).trim().replace(/<br\s*\/?\s*>/gi, "\n");
    const decision = cells.at(-3).trim();
    if (!decisions.includes(decision)) continue;
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
    for (const id of referenceIds) counts[reviews.get(id).decision]++;
    summary.textContent = `${counts.accepted} accepted · ${counts.rejected} rejected · ${counts.revise} to revise · ${counts.pending} pending`;
  }

  function showSaveStatus() {
    saveStatus.textContent = storageAvailable
      ? `Draft saved in this browser. Use ${exportButton.textContent} to download your review.`
      : `This browser cannot save the draft. Use ${exportButton.textContent} to keep your review.`;
  }

  function saveDraft() {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ ...draft, ...Object.fromEntries(reviews) }));
      if (preferenceGrid) localStorage.setItem(orderStorageKey, JSON.stringify(preferenceOrder));
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

  if (preferenceGrid) {
    const cardsById = new Map(cards.map((card) => [card.dataset.reference, card]));
    const rankingSection = manifest.match(/\n## Preference ranking\n([\s\S]*?)(?=\n## |\s*$)/);
    const manifestOrder = rankingSection
      ? [...rankingSection[1].matchAll(/^\d+\. ([A-Z]\d+)\b/gm)].map((match) => match[1])
      : [];
    let savedOrder;
    try {
      const saved = JSON.parse(localStorage.getItem(orderStorageKey) || "null");
      if (Array.isArray(saved)) savedOrder = saved;
    } catch {
      storageAvailable = false;
    }
    preferenceOrder = [...new Set(savedOrder ?? manifestOrder)]
      .filter((id) => referenceIds.has(id));
    const rankControls = new Map();
    let draggedCard;
    let dropTarget;

    function applyOrder() {
      const sortedIds = new Set(preferenceOrder);
      for (const id of preferenceOrder) preferenceGrid.append(cardsById.get(id));
      for (const card of cards) {
        const id = card.dataset.reference;
        const index = preferenceOrder.indexOf(id);
        const sorted = sortedIds.has(id);
        if (!sorted) unsortedGrid.append(card);
        card.dataset.preferenceRank = sorted ? String(index + 1) : "";
        const { handle, earlier, later, toggle } = rankControls.get(id);
        handle.textContent = sorted ? `↕ Rank ${index + 1}` : "↕ Unsorted";
        toggle.textContent = sorted ? "Unsort" : "Sort";
        toggle.setAttribute("aria-label", `Move ${id} to ${sorted ? "Unsorted" : "Sorted"}`);
        earlier.disabled = !sorted || index === 0;
        later.disabled = !sorted || index === preferenceOrder.length - 1;
      }
      emptyRanking.hidden = preferenceOrder.length > 0;
    }

    function moveCard(id, index) {
      const previous = preferenceOrder.indexOf(id);
      if (previous >= 0) preferenceOrder.splice(previous, 1);
      preferenceOrder.splice(Math.max(0, Math.min(preferenceOrder.length, index)), 0, id);
      applyOrder();
      saveDraft();
    }

    function unsortCard(id) {
      preferenceOrder = preferenceOrder.filter((rankedId) => rankedId !== id);
      applyOrder();
      saveDraft();
    }

    function clearDropTarget() {
      dropTarget?.classList.remove("rank-drop-target");
      dropTarget = undefined;
    }

    for (const card of cards) {
      const id = card.dataset.reference;
      const bar = document.createElement("div");
      bar.className = "rank-controls";
      const handle = document.createElement("button");
      handle.type = "button";
      handle.className = "rank-handle";
      handle.draggable = true;
      handle.setAttribute("aria-label", `Rank ${id}: drag, use up/down keys, Home or End`);
      handle.addEventListener("keydown", (event) => {
        const index = preferenceOrder.indexOf(id);
        const positions = { ArrowUp: index - 1, ArrowDown: index + 1, Home: 0, End: preferenceOrder.length - 1 };
        if (!(event.key in positions)) return;
        event.preventDefault();
        moveCard(id, index < 0
          ? (event.key === "Home" || event.key === "ArrowUp" ? 0 : preferenceOrder.length)
          : positions[event.key]);
        handle.focus();
      });
      handle.addEventListener("dragstart", (event) => {
        draggedCard = card;
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", id);
        card.classList.add("rank-dragging");
      });
      handle.addEventListener("dragend", () => {
        card.classList.remove("rank-dragging");
        draggedCard = undefined;
        clearDropTarget();
      });
      card.addEventListener("dragover", (event) => {
        if (!draggedCard || draggedCard === card) return;
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        clearDropTarget();
        dropTarget = card;
        card.classList.add("rank-drop-target");
      });
      card.addEventListener("drop", (event) => {
        if (!draggedCard || draggedCard === card) return;
        event.preventDefault();
        const sourceId = draggedCard.dataset.reference;
        if (card.parentElement === preferenceGrid) moveCard(sourceId, preferenceOrder.indexOf(id));
        else unsortCard(sourceId);
        clearDropTarget();
      });
      const earlier = document.createElement("button");
      earlier.type = "button";
      earlier.textContent = "↑";
      earlier.setAttribute("aria-label", `Move ${id} earlier`);
      earlier.addEventListener("click", () => moveCard(id, preferenceOrder.indexOf(id) - 1));
      const later = document.createElement("button");
      later.type = "button";
      later.textContent = "↓";
      later.setAttribute("aria-label", `Move ${id} later`);
      later.addEventListener("click", () => moveCard(id, preferenceOrder.indexOf(id) + 1));
      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.addEventListener("click", () => {
        if (preferenceOrder.includes(id)) unsortCard(id);
        else moveCard(id, preferenceOrder.length);
      });
      rankControls.set(id, { handle, earlier, later, toggle });
      bar.append(handle, toggle, earlier, later);
      card.prepend(bar);
    }
    for (const grid of [preferenceGrid, unsortedGrid]) {
      grid.addEventListener("dragover", (event) => {
        if (!draggedCard || event.target.closest(".card")) return;
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        clearDropTarget();
        dropTarget = grid;
        grid.classList.add("rank-drop-target");
      });
      grid.addEventListener("drop", (event) => {
        if (!draggedCard || event.target.closest(".card")) return;
        event.preventDefault();
        const id = draggedCard.dataset.reference;
        if (grid === preferenceGrid) moveCard(id, preferenceOrder.length);
        else unsortCard(id);
        clearDropTarget();
      });
    }
    applyOrder();
  }

  function markdownNote(note) {
    return note.replace(/&/g, "&amp;")
      .replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/\\/g, "&#92;").replace(/\|/g, "&#124;")
      .replace(/\r?\n/g, "<br>");
  }

  exportButton.addEventListener("click", () => {
    saveDraft();
    let updated = manifest.split("\n").map((line) => {
      const match = line.match(/^\| ([A-Z]\d+) \|/);
      if (!match || !reviews.has(match[1])) return line;
      const review = reviews.get(match[1]);
      const cells = line.split("|");
      cells[cells.length - 3] = ` ${review.decision} `;
      cells[cells.length - 2] = ` ${markdownNote(review.note)} `;
      return cells.join("|");
    }).join("\n");
    if (preferenceGrid) {
      updated = updated.replace(/\n## Preference ranking\n[\s\S]*?(?=\n## |\s*$)/, "").trimEnd();
      updated += "\n\n## Preference ranking\n\nRanking does not change acceptance decisions.\n\n### Sorted — most preferred first\n\n";
      updated += preferenceOrder.length
        ? preferenceOrder.map((id, index) => `${index + 1}. ${id}`).join("\n") + "\n"
        : "None yet.\n";
      updated += "\n### Unsorted\n\n";
      updated += cards.filter((card) => !preferenceOrder.includes(card.dataset.reference))
        .map((card) => `- ${card.dataset.reference}`).join("\n") + "\n";
    }
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
