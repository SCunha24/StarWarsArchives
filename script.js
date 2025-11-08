/*document.querySelector('.Enter').addEventListener('click', () => {
    const intro = document.querySelector('.intro')
    intro.classList.add('fade-out')
    setTimeout(() => {
        intro.style.display = 'none'
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 800)
})*/
const scrollStep = 600

const create = (tag, className) => { 
    const e = document.createElement(tag) 
    if (className) e.className = className
    return e
}

const element = (select) => document.querySelector(select)
const AKABAB_CHAR = 'https://akabab.github.io/starwars-api/api/all.json'
const SWAPI_BASE = 'https://swapi.dev/api/' 

const fetchJson = async (url) => {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`${response.status}, ${response.statusText}`)
  return response.json()
}

const MakeCharacter = c => ({
    id: c.id,
    name: c.name,
    image: c.image,
    species: c.species || 'unknown',
    homeworld: c.homeworld || 'unknown',
    affiliation: Array.isArray(c.affiliation) ? c.affiliation.join(', ') : (c.affiliation || ''),
    wiki: c.wiki || ''
})

const CharacterCard = (c) => {
    const card = create('article', 'card');
    const imgWrap = create('div', 'img-wrap')
    imgWrap.style.position = 'relative'

    const img = create('img')
    img.src = c.image || ''
    img.alt = c.name
    img.loading = 'lazy'
    imgWrap.appendChild(img)

    const name = create('h3')
    const meta = create('p') 
    name.textContent = c.name
    meta.textContent = c.species

    card.appendChild(imgWrap)
    card.appendChild(name)
    card.appendChild(meta)
    card.dataset.charId = c.id
    card.dataset.charJson = JSON.stringify(c)

    return card
}

const panelContentForCharacter = (c) => {
  const left = create('div', 'panel-left')
  const img = create('img'); img.src = c.image || ''; img.alt = c.name
  left.appendChild(img)

  const right = create('div', 'panel-right')
  const h = create('h2'); h.textContent = c.name; h.id = 'detail-title'
  const pAff = create('p'); pAff.innerHTML = `<strong>affiliation:</strong> ${c.affiliation || 'unknown'}`
  const pSpecies = create('p'); pSpecies.innerHTML = `<strong>species:</strong> ${c.species || 'unknown'}`
  const pHome = create('p'); pHome.innerHTML = `<strong>homeworld:</strong> ${c.homeworld || 'unknown'}`
  const pWiki = create('p'); pWiki.innerHTML = c.wiki ? `<a href="${c.wiki}" target="_blank" rel="noopener">read more</a>` : ''

  right.appendChild(h)
  right.appendChild(pAff)
  right.appendChild(pSpecies)
  right.appendChild(pHome)
  right.appendChild(pWiki)

  const container = create('div', 'panel-inner')
  container.appendChild(left)
  container.appendChild(right)
  
  return container
}

async function SetUpCharacters() {
    const grid = element('#characters-grid')
    grid.innerHTML = `<div class="placeholder">Loading characters…</div>`
    try {
        const raw = await fetchJson(AKABAB_CHAR)
        const chars = raw.map(MakeCharacter)
        grid.innerHTML = ''
        chars.forEach(c => {
        const card = CharacterCard(c)
        card.addEventListener('click', () => {
            openPanelWith( panelContentForCharacter(c) )
        })
        grid.appendChild(card)
        })
    } catch (err) {
        grid.innerHTML = `<div class="placeholder">Failed to load characters: ${err.message}</div>`
        console.error(err)
    }
}

async function SetUpPlanets() {
}

async function SetUpVehicles() {
}

async function SetUpStarships() {
}

const openPanelWith = (content) => {
  const panel = element('#detail-panel')
  const body = element('#panel-body')
  body.innerHTML = ''
  body.appendChild(content)
  panel.setAttribute('aria-hidden', 'false')
}

const closePanel = () => {
  const panel = element('#detail-panel')
  panel.setAttribute('aria-hidden', 'true')
  element('#panel-body').innerHTML = ''
  console.log("fechar");
}

element('#panel-close').addEventListener('click', closePanel);
element('#panel-bg').addEventListener('click', closePanel);
element('#panel-bg')?.addEventListener('click', closePanel);

document.addEventListener('DOMContentLoaded', () => {
    SetUpCharacters()
    SetUpPlanets()
    SetUpVehicles()
    SetUpStarships()

    element('#scrollUp').addEventListener('click', () => {
    window.scrollBy({ top: -scrollStep, behavior: 'smooth' })
    console.log("cima")
    })

    element('#scrollDown').addEventListener('click', () => {
    window.scrollBy({ top: scrollStep, behavior: 'smooth' })
    console.log("baixo")
    })
})

