export default async function getApi(query, variables){
    try {
        const animeAPI = await fetch("https://graphql.anilist.co", 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        })
        const animeAPIConvertida = await animeAPI.json();
        
        return animeAPIConvertida.data.Page

    } catch (error) {
        console.error(error);
    }
}