import { querys } from "./query.js"
import getApi from "./getApi.js"
import { cardCreate } from "./animeCardCreate.js"

const lancamentosSec = document.querySelector('.lancamentos')
const animeListSection = document.getElementById('animesList')

async function getAnimesRow(){
    lancamentosSec.innerHTML = ''
    querys.variables.ordenar = 'TRENDING_DESC'

    const animeDataTrending = await getApi(querys.query, querys.variables)
    
    animeDataTrending.media.forEach( anime => {
        const title = anime.title.romaji == '' ? anime.title.english : anime.title.romaji
        const image = anime.coverImage.large
        const id = anime.id

        cardCreate.exibirCardAnime(id, title, image, '', lancamentosSec)
        cardCreate.cardEvent(animeDataTrending.media)
    })
}

async function getAnimesPage(ordenar){
    animeListSection.innerHTML = ''
    querys.variables.ordenar = ordenar
    querys.variables.perPage = "35"

    const animeDataPopularity = await getApi(querys.query, querys.variables)

    animeDataPopularity.media.forEach( anime => {

        const title = anime.title.romaji == '' ? anime.title.english : anime.title.romaji
        const image = anime.coverImage.large
        const id = anime.id

        cardCreate.exibirCardAnime(id, title, image, 'card_anime_large', animeListSection)
    })

    cardCreate.cardEvent(animeDataPopularity.media)
}

getAnimesRow()
getAnimesPage('POPULARITY_DESC')