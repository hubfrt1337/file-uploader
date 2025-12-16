 const modalBin = document.getElementById("modalBin")
    const modalContentBin = document.getElementById("modalContentBin")
    const x = document.getElementById("x")
    const openBin = document.getElementById("openModalBtnBin")
    const submitBin = document.getElementById("submitBin")

   openBin.addEventListener("click", () => {
        modalBin.classList.remove("hidden")
        modalBin.classList.add("flex");
    });

    x.addEventListener("click", () => {
        modalBin.classList.add("hidden")
        modalBin.classList.remove("flex")
    })

    modalBin.addEventListener("click", (e) => {
        if(!modalContentBin.contains(e.target)){
            modalBin.classList.remove("flex");
            modalBin.classList.add("hidden")
        }
    })










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

   