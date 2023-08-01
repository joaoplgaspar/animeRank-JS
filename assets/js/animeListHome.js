const animeListSection = document.getElementById('animesList')
const btnPagesSection = document.getElementById('pageBtns')
let animeData = {}

function getAnimesPage(animes, page){
    animeListSection.innerHTML = ''
    animeData = animes;

    animes.forEach( anime => {

        const title = anime.title.romaji == '' ? anime.title.english : anime.title.romaji
        const image = anime.coverImage.large
        const id = anime.id

        exibirCardAnime(id, title, image, 'card_anime_large', animeListSection)
    })

    cardEvent(animeData)

    if(document.querySelector('[data-animeQnt]').dataset.animeqnt == '50'){
        exibirBtnPage(page)
    }
}

function exibirCardAnime(id, title, image, format, local){

    local.innerHTML += `
    <div id="${id}" class="card_anime ${format}">
        <div class="animeImg">
            <img src="${image}" alt="">
        </div>
        <div class="titulo_anime">
            <p>${title.length > 20 ? cortarTitulo(title) : title}</p>
        </div>
    </div>
    `
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

    btnPagesSection.addEventListener('click', (botao) => {

        variablesPage.pageAPI = botao.target.id

        atualizarDados(queryAll, variablesPage)
        getAPIPages()
        window.scrollTo(0, 0);
        }
    ) 
}

function cortarTitulo(title){
    let tituloFormatado = title.substring(0, 20)
    return tituloFormatado += '...'
}

function cardEvent(storage){
    const cardAnime = document.querySelectorAll('.card_anime')
    
    cardAnime.forEach(elemento => elemento.addEventListener('click', event => {
        storage.forEach(anime => {
            if(elemento.id == anime.id){
                exibirInfoAnime(anime)
            }
        })
    }))
}

getAPIPages()