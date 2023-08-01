const animeInfoContainer = document.querySelector('.anime_info_container')

function exibirInfoAnime(anime){
    caminhoTagA = window.location.pathname == '/index.html' ? './pages/anime.html' : './anime.html'

    const body = document.querySelector('body')
    body.classList.add('overflow')
    let title = anime.title.romanji == null ? anime.title.english : anime.title.romanji
    let genresFormatado = []
    

    anime.genres.forEach( genero => {
        genresFormatado += `<li>${genero}</li>`
    })

    let descricao = '';

    for(i=0; i<= anime.description.length; i++){
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
                <input type="number" id="nota_animeInput" name="nota_animeInput" placeholder="Nota" max="10" min="0">
                <input type="submit" value="Salvar" id="salvar_nota">
            </form>
        </div>
        <div class="form_myWatchList">
            <input type="submit" value="+" id="submit_assistirLista">
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
}