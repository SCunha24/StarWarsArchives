import { scrollStep, element, openPanelWith, closePanel } from './utils.js'
import { loadVehicleImages, loadPlanetsImages, loadStarshipsImages } from './data.js'

document.addEventListener('DOMContentLoaded', async () => {
    await loadPlanetsImages()
    await loadVehicleImages()
    await loadStarshipsImages()
    setTheme(saved)

    const panelClose = element('#panel-close')
    const panelBg = element('#panel-bg')

    if (panelClose) panelClose.addEventListener('click', closePanel)
    if (panelBg) panelBg.addEventListener('click', closePanel)

    const btnUp = element('#scrollUp')
    const btnDown = element('#scrollDown')

    if (btnUp) {
      btnUp.addEventListener('click', () => {
        window.scrollBy({ top: -scrollStep, behavior: 'smooth' })
      })
    }

    if (btnDown) {
      btnDown.addEventListener('click', () => {
        window.scrollBy({ top: scrollStep, behavior: 'smooth' })
        console.log("baixa")
      })
    }
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


const burger = element('.hamburger')
const nav = element('.navlinks')

burger.addEventListener('click', () => {
  burger.classList.toggle('open')
  nav.classList.toggle('open')
})

document.querySelectorAll('.navlinks a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open')
    nav.classList.remove('open')
  })
})