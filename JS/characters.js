import { create, element, fetchJson, AKABAB_CHAR, scrollStep, openPanelWith, closePanel, panelContent } from './utils.js'

export const MakeCharacter = c => ({
    id: c.id,
    name: c.name,
    image: c.image || `./data/placeholder.png`,
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
    img.src = c.image || './data/placeholder.png'
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

export async function SetUpCharacters() {
    const grid = element('#characters-grid')
    grid.innerHTML = `<div class="placeholder">Loading characters…</div>`
    try {
        const raw = await fetchJson(AKABAB_CHAR)
        const chars = raw.map(MakeCharacter)
        grid.innerHTML = ''
        chars.forEach(c => {
            const card = CharacterCard(c)
            card.addEventListener("click", () => {
                openPanelWith(panelContent(
                    c.name,
                    c.image,
                    {
                        Species: c.species,
                        Homeworld: c.homeworld,
                        Affiliation: c.affiliation
                    }
                ))
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
})

