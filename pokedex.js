let results = [];
let ol$ = document.querySelector('#pokedex');

const getCharacter = async () => {
    for (let i = 1; i < 151; i++) {
        let url = 'https://pokeapi.co/api/v2/pokemon/' + i;
        let response = await fetch(url);
        let data = await response.json();
        results.push(data);
    }
    return results;
};

const mapCharacters = (getCharacterSinMapear) => {
    return getCharacterSinMapear.map((result) => ({
        name: result.name,
        image: result.sprites['front_default'],
        type: result.types.map((type) => type.type.name).join(', '),
        id: result.id
    }));
};

const pintCharacters = (charactersMapped) => {
    for (const character of charactersMapped) {
        let pokeDiv$ = document.createElement('div');
        pokeDiv$.className = 'divPokemon';
        ol$.appendChild(pokeDiv$);

        let imagePoke = document.createElement('img');
        imagePoke.setAttribute('src', character.image);
        imagePoke.setAttribute('alt', character.name);
        pokeDiv$.appendChild(imagePoke);

        let h2Poke$ = document.createElement('h2');
        h2Poke$.textContent = character.name;
        pokeDiv$.appendChild(h2Poke$);

        let pPoke$ = document.createElement('p');
        pPoke$.textContent = character.type;
        pokeDiv$.appendChild(pPoke$);
    }
};

const pintInput = (charactersMapped) => {
    const input$ = document.querySelector('.inputPoke');
    input$.addEventListener('input', () => searchName(charactersMapped, input$.value));
};

const searchName = (array, filter) => {
    const filteredCharacters = array.filter(character =>
        character.name.toLowerCase().includes(filter.toLowerCase())
    );
    ol$.innerHTML = '';
    pintCharacters(filteredCharacters);
};

const init = async () => {
    const getCharacterSinMapear = await getCharacter();
   
    const charactersMapped = mapCharacters(getCharacterSinMapear);
    const pintCharactersInit = pintCharacters(charactersMapped);
    pintCharacters(charactersMapped);
    pintInput(charactersMapped);
};

init();


  