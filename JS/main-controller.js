'use strict'


function onInit(){
    setup()
    renderMeme()
    renderGallery()
    renderStickers()
     let elInput = document.querySelector('.txt-input')
    elInput.focus()
   gElCanvas.addEventListener('mousedown', onMouseDown)
   gElCanvas.addEventListener('mousemove', onMouseMove)
   gElCanvas.addEventListener('mouseup', onMouseUp)
}

function onDownloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
}