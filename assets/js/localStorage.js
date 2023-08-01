export default function adicionarAnime(event, btn, anime, nota, descricao){
    const animeAssistir = JSON.parse(localStorage.getItem("anime_assistir")) || []
    const animeRank = JSON.parse(localStorage.getItem("anime_rank")) || []
    event.preventDefault()

    if(btn.dataset.save == 'rank'){
        const animeSave = {
            "animeId": anime.id,
            "nota": nota,
            "descricao": descricao != "" ? descricao : ""
        }

        storageAnime(animeRank, 'anime_rank', anime, animeSave)
    } else {
        const animeSave = {
            "animeId": anime.id
        }

        storageAnime(animeAssistir, 'anime_assistir', anime, animeSave)
    }
}

function storageAnime(storage, local, anime, animeSave){
    const existe = storage.find(elemento => elemento.animeId == anime.id)

    if(existe) {
        animeSave.id = existe.id
        storage[storage.findIndex(elemento => elemento.id == existe.id)] = animeSave
    } else {
        animeSave.id = storage[storage.length - 1] ? (storage[storage.length-1]).id + 1 : 0
        storage.push(animeSave)
    }

    localStorage.setItem(`${local}`, JSON.stringify(storage))
}