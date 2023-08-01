const animeId = JSON.parse(localStorage.getItem("anime_screen"))

let queryAll = `
query ($pageAPI: Int, $id: Int, $perPage: Int, $search: String, $ordenar: [MediaSort]) {
  Page (page: $pageAPI, perPage: $perPage) {
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

let variablesAnimeScreen = {
    'id': animeId
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
            variables: variablesAnimeScreen
        })
    }


    
    
getAPIAnimeScreen()

console.log(animeId)