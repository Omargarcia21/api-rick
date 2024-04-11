//  * Input de busqueda
const txtCharacter = document.getElementById('txt-character');
// * Contenedor de las cards
const containerCards = document.getElementById('containerCards');
// * creamos la variable de la URL de la api en modo global
const URL1 = "https://rickandmortyapi.com/api/character";
// * creamos otra variable de URL para filtrar los nombres y tener la busqueda deseada
const URL2 = "https://rickandmortyapi.com/api/character/?name=";
// * Función de flecha encargada de crear las cards, character el es parametro que escribimos en el input
const createCards = ( character ) => {
    // creamos un div
    const card = document.createElement('div');
    //le agregamos la clase 'card-character'
    card.classList.add('card-character');

    //Creamos una imagen que va dentro del div
    const imgCard = document.createElement('img');
    //Sacamos esa imagen del input(api).image(que es donde se encuentra)
    imgCard.src = character.image;
    //le damos la propiedad alt, que sacamos del input(api) que sera su nombre del personaje buscado
    imgCard.alt = character.name;

    //creamos otro div para la informacion del personaje 
    const containerDescription = document.createElement('div');
    //le agregamos la clase 'description-card'
    containerDescription.classList.add('description-card');

    //creamos un h2 para el nombre del personaje
    const nameCharacter = document.createElement('h2');
    //el nombre del personaje lo sacamos del valor del input y lo buscamos en la api
    nameCharacter.textContent = "Nombre : " + character.name;
    //creamos un p para el genero del personaje
    const genderCharacter = document.createElement('p');
    //el genero del personaje lo sacamos de la api con .gender
    genderCharacter.textContent ="Gender : " + character.gender;

    //decimos que card (el primer div) se le agrege la imgCard que es la imagen del personaje
    card.appendChild(imgCard);
    //al div "card" tambien se le agregara el containerDescription que es el segundo div
    card.appendChild(containerDescription);

    // al div containerDescription le agregamos un "h2" que es nameCharacter
    containerDescription.appendChild(nameCharacter);
    //y también le agregamos un "p" que es genderCharacter
    containerDescription.appendChild(genderCharacter);

    //containerCards lo agregamos al principio y es el contenedor que tiene al card
    containerCards.appendChild(card);
}
// creamos una funcion de flecha asincrona con un "URL"
const getApi = async (URL) => {
    //creamos la variable response que esperara al fetch que traera de la URL
    const response = await fetch(URL);
    //creamos otra variable para que espere a response y lo tenga en formato json
    const data = await response.json();
    //retornamos data(la variable creada para transformarla en json) que agarre el array de results
    return data.results;
}
// creamos la funcion asincrona para traes los caracteres del personaje 
const generateAllCharacteres = async () => {
    // creamos una variable que espera la respuesta de la funcion "getApi" conla "URL1" que declaramos al inicio
    const data = await getApi(URL1);
    //decimos que data (la variable) se mapee(busque) con el "objeto/character", y cree la card llamando la funcion createCard
    //createCards("aqui estara el personaje buscado en el input")
    data.map( character => createCards(character));
}
// creamos la funcion busqueda por nombre
const getCharacterByName = async ( event ) => {
    //decimos que todas las tarjetas que esten en el documento se limpien
    containerCards.innerHTML = "";
    // creamos una variable que esperara a la funcion getApi que agarrara la URL2 que es la busqueda por nombre
    //el evento tendra una propiedad target y esa misma tendra el value de ese objeto que le apliquen
    const data = await getApi(URL2 + event.target.value);
    //la varible data se mapeara/buscara con el character que le dimos y eso creara una car con la funcion createCards
    //pero solo con el character que pusimos
    data.map( character => createCards(character));
}

//Windows tendra un evento (DOM que sera cuando la pagina sea recargada/refresh traega la funcion de generateAllCharacteres)
window.addEventListener('DOMContentLoaded', generateAllCharacteres);
//la variable del input que declaramos le agregamos un evento, ques cuando soltamos una tecla, se ejecutara la función
//getCharacterByName
txtCharacter.addEventListener('keyup', getCharacterByName);

