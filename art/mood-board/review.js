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
    const imageToggle = document.getElementById("images-only");
    const viewStorageKey = `${storageKey}:images-only`;
    let imagesOnly = false;
    try {
      imagesOnly = localStorage.getItem(viewStorageKey) === "true";
    } catch {
      storageAvailable = false;
    }

    function updateView() {
      preferenceGrid.classList.toggle("images-only", imagesOnly);
      imageToggle.setAttribute("aria-pressed", String(imagesOnly));
      imageToggle.textContent = imagesOnly ? "Show details" : "Images only";
    }

    imageToggle.addEventListener("click", () => {
      imagesOnly = !imagesOnly;
      updateView();
      try {
        localStorage.setItem(viewStorageKey, String(imagesOnly));
      } catch {
        storageAvailable = false;
        showSaveStatus();
      }
    });
    updateView();

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
    const rankedIds = [...new Set(savedOrder ?? manifestOrder)]
      .filter((id) => referenceIds.has(id));
    preferenceOrder = [
      ...cards.map((card) => card.dataset.reference).filter((id) => !rankedIds.includes(id)),
      ...rankedIds,
    ];
    const rankControls = new Map();
    let press;
    let dropTarget;
    let suppressClick = false;

    function applyOrder() {
      for (const id of preferenceOrder) preferenceGrid.append(cardsById.get(id));
      for (const card of cards) {
        const id = card.dataset.reference;
        const index = preferenceOrder.indexOf(id);
        card.dataset.preferenceRank = String(index + 1);
        const { position, earlier, later } = rankControls.get(id);
        position.value = String(index + 1);
        earlier.disabled = index === 0;
        later.disabled = index === preferenceOrder.length - 1;
      }
    }

    function moveCard(id, index) {
      const previous = preferenceOrder.indexOf(id);
      preferenceOrder.splice(previous, 1);
      preferenceOrder.splice(Math.max(0, Math.min(preferenceOrder.length, index)), 0, id);
      applyOrder();
      saveDraft();
    }

    function clearDropTarget() {
      dropTarget?.classList.remove("rank-drop-target");
      dropTarget = undefined;
    }

    function updateDropTarget() {
      const target = document.elementFromPoint(press.x, press.y)?.closest(".card[data-reference]");
      clearDropTarget();
      if (target && target !== press.card && target.parentElement === preferenceGrid) {
        dropTarget = target;
        target.classList.add("rank-drop-target");
      }
    }

    function dragFrame() {
      const edge = 70;
      const scroll = press.y < edge ? -14 : press.y > window.innerHeight - edge ? 14 : 0;
      if (scroll) {
        window.scrollBy(0, scroll);
        updateDropTarget();
      }
      press.frame = requestAnimationFrame(dragFrame);
    }

    function beginDrag() {
      clearTimeout(press.timer);
      press.active = true;
      press.card.setPointerCapture(press.pointerId);
      press.card.classList.add("rank-dragging");
      document.body.classList.add("review-dragging");
      window.getSelection()?.removeAllRanges();
      updateDropTarget();
      press.frame = requestAnimationFrame(dragFrame);
    }

    function endPress(event) {
      if (!press || event.pointerId !== press.pointerId) return;
      clearTimeout(press.timer);
      if (press.active) {
        event.preventDefault();
        if (event.type === "pointerup" && dropTarget) {
          moveCard(press.card.dataset.reference, preferenceOrder.indexOf(dropTarget.dataset.reference));
        }
        cancelAnimationFrame(press.frame);
        press.card.classList.remove("rank-dragging");
        document.body.classList.remove("review-dragging");
        if (press.card.hasPointerCapture(press.pointerId)) press.card.releasePointerCapture(press.pointerId);
        suppressClick = true;
        setTimeout(() => { suppressClick = false; }, 0);
      }
      press = undefined;
      clearDropTarget();
    }

    window.addEventListener("pointermove", (event) => {
      if (!press || event.pointerId !== press.pointerId) return;
      press.x = event.clientX;
      press.y = event.clientY;
      if (!press.active && Math.hypot(press.x - press.startX, press.y - press.startY) > 6) {
        if (press.editable) {
          clearTimeout(press.timer);
          press = undefined;
          return;
        }
        beginDrag();
      }
      if (press.active) {
        event.preventDefault();
        updateDropTarget();
      }
    }, { passive: false });
    window.addEventListener("pointerup", endPress);
    window.addEventListener("pointercancel", endPress);
    preferenceGrid.addEventListener("click", (event) => {
      if (!suppressClick) return;
      event.preventDefault();
      event.stopImmediatePropagation();
    }, true);

    for (const card of cards) {
      const id = card.dataset.reference;
      const bar = document.createElement("div");
      bar.className = "rank-controls";
      const handle = document.createElement("button");
      handle.type = "button";
      handle.className = "rank-handle";
      handle.textContent = "↕";
      handle.setAttribute("aria-label", `Rank ${id}: drag, use up/down keys, Home or End`);
      handle.addEventListener("keydown", (event) => {
        const index = preferenceOrder.indexOf(id);
        const positions = { ArrowUp: index - 1, ArrowDown: index + 1, Home: 0, End: preferenceOrder.length - 1 };
        if (!(event.key in positions)) return;
        event.preventDefault();
        moveCard(id, positions[event.key]);
        handle.focus();
      });
      const position = document.createElement("input");
      position.className = "rank-position";
      position.type = "number";
      position.min = "1";
      position.max = String(cards.length);
      position.step = "1";
      position.required = true;
      position.setAttribute("aria-label", `Position for ${id}`);
      function enterPosition() {
        if (!position.checkValidity()) {
          position.reportValidity();
          return;
        }
        const index = position.valueAsNumber - 1;
        if (index !== preferenceOrder.indexOf(id)) moveCard(id, index);
      }
      position.addEventListener("blur", enterPosition);
      position.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          enterPosition();
          position.focus();
        } else if (event.key === "Escape") {
          position.value = String(preferenceOrder.indexOf(id) + 1);
        }
      });
      card.addEventListener("dragstart", (event) => event.preventDefault());
      card.addEventListener("pointerdown", (event) => {
        if (event.button !== 0 || press) return;
        press = {
          card, pointerId: event.pointerId, x: event.clientX, y: event.clientY,
          startX: event.clientX, startY: event.clientY,
          editable: Boolean(event.target.closest("input, textarea")), active: false,
        };
        press.timer = setTimeout(beginDrag, 250);
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
      rankControls.set(id, { position, earlier, later });
      bar.append(handle, position, earlier, later);
      card.prepend(bar);
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
      updated += "\n\n## Preference ranking\n\nGallery order, first to last. Ranking does not change acceptance decisions.\n\n";
      updated += preferenceOrder.map((id, index) => `${index + 1}. ${id}`).join("\n") + "\n";
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
