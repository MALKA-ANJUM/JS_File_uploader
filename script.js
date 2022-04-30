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
        if(fileName.length >=10){
            let splitName = fileName.split('.')
            fileName = splitName[0].substring(0,10) + "... ." + splitName[1]
        }
        uploadFile(fileName);
    }
}
function uploadFile(name){
    let xhr = new XMLHttpRequest()//creating new XML object
    xhr.open("POST", "php/upload.php") 
    xhr.upload.addEventListener("progress", ({loaded, total}) => {
        let fileLoaded = Math.floor((loaded / total) * 100) //getting percentage of loaded file
        let fileTotal = Math.floor(total/1000) //getting the size in KB from bytes
        let fileSize;
        //if file size is less than 1024 then add Only KB else convert size to MB
        (fileTotal < 1024) ? fileSize = fileTotal + "KB" : fileSize = (loaded / (1024 * 1024)).toFixed(2) + "MB"
        //console.log(fileLoaded, fileTotal);
        let progressHTML = `<li class="row">
                                <i class="fa-solid fa-file-lines"></i>
                                <div class="content">
                                    <div class="details">
                                        <span class="name">${name} Uploading</span>
                                        <span class="percent">${fileLoaded}%</span>
                                    </div>
                                    <div class="progress-bar">
                                        <div class="progress" style="width: ${fileLoaded}%"></div>
                                    </div>
                                </div>
                            </li>`
        uploadedArea.classList.add("onprogress")
        progressArea.innerHTML = progressHTML

        if(loaded = total){
            progressArea.innerHTML = ""
            let uploadedHTML = `<li class="row">
                                <div class="content">
                                    <i class="fa-solid fa-file-lines"></i>
                                    <div class="details">
                                        <span class="name">${name} Uploading</span>
                                        <span class="size">${fileSize}</span>
                                    </div>
                                </div>
                                <i class="fa-solid fa-check"></i>
                            </li>`
    uploadedArea.classList.remove("onprogress")
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML)               
    }
})
        
    let formData = new FormData(form)
    xhr.send(formData)
}