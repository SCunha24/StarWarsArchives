export const scrollStep = 1000

export const create = (tag, className) => { 
    const e = document.createElement(tag)
    if (className) e.className = className
    return e
}

export const element = (select) => document.querySelector(select)
export const AKABAB_CHAR = 'https://akabab.github.io/starwars-api/api/all.json'
export const SWAPI_BASE = 'https://swapi.dev/api/'

export const fetchJson = async (url) => {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`${response.status}, ${response.statusText}`)
    return response.json()
}

export const openPanelWith = (content) => {
    const panel = element('#detail-panel')
    const body = element('#panel-body')
    body.innerHTML = ''
    body.appendChild(content)
    panel.setAttribute('aria-hidden', 'false')
}

export const closePanel = () => {
    const panel = element('#detail-panel')
    panel.setAttribute('aria-hidden', 'true')
    element('#panel-body').innerHTML = ''
}

export const panelContent = (title, image, fields = {}) => {
    const left = create('div', 'panel-left')
    const img = create('img')
    img.src = image
    img.alt = title
    left.appendChild(img)

    const right = create('div', 'panel-right')
    const h = create('h2')
    h.id = 'detail-title'
    h.textContent = title
    right.appendChild(h)
    
    Object.entries(fields).forEach(([key, value]) => {
        const p = create('p')
        p.innerHTML = `<strong>${key}:</strong> ${value ?? 'unknown'}`
        right.appendChild(p)
    })

    const container = create('div', 'panel-inner')
    container.append(left, right)
    return container
}