const containerElement = document.createElement('div');
containerElement.classList.add('img-style');
main.appendChild(containerElement);
let contentHTML = '';


fetch(url)
.then(res => res.json())
.then((json)=>{
    console.log(json.data, 'REST.JSON')
    json.limit=40;
    for(const hero of json.data.results){
        let urlHero = hero.urls[0].url;
        contentHTML += `
            <div class="prueba">
                <a href="${urlHero }">
                    <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" class="img-thumbnail">
                </a>
            </div>
        ` 
        containerElement.innerHTML = contentHTML;
        main.appendChild(containerElement);
    }
    
})