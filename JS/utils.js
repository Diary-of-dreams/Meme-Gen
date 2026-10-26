'use strict'
// SHARE ON FACEBOOK

const IMGBB_KEY = 'eb4e774461240fd1692f86b6a6e08af3'

async function onShareMeme() {
    // open the window right away, so popup blockers allow it
    const shareWin = window.open('', '_blank')

    try {
        renderMeme(false)                               // draw without the selection frame
        const dataUrl = gElCanvas.toDataURL('image/jpeg')
        renderMeme()                                    // bring the frame back

        const imgUrl = await uploadImg(dataUrl)
        shareWin.location = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imgUrl)}`
    } catch (err) {
        shareWin.close()
        console.error(err)
        alert('Could not share the meme, please try again')
    }
}

async function uploadImg(dataUrl) {
    const base64 = dataUrl.split(',')[1]                // remove the "data:image/jpeg;base64," prefix
    const formData = new FormData()
    formData.append('image', base64)

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
        method: 'POST',
        body: formData,
    })
    const data = await res.json()
    if (!data.success) throw new Error('Upload failed')
    return data.data.url
}