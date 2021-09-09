//Estos son los contenedores de comic & personajes
const resultsComics = document.createElement('div');
const resultsCharacters = document.createElement('div');

// Estas son las cards

const containerElementComic = document.createElement('div');
containerElementComic.classList.add('img-comic');

resultsComics.appendChild(containerElementComic);
let contenComictHTML = '';
let contenCharactertHTML = '';

const containerElementCharacter = document.createElement('div');
containerElementCharacter.classList.add('img-characters');

const tittleResultComic= document.createElement('h2');
tittleResultComic.innerHTML= "Resultados";
resultsComics.appendChild(tittleResultComic);

const tittleResultCharacter= document.createElement('h2');
tittleResultCharacter.innerHTML= "Resultados";
resultsCharacters.appendChild(tittleResultCharacter);

const resultNumberComic = document.createElement('p');
const resultNumberCharacter = document.createElement('p');
resultNumberComic.classList.add('style-result-number');
resultNumberCharacter.classList.add('style-result-number');


const comicClass = "container-comic";
const characterClass = "container-character";


resultsComics.appendChild(resultNumberComic);
resultsCharacters.appendChild(resultNumberCharacter);

const titleComic= "title";
const nameCharacter= "name";




const createCard = (comicList :ComicList , results, containerElement, classCont, contentHTML, resultNumber, textBelow)=>{

    for(const hero of comicList.results){
        
        let urlHero = hero.urls[0].url;

        if (hero.thumbnail.path== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'){
            contentHTML += `
            <div class="${classCont}">
                <a href="${urlHero }">
                    <img src="./assets/images/clean.jpeg" alt="${hero.name}" class="img-thumbnail">
                    <h3>${hero[textBelow]}</h3>
                </a>
            </div>
        ` 
        }else{
            contentHTML += `
            <div class=${classCont}>
                <a href="${urlHero }">
                    <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" class="img-thumbnail">
                    <h3>${hero[textBelow]}</h3>
                    </a>
            </div>
        ` 
        }
        resultNumber.innerHTML = `${comicList.total} RESULTADOS`;
        containerElement.innerHTML = contentHTML;
        results.appendChild(containerElement);
        main.appendChild(results);
    }
}


fetch(url1)
.then(res => res.json())
.then((json)=>{
    console.log(json.data, 'COMICS')
    createCard(json.data, resultsComics, containerElementComic, comicClass, contenComictHTML, resultNumberComic, titleComic);
    
});

fetch(url2)
.then(res => res.json())
.then((json)=>{
    console.log(json.data, 'PERSONAJES')
    createCard(json.data, resultsCharacters, containerElementCharacter, characterClass, contenCharactertHTML, resultNumberCharacter, nameCharacter);
});

