'use strict'


function renderGallery() {
    const images = getImgs()
    let elGallery = document.querySelector('.gallery-images')
    elGallery.innerHTML = images.map(img => `<img src = "${img.url}" onclick="onImgSelect(${img.id})" class="image">`).join('')
}


function onImgSelect(imgId){
    setImg(imgId)
    renderMeme()
    location.hash = '#editor'
}


function onImgInput(ev) {
    const file = ev.target.files[0]
    if (!file) return                        // the dialog was cancelled

    const url = URL.createObjectURL(file)    // temporary URL pointing at the file in memory
    const id = addImg(url)
    renderGallery()
    onImgSelect(id)                          // open it in the editor, like a thumbnail click

    ev.target.value = ''                     // lets the user pick the same file again
}
