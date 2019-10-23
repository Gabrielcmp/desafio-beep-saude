const baseHNUrl = "https://hacker-news.firebaseio.com/v0"

export const topstories = () => {
  return fetch(`${baseHNUrl}/topstories.json`).then(r => r.json())
}

export const getItems = itemIDs => {
  return Promise.all(itemIDs.map(itemID => {
    return new Promise(resolve => {
      fetch(`${baseHNUrl}/item/${itemID}.json`).then(r => r.json()).then(item => {
        item && !item.deleted && !item.dead ? resolve(item) : resolve(null);
      })
    })
  })).then(items => items.filter(item => item))
}

export const newstories = () => {
  return fetch(`${baseHNUrl}/newstories.json`).then(r => r.json())
}
