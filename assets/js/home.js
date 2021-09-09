//Estos son los contenedores de comic & personajes
var resultsComics = document.createElement('div');
var resultsCharacters = document.createElement('div');
// Estas son las cards
var containerElementComic = document.createElement('div');
containerElementComic.classList.add('img-comic');
resultsComics.appendChild(containerElementComic);
var contenComictHTML = '';
var contenCharactertHTML = '';
var containerElementCharacter = document.createElement('div');
containerElementCharacter.classList.add('img-characters');
var tittleResultComic = document.createElement('h2');
tittleResultComic.innerHTML = "Resultados";
resultsComics.appendChild(tittleResultComic);
var tittleResultCharacter = document.createElement('h2');
tittleResultCharacter.innerHTML = "Resultados";
resultsCharacters.appendChild(tittleResultCharacter);
var resultNumberComic = document.createElement('p');
var resultNumberCharacter = document.createElement('p');
resultNumberComic.classList.add('style-result-number');
resultNumberCharacter.classList.add('style-result-number');
var comicClass = "container-comic";
var characterClass = "container-character";
resultsComics.appendChild(resultNumberComic);
resultsCharacters.appendChild(resultNumberCharacter);
var titleComic = "title";
var nameCharacter = "name";
var createCard = function (comicList, results, containerElement, classCont, contentHTML, resultNumber, textBelow) {
    for (var _i = 0, _a = comicList.results; _i < _a.length; _i++) {
        var hero = _a[_i];
        var urlHero = hero.urls[0].url;
        if (hero.thumbnail.path == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available') {
            contentHTML += "\n            <div class=\"" + classCont + "\">\n                <a href=\"" + urlHero + "\">\n                    <img src=\"./assets/images/clean.jpeg\" alt=\"" + hero.name + "\" class=\"img-thumbnail\">\n                    <h3>" + hero[textBelow] + "</h3>\n                </a>\n            </div>\n        ";
        }
        else {
            contentHTML += "\n            <div class=" + classCont + ">\n                <a href=\"" + urlHero + "\">\n                    <img src=\"" + hero.thumbnail.path + "." + hero.thumbnail.extension + "\" alt=\"" + hero.name + "\" class=\"img-thumbnail\">\n                    <h3>" + hero[textBelow] + "</h3>\n                    </a>\n            </div>\n        ";
        }
        resultNumber.innerHTML = comicList.total + " RESULTADOS";
        containerElement.innerHTML = contentHTML;
        results.appendChild(containerElement);
        main.appendChild(results);
    }
};
fetch(url1)
    .then(function (res) { return res.json(); })
    .then(function (json) {
    console.log(json.data, 'COMICS');
    createCard(json.data, resultsComics, containerElementComic, comicClass, contenComictHTML, resultNumberComic, titleComic);
});
fetch(url2)
    .then(function (res) { return res.json(); })
    .then(function (json) {
    console.log(json.data, 'PERSONAJES');
    createCard(json.data, resultsCharacters, containerElementCharacter, characterClass, contenCharactertHTML, resultNumberCharacter, nameCharacter);
});
