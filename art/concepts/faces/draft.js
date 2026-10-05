(() => {
  const sourceKey = "dias-irae:mood-board:/art/concepts/index.html";
  const destinationKey = "dias-irae:mood-board:/art/concepts/faces/index.html";
  const identifiers = new Set(["V21", "V22", "V23", "V24", "V25"]);
  try {
    const source = JSON.parse(localStorage.getItem(sourceKey) || "{}");
    const destination = JSON.parse(localStorage.getItem(destinationKey) || "{}");
    for (const identifier of identifiers) {
      if (!destination[identifier] && source[identifier]) destination[identifier] = source[identifier];
    }
    localStorage.setItem(destinationKey, JSON.stringify(destination));
    if (!localStorage.getItem(`${destinationKey}:preference-order`)) {
      const order = JSON.parse(localStorage.getItem(`${sourceKey}:preference-order`) || "[]");
      localStorage.setItem(`${destinationKey}:preference-order`, JSON.stringify(order.filter((identifier) => identifiers.has(identifier))));
    }
  } catch {
    document.body.dataset.draftTransfer = "unavailable";
  }
})();
