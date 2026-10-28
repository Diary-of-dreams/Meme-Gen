'use strict'

function renderStickers(){
    const stickers = getStickers()
    let elStickers = document.querySelector('.stickers')
elStickers.innerHTML = stickers.map(sticker => `<button class="sticker-btn" onclick="onAddSticker(${sticker.id})" title="${sticker.title}">${sticker.icon} </button>`
).join('')

}


function onAddSticker(id){
addSticker(id)
renderMeme()
}