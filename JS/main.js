import { scrollStep, element, openPanelWith, closePanel } from './utils.js'
import { loadVehicleImages, loadPlanetsImages, loadStarshipsImages } from './data.js'
import { SetUpCharacters } from './characters.js'
import { SetUpPlanets } from './planets.js'
import { SetUpVehicles } from './vehicles.js'
import { SetUpStarships } from './starships.js'

document.addEventListener('DOMContentLoaded', async () => {
    await loadPlanetsImages()
    await loadVehicleImages()
    await loadStarshipsImages()
    setTheme(saved)

    element('#panel-close').addEventListener('click', closePanel)
    element('#panel-bg').addEventListener('click', closePanel)

    element('#scrollUp').addEventListener('click', () => {
        window.scrollBy({ top: -scrollStep, behavior: 'smooth' })
    })

    element('#scrollDown').addEventListener('click', () => {
        window.scrollBy({ top: scrollStep, behavior: 'smooth' })
    })
})

const sith = element('.Sith-mode')
const jedi = element('.Jedi-mode')
const normal = element('.Normal-mode')

const themes = {
    normal: '#ffe81f', 
    sith: '#ea0000',   
    jedi: '#2eff2e'    
}

const modes = [sith, jedi, normal]
function setTheme(mode) {

    document.documentElement.style.setProperty('--detail', themes[mode])
    localStorage.setItem('theme', mode)

    modes.forEach(m => m.classList.remove('active'))
    if (mode === 'sith') sith.classList.add('active')
    else if (mode === 'jedi') jedi.classList.add('active')
    else normal.classList.add('active')
}

let saved = localStorage.getItem('theme') || 'normal'

sith.addEventListener('click', () => setTheme('sith'))
jedi.addEventListener('click', () => setTheme('jedi'))
normal.addEventListener('click', () => setTheme('normal'))