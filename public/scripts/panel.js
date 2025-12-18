const files = document.getElementsByClassName("files")
const panelContainer = document.getElementById("panel-container")
const nameFile = document.getElementById("name-panel")
const a = document.getElementById("a-panel")
const time = document.getElementById("created-at")
const close = document.getElementById("close-panel")
const aDownload = document.getElementById("a-download")

Array.from(files).forEach(file => {
    file.addEventListener("click", () => {
        panelContainer.classList.remove("translate-x-full")
        const {name, url , createdat} = file.dataset;
        nameFile.textContent = name;
        a.href = url
        const date = new Date(createdat)
        time.textContent = date.toLocaleString();
        aDownload.href = url.replace("/upload/", `/upload/fl_attachment:${name.split(".")[0]}/`)
        aDownload.download = name;
    })
    

})

close.addEventListener("click", () => {
    panelContainer.classList.add("translate-x-full")

})


