const results = document.createElement('div');
const containerElement = document.createElement('div');
containerElement.classList.add('img-style');
main.appendChild(containerElement);
let contentHTML = '';

const tittleResult= document.createElement('h2');
tittleResult.innerHTML= "Resultados";
results.appendChild(tittleResult);

const resultNumber = document.createElement('p');
resultNumber.classList.add('style-result-number')

results.appendChild(resultNumber);



const createCard = (comicList :ComicList )=>{

    for(const hero of comicList.results){
        
        let urlHero = hero.urls[0].url;

        if (hero.thumbnail.path== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'){
            contentHTML += `
            <div class="container-comic">
                <a href="${urlHero }">
                    <img src="./assets/images/clean.jpeg" alt="${hero.name}" class="img-thumbnail">
                </a>
            </div>
        ` 
        }else{
            contentHTML += `
            <div class="container-comic">
                <a href="${urlHero }">
                    <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" class="img-thumbnail">
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


fetch(url)
.then(res => res.json())
.then((json)=>{
    console.log(json.data, 'REST.JSON')
    createCard(json.data)
    
})