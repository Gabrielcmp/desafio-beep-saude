const baseHNUrl = "https://hacker-news.firebaseio.com/v0"

export const topstories = () => {
  return fetch(`${baseHNUrl}/topstories.json`).then(r => r.json())
}

export const getItems = itemIDs => {
  return Promise.all(itemIDs.map(itemID => {
    return new Promise(resolve => {
      fetch(`${baseHNUrl}/item/${itemID}.json`).then(r => r.json()).then(item => {
        resolve(item);
      })
    })
  }))
}

export const newstories = () => {
  return fetch(`${baseHNUrl}/newstories.json`).then(r => r.json())
}
