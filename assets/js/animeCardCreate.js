import adicionarAnime from "./localStorage.js"

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

function exibirInfoAnime(anime){
    const animeInfoContainer = document.querySelector('.anime_info_container')
    const caminhoTagA = window.location.pathname == '/index.html' ? './pages/anime.html' : './anime.html'
    animeInfoContainer.innerHTML = ''

    const body = document.querySelector('body')
    body.classList.add('overflow')
    let title = anime.title.romanji == null ? anime.title.english : anime.title.romanji
    let genresFormatado = []
    

    anime.genres.forEach( genero => {
        genresFormatado += `<li>${genero}</li>`
    })

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
    
    animeInfoContainer.innerHTML = `
    <div class="anime-info">
    <div class="animeHeader">
        <img class="banner_info" src="${anime.bannerImage}" alt="">
        <div class="btn_fecharAnime">
            <button>X</button>
        </div>
        <img class="coverImage_info" src="${anime.coverImage.large}" alt="">
        <h3>${title}</h3>
        <ul class="genres_list">
            ${genresFormatado}
        </ul>
    </div>
    <div class="info">
        <p class="descricao">Descrição: <em>${descricao}</em></p>
        <button class="ver_mais_anime"><a href="${caminhoTagA}">Ver mais</a></button>

        <ul>
            <li><strong>Ano: </strong>${anime.startDate.year}</li>
            <li><strong>Status: </strong>${anime.status}</li>
            <li><strong>Episodios: </strong>${anime.episodes}</li>
            <li><strong>Popularidade: </strong>${anime.popularity}</li>
            <li><strong>Nota: </strong>${anime.meanScore}</li>
        </ul>
    </div>
    <div class="btn_list">
        <div class="form_myRankList">
            <h3>Já assistiu? Avalie!</h3>
            <form action="">
                <input type="number" id="nota_animeInput" name="nota_animeInput" placeholder="Nota" max="10" min="0" required>
                <input type="submit" value="Salvar" id="salvar_nota" data-save="rank">
            </form>
        </div>
        <div class="form_myWatchList">
            <input type="submit" value="+" id="submit_assistirLista" data-save="assistir">
            <label for="submit_assistirLista">Adicionar "Quero Assistir"</label>
        </div>
    </div>
</div>
    `
    animeInfoContainer.classList.remove('hidden')

    const btnFecharInfo = document.querySelector('.btn_fecharAnime')
    btnFecharInfo.addEventListener('click', event => {
        animeInfoContainer.classList.add('hidden')
        body.classList.remove('overflow')
    })

    const btnVerMais = document.querySelector('.ver_mais_anime')

    btnVerMais.addEventListener('click', event => {
        localStorage.setItem("anime_screen", JSON.stringify(anime.id))
    })

    const btnSave = document.querySelectorAll('[data-save]')
    btnSave.forEach(btn => btn.addEventListener('click', event => {
        const nota = document.querySelector('#nota_animeInput')

        if(nota.value == "" && btn.parentNode.classList != 'form_myWatchList'){
            
        } else {
            const barraCarregamento = document.querySelector('.message__save')
            barraCarregamento.classList.remove('hidden')
            barraCarregamento.addEventListener('click', () => barraCarregamento.classList.add('hidden'))
            setTimeout(()=> barraCarregamento.classList.add('hidden'), "5000")

            adicionarAnime(event, btn, anime, nota.value)
        }
        
    }))
}

export const cardCreate = {
    exibirCardAnime, cortarTitulo, cardEvent, exibirInfoAnime
}