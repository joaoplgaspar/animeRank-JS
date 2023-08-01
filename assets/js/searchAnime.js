const inputSearch = document.getElementById('inputSearchAnime')
let animeNameInput = ''

inputSearch.addEventListener('keypress', (event) => {
    event.key != 'Enter' ? animeNameInput += event.key : animeNameInput = inputSearch.value

    variablesSearch.search = animeNameInput
    
    atualizarDados(querySearch, variablesSearch)
    APISearchAnime()
})

inputSearch.addEventListener('keyup', (event) => {

    if(event.key == 'Backspace'){
        inputSearch.value == '' ? animeNameInput = '' : animeNameInput = animeNameInput.substring(0, animeNameInput.length - 1)

        variablesSearch.search = 'animeNameInput'
        atualizarDados(querySearch, variablesSearch)
        APISearchAnime(optionsSearch)
    }
})


