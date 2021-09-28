//-------------VARIABLES-------------------
const comicClass = "comics";
const characterClass = "characters";
const results = document.createElement('div');
const containerElement = document.createElement('div');
const tittleResult= document.createElement('h2');
const resultNumber = document.createElement('p');

//---------------------------------------
formSearch.addEventListener('submit', ()=>{
	getFormInfo(event, "index.html?");
});

//----------- CREATE CARD -------------

results.classList.add('results-container');
containerElement.classList.add('img-item');
tittleResult.innerHTML= "Resultados";
resultNumber.classList.add('style-result-number');

const createCard = (list : DataContainer , classCont, resultsList)=>{

    results.appendChild(tittleResult);
    results.appendChild(containerElement);
    results.appendChild(resultNumber);

    if(resultsList.length==0){
        results.appendChild(noResuls)
    }

    for(const item of resultsList){
        let detail=item.id;
        params.set('info', detail);
        params.set('page', "1");
        
            contentHTML += `
            <div class=${classCont}>
                <a href="./pages/info.html?${params.toString()}">
                    <img src="${item.thumbnail.path}.${item.thumbnail.extension}" alt="${item.name || item.title}">
                    <h3>${item["name"] || item["title"]}</h3>
                    </a>
            </div>
            ` 
    };
    const pagesTotal= getNumberPages(list.total, list.limit);

    resultNumber.innerHTML = `${list.total} RESULTADOS`;
    containerElement.innerHTML = contentHTML;
    results.appendChild(containerElement);
    createButtons(pagesTotal, results, "./index.html?");
    main.appendChild(results);
};

//-------------SEARCH FILTERS-----------------

const updateResults = (results) =>{
    const type = params.get('type');
    let filtersAppy=[];

    if(type=="comics"){
        filtersAppy= results.filter(Element =>Element.characters);
    }else{
        filtersAppy= results.filter(Element =>Element.comics);
    }
    return filtersAppy
}

//-------------GET COMICS AND CHARACTERS FROM MARVEL API-------

let offset= (pageClicked) ? Number(pageClicked) *20-20 : 0;
const typeData= (params.get("type")) ? (params.get("type")): "comics";
const orderData=(params.get("order"))
const toSearch=encodeURIComponent(params.get('wordToSearch'));

//-------------------GET URL --------------------------------

const getURL = () =>{
    let url="";
    
    if(params.get("type")==null){
        url = `${baseUrl}${typeData}?orderBy=title&ts=1&apikey=${apiKey}&hash=${hash}&offset=${offset}`;

    } else if(typeData=="comics" && toSearch!==""){
        url=  `${baseUrl}${typeData}?titleStartsWith=${toSearch}&orderBy=${orderData}&ts=1&apikey=${apiKey}&hash=${hash}&offset=${offset}`;
        
    } else if(toSearch==""){
        url=  `${baseUrl}${typeData}?orderBy=${orderData}&ts=1&apikey=${apiKey}&hash=${hash}&offset=${offset}`;
        
    }else if(typeData=="characters" && toSearch!==""){
        url=  `${baseUrl}${typeData}?nameStartsWith=${toSearch}&orderBy=${orderData}&ts=1&apikey=${apiKey}&hash=${hash}&offset=${offset}`;
    }
    return url;
}

const urlToUse= getURL();

//-------------GET MARVEL SELECTION: COMICS OR CHARACTERS---------------

const getMarvelSection = async(url, className)=>{ 
    try{
        const response = await fetch(url);
        const items = await response.json();

        const listItems= items.data;
        const resultsItems= listItems.results;
        const array = updateResults(resultsItems).length!==0? updateResults(resultsItems): resultsItems;
        
        for(const item of array){
            if(item.thumbnail.path== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'){
                item.thumbnail.path='./assets/images/clean'
            }
        }
        createCard(items.data, className, array);
        getNumberPages(items.data.total, items.data.limit);
    
    }
    catch(err){
        alert("La API esta fuera de servicio"); 
    };
};

getMarvelSection(urlToUse, typeData);

main.appendChild(goBack);



