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

        meme.lines.forEach((line, idx) => {
            gCtx.font = `${line.size}px arial`
            gCtx.fillStyle = line.color
            gCtx.textBaseline = 'top'
            gCtx.fillText(line.txt, line.x, line.y)
            if (idx === meme.selectedLineIdx) {
                let textWidth = gCtx.measureText(line.txt).width
                line.width = textWidth
                gCtx.strokeStyle = '#F5F5F5'
                gCtx.strokeRect(line.x - 5, line.y - 5, textWidth + 10, line.size + 10)
            }

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

function onAddLine() {
    addLine()
    renderMeme()
    let elInput = document.querySelector('.txt-input')
    elInput.value = ''
    elInput.focus()
}

function onSwitchLines() {
    switchLine()
    renderMeme()
    let meme = getMeme()
    let elInput = document.querySelector('.txt-input')
    elInput.value = meme.lines[meme.selectedLineIdx].txt
    elInput.focus()
}


function onCanvasClick(ev) {
    setLineSelect(ev.offsetX, ev.offsetY)
    renderMeme()
    let meme = getMeme()
    let elInput = document.querySelector('.txt-input')
    if (gMeme.selectedLineIdx != -1) {
        elInput.value = meme.lines[meme.selectedLineIdx].txt
        elInput.focus()
    }
    else {
        elInput.value = ''
        
        elInput.focus()
    }
}

function setLineSelect(clickedX, clickedY) {
    gMeme.selectedLineIdx = -1
    let line = gMeme.selectedLineIdx
    for (let i = 0; i < gMeme.lines.length; i++) {
        line = gMeme.lines[i]
        if (clickedX >= line.x && clickedX <= line.x + line.width && clickedY >= line.y && clickedY <= line.y + line.size) {
            gMeme.selectedLineIdx = i
        }

    }
}

function onDeleteLine(){
    deleteLine()
    renderMeme()
}