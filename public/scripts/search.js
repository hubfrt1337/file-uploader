const searchIcon = document.getElementById("icon-search")
const searchContainer = document.getElementById("search-container")
const resultsContainer = document.getElementById("results-container")
console.log(searchIcon,searchContainer,resultsContainer)
const items = [
    "Apple",
    "Banana",
    "Orange",
    "Mango",
    "Pineapple",
    "Strawberry",
    "Blueberry",
    "Grape",
    "Watermelon",
    "Peach"
];

searchIcon.addEventListener("click", () => {
    searchContainer.classList.remove("hidden")
    resultsContainer.classList.remove("hidden")
    searchContainer.classList.add("block")
    resultsContainer.classList.add("block")
})

window.addEventListener("click", (e) => {
    if(!searchContainer.contains(e.target) && !resultsContainer.contains(e.target) &&  !searchIcon.contains(e.target)){
        searchContainer.classList.remove("block")
    resultsContainer.classList.remove("block")
    searchContainer.classList.add("hidden")
    resultsContainer.classList.add("hidden")
    }
})



const searchInput = document.getElementById("search")
const ulContainer = document.getElementById("ul-container")

function search(query) {
    return items.filter(item => item.toLowerCase().includes(query.toLowerCase()))
}
function displayResults(results){
    ulContainer.innerHTML = '';
    if(results.length === 0){
        return;

    }
    console.log(results)
    results.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        li.classList.add("li-styling")
        ulContainer.appendChild(li)
        console.log(li)
    })
}
searchInput.addEventListener("input", () => {

    const query = searchInput.value.trim()
    const results = search(query)
    console.log(results, 'array')
    displayResults(results)
})