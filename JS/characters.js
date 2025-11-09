import { create, element, fetchJson, AKABAB_CHAR, scrollStep, openPanelWith, closePanel} from './utils.js'

export const MakeCharacter = c => ({
    id: c.id,
    name: c.name,
    image: c.image,
    species: c.species || 'unknown',
    homeworld: c.homeworld || 'unknown',
    affiliation: Array.isArray(c.affiliation) ? c.affiliation.join(', ') : (c.affiliation || ''),
    wiki: c.wiki || ''
})

export const CharacterCard = (c) => {
    const card = create('article', 'card')
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

export const panelContentForCharacter = (c) => {
    const left = create('div', 'panel-left')
    const img = create('img')
    img.src = c.image || ''
    img.alt = c.name
    left.appendChild(img)

    const right = create('div', 'panel-right')
    const h = create('h2')
    const pAff = create('p')
    const pSpecies = create('p')
    const pHome = create('p')
    const pWiki = create('p')

    h.textContent = c.name
    h.id = 'detail-title'
    pAff.innerHTML = `<strong>affiliation:</strong> ${c.affiliation || 'unknown'}`
    pSpecies.innerHTML = `<strong>species:</strong> ${c.species || 'unknown'}`
    pHome.innerHTML = `<strong>homeworld:</strong> ${c.homeworld || 'unknown'}`
    pWiki.innerHTML = c.wiki ? `<a href="${c.wiki}" target="_blank" rel="noopener">read more</a>` : ''

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

export async function SetUpCharacters() {
    const grid = element('#characters-grid')
    grid.innerHTML = `<div class="placeholder">Loading characters…</div>`
    try {
        const raw = await fetchJson(AKABAB_CHAR)
        const chars = raw.map(MakeCharacter)
        grid.innerHTML = ''
        chars.forEach(c => {
            const card = CharacterCard(c)
            card.addEventListener('click', () => {
                setTimeout(() => {
                    openPanelWith(panelContentForCharacter(c))
                }, 100)
            })
            grid.appendChild(card)
        })
    } catch (err) {
        grid.innerHTML = `<div class="placeholder">Failed to load characters: ${err.message}</div>`
        console.error(err)
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await SetUpCharacters()

    element('#panel-close').addEventListener('click', closePanel)
    element('#panel-bg').addEventListener('click', closePanel)

    element('#scrollUp').addEventListener('click', () => {
        window.scrollBy({ top: -scrollStep, behavior: 'smooth' })
    })

    element('#scrollDown').addEventListener('click', () => {
        window.scrollBy({ top: scrollStep, behavior: 'smooth' })
    })
})

