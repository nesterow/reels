import delay from './delay'

const fetchAsBlob = url => fetch(url)
    .then(response => response.blob())

const convertBlobToBase64 = blob => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
})

const getAsset = (url: string) => fetchAsBlob(url).then(convertBlobToBase64)



const assets = [
    '/assets/3xBAR.png',
    '/assets/BAR.png',
    '/assets/2xBAR.png',
    '/assets/7.png',
    '/assets/Cherry.png',
]

export default async () => {
    const result = {}
    for (let i in assets) {
        result[i] = await getAsset(assets[i])
    }
    await delay()
    return result
}