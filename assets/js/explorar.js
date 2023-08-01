import getApi from "./getApi.js"
import { querys } from "./query.js"
import { cardCreate } from "./animeCardCreate.js"

const animeListSection = document.getElementById('animesList')
const btnPagesSection = document.getElementById('pageBtns')
let pageApi = 1

async function getAnimesPage(ordenar, pagina){
    animeListSection.innerHTML = ''
    querys.variables.pageAPI = pagina
    querys.variables.ordenar = ordenar

    const animeDataPopularity = await getApi(querys.query, querys.variables)

    animeDataPopularity.media.forEach( anime => {

        const title = anime.title.romaji == '' ? anime.title.english : anime.title.romaji
        const image = anime.coverImage.large
        const id = anime.id

        cardCreate.exibirCardAnime(id, title, image, 'card_anime_large', animeListSection)
    })

    cardCreate.cardEvent(animeDataPopularity.media)
    console.log(animeDataPopularity)
    exibirBtnPage(animeDataPopularity.pageInfo)
}


function exibirBtnPage(page){
    let i
    btnPagesSection.innerHTML = ''

    for(i= page.currentPage == 1 ? page.currentPage: page.currentPage == 2 ? page.currentPage - 1 : page.currentPage == 3 ? page.currentPage - 2 : page.currentPage - 3;
        i <= (page.currentPage < (page.lastPage - 4) ? (page.currentPage + 4) : page.lastPage);
        i++){

    btnPagesSection.innerHTML += `
         <button id='${i}' class="pageBtn">${i}</button>
     `
    }
}

btnPagesSection.addEventListener('click', (botao) => {

    console.log(botao.target)
    pageApi = botao.target.id

    getAnimesPage('POPULARITY_DESC', pageApi)
    window.scrollTo(0, 0);
    }
) 

getAnimesPage('POPULARITY_DESC', pageApi)

