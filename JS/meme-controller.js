'use strict'


let gElCanvas
let gCtx


function setup() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
}


function renderMeme() {
    let meme = getMeme()
    let currImg = getCurrImg()
    let elImg = new Image()
    elImg.src = currImg.url
    elImg.onload = () => {
        gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

        meme.lines.forEach(line => {
            // line.textContent
            gCtx.font = `${line.size}px arial`
            gCtx.fillStyle = line.color
            gCtx.fillText(line.txt, line.x, line.y)

        });

    }
}


function onInputTxt(txt) {
    setTxt(txt)
    renderMeme()
}

function onSetColor(color) {
    setColor(color)
    renderMeme()
    document.querySelector('.color-btn').style.color = color
}

function onChangeFontSize(diff) {
    changeFontSize(diff)
    renderMeme()
    document.querySelector('.size-value').textContent = gMeme.lines[0].size
}

function onAddLine(){
    addLine()
    let meme = getMeme()
    renderMeme()
    document.querySelector('.txt-input').value = meme.lines[meme.selectedLineIdx].txt
}