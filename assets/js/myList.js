import getApi from "./getApi.js"
import { querys } from "./query.js"
import { cardCreate } from "./animeCardCreate.js"

const btnDisplay = document.querySelectorAll('[data-btnSection]')
const section = document.querySelectorAll('section')

const assistirSection = document.querySelector('.assistir__section')
const rankSection = document.querySelector('.rank__section')
const animeAssistir = JSON.parse(localStorage.getItem("anime_assistir")) || []
const animeRank = JSON.parse(localStorage.getItem("anime_rank")) || []

let animeData = []
let i = 0;

btnDisplay.forEach(btn => btn.addEventListener('click', event => alterarDisplay(btn)))

function alterarDisplay(btn) {
    section.forEach(section => section.classList.add('hidden'))
    btnDisplay.forEach(botao => botao.classList.remove('btn__selected'))

    const sectionDisplay = document.querySelector(`.${btn.dataset.btnsection}`)
    sectionDisplay.classList.remove('hidden')
    btn.classList.add('btn__selected')
}

async function mostrarLista(storage, section) {
    section.innerHTML = ``
    if(storage == "") {
        section.innerHTML = '<h2>Você ainda não adicionou nenhum anime na sua lista!</h2>'
    }
    storage.forEach(async function(elemento) {
        
        querys.variables.id = elemento.animeId

        let anime = await getApi(querys.query, querys.variables)
        
        animeData[i] = await anime.media
        
        i++;
        createAnimeCard(anime.media[0], section, elemento.nota, animeData, elemento)
    })
}

function createAnimeCard(anime, section, nota, animeData, elemento){
    let title = anime.title.romanji == null ? anime.title.english : anime.title.romanji
    let descricao = '';

    for(let i=0; i<= anime.description.length; i++){
        if(anime.description[i] == '<'){
            i = i+4
        }
        descricao += anime.description[i]

        if(i>300){
            descricao += '...'
            break;
        }
    }

    elemento.descricao == undefined ? elemento.descricao = "Você ainda não adicionou uma descrição" : elemento.descricao = elemento.descricao

    if(section.id == 'rank'){
        
        section.innerHTML += `
        <div class="anime__row" id="${anime.id}">
            <div class="animeImg">
                <img src="${anime.coverImage.large}" alt="">
            </div>
            <div class="info__anime">
                <h2>${title}</h2>
                <p class="descricao descricaoY"><strong>Sua descrição:</strong> ${elemento.descricao}</p>
                <p class="descricao">${descricao}</p>
                <p>Nota: ${nota}</p>
            </div>
            <div class="remover__anime">
                <button>X</button>
            </div>
        </div>
        `
    } else {
        section.innerHTML += `
        <div class="anime__row" id="${anime.id}">
            <div class="animeImg">
                <img src="${anime.coverImage.large}" alt="">
            </div>
            <div class="info__anime">
                <h2>${title}</h2>
                <p class="descricao">${descricao}</p>
                <p>Nota geral: ${anime.averageScore}</p>
            </div>
            <div class="remover__anime">
                <button>X</button>
            </div>
        </div>
        `
    }

    const btnsRemover = document.querySelectorAll('.remover__anime')
    botaoDeleta(btnsRemover, elemento)
    cardEvent(animeData)
}

function cardEvent(storage){
    const cardAnime = document.querySelectorAll('.animeImg')
    
    cardAnime.forEach(elemento => elemento.addEventListener('click', event => {
        storage.forEach(anime => {
            if(elemento.parentNode.id == anime[0].id){
                cardCreate.exibirInfoAnime(anime[0])
            }
        })
    }))
}

function botaoDeleta(btns, id){
    btns.forEach(btn => btn.addEventListener('click', event => deletaElemento(btn.parentNode, id)))
}

function deletaElemento(tag, id) {
    const name = tag.parentNode.id
    tag.remove()

    if(name == 'rank'){
        animeRank.splice(animeRank.findIndex(elemento => elemento.id == id.id), 1)
        localStorage.setItem("anime_rank", JSON.stringify(animeRank))
    } else {
        animeAssistir.splice(animeAssistir.findIndex(elemento => elemento.id == id.id), 1)
        localStorage.setItem("anime_assistir", JSON.stringify(animeAssistir))
    }
}

mostrarLista(animeAssistir, assistirSection)
mostrarLista(animeRank, rankSection)