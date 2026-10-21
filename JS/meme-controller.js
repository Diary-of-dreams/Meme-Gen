'use strict'


let gElCanvas
let gCtx    


function setup(){
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
}


function renderMeme(){
let meme = getMeme()
let currImg = getCurrImg()
let elImg = new Image()
elImg.src = currImg.url
elImg.onload = () => {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

    let line = meme.lines[0]
    gCtx.font = `${line.size}px arial`
    gCtx.fillStyle = line.color
    gCtx.fillText(line.txt, 50, 50)
}
}


function onInputTxt(txt){
setTxt(txt)
renderMeme()
}
