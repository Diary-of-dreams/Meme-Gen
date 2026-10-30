'use strict'

let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    selectedStickerIdx: 0,
    lines: [],
    stickers: []
}

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getMeme() {
    return gMeme
}

function getCurrImg() {
    return gImgs.find(meme => meme.id === gMeme.selectedImgId)
}

function setColor(color) {
    if (gMeme.lines.length === 0) addLine()
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setTxt(txt) {
    if (gMeme.lines.length === 0 || gMeme.selectedLineIdx === -1) addLine()
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}


function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function changeFontSize(diff) {
    if (gMeme.selectedLineIdx === -1) return
    if (gMeme.lines.length === 0) addLine()
    if (gMeme.lines[gMeme.selectedLineIdx].size + diff < 10) return
    else {
        gMeme.lines[gMeme.selectedLineIdx].size += diff
    }
}


function addLine() {
    let y = 50
    let x = 100
    let txt = 'Enter your text'
    let size = 35
    let color = '#F5F5F5'
    let alignment = 'left'
    let font = 'impact'
    if (!gMeme.lines.some(line => line.y === 50)) {
        y = 50
    }
    else if (!gMeme.lines.some(line => line.y === 400)) {
        y = 400
    }
    else if (!gMeme.lines.some(line => line.y === 200)) {
        y = 200
    }
    else {
        y = 200 + ((gMeme.lines.length - 2) * 30)
    }
    gMeme.lines.push({ txt, size, color, x, y, alignment, font })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}



function switchLine() {
    gMeme.selectedLineIdx++

    if (gMeme.selectedLineIdx === gMeme.lines.length) {
        gMeme.selectedLineIdx = 0
    }
}

function setLineSelect(clickedX, clickedY) {
    gMeme.selectedLineIdx = -1
    for (let i = 0; i < gMeme.lines.length; i++) {
        let line = gMeme.lines[i]
        let textLeftX

        if (line.alignment === 'left') {
            textLeftX = line.x
        }
        else if (line.alignment === 'center') {
            textLeftX = line.x - (line.width / 2)
        }
        else {
            textLeftX = line.x - line.width
        }
        if (clickedX >= textLeftX && clickedX <= textLeftX + line.width && clickedY >= line.y && clickedY <= line.y + line.size) {
            gMeme.selectedLineIdx = i
        }
    }
}



function deleteLine() {
    if (gMeme.selectedLineIdx === -1 && gMeme.selectedStickerIdx === -1) return
    if (gMeme.selectedLineIdx !== -1) {
        gMeme.lines.splice(gMeme.selectedLineIdx, 1)
        gMeme.selectedLineIdx = -1
    } else if (gMeme.selectedStickerIdx !== -1) {
        gMeme.stickers.splice(gMeme.selectedStickerIdx, 1)
        gMeme.selectedStickerIdx = -1
    }
}


function setLineAlign(align) {
    if (gMeme.lines.length === 0 || gMeme.selectedLineIdx === -1) return
    gMeme.lines[gMeme.selectedLineIdx].alignment = align

}

function addImg(url) {
    const id = Math.max(0, ...gImgs.map(img => img.id)) + 1
    gImgs.push({ id, url, isUploaded: true })
    return id
}

