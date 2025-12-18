const storageBtn = document.getElementById("storageBtn")
const filesBtn = document.getElementById("filesBtn")
const storageSection = document.getElementById("storageSection")
const filesSection = document.getElementById("filesSection")



storageBtn.addEventListener("click", () => {
    storageBtn.style.backgroundColor = "#2ECC71"
    filesBtn.style.backgroundColor = "transparent"
    storageSection.classList.remove("hidden")
    storageSection.classList.add("flex")
    filesSection.classList.add("hidden")
})
filesBtn.addEventListener("click", () => {
    filesBtn.style.backgroundColor = "#2ECC71"
    storageBtn.style.backgroundColor = "transparent"
    storageSection.classList.add("hidden")
    filesSection.classList.remove("hidden")
    filesSection.classList.add("flex")
})
