import { scrollStep, element } from './utils.js'
import { loadVehicleImages, loadPlanetsImages, loadStarshipsImages } from './data.js'
import { SetUpCharacters, openPanelWith, closePanel } from './characters.js'
import { SetUpPlanets } from './planets.js'
import { SetUpVehicles } from './vehicles.js'
import { SetUpStarships } from './starships.js'

document.addEventListener('DOMContentLoaded', async () => {
    await loadVehicleImages()
    await loadPlanetsImages()
    await loadStarshipsImages()
    await SetUpCharacters()
    await SetUpPlanets()
    await SetUpVehicles()
    await SetUpStarships()

    element('#panel-close').addEventListener('click', closePanel)
    element('#panel-bg').addEventListener('click', closePanel)

    element('#scrollUp').addEventListener('click', () => {
        window.scrollBy({ top: -scrollStep, behavior: 'smooth' })
    })

    element('#scrollDown').addEventListener('click', () => {
        window.scrollBy({ top: scrollStep, behavior: 'smooth' })
    })
})
