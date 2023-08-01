let pageAPI = 1
let perPage = parseInt(document.querySelector('[data-animeQnt]').dataset.animeqnt)

let queryAll = `
query ($pageAPI: Int, $id: Int, $perPage: Int, $search: String, $ordenar: [MediaSort]) {
  Page (page: $pageAPI, perPage: $perPage) {
    pageInfo {
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (sort: $ordenar, id: $id, search: $search, type: ANIME) {
      id
      popularity
      averageScore
      title {
        romaji
        english
        native
      }
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      coverImage {
        large
      }
      bannerImage
      format
      type
      status
      episodes
      chapters
      volumes
      season
      description
      averageScore
      meanScore
      genres
      synonyms
    }
  }
}
`;

let querySearch = `
query ($id: Int, $search: String, $pageAPI: Int, $perPage: Int, $ordenar: [MediaSort]) {
  Page (page: $pageAPI, perPage: $perPage) {
    media (sort: $ordenar, id: $id, search: $search, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        large
        medium
      }
    }
  }
}
`;

let variablesPage = {
    // 'search': nomeDigitado,
    'perPage': perPage,
    'pageAPI': pageAPI,
    'ordenar': 'POPULARITY_DESC'
}

let variablesSearch = {
  'search': '',
  'perPage': 5,
  'pageAPI': pageAPI,
  'ordenar': 'POPULARITY_DESC'
}

let variablesLancamento = {
  'perPage': 50,
  'pageAPI': pageAPI,
  'ordenar': 'TRENDING_DESC'
}

let url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: queryAll,
            variables: variablesPage
        })
    }