import { initDatabase, getRandomEntry } from "./base.js";

let currentFilter = "all";

document.addEventListener("DOMContentLoaded", async () => {
    await initDatabase();

    const output = document.querySelector(".main__field-text");
    const fieldOutput = document.querySelector(".main__field");

    const buttonGenerate = document.querySelector(".generate-button");
    const buttonAll = document.querySelector(".choice-button_select-all");
    const buttonJoke = document.querySelector(".choice-button_select-jokes");
    const buttonQuote = document.querySelector(".choice-button_select-quotes");

    const filterButtons = [buttonAll, buttonJoke, buttonQuote];

    function setActiveButton(activeBtn) {
        filterButtons.forEach(btn => btn.classList.remove("active-button", "active-button-bold"));
        activeBtn.classList.add("active-button", "active-button-bold");
    }

    initDatabase().then(() => {
        setActiveButton(buttonAll);

        buttonAll.addEventListener("click", () => {
            currentFilter = "all";
            setActiveButton(buttonAll);
        });

        buttonJoke.addEventListener("click", () => {
            currentFilter = "joke";
            setActiveButton(buttonJoke);
        });

        buttonQuote.addEventListener("click", () => {
            currentFilter = "quote";
            setActiveButton(buttonQuote);
        });

        buttonGenerate.addEventListener("click", () => {
            const entry = getRandomEntry(currentFilter);

            if (!entry) {
                output.textContent = "Записей нет.";
                return;
            }

            output.classList.remove("show");
            fieldOutput.classList.remove("show");

            setTimeout(() =>{
                output.textContent = `${entry.content}`;
                output.classList.add("show");
                fieldOutput.classList.add("show");
            }, 500)
        });
    });
});