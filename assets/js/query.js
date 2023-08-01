let perPage = 50
let pageAPI = 1

let query = `
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

let variables = {
    // 'search': nomeDigitado,
    'perPage': perPage,
    'pageAPI': pageAPI,
    'ordenar': 'POPULARITY_DESC'
}

export const querys = {
    variables, query
}