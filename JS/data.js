export let vehicleImages = {}

export async function loadVehicleImages() {
    try {
        const response = await fetch('./data/vehicles.json')
        vehicleImages = await response.json()
    } catch (err) {
        console.error("Error loading vehicles images:", err)
    }
}

export let planetsImages = {}

export async function loadPlanetsImages() {
    try {
        const response = await fetch('./data/planets.json')
        planetsImages = await response.json()
    } catch (err) {
        console.error("Error loading planets images:", err)
    }
}

export let starshipsImages = {}

export async function loadStarshipsImages() {
    try {
        const response = await fetch('./data/starships.json')
        starshipsImages = await response.json()
    } catch (err) {
        console.error("Error loading starships images:", err)
    }
}



