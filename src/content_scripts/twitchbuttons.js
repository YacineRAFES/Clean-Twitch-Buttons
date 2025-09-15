// Initialisation des options avec stockage local
let options = {
    bits: true,
    subscribe: true,
    giftsub: true
};

// Charger les options depuis le stockage
browser.storage.local.get(["bits", "subscribe", "giftsub"]).then((result) => {
    options = { ...options, ...result };
    applyOptions();
});

function applyOptions() {
    if (options.bits) removeButtons('button[data-a-target="top-nav-get-bits-button"]');
    if (options.subscribe) removeButtons('button[data-a-target="subscribe-button"]');
    if (options.giftsub) removeButtons('button[data-a-target="gift-button"]');
}

// Écoute des messages du popup
browser.runtime.onMessage.addListener((message) => {
    if (message.action === "toggleOption") {
        options[message.option] = !options[message.option];
        browser.storage.local.set({ [message.option]: options[message.option] });
        applyOptions();
    } else if (message.action === "resetOption") {
        options.bits = true;
        options.subscribe = true;
        options.giftsub = true;
        browser.storage.local.set(options);
        applyOptions();
    }
});

// Suppression des boutons
function removeButtons(btnSelector) {
    document.querySelectorAll(btnSelector).forEach(btn => {
        btn.remove();
        console.log("Button removed:", btnSelector);
    });
}

// Observer pour les changements dynamiques
const observer = new MutationObserver(applyOptions);
observer.observe(document.body, { childList: true, subtree: true });

// Appliquer au chargement initial
applyOptions();