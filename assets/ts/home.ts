let paramsInfo= new URLSearchParams(window.location.search);

//----------- CREATE CARD -------------

const comicClass = "comics";
const characterClass = "characters";

const results = document.createElement('div');
results.classList.add('results-container');
let contentHTML = '';
const containerElement = document.createElement('div');
containerElement.classList.add('img-item');
const tittleResult= document.createElement('h2');
tittleResult.innerHTML= "Resultados";
const resultNumber = document.createElement('p');
resultNumber.classList.add('style-result-number');

const createCard = (list : DataContainer , classCont, resultss)=>{

    results.appendChild(tittleResult);
    results.appendChild(containerElement);
    results.appendChild(resultNumber);

    for(const item of resultss){
        let detail=item.id;
        paramsInfo.set('info', detail);

        let urlItem = item.urls[0].url;
            contentHTML += `
            <div class=${classCont}>
                <a href="./pages/info.html?${paramsInfo.toString()}">
                    <img src="${item.thumbnail.path}.${item.thumbnail.extension}" alt="${item.name || item.title}" class="img-thumbnail">
                    <h3>${item["name"] || item["title"]}</h3>
                    </a>
            </div>
        ` 
    };

    const pagesTotal= getNumberPages(list.total, list.limit);

    resultNumber.innerHTML = `${list.total} RESULTADOS`;
    containerElement.innerHTML = contentHTML;
    results.appendChild(containerElement);
    createButtons(pagesTotal, results);
    main.appendChild(results);
};

//-----------SEARCH BY FILTERS------------

const getFormInfo = (event)=>{
    event.preventDefault();
    const form= event.target;
    params.set('wordToSearch', "");
    params.set('type', "");
    params.set('order', "");
    params.set('page', "");

    params.set('wordToSearch', form.addSearch.value);
    params.set('type', form.type.value);
    params.set('order', form.order.value);
    params.set('page', "1");
    window.location.href='index.html?'+params.toString();
};

formSearch.addEventListener('submit', getFormInfo);

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
        url=  `${baseUrl}${typeData}?title=${toSearch}&orderBy=${orderData}&ts=1&apikey=${apiKey}&hash=${hash}&offset=${offset}`;
        
    } else if(typeData=="comics" && toSearch==""){
        url=  `${baseUrl}${typeData}?orderBy=${orderData}&ts=1&apikey=${apiKey}&hash=${hash}&offset=${offset}`;
        
    }else if(typeData=="characters" && toSearch!==""){
        url=  `${baseUrl}${typeData}?name=${toSearch}&orderBy=${orderData}&ts=1&apikey=${apiKey}&hash=${hash}&offset=${offset}`;
        
    }else if(typeData=="characters" && toSearch==""){
        url=  `${baseUrl}${typeData}?orderBy=${orderData}&ts=1&apikey=${apiKey}&hash=${hash}&offset=${offset}`;
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



