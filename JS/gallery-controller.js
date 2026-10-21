'use strict'


function renderGallery() {
    const images = getImgs()
    let elGallery = document.querySelector('.gallery')
    elGallery.innerHTML = images.map(img => `<img src = ${img.url} onclick="onImgSelect(${img.id})">`).join('')
}


function onImgSelect(imgId){
    setImg(imgId)
    renderMeme()
    location.hash = 'editor'
}