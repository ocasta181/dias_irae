(() => {
  const sourceKey = "dias-irae:mood-board:/art/concepts/index.html";
  try {
    const source = JSON.parse(localStorage.getItem(sourceKey) || "{}");
    const destinations = [
      ["faces", ["V21", "V22", "V23", "V24", "V25"]],
      ["expansion", [
        ...Array.from({ length: 20 }, (_, i) => `V${String(i + 1).padStart(2, "0")}`),
        ...Array.from({ length: 10 }, (_, i) => `V${i + 26}`),
        ...Array.from({ length: 10 }, (_, i) => `R${String(i + 1).padStart(2, "0")}`),
      ]],
    ];
    for (const [board, references] of destinations) {
      const destinationKey = `dias-irae:mood-board:/art/concepts/${board}/index.html`;
      const identifiers = new Set(references);
      const destination = JSON.parse(localStorage.getItem(destinationKey) || "{}");
      for (const identifier of identifiers) {
        if (!destination[identifier] && source[identifier]) destination[identifier] = source[identifier];
      }
      localStorage.setItem(destinationKey, JSON.stringify(destination));
      if (!localStorage.getItem(`${destinationKey}:preference-order`)) {
        const order = JSON.parse(localStorage.getItem(`${sourceKey}:preference-order`) || "[]");
        localStorage.setItem(`${destinationKey}:preference-order`, JSON.stringify(order.filter((identifier) => identifiers.has(identifier))));
      }
    }
  } catch {
    document.body.dataset.draftTransfer = "unavailable";
  }
})();
