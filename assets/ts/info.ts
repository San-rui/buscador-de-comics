
const url3: string = `${baseUrl}?ts=1&apikey=${apiKey}&hash=${hash}&offset=0`;
const url4: string = `${baseUrl}?ts=1&apikey=${apiKey}&hash=${hash}&offset=0`;

const params3 = new URLSearchParams(window.location.search)
let info= encodeURIComponent(params3.get('info'));
let type= (params3.get("type")) ? (params3.get("type")): "comics"
let toSearchInfo = params3.get('wordToSearch');


console.log(info)
console.log(type)

//------------------CREATE CARD INFO-------------------------
const containerAllInfo= document.createElement('div');
containerAllInfo.classList.add('container-all-info');

const containerInfo = document.createElement('div');
containerInfo.classList.add('container-info');

const imgInfo = document.createElement('img');
const title= document.createElement('h3');
const titleDescription= document.createElement('h4');
titleDescription.appendChild(document.createTextNode("Descripción:"));
const description= document.createElement('p');

const createComicCard = (data)=>{
    title.innerHTML=data[0].title;

    const titlePublicationDate= document.createElement('h4');
    titlePublicationDate.appendChild(document.createTextNode("Publicado:"));
    const PublicationDate= document.createElement('p');
    PublicationDate.innerHTML=data[0].modified;

    const titleScreenwriter= document.createElement('h4');
    titleScreenwriter.appendChild(document.createTextNode("Guionistas:"));
    const screenwrite= document.createElement('p');

    if(data[0].creators.items){
        console.log(data[0].creators.items)
    }
    
    //screenwrite.innerHTML=data[0].creators


    description.innerHTML=data[0].description;

    containerInfo.appendChild(title);
    
    containerInfo.appendChild(titlePublicationDate);
    containerInfo.appendChild(PublicationDate);

    containerInfo.appendChild(titleScreenwriter);
    containerInfo.appendChild(screenwrite);
}

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

//---------------GET INFO FROM API MARVEL-------------

const getMarvelInfo = async(url)=>{
    const response = await fetch(url);
    const items = await response.json();

    const listItems= items.data;
    const resultsItems= listItems.results;

    //console.log("result",resultsItems[0].creators.items[1].name)

    for(const item of resultsItems){
        if(item.thumbnail.path== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'){
            item.thumbnail.path='../assets/images/clean'
        }
    }

    createInfoCard(resultsItems)

}

getMarvelInfo(urlToUseInfo);

