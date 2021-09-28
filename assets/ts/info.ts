let offsetToInfo= (pageClicked) ? Number(pageClicked) *20-20 : 0;


formSearch.addEventListener('submit', ()=>{
	getFormInfo(event, "../index.html?");
});

//------------------VARIABLES-------------------------

let info= encodeURIComponent(params.get('info'));
let type= (params.get("type")) ? (params.get("type")): "comics"
let toSearchInfo = params.get('wordToSearch');
const containerAllInfo= document.createElement('div');
const containerInfo = document.createElement('div');
const imgInfo = document.createElement('img');
const title= document.createElement('h3');
const titleDescription= document.createElement('h4');
const description= document.createElement('p');
let urlAssociated="";
const containerInfoAssociated = document.createElement('div');
const containerInfoPlusPages= document.createElement('div');
const containerPagination= document.createElement('div');
const totalResultTitle= document.createElement('h2');
const numberOfResult = document.createElement('p');

containerAllInfo.classList.add('container-all-info');
containerInfo.classList.add('container-info');
titleDescription.appendChild(document.createTextNode("Descripción:"));
containerInfoAssociated.classList.add('container-info-associated');
containerInfoPlusPages.classList.add('container-info-plus-pages')
totalResultTitle.innerHTML=(type=="comics")? "Personajes": "Comics";
numberOfResult.classList.add('style-result-number');

//------------------INFO ASSOCIATED-------------------------

const infoAssociated = (data)=>{

    const results= (type=="comics")?data[0].characters: data[0].comics;
    const array= results.collectionURI.split('/');
    array[0]="https:";
    const urlFinal=array.toString();
    urlAssociated=  `${urlFinal.replaceAll(',' ,'/')}?ts=1&apikey=${apiKey}&hash=${hash}&offset=0`;
    return urlAssociated;
};

const infoAsso = (data)=>{

    const kind= (type=="comics")? "characters": "comics";
    const results= (type=="comics")?data[0].characters.items: data[0].comics.items;
    let arrayReults=[];
    for(let item of results){

        const array= item.resourceURI.split('/');
        const urlAssociatedId= `https://gateway.marvel.com:443/v1/public/${kind}/${array[array.length-1]}/${type}?`;
        urlAssociated=  `${urlAssociatedId}&ts=1&apikey=${apiKey}&hash=${hash}&offset=0`;
        arrayReults.push(urlAssociated)
    }
    return arrayReults;

};

//------------------CREATE CARD INFO ASSOCIATED-------------------------

const createCardInfoAssociated =(data, results)=>{

    if(results.length==0){
        main.appendChild(noResuls)
    }
    const classInfo = (type=="comics")? "characters": "comics";

    for(const item of results){
        let id= item.id;
        
        params.set('page', "1");
        params.set('info', id);
        params.set('type', classInfo);

        let urlItem = item.urls[0].url;
        contentHTML+=`
                    <div class="${classInfo}">
                        <a href="./info.html?${params.toString()}">
                            <img src="${item.thumbnail.path}.${item.thumbnail.extension}" alt="${item.name || item.title}">
                            <h3>${item["name"] || item["title"]}</h3>
                        </a>
                    </div>
        `
    }
    const pagesTotal= getNumberPages(data.total, data.limit);

    numberOfResult.innerHTML=`${data.total} RESULTADOS`;
    containerInfoAssociated.innerHTML=contentHTML;
    containerInfoPlusPages.appendChild(containerInfoAssociated);
    containerInfoPlusPages.appendChild(containerPagination);
    main.appendChild(containerInfoPlusPages);

    createButtons (pagesTotal, containerPagination, "./info.html?")
};

//------------------CREATE CARD INFO COMICS-------------------------

const createComicCard = (data)=>{
    title.innerHTML=data[0].title;

    const titlePublicationDate= document.createElement('h4');
    titlePublicationDate.appendChild(document.createTextNode("Publicado:"));
    const PublicationDate= document.createElement('p');
    
    let dateString= new Date(data[0].modified);
    let dateFinal= ("0" + dateString.getDate()).slice(-2) + "-" + ("0"+(dateString.getMonth()+1)).slice(-2) + "-" +
    dateString.getFullYear();
    PublicationDate.innerHTML=dateFinal;

    const titleScreenwriter= document.createElement('h4');
    titleScreenwriter.appendChild(document.createTextNode("Guionistas:"));
    const screenwrite= document.createElement('p');

    let arrayCreators= data[0].creators.items
    for(let item of arrayCreators){
        if(item.role=="writer"){
            screenwrite.innerHTML=item.name
        }
    }

    description.innerHTML=data[0].description;

    containerInfo.appendChild(title);
    containerInfo.appendChild(titlePublicationDate);
    containerInfo.appendChild(PublicationDate);
    containerInfo.appendChild(titleScreenwriter);
    containerInfo.appendChild(screenwrite);
};

//------------------CREATE CARD INFO -------------------------

const createInfoCard = (data)=>{
    
    const srcInfo=`${data[0].thumbnail.path}.${data[0].thumbnail.extension}`
    imgInfo.setAttribute('src', srcInfo);
    if(type=="comics"){
        createComicCard(data);
    }else{
        title.innerHTML=data[0].name;
        description.innerHTML=data[0].description;
        containerInfo.appendChild(title);
    }
    containerInfo.appendChild(titleDescription);
    containerInfo.appendChild(description);

    containerAllInfo.appendChild(imgInfo);
    containerInfo.appendChild(goBack);
    containerAllInfo.appendChild(containerInfo);
    main.appendChild(containerAllInfo);
    main.appendChild(totalResultTitle);
    main.appendChild(numberOfResult);
};

//------------------GET URL-------------------------

const getURLInfo = () =>{
    
    let url="";
    if(type=="comics"){
        url=  `${baseUrl}${type}/${info}?title=${toSearchInfo}&ts=1&apikey=${apiKey}&hash=${hash}&offset=0`;
    } else if(type=="characters"){
        url=  `${baseUrl}${type}/${info}?name=${toSearchInfo}&ts=1&apikey=${apiKey}&hash=${hash}&offset=0`;
    }
    return url;
};

const urlToUseInfo= getURLInfo();

//---------------GET INFO ASSOCISTED FROM API MARVEL-------------

const getInfoAssociated = async(url)=>{

    try{
        const response = await fetch(url);
    const items = await response.json();
    const listItems= items.data;
    const resultsItems= listItems.results;

    for(const item of resultsItems){
        if(item.thumbnail.path== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'){
            item.thumbnail.path='../assets/images/clean'
        }
    }

    createCardInfoAssociated(listItems,resultsItems);
    }
    catch(err){
        alert("La API esta fuera de servicio"); 
    };
};

//---------------GET INFO FROM API MARVEL-------------

const getMarvelInfo = async(url)=>{

    try{
        const response = await fetch(url);
        const items = await response.json();
        const listItems= items.data;
        const resultsItems= listItems.results;

        for(const item of resultsItems){
            if(item.thumbnail.path== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'){
                item.thumbnail.path='../assets/images/clean'
            }
        };

        createInfoCard(resultsItems);
        infoAssociated(resultsItems);
        const infoResults= infoAssociated(resultsItems);

        let newURL= infoResults.split('&');
        newURL.length=newURL.length-1;
        let joinURL=newURL.toString();
        let finalURL= joinURL.replaceAll(',' ,'&')

        let URLModified= finalURL+`&offset=${offsetToInfo}`;
        getInfoAssociated(URLModified);
    }
    catch(err){
        alert("La API esta fuera de servicio"); 
    };

};

getMarvelInfo(urlToUseInfo);

