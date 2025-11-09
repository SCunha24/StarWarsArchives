import { create, element, fetchJson, SWAPI_BASE} from './utils.js'
import { vehicleImages } from './data.js'

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
        results.forEach(v => grid.appendChild(vehicleInfo(v)))
    } catch (err) {
        grid.innerHTML = `<div class="placeholder">Failed to load vehicles: ${err.message}</div>`
        console.error(err)
    }
}
