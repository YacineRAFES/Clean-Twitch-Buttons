// Initialisation des options avec stockage local
let options = {
    bits: false,
    subscribe: false,
    giftsub: false
};

// Charger les options depuis le stockage
browser.storage.local.get(["bits", "subscribe", "giftsub"]).then((result) => {
    options = { ...options, ...result };
    applyOptions();
});

function applyOptions() {
    toggleButtons('button[data-a-target="top-nav-get-bits-button"]', options.bits);
    toggleButtons('button[data-a-target="subscribe-button"]', options.subscribe);
    toggleButtons('button[data-a-target="gift-button"]', options.giftsub);
}

// Nouvelle fonction pour masquer/afficher
function toggleButtons(btnSelector, hide) {
    document.querySelectorAll(btnSelector).forEach(btn => {
        btn.style.display = hide ? "none" : "";
    });
}

// Écoute des messages du popup
browser.runtime.onMessage.addListener((message) => {
    if (message.action === "toggleOption") {
        options[message.option] = !options[message.option];
        browser.storage.local.set({ [message.option]: options[message.option] });
        applyOptions();
    } else if (message.action === "resetOption") {
        options.bits = false;
        options.subscribe = false;
        options.giftsub = false;
        browser.storage.local.set(options);
        applyOptions();
    }
});

// Observer pour les changements dynamiques
const observer = new MutationObserver(applyOptions);
observer.observe(document.body, { childList: true, subtree: true });

// Appliquer au chargement initial
applyOptions();