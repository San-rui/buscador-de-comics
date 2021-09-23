// //-------------------GET NUMBER OF PAGES---------------

// const getNumberPages = (total, limitPerPage)=>{
//     let pages=0;
//     return pages = Math.ceil(total/ limitPerPage);
// };

// //------------- PAGINATION-----------------------

// let params= new URLSearchParams(window.location.search);
// let pageClicked = Number(params.get("page"));

// let previousPage;
// let nextPage;

// const createButtons =(pagesNumber, container)=>{

//     let count = 0;
//     let arrayPageNumber =[];
//     let auxArray= (pageClicked>5)? [pageClicked -4, pageClicked -3, pageClicked -2, pageClicked -1, pageClicked]:  [1,2,3,4,5] ;

//     const containerPages= document.createElement('div');
//     containerPages.classList.add('container-pages');

//     const listUl = document.createElement('ul');
//     previousPage= document.createElement('a');
//     previousPage.innerHTML="Página anterior";
//     nextPage= document.createElement('a');
//     nextPage.innerHTML="Página Siguiente";
//     previousPage.classList.add('page-next-previous');
//     nextPage.classList.add('page-next-previous');

//     containerPages.appendChild(previousPage);

//     for (let i=0; i < pagesNumber; i++){
//         count ++
//         arrayPageNumber.push(count);
//     };

//     for(const page of auxArray){

//         //---SET QUERY PARAMS PREVIOUS AND NEXT BUTTON-----
//         (!pageClicked || pageClicked==1)? previousPage.classList.add('hidden') : previousPage.setAttribute('href',  `./index.html?page=${pageClicked-1}&wordTosearch=${params.get('wordToSearch')}&orderBy=${params.get('order')}`);
//         (pageClicked==arrayPageNumber.length)? nextPage.classList.add('hidden') :nextPage.setAttribute('href',  `./index.html?page=${pageClicked+1}&wordTosearch=${params.get('wordToSearch')}&orderBy=${params.get('order')}`);

//         //---CREATE LIST OF ANCHORS-----
//         const itemList= document.createElement('li');
//         itemList.classList.add('pagination-number');
//         const pageNumner = document.createElement('a');
//         pageNumner.setAttribute('id', `${page}`);
//         itemList.appendChild(pageNumner);
//         pageNumner.innerHTML=`${page}`;

//         if(Number(pageNumner.innerHTML)==pageClicked || !pageClicked && Number(pageNumner.innerHTML) == 1){
//             itemList.classList.add('clicked-number');
//         };
//         //---SET QUERY PARAMS TO NUMBER BUTTONS-----
//         params.set('page', pageNumner.id);
//         pageNumner.setAttribute('href', `./index.html?${params.toString()}`);
        
//         //---SET ITEMS INTO CONTAINER-----
//         listUl.appendChild(itemList);
//         containerPages.appendChild(listUl);
//         containerPages.appendChild(nextPage);
//         container.appendChild(containerPages);
        
//     };
// };

let paramsInfo= new URLSearchParams(window.location.search);

//----------- CREATE CARD -------------

const comicClass = "comics";
const characterClass = "characters";

const createCard = (list : DataContainer , classCont, resultss)=>{

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

    let name=(classCont=="comics")? "title":"name";

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

	const searchData={
		wordToSearch: form.addSearch.value,
		type: form.type.value,
		order: form.order.value,
	};

    params.set('wordToSearch', searchData.wordToSearch);
    params.set('type', searchData.type);
    params.set('order', searchData.order);
    window.location.href='index.html?'+params.toString();
    
};

formSearch.addEventListener('submit', getFormInfo);

console.log("Params",params.toString())


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
console.log("tosearch", params.get('wordToSearch'))

//-------------------GET URL --------------------------------

const getURL = () =>{
    let url="";
    
    if(params.get("type")==null){
        url = `${baseUrl}${typeData}?orderBy=title&ts=1&apikey=${apiKey}&hash=${hash}&offset=${offset}`;
        console.log("URL:",url)
    } else if(typeData=="comics" && toSearch!==""){
        url=  `${baseUrl}${typeData}?title=${toSearch}&orderBy=${orderData}&ts=1&apikey=${apiKey}&hash=${hash}&offset=${offset}`;
        console.log("URL:",url)
    } else if(typeData=="comics" && toSearch==""){
        url=  `${baseUrl}${typeData}?orderBy=${orderData}&ts=1&apikey=${apiKey}&hash=${hash}&offset=${offset}`;
        console.log("URL:",url)
    }else if(typeData=="characters" && toSearch!==""){
        url=  `${baseUrl}${typeData}?name=${toSearch}&orderBy=${orderData}&ts=1&apikey=${apiKey}&hash=${hash}&offset=${offset}`;
        console.log("URL:",url)
    }else if(typeData=="characters" && toSearch==""){
        url=  `${baseUrl}${typeData}?orderBy=${orderData}&ts=1&apikey=${apiKey}&hash=${hash}&offset=${offset}`;
        console.log("URL:",url)
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



