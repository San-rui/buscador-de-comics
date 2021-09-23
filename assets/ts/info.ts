//------------------VARIABLES-------------------------

const url3: string = `${baseUrl}?ts=1&apikey=${apiKey}&hash=${hash}&offset=0`;
const url4: string = `${baseUrl}?ts=1&apikey=${apiKey}&hash=${hash}&offset=0`;

const params3 = new URLSearchParams(window.location.search)
let info= encodeURIComponent(params3.get('info'));
let type= (params3.get("type")) ? (params3.get("type")): "comics"
let toSearchInfo = params3.get('wordToSearch');

const containerAllInfo= document.createElement('div');
containerAllInfo.classList.add('container-all-info');

const containerInfo = document.createElement('div');
containerInfo.classList.add('container-info');

const imgInfo = document.createElement('img');
const title= document.createElement('h3');
const titleDescription= document.createElement('h4');
titleDescription.appendChild(document.createTextNode("Descripción:"));
const description= document.createElement('p');

let urlAssociated=""
const containerInfoAssociated = document.createElement('div');
containerInfoAssociated.classList.add('container-info-associated');

const containerInfoPlusPages= document.createElement('div');
containerInfoPlusPages.classList.add('container-info-plus-pages')
const containerPagination= document.createElement('div');




//------------------INFO ASSOCIATED-------------------------

const infoAssociated = (data)=>{

    const kind= (type=="comics")? "characters": "comics";
    const results= (type=="comics")?data[0].characters.items: data[0].comics.items;
    let arrayReults=[];

    for(let item of results){

        const array= item.resourceURI.split('/');
        const urlAssociatedId= `https://gateway.marvel.com:443/v1/public/${kind}/${array[array.length-1]}?`;
        urlAssociated=  `${urlAssociatedId}&ts=1&apikey=${apiKey}&hash=${hash}&offset=0`;
        arrayReults.push(urlAssociated)
    }
    return arrayReults;

};

//------------------CREATE CARD INFO ASSOCIATED-------------------------


const createCardInfoAssociated =(data)=>{
    let contentHTML = '';
    const containerInfo=document.createElement('div');
    const classInfo = (type=="comics")? "characters": "comics";

    const id= data[0].id;

    params3.set('info', id);
    params3.set('type', classInfo);

    contentHTML=`
                <div class="${classInfo}">
                    <a href="./info.html?${params3.toString()}">
                        <img src="${data[0].thumbnail.path}.${data[0].thumbnail.extension}" alt="${data[0].name || data[0].title}">
                        <h3>${data[0]["name"] || data[0]["title"]}</h3>
                    </a>
                </div>
    `

    containerInfo.innerHTML=contentHTML;
    containerInfoAssociated.appendChild(containerInfo);
    containerInfoPlusPages.appendChild(containerInfoAssociated);
    containerInfoPlusPages.appendChild(containerPagination);
    main.appendChild(containerInfoPlusPages);
};


//------------------CREATE CARD INFO COMICS-------------------------

const createComicCard = (data)=>{
    title.innerHTML=data[0].title;

    const titlePublicationDate= document.createElement('h4');
    titlePublicationDate.appendChild(document.createTextNode("Publicado:"));
    const PublicationDate= document.createElement('p');
    PublicationDate.innerHTML=data[0].modified;

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
}

const urlToUseInfo= getURLInfo();

//---------------GET INFO ASSOCISTED FROM API MARVEL-------------

const getInfoAssociated = async(url)=>{
    const response = await fetch(url);
    const items = await response.json();
    const listItems= items.data;
    const resultsItems= listItems.results;

    for(const item of resultsItems){
        if(item.thumbnail.path== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'){
            item.thumbnail.path='../assets/images/clean'
        }
    }

    createCardInfoAssociated(resultsItems);
};

//---------------GET INFO FROM API MARVEL-------------

const getMarvelInfo = async(url)=>{
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
    for(const item of infoResults){
        getInfoAssociated(item)
    };
    createButtons (infoResults.length, containerPagination)

}

getMarvelInfo(urlToUseInfo);


