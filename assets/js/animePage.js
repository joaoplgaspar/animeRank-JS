import getApi from "./getApi.js"
import { querys } from "./query.js"
import adicionarAnime from "./localStorage.js"

const animeScreen = JSON.parse(localStorage.getItem("anime_screen")) || []
const animeScreenSection = document.querySelector('.anime_screen_container')
var carregamentoWidth = 0

async function animeScreenGet() {
    querys.variables.id = animeScreen

    const animeC = await getApi(querys.query, querys.variables)
    console.log(animeC)
    const anime = animeC.media[0]

    let title = anime.title.romanji == null ? anime.title.english : anime.title.romanji
    let genresFormatado = []
    
    anime.genres.forEach( genero => {
        genresFormatado += `<li>${genero}</li>`
    })

    animeScreenSection.innerHTML = ''
    animeScreenSection.innerHTML = `
    <div class="banner_container">
                <img src="${anime.bannerImage}" alt="">
            </div>
            <div class="head__anime_screen">
                <img src="${anime.coverImage.large}" alt="">
                <div class="info__head_screen">
                    <h2>${title}</h2>
                    <ul class="generos">
                        ${genresFormatado}
                    </ul>
                    <p>${anime.description}</p>
                    
                    <div class="form_myWatchList">
                        <input type="submit" value="+" id="submit_assistirLista" data-save="assistir">
                        <label for="submit_assistirLista">Adicionar "Quero Assistir"</label>
                    </div>
                </div>
            </div>
            <h2 class="info__anime_title">Info anime</h2>
            <div class="info__anime_screen">
                <div class="card__info">
                    <h3>Nota geral</h3>
                    <p class="info">${anime.averageScore}</p>
                </div>
                <div class="card__info">
                    <h3>Status</h3>
                    <p class="info">${anime.status}</p>
                </div>
                <div class="card__info">
                    <h3>Episódios</h3>
                    <p class="info">${anime.episodes}</p>
                </div>
                <div class="card__info">
                    <h3>Temporada</h3>
                    <p class="info">${anime.season}</p>
                </div>
                <div class="card__info">
                    <h3>Data de lançamento</h3>
                    <p class="info">${anime.startDate.day}/${anime.startDate.month}/${anime.startDate.year}</p>
                </div>
                <div class="card__info">
                    <h3>Data final</h3>
                    <p class="info">${anime.endDate.day}/${anime.endDate.month}/${anime.endDate.year}</p>
                </div>
                <div class="card__info">
                    <h3>Sinonimos</h3>
                    <p class="info">${anime.synonyms}</p>
                </div>
            </div>
            <h2 class="info__anime_title">Avalie</h2>
            <div class="btn_list">
                <div class="form_myRankList">
                    <form action="">
                        <input type="number" id="nota_animeInput" name="nota_animeInput" placeholder="Nota 0-100" max="100" min="0" required>
                        <textarea name="textarea_descricao" id="textarea_descricao" cols="30" rows="10" placeholder="Descreva em suas palavras o anime!"></textarea>
                        <input type="submit" value="Salvar" id="salvar_nota" data-save="rank">
                    </form>
                </div>
            </div>
    `

    const btnSave = document.querySelectorAll('[data-save]')
    btnSave.forEach(btn => btn.addEventListener('click', event => {

        
        const nota = document.querySelector('#nota_animeInput')
        console.log(btn.parentNode)

        if(nota.value == "" && btn.parentNode.classList != 'form_myWatchList'){
            
        } else {
            const descricao = document.querySelector('#textarea_descricao').value
            adicionarAnime(event, btn, anime, nota.value, descricao)

            const barraCarregamento = document.querySelector('.message__save')
            barraCarregamento.classList.remove('hidden')
            barraCarregamento.addEventListener('click', () => barraCarregamento.classList.add('hidden'))
            setTimeout(()=> barraCarregamento.classList.add('hidden'), "5000")
        }
    }))
}

animeScreenGet()
