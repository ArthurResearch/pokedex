const buscar = document.querySelector("#busca")
const nomeBusca = document.querySelector("#nome")
const botao = document.querySelector("#enviar")
const prox = document.querySelector("#prox")
const anterior = document.querySelector("#ant")
const random = document.querySelector('#aleatorio')

const nome = document.querySelector('#nomePokemon')
const id = document.querySelector('#idPokemon')
const imagem = document.querySelector('#card')
const tipo = document.querySelector('#tipos')
const altura = document.querySelector('#altura')
const peso = document.querySelector('#peso')

const hp = document.querySelector('#hp')
const atk = document.querySelector('#ataque')
const def = document.querySelector('#defesa')
const vel = document.querySelector('#velocidade')

const percentual1 = document.querySelector('#percent1')
const percentual2 = document.querySelector('#percent2')
const percentual3 = document.querySelector('#percent3')
const percentual4 = document.querySelector('#percent4')

let clicouImagem = false;

async function buscarPokemon(pokemon) {

    if (pokemon === "") {
        nome.innerText = "Insira um pokemon por favor";
        return;
    }

    try {
        const resposta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        );

        if (!resposta.ok) {
            nome.innerText = "Pokemon não encontrado";
            return;
        }

        const dados = await resposta.json();
        console.log("funcionou");
        return dados;

    } catch (erro) {
        nome.innerText = "Erro ao buscar Pokemon";
        console.error(erro);
    }
}

async function colocarDados(event, pokemon) {

    event.preventDefault();
    let dados = await buscarPokemon(pokemon);
    if (!dados) return;
    console.log(dados);
    nome.innerText = dados.name;
    id.innerText = dados.id;

    imagem.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dados.id}.png`;

    altura.innerText =
        (dados.height / 10).toFixed(1).replace(".", ",") + " m";

    peso.innerText =
        (dados.weight / 10).toFixed(1).replace(".", ",") + " kg";

    hp.innerText = "HP " + dados.stats[0].base_stat;
    atk.innerText = "Ataque " + dados.stats[1].base_stat;
    def.innerText = "Defesa " + dados.stats[2].base_stat;
    vel.innerText = "Velocidade " + dados.stats[5].base_stat;

    percentual1.style.width =
        (dados.stats[0].base_stat / 255 * 100) + "%";

    percentual2.style.width =
        (dados.stats[1].base_stat / 255 * 100) + "%";

    percentual3.style.width =
        (dados.stats[2].base_stat / 255 * 100) + "%";

    percentual4.style.width =
        (dados.stats[5].base_stat / 255 * 100) + "%";

    tipo.innerHTML = "";

    dados.types.forEach(tipoPokemon => {
        const span = document.createElement("span");
        span.textContent = tipoPokemon.type.name;
        tipo.appendChild(span);
    });
    imagem.style.cursor = "pointer";

}



botao.addEventListener("click", (event) => {
    let pokemon = nomeBusca.value;
    colocarDados(event, pokemon) 
});

buscar.addEventListener("submit", (event) => {
    let pokemon = nomeBusca.value;
    colocarDados(event, pokemon)
});

random.addEventListener("click", async (event)=>{
    let idAleatorio = Math.floor(Math.random() * 1025) + 1;;
    dados = await buscarPokemon(idAleatorio);
    colocarDados(event, idAleatorio);
})

prox.addEventListener("click", async (event) => {
    let pokemon = parseInt(id.textContent, 10);
    dados = await buscarPokemon(pokemon);
    if (Number.isNaN(pokemon)) {
        pokemon = 1;
    } else {
        pokemon = dados.id + 1
    }
    colocarDados(event, pokemon)
})

anterior.addEventListener("click", async (event) => {
    let pokemon = parseInt(id.textContent, 10);
    dados = await buscarPokemon(pokemon);
    pokemon = dados.id - 1
    colocarDados(event, pokemon)
})

imagem.addEventListener("click", async ()=>{
    let pokemon = nome.textContent
    dados = await buscarPokemon(pokemon)
    if(clicouImagem == false){
        imagem.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${dados.id}.png`;
        clicouImagem = true;
    } else {
        imagem.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dados.id}.png`;
        clicouImagem = false;
    }
})
