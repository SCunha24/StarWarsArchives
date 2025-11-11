import { create, element, scrollStep, fetchJson, SWAPI_BASE, openPanelWith, closePanel, panelContent  } from './utils.js'
import { planetsImages, loadPlanetsImages } from './data.js'

export async function fetchAllPlanets() {
    let planets = []
    let url = SWAPI_BASE + 'planets/'
    while (url) {
        const data = await fetchJson(url)
        planets = planets.concat(data.results)
        url = data.next
    }
    return planets
}

export const planetInfo = (p) => {
    const card = create('article', 'card')
    const imgWrap = create('div', 'img-wrap')
    const img = create('img')
    img.src = planetsImages[p.name] || `./data/placeholder.png`
    img.alt = p.name
    imgWrap.appendChild(img)
    card.appendChild(imgWrap)

    const name = create('h3')
    const meta = create('p')
    name.textContent = p.name
    meta.innerHTML = `Climate: ${p.climate} - Population: ${p.population}`
    card.appendChild(name)
    card.appendChild(meta)
    card.dataset.json = JSON.stringify(p)
    return card
}

export async function SetUpPlanets() {
    const grid = element('#planets-grid')
    grid.innerHTML = `<div class="placeholder">Loading planets…</div>`
    try {
        const results = await fetchAllPlanets()
        grid.innerHTML = ''
        results.forEach(p => {
            const card = planetInfo(p)
            card.addEventListener("click", () => {
                openPanelWith(panelContent(
                    p.name,
                    planetsImages[p.name] || `https://placehold.co/600x800/102022/ffe81f?text=${p.name}`,
                    {
                        Climate: p.climate,
                        Terrain: p.terrain,
                        Population: p.population,
                        Gravity: p.gravity
                    }
                ))
            })
            grid.appendChild(card)
        })
    } catch (err) {
        grid.innerHTML = `<div class="placeholder">Failed to load planets: ${err.message}</div>`
        console.error(err)
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadPlanetsImages()
    await SetUpPlanets()
})
