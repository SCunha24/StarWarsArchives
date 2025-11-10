import { create, element, fetchJson, SWAPI_BASE, scrollStep, openPanelWith, closePanel, panelContent} from './utils.js'
import { vehicleImages, loadVehicleImages } from './data.js'


export async function fetchAllVehicles() {
    let vehicles = []
    let url = SWAPI_BASE + 'vehicles/'
    while (url) {
        const data = await fetchJson(url)
        vehicles = vehicles.concat(data.results)
        url = data.next
    }
    return vehicles
}

export const vehicleInfo = (v) => {
    const card = create('article', 'card')
    const imgWrap = create('div', 'img-wrap')
    const img = create('img')
    img.src = vehicleImages[v.name] || `https://placehold.co/600x800/102022/ffe81f?text=${encodeURIComponent(v.name)}`
    img.alt = v.name
    img.loading = 'lazy'
    imgWrap.appendChild(img)
    card.appendChild(imgWrap)

    const name = create('h3')
    const meta = create('p')
    name.textContent = v.name
    meta.innerHTML = `${v.model || 'Model N/A'} • ${v.manufacturer || ''}`
    card.appendChild(name)
    card.appendChild(meta)
    card.dataset.json = JSON.stringify(v)
    return card
}

export async function SetUpVehicles() {
    const grid = element('#vehicles-grid')
    grid.innerHTML = `<div class="placeholder">Loading vehicles…</div>`
    try {
        const results = await fetchAllVehicles()
        grid.innerHTML = ''
        results.forEach(v => {
            const card = vehicleInfo(v)
            card.addEventListener("click", () => {
                openPanelWith(panelContent(
                    v.name,
                    vehicleImages[v.name],
                    {
                        Model: v.model,
                        Manufacturer: v.manufacturer,
                        Crew: v.crew,
                        Passengers: v.passengers
                    }
                ))
            })
            grid.appendChild(card)
        })
    } catch (err) {
        grid.innerHTML = `<div class="placeholder">Failed to load vehicles: ${err.message}</div>`
        console.error(err)
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadVehicleImages()
    await SetUpVehicles()

    element('#scrollUp').addEventListener('click', () => {
        window.scrollBy({ top: -scrollStep, behavior: 'smooth' })
    })
    element('#scrollDown').addEventListener('click', () => {
        window.scrollBy({ top: scrollStep, behavior: 'smooth' })
    })
})

