const inputFile = document.getElementById("document")
const uploadImg = document.getElementById("img-upload")
const fileName = document.getElementById("file-name")
const dropArea = document.getElementById("drop-area")

uploadImg.addEventListener("click", () => {
    inputFile.click();
})



inputFile.addEventListener("change", () => {
    console.log(".")
    if(inputFile.files.length > 0){
        fileName.textContent = inputFile.files[0].name
        console.log(fileName)
    } else {
        fileName.textContent = '';
    }
})
document.addEventListener("DOMContentLoaded", () => {
    const dropArea = document.getElementById("drop-area");

    if (dropArea) { // Check if dropArea was successfully found
        function preventDefaults(e){
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false);
        });

        console.log(dropArea); // You can uncomment this for debugging if needed

        ["dragenter", "dragover"].forEach(eventName => {
            dropArea.addEventListener(eventName, () => dropArea.classList.add("drag-over"));
        });
        
        // Add event listeners for dragleave and drop to remove the class
        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, () => dropArea.classList.remove("drag-over"));
        });

    } else {
        console.error("Error: The 'drop-area' element was not found in the DOM.");
    }
});
