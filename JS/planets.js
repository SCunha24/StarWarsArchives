import { create, element, scrollStep, fetchJson, SWAPI_BASE, openPanelWith, closePanel } from './utils.js'
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
    img.src = planetsImages[p.name] || `https://placehold.co/600x800/102022/ffe81f?text=${encodeURIComponent(p.name)}`
    img.alt = p.name
    imgWrap.appendChild(img)
    card.appendChild(imgWrap)

    const name = create('h3')
    const meta = create('p')
    name.textContent = p.name
    meta.innerHTML = `Climate: ${p.climate} • Population: ${p.population}`
    card.appendChild(name)
    card.appendChild(meta)
    card.dataset.json = JSON.stringify(p)
    return card
}

export const panelContentForPlanet = (p) => {
    const left = create('div', 'panel-left')
    const img = create('img')
    img.src = planetsImages[p.name] || `https://placehold.co/600x800/102022/ffe81f?text=${encodeURIComponent(p.name)}`
    img.alt = p.name
    left.appendChild(img)

    const right = create('div', 'panel-right')
    const h = create('h2')
    h.id = 'detail-title'
    h.textContent = p.name

    const climate = create('p')
    const terrain = create('p')
    const population = create('p')
    const gravity = create('p')

    climate.innerHTML = `<strong>Climate:</strong> ${p.climate}`
    terrain.innerHTML = `<strong>Terrain:</strong> ${p.terrain}`
    population.innerHTML = `<strong>Population:</strong> ${p.population}`
    gravity.innerHTML = `<strong>Gravity:</strong> ${p.gravity}`

    right.append(h, climate, terrain, population, gravity)

    const container = create('div', 'panel-inner')
    container.append(left, right)
    return container
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
                openPanelWith(panelContentForPlanet(p))
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

    element('#panel-close').addEventListener('click', closePanel)
    element('#panel-bg').addEventListener('click', closePanel)

    element('#scrollUp').addEventListener('click', () => {
        window.scrollBy({ top: -scrollStep, behavior: 'smooth' })
    })
    element('#scrollDown').addEventListener('click', () => {
        window.scrollBy({ top: scrollStep, behavior: 'smooth' })
    })
})
