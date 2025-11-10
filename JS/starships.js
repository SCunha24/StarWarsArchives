import { create, element, fetchJson, SWAPI_BASE, scrollStep, openPanelWith, closePanel, panelContent } from './utils.js'
import { starshipsImages, loadStarshipsImages } from './data.js'

export async function fetchAllStarships() {
    let starships = []
    let url = SWAPI_BASE + 'starships/'
    while (url) {
        const data = await fetchJson(url)
        starships = starships.concat(data.results)
        url = data.next
    }
    return starships
}

export const starshipInfo = (s) => {
    const card = create('article', 'card')
    const imgWrap = create('div', 'img-wrap')
    const img = create('img')
    img.src = starshipsImages[s.name] || `https://placehold.co/600x800/102022/ffe81f?text=${encodeURIComponent(s.name)}`
    img.alt = s.name
    imgWrap.appendChild(img)
    card.appendChild(imgWrap)

    const name = create('h3')
    const meta = create('p')
    name.textContent = s.name
    meta.innerHTML = `${s.starship_class || 'Class N/A'} • ${s.hyperdrive_rating ? 'HD: ' + s.hyperdrive_rating : ''}`
    card.appendChild(name)
    card.appendChild(meta)
    card.dataset.json = JSON.stringify(s)
    return card
}

export async function SetUpStarships() {
    const grid = element('#starships-grid')
    grid.innerHTML = `<div class="placeholder">Loading starships…</div>`
    try {
        const results = await fetchAllStarships()
        grid.innerHTML = ''
        results.forEach(s => {
            const card = starshipInfo(s)
            card.addEventListener("click", () => {
                openPanelWith(panelContent(
                s.name,
                starshipsImages[s.name], 
                {
                    Model: s.model,
                    Manufacturer: s.manufacturer,
                    Hyperdrive: s.hyperdrive_rating,
                    Crew: s.crew,
                    Passengers: s.passengers
                }))
            })
            grid.appendChild(card)
        })
    } catch (err) {
        grid.innerHTML = `<div class="placeholder">Failed to load starships: ${err.message}</div>`
        console.error(err)
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadStarshipsImages()
    await SetUpStarships()

    element('#scrollUp').addEventListener('click', () => {
        window.scrollBy({ top: -scrollStep, behavior: 'smooth' })
    })
    element('#scrollDown').addEventListener('click', () => {
        window.scrollBy({ top: scrollStep, behavior: 'smooth' })
    })
})

