'use strict'

let gStickersImgs = [
    { id: 1, icon: '😁', title: 'Happy' },
    { id: 2, icon: '😂', title: 'ROFL' },
    { id: 3, icon: '😎', title: 'Cool' },
    { id: 3, icon: '☹️', title: 'Sad' },
    { id: 4, icon: '😍', title: 'Heart eyes' },
    { id: 5, icon: '😘', title: 'Blow kiss' },
    { id: 6, icon: '😳', title: 'Shy' },
    { id: 7, icon: '😇', title: 'Angel' },
    { id: 8, icon: '🥳', title: 'Party' },
    { id: 9, icon: '😤', title: 'Mad' },
    { id: 10, icon: '😭', title: "Cry" },
    { id: 11, icon: '💩', title: 'Poop' },
    { id: 12, icon: '👍', title: 'Thumbs up' },
    { id: 13, icon: '🦄', title: 'Unicorn' },
    { id: 14, icon: '💣', title: 'Bomb' },
    { id: 15, icon: '⭐️', title: 'Star' },
    { id: 16, icon: '🙈', title: 'See-no-evil monkey' },
    { id: 17, icon: '☠️', title: 'Scull' },
    { id: 18, icon: '👑', title: 'Crown' },
    { id: 19, icon: '💋', title: 'Kiss lips' },
    { id: 20, icon: '👀', title: 'Look aside eyes' },
    { id: 21, icon: '🎩', title: 'Top hat' },
    { id: 22, icon: '⚽️', title: 'Football' },
    { id: 23, icon: '🛹', title: 'Skateboard' },
    { id: 24, icon: '🦠', title: 'Virus' },
    { id: 25, icon: '💰', title: 'Money bag' },
    { id: 26, icon: '🎈', title: 'Balloon' },
    { id: 27, icon: '❤️', title: 'Red heart' },
    { id: 28, icon: '💖', title: 'Pink heart' },
    { id: 29, icon: '🧸', title: 'Teddybear' },
    { id: 30, icon: '🏴‍☠️', title: 'Pirate flag' }
]

let gStickers = [{
    id: '1',
    size: 40,
    x: 250,
    y: 250
}]


function getStickers() {
    return gStickersImgs
}

function addSticker(id) {
    let sticker = gStickersImgs.find(sticker => sticker.id === id)
    let y = 250
    let x = 250
    let size = 35
    gMeme.stickers.push({ y, x, id, size, sticker })
    gMeme.selectedStickerIdx = gMeme.stickers.length - 1
    // console.log('selectedIdx', gMeme.selectedStickerIdx)
}