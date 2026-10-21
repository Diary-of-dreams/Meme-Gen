'use strict'

let gImgs = [
    { id: 1, url: 'meme-imgs-square/1.jpg', keywords: ['funny'] },
    { id: 2, url: 'meme-imgs-square/2.jpg', keywords: ['cute', 'dog'] },
    { id: 3, url: 'meme-imgs-square/3.jpg', keywords: ['cute', 'baby'] }
]

let gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red'
        }
    ]
}

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getMeme() {
    return gMeme
}

function getCurrImg() {
    return gImgs.find(meme => meme.id === gMeme.selectedImgId)
}

function setColor(color) {
    gMeme.lines[0].color = color
}

function setTxt(txt) {
    gMeme.lines[0].txt = txt

}