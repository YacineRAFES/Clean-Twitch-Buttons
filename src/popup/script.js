const buttons = [
    document.getElementById("bits"),
    document.getElementById("giftsub"),
    document.getElementById("subscribe")
];

const resetBtn = document.getElementById("reset");

function toggleButton(btn) {
    if (btn.classList.contains("btn-primary")) {
        btn.classList.replace("btn-primary", "btn-success");
    } else {
        btn.classList.replace("btn-success", "btn-primary");
    }
}

buttons.forEach(btn => {
    btn.addEventListener("click", function () {
        toggleButton(btn);
        browser.runtime.sendMessage({ action: "toggleOption", option: btn.id });
    });
});

resetBtn.addEventListener("click", function () {
    buttons.forEach(btn => {
        btn.classList.remove("btn-success");
        btn.classList.add("btn-primary");
        browser.runtime.sendMessage({ action: "resetOption" });
    });
});