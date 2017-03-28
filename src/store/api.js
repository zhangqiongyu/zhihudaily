import axios from 'axios'

export function fetch (url) {
  return new Promise((resolve, reject) => {
    axios.get(url)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
        })
  })
}
export function fetchLatestNews () {
  return fetch(`/api/4/news/latest`)
}
export function fetchNewsById (id) {
  return fetch(`/api/4/news/${id}`)
}
export function fetchThemes () {
  return fetch(`/api/4/themes`)
}
export function fetchThemesById (id) {
  return fetch(`/api/4/theme/${id}`)
}
export function fetchBeforeThemesById (themeId, timestamp) {
  return fetch(`/api/4/theme/${themeId}/before/${timestamp}`)
}
export function fetchBeforeByDate (date) {
  return fetch(`/api/4/news/before/${date}`)
}
export function fetchExtraById (id) {
  return fetch(`/api/4/story-extra/${id}`)
}
export function fetchLongCommentsById (id) {
  return fetch(`/api/4/story/${id}/long-comments`)
}
export function fetchShortCommentsById (id) {
  return fetch(`/api/4/story/${id}/short-comments`)
}
