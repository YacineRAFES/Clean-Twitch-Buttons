const buttons = [
    document.getElementById("bits"),
    document.getElementById("giftsub"),
    document.getElementById("subscribe")
];

// Bouton de réinitialisation
const resetBtn = document.getElementById("reset");

/// Fonction pour basculer l'état d'un bouton
function toggleButton(btn) {
    if (btn.classList.contains("btn-primary")) {
        btn.classList.replace("btn-primary", "btn-success");
    } else {
        btn.classList.replace("btn-success", "btn-primary");
    }
}

/// Charger l'état initial des boutons depuis le stockage
browser.storage.local.get(["bits", "subscribe", "giftsub"]).then(options => {
    buttons.forEach(btn => {
        if (options[btn.id]) {
            btn.classList.remove("btn-primary");
            btn.classList.add("btn-success");
        } else {
            btn.classList.remove("btn-success");
            btn.classList.add("btn-primary");
        }
    });
});

/// Ajouter des écouteurs d'événements aux boutons
buttons.forEach(btn => {
    btn.addEventListener("click", function () {
        toggleButton(btn);
        browser.runtime.sendMessage({ action: "toggleOption", option: btn.id });
    });
});

/// Écouteur pour le bouton de réinitialisation
resetBtn.addEventListener("click", function () {
    browser.runtime.sendMessage({ action: "resetOption" });
    buttons.forEach(btn => {
        btn.classList.remove("btn-success");
        btn.classList.add("btn-primary");
    });
});