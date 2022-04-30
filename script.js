const form = document.querySelector('form')
let fileInput = document.querySelector('.file-input')
let progressArea = document.querySelector('.progress-area')
let uploadedArea = document.querySelector('.uploaded-area')

form.addEventListener("click", () => {
   fileInput.click()
})
fileInput.onchange = e => {
    let file = e.target.files[0] //if multiple files are selected then get first one only
    //console.log(file.name)
     if(file){
        let fileName = file.name
        uploadFile(fileName);
    }
}
function uploadFile(){
    let xhr = new XMLHttpRequest()//creating new XML object
    xhr.open("POST", "php/upload.php") 
    xhr.upload.addEventListener("progress", e => {
        console.log(e)
    })
    let formData = new FormData(form)
    xhr.send(formData)
}