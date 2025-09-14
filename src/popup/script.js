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
    });
});

resetBtn.addEventListener("click", function () {
    buttons.forEach(btn => {
        btn.classList.remove("btn-success");
        btn.classList.add("btn-primary");
    });
});