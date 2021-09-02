var containerElement = document.createElement('div');
containerElement.classList.add('img-style');
main.appendChild(containerElement);
var contentHTML = '';
fetch(url)
    .then(function (res) { return res.json(); })
    .then(function (json) {
        console.log(json)
    console.log(json.data, 'REST.JSON');
    
    for (var _i = 0, _a = json.data.results; _i < _a.length; _i++) {
        var hero = _a[_i];
        var urlHero = hero.urls[0].url;
        contentHTML += "\n            <div class=\"prueba\">\n                <a href=\"" + urlHero + "\">\n                    <img src=\"" + hero.thumbnail.path + "." + hero.thumbnail.extension + "\" alt=\"" + hero.name + "\" class=\"img-thumbnail\">\n                </a>\n            </div>\n        ";
        containerElement.innerHTML = contentHTML;
        main.appendChild(containerElement);
    }
});
