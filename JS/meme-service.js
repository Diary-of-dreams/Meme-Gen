'use strict'

let gImgs = [
    { id: 1, url: 'meme-imgs-square/1.jpg', keywords: ['funny'] },
    { id: 2, url: 'meme-imgs-square/2.jpg', keywords: ['cute', 'dog'] },
    { id: 3, url: 'meme-imgs-square/3.jpg', keywords: ['cute', 'baby'] }
]

let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: []
}

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getMeme() {
    return gMeme
}

function getCurrImg() {
    return gImgs.find(meme => meme.id === gMeme.selectedImgId)
}

function setColor(color) {
    if(gMeme.lines.length === 0) addLine()
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setTxt(txt) {
    if(gMeme.lines.length === 0 || gMeme.selectedLineIdx === -1) addLine()
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function getImgs() {
    return gImgs
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function changeFontSize(diff) {
    if(gMeme.lines.length === 0) addLine()
    if (gMeme.lines[gMeme.selectedLineIdx].size + diff < 10) return
    else {
        gMeme.lines[gMeme.selectedLineIdx].size += diff
    }
}


function addLine() {
    // gMeme.lines.length
    let y = 50
    let x = 100
    let txt = 'Enter your text'
    let size = 20
    let color = '#F5F5F5'
    if (gMeme.lines.length === 0) {
        y = 50
    }
    if (gMeme.lines.length === 1) {
        y = 400 
    }
    if (gMeme.lines.length >= 2) {
       y = 200 + ((gMeme.lines.length - 2) * 30)
    }

gMeme.lines.push({txt, size, color, x, y})
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}


function switchLine(){
    gMeme.selectedLineIdx ++

    if (gMeme.selectedLineIdx === gMeme.lines.length){
        gMeme.selectedLineIdx = 0
    }
}


function deleteLine(){
    
}