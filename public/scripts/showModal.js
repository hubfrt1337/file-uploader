const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modalContent");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");

    
    openModalBtn.addEventListener("click", () => {
        modal.classList.remove("hidden")
        modal.classList.add("flex");
    });

    
    closeModalBtn.addEventListener("submit", () => {
        modal.classList.remove("flex")
        modal.classList.add("hidden");
    });

    // Zamknięcie kliknięciem poza modalem
    modal.addEventListener("click", (e) => {
        if (!modalContent.contains(e.target)) {
            modal.classList.remove("flex")
            modal.classList.add("hidden");
        }
    });
