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
            if (line.alignment === 'center') {
                gCtx.textAlign = "center"
            }
            else if (line.alignment === 'right') {
                gCtx.textAlign = "right"
            }
            else {
                gCtx.textAlign = "left"

            }
            gCtx.font = `${line.size}px ${line.font}`
            gCtx.fillText(line.txt, line.x, line.y)
            if (idx === meme.selectedLineIdx) {
                let textWidth = gCtx.measureText(line.txt).width
                line.width = textWidth
                gCtx.strokeStyle = '#F5F5F5'
                if (line.alignment === 'left') {
                    gCtx.strokeRect(line.x - 5, line.y - 5, textWidth + 10, line.size + 10)
                }
                else if (line.alignment === 'center') {
                    gCtx.strokeRect(line.x - (textWidth / 2) - 5, line.y - 5, textWidth + 10, line.size + 10)
                }
                else {
                    gCtx.strokeRect(line.x - (textWidth) - 5, line.y - 5, textWidth + 10, line.size + 10)
                }
            }

        })

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
    let meme = getMeme()
    if (meme.selectedLineIdx === -1) return
    document.querySelector('.size-value').textContent = meme.lines[meme.selectedLineIdx].size
}

function onAddLine() {
    addLine()
    renderMeme()
    let elInput = document.querySelector('.txt-input')
    elInput.value = ''
    elInput.focus()
    let meme = getMeme()
    document.querySelector('.size-value').textContent = meme.lines[meme.selectedLineIdx].size

}

function onSwitchLines() {
    switchLine()
    renderMeme()
    let meme = getMeme()
    let elInput = document.querySelector('.txt-input')
    elInput.value = meme.lines[meme.selectedLineIdx].txt
    elInput.focus()
    document.querySelector('.size-value').textContent = meme.lines[meme.selectedLineIdx].size
}


function onCanvasClick(ev) {
    setLineSelect(ev.offsetX, ev.offsetY)
    renderMeme()
    let meme = getMeme()
    let elInput = document.querySelector('.txt-input')

    if (gMeme.selectedLineIdx != -1) {
        elInput.value = meme.lines[meme.selectedLineIdx].txt
        elInput.focus()
        document.querySelector('.size-value').textContent = meme.lines[meme.selectedLineIdx].size

    }
    else {
        elInput.value = ''

        elInput.focus()
        document.querySelector('.size-value').textContent = 35
    }
}


function onDeleteLine() {
    deleteLine()
    renderMeme()
    let elInput = document.querySelector('.txt-input')
    elInput.value = ''
    elInput.focus()
    document.querySelector('.size-value').textContent = 35

}

function onAlignLeft() {
    setLineAlign('left')
    renderMeme()
}

function onAlignCenter() {
    setLineAlign('center')
    renderMeme()
}

function onAlignRight() {
    setLineAlign('right')
    renderMeme()
}


function onSetFont(fontName){
let meme = getMeme()
meme.lines[meme.selectedLineIdx].font = fontName
renderMeme()
}