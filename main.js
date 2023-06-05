
let btn_change = document.querySelector("#btn_pesquisar")

btn_change.addEventListener("click", (event) => {
    event.preventDefault();
    let pesquisa = document.querySelector("#pesquisa");
    let artista = pesquisa.value;
    let middle = document.querySelector("#middle");
    middle.innerHTML = "Pesquisando...";

    pesquisar(artista)
        .then((data) => {
            middle.innerHTML = "";
            data.data.map((data) => {
                let div = document.createElement('div');

                // Audio
                const audio = document.createElement('audio');
                audio.src = data.preview;
                audio.controls = true;
                
                div.appendChild(audio)

                // Musica clicavel
                const anchor = document.createElement('a');
                anchor.href = data.link;
                anchor.textContent = data.title;
                anchor.target = '_blank';
                div.appendChild(anchor);

                // Capa do Album 
                const imgcover = document.createElement('img');
                imgcover.src = data.album.cover_medium;
                imgcover.setAttribute("class", "imgcover");

                const linkimg = document.createElement('a');
                linkimg.href = '';
                linkimg.appendChild(imgcover);
                linkimg.setAttribute("class", "linkimg");
                div.appendChild(linkimg);


                middle.appendChild(div);
            })
        })
        .catch(error => console.error('Error:', error));

});

async function pesquisar(what) {
    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${what}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0126eb60cdmshc0e086d4398dfe2p1633a5jsne140e7bfea3d',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const res = await response.json();
        console.log(res);
        return (res);
    } catch (error) {
        console.error(error);
    }
}

