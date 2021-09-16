//-------------------GET NUMBER OF PAGES---------------

const getNumberPages = (total, limitPerPage)=>{
    let pages=0;
    return pages = Math.ceil(total/ limitPerPage);
};

//------------- PAGINATION-----------------------

let params= new URLSearchParams(window.location.search);
let pageClicked = Number(params.get("page"));

let previousPage;
let nextPage;

const createButtons =(pagesNumber, container)=>{

    let count = 0;
    let arrayPageNumber =[];
    let auxArray= (pageClicked>5)? [pageClicked -4, pageClicked -3, pageClicked -2, pageClicked -1, pageClicked]:  [1,2,3,4,5] ;

    const containerPages= document.createElement('div');
    containerPages.classList.add('container-pages');

    const listUl = document.createElement('ul');
    previousPage= document.createElement('a');
    previousPage.innerHTML="Página anterior";
    nextPage= document.createElement('a');
    nextPage.innerHTML="Página Siguiente";
    previousPage.classList.add('page-next-previous');
    nextPage.classList.add('page-next-previous');

    containerPages.appendChild(previousPage);

    for (let i=0; i < pagesNumber; i++){
        count ++
        arrayPageNumber.push(count);
    };

    for(const page of auxArray){

        //---SET QUERY PARAMS PREVIOUS AND NEXT BUTTON-----
        (!pageClicked || pageClicked==1)? previousPage.classList.add('hidden') : previousPage.setAttribute('href',  `./index.html?page=${pageClicked-1}`);
        (pageClicked==arrayPageNumber.length)? nextPage.classList.add('hidden') :nextPage.setAttribute('href',  `./index.html?page=${pageClicked+1}`);

        //---CREATE LIST OF ANCHORS-----
        const itemList= document.createElement('li');
        itemList.classList.add('pagination-number');
        const pageNumner = document.createElement('a');
        pageNumner.setAttribute('id', `${page}`);
        itemList.appendChild(pageNumner);
        pageNumner.innerHTML=`${page}`;

        if(Number(pageNumner.innerHTML)==pageClicked || !pageClicked && Number(pageNumner.innerHTML) == 1){
            itemList.classList.add('clicked-number');
        };

        //---SET QUERY PARAMS TO NUMBER BUTTONS-----
        pageNumner.setAttribute('href', `./index.html?page=${pageNumner.id}`);
        
        //---SET ITEMS INTO CONTAINER-----
        listUl.appendChild(itemList);
        containerPages.appendChild(listUl);
        containerPages.appendChild(nextPage);
        container.appendChild(containerPages);
        
    };
};


//----------- CREATE CARD -------------

const comicClass = "comic";
const characterClass = "personajes";
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
                <a href="./pages/info.html">
                    <img src="${item.thumbnail.path}.${item.thumbnail.extension}" alt="${item.name || item.title}" class="img-thumbnail">
                    <h3>${item[textBelow]}</h3>
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

let params2 = new URLSearchParams(window.location.search);
let storage= getStorage();

const getFormInfo = (event)=>{
    event.preventDefault();
    const form= event.target;

	const searchData={
		wordToSearch: form.addSearch.value,
		type: form.type.value,
		order: form.order.value,
	};

    params2.set('wordToSearch', searchData.wordToSearch);
    params2.set('type', searchData.type);
    params2.set('order', searchData.order);
    window.location.href='index.html?'+params2.toString();
    return searchData;
};

formSearch.addEventListener('submit', getFormInfo);

//--------SET LOCAL STORAGE---------------

storage.wordToSearch=params2.get('wordToSearch');
storage.type= params2.get('type');
storage.order=params2.get('order');

localStorage.setItem('to-search-storage', JSON.stringify(storage));

//-------------GET COMICS AND CHARACTERS FROM MARVEL API-------

let offset= (pageClicked) ? Number(pageClicked) *20-20 : 0;

const url1: string = `${baseUrl1}?ts=1&apikey=${apiKey}&hash=${hash}&offset=${offset}`;
const url2: string = `${baseUrl2}?ts=1&apikey=${apiKey}&hash=${hash}&offset=${offset}`;

const getMarvelSection = async(url, className, itemName)=>{
    const response = await fetch(url);
    const items = await response.json();

    const listItems= items.data;
    const resultsItems= listItems.results;


        for(const item of resultsItems){
            if(item.thumbnail.path== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'){
                item.thumbnail.path='./assets/images/clean'
            }
        }
        createCard(items.data, className, itemName);
        getNumberPages(items.data.total, items.data.limit);
    

}

getMarvelSection(url1, comicClass, titleComic);
getMarvelSection(url2, characterClass, nameCharacter);








