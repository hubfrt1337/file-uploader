const files = document.getElementsByClassName("files")
const panelContainer = document.getElementById("panel-container")
const nameFile = document.getElementById("name-panel")
const a = document.getElementById("a-panel")
const time = document.getElementById("created-at")
const close = document.getElementById("close-panel")
const aDownload = document.getElementById("a-download")
const search = document.getElementById("search")

Array.from(files).forEach(file => {
    file.addEventListener("click", () => {
        panelContainer.classList.remove("translate-x-full")
        const { name, url, createdat } = file.dataset;
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





// Search features
//
//
const searchIcon = document.getElementById("icon-search")
const searchContainer = document.getElementById("search-container")
const resultsContainer = document.getElementById("results-container")





searchIcon.addEventListener("click", () => {
    searchContainer.classList.remove("hidden")
    resultsContainer.classList.remove("hidden")
    searchContainer.classList.add("block")
    resultsContainer.classList.add("block")
})

window.addEventListener("click", (e) => {
    if (!searchContainer.contains(e.target) && !resultsContainer.contains(e.target) && !searchIcon.contains(e.target)) {
        searchContainer.classList.remove("block")
        resultsContainer.classList.remove("block")
        searchContainer.classList.add("hidden")
        resultsContainer.classList.add("hidden")
    }

})



const searchInput = document.getElementById("search")
const ulContainer = document.getElementById("ul-container")



searchInput.addEventListener("input", async () => {

    const q = searchInput.value.trim()
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
    const data = await res.json();
    ulContainer.innerHTML = '';
    
    if (data.length === 0) {
        // if the string is empty, data returns all rows
        return;
    }
    
    data.forEach(folder =>
        folder.files.forEach(file => {
            const li = document.createElement("li");
            li.addEventListener("click", () => {
                panelContainer.classList.remove("translate-x-full")
                nameFile.textContent = file.name;
                a.href = file.url
                const date = new Date(file.created_at)
                time.textContent = date.toLocaleString();
                aDownload.href = file.url.replace("/upload/", `/upload/fl_attachment:${file.name.split(".")[0]}/`)
                aDownload.download = file.name;
                searchContainer.classList.remove("block")
                resultsContainer.classList.remove("block")
                searchContainer.classList.add("hidden")
                resultsContainer.classList.add("hidden")

            })
            li.textContent = file.name
            li.classList.add("li-styling")
            ulContainer.appendChild(li)
        })
    )

})

searchIcon.addEventListener("click", async () => {
    
    const q = ""
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
    const data = await res.json();
    ulContainer.innerHTML = '';
    
    if (data.length === 0) {
        // if the string is empty, data returns all rows
        return;
    }
    
    data.forEach(folder =>
        folder.files.forEach(file => {
            const li = document.createElement("li");
            li.addEventListener("click", () => {
                panelContainer.classList.remove("translate-x-full")
                nameFile.textContent = file.name;
                a.href = file.url
                const date = new Date(file.created_at)
                time.textContent = date.toLocaleString();
                aDownload.href = file.url.replace("/upload/", `/upload/fl_attachment:${file.name.split(".")[0]}/`)
                aDownload.download = file.name;
                searchContainer.classList.remove("block")
                resultsContainer.classList.remove("block")
                searchContainer.classList.add("hidden")
                resultsContainer.classList.add("hidden")

            })
            li.textContent = file.name
            li.classList.add("li-styling")
            ulContainer.appendChild(li)
        })
    )
})