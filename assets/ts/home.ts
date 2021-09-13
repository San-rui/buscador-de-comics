//----------- CREATE CARD -------------

const comicClass = "container-comic";
const characterClass = "container-character";
const titleComic= "title";
const nameCharacter= "name";


const createCard = (list : DataContainer , classCont, textBelow)=>{

    const results = document.createElement('div');
    let contentHTML = '';
    const containerElement = document.createElement('div');
    containerElement.classList.add('img-item');
    const tittleResult= document.createElement('h2');
    tittleResult.innerHTML= "Resultados";
    const resultNumber = document.createElement('p');
    resultNumber.classList.add('style-result-number');

    results.appendChild(tittleResult);
    results.appendChild(containerElement);
    results.appendChild(resultNumber);

    for(const item of list.results){
        
        let urlItem = item.urls[0].url;
            contentHTML += `
            <div class=${classCont}>
                <a href="${urlItem }">
                    <img src="${item.thumbnail.path}.${item.thumbnail.extension}" alt="${item.name || item.title}" class="img-thumbnail">
                    <h3>${item[textBelow]}</h3>
                    </a>
            </div>
        ` 
    };

        resultNumber.innerHTML = `${list.total} RESULTADOS`;
        containerElement.innerHTML = contentHTML;
        results.appendChild(containerElement);
        main.appendChild(results);
}


//-------------------GET NUMBER OF PAGES---------------

const getNumberPages = (total, limitPerPage)=>{
    let pages=1;
    return pages = Math.ceil(total/ limitPerPage)
}
;

//-------------GET COMICS AND CHARACTERS FROM MARVEL API-------

const getMarvelSection = async(url, className, itemName)=>{
    const response = await fetch(url);
    const items = await response.json();

    const listCharacters= items.data;
    const resultsCharacters= listCharacters.results;

    for(const item of resultsCharacters){
        if(item.thumbnail.path== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'){
            item.thumbnail.path='./assets/images/clean'
        }
    }
    createCard(items.data, className, itemName);
    getNumberPages(items.data.total, items.data.limit);
    console.log("Numero de paginas" ,getNumberPages(items.data.total, items.data.limit))
    
}

getMarvelSection(url1, comicClass, titleComic);
getMarvelSection(url2, characterClass, nameCharacter);






