var results = document.createElement('div');
var containerElement = document.createElement('div');
containerElement.classList.add('img-style');
main.appendChild(containerElement);
var contentHTML = '';
var tittleResult = document.createElement('h2');
tittleResult.innerHTML = "Resultados";
results.appendChild(tittleResult);
var resultNumber = document.createElement('p');
resultNumber.classList.add('style-result-number');
results.appendChild(resultNumber);
var createCard = function (comicList) {
    for (var _i = 0, _a = comicList.results; _i < _a.length; _i++) {
        var hero = _a[_i];
        var urlHero = hero.urls[0].url;
        if (hero.thumbnail.path == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available') {
            contentHTML += "\n            <div class=\"container-comic\">\n                <a href=\"" + urlHero + "\">\n                    <img src=\"./assets/images/clean.jpeg\" alt=\"" + hero.name + "\" class=\"img-thumbnail\">\n                </a>\n            </div>\n        ";
        }
        else {
            contentHTML += "\n            <div class=\"container-comic\">\n                <a href=\"" + urlHero + "\">\n                    <img src=\"" + hero.thumbnail.path + "." + hero.thumbnail.extension + "\" alt=\"" + hero.name + "\" class=\"img-thumbnail\">\n                </a>\n            </div>\n        ";
        }
        resultNumber.innerHTML = comicList.total + " RESULTADOS";
        containerElement.innerHTML = contentHTML;
        results.appendChild(containerElement);
        main.appendChild(results);
    }
};
fetch(url)
    .then(function (res) { return res.json(); })
    .then(function (json) {
    console.log(json.data, 'REST.JSON');
    createCard(json.data);
});
