'use strict'


function onInit(){
    setup()
    renderMeme()
    renderGallery()
}

function onDownloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
}