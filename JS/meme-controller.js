'use strict'


let gElCanvas
let gCtx
let gMouseDown = false



function setup() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
}


function renderMeme() {
    _renderBackground(() => {
        _renderLines()
        _renderStickers()
    })
}

function _renderBackground(onReady) {
    let currImg = getCurrImg()
    let elImg = new Image()
    elImg.src = currImg.url
    elImg.onload = () => {
        gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        if (onReady) onReady()
    }
}

function _renderLines() {
    let meme = getMeme()

    meme.lines.forEach((line, idx) => {
        gCtx.font = `${line.size}px arial`
        gCtx.fillStyle = line.color
        gCtx.textBaseline = 'top'
        let textWidth = gCtx.measureText(line.txt).width
        line.width = textWidth
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

function _renderStickers() {
    let meme = getMeme()
    meme.stickers.forEach((sticker, idx) => {
        gCtx.font = `${sticker.size}px arial`
        gCtx.textBaseline = 'alphabetic'
        gCtx.fillText(sticker.sticker.icon, sticker.x, sticker.y)

        if (idx === meme.selectedStickerIdx) {
            let stickerWidth = gCtx.measureText(sticker.sticker.icon).width
            gCtx.strokeStyle = '#F5F5F5'
            gCtx.strokeRect(sticker.x - 5, sticker.y - 35, stickerWidth + 10, sticker.size + 10)
            // console.log(sticker.icon, stickerWidth)
        }
    })
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


function onSetFont(fontName) {
    let meme = getMeme()
    meme.lines[meme.selectedLineIdx].font = fontName
    renderMeme()
}

function onMouseDown(ev) {
    gMouseDown = true
    const x = ev.offsetX;
    const y = ev.offsetY;

    gMeme.selectedLineIdx = gMeme.lines.findIndex(line => {
        const left = line.x - (line.width / 2)
        const right = line.x + line.width
        const top = line.y
        const bottom = line.y + line.size
        const isClickedX = x >= left && x <= right
        const isClickedY = y >= top && y <= bottom

        return isClickedX && isClickedY
    })
    gMeme.selectedStickerIdx = gMeme.stickers.findIndex(sticker => {
        const left = sticker.x - (sticker.size)
        const right = sticker.x + sticker.size
        const top = sticker.y - sticker.size
        const bottom = sticker.y
        const isClickedX = x >= left && x <= right
        const isClickedY = y >= top && y <= bottom

        return isClickedX && isClickedY
    })
    // console.log('Clicked sticker index:', gMeme.selectedStickerIdx, 'Sticker found:', gMeme.stickers[gMeme.selectedStickerIdx])
    //for mouse not to jump to top left corner of selection
    if (gMeme.selectedLineIdx !== -1) {
        const clickedLine = gMeme.lines[gMeme.selectedLineIdx]
        clickedLine.offsetX = x - clickedLine.x
        clickedLine.offsetY = y - clickedLine.y
    }

    if (gMeme.selectedStickerIdx !== -1) {
        const clickedLine = gMeme.stickers[gMeme.selectedStickerIdx]
        clickedLine.offsetX = x - clickedLine.x
        clickedLine.offsetY = y - clickedLine.y
    }
    renderMeme()

}

function onMouseMove(ev) {
    if (!gMouseDown) return
    if (gMeme.selectedLineIdx === -1 && gMeme.selectedStickerIdx === -1) return
    const x = ev.offsetX
    const y = ev.offsetY
    const currLine = gMeme.lines[gMeme.selectedLineIdx]
    const currSticker = gMeme.stickers[gMeme.selectedStickerIdx]
    if (currLine) {
        currLine.x = x
        currLine.y = y
        //for mouse not to jump to top left corner of selection
        currLine.x = x - currLine.offsetX
        currLine.y = y - currLine.offsetY
    }
    else {

        currSticker.x = x
        currSticker.y = y
        //for mouse not to jump to top left corner of selection
        currSticker.y = y - currSticker.offsetY
        currSticker.x = x - currSticker.offsetX
    }

    renderMeme()
}

function onMouseUp(ev) {
    gMouseDown = false

    renderMeme()
}

