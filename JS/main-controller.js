'use strict'


function onInit(){
    setup()
    renderMeme()
    renderGallery()
     let elInput = document.querySelector('.txt-input')
    elInput.focus()
}

function onDownloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
}