//-------------Header-------------
var createHeader = function () {
    var header = document.createElement('header');
    var mainTitle = document.createElement('h1');
    var headerImg = document.createElement('img');
    mainTitle.innerHTML = "ADA COMICS";
    headerImg.setAttribute('src', './assets/images/pngwing.com.png');
    header.classList.add('primary-header');
    header.appendChild(mainTitle);
    header.appendChild(headerImg);
    document.body.appendChild(header);
};
createHeader();
//-------------SEARCH BAR-------------
var controlsSearch = [
    {
        type: "text",
        name: "addSearch",
        id: "addSearch"
    },
    {
        type: "select",
        name: "Tipo",
        id: "type",
        options: [
            {
                id: "comic",
                name: "COMIC"
            },
            {
                id: "personajes",
                name: "PERSONAJES"
            },
        ]
    },
    {
        type: "select",
        name: "Orden",
        id: "order",
        options: [
            {
                id: "a-z",
                name: "A-Z"
            },
            {
                id: "z-a",
                name: "Z-A"
            },
            {
                id: "mas-nuevos",
                name: "Más nuevos"
            },
            {
                id: "mas-viejos",
                name: "Más viejos"
            },
        ]
    },
];
var container = document.createElement('div');
var main = document.createElement('main');
var formSearch = document.createElement("form");
var searchContainerGeneral = document.createElement('div');
var placeHolderText = "Ingresa tu búsqueda";
var icon = document.createElement('i');
var tittleSearch = document.createElement('h2');
var inputContainer = document.createElement('div');
var selectContainer = document.createElement('div');
var button = document.createElement("button");
button.type = "submit";
button.appendChild(document.createTextNode("Buscar"));
main.classList.add('container');
container.appendChild(main);
searchContainerGeneral.classList.add('search-container-general');
formSearch.classList.add('form-search');
icon.classList.add("fas", "fa-search", 'fa-lg');
tittleSearch.appendChild(document.createTextNode("Búsqueda"));
inputContainer.classList.add('input-container');
selectContainer.classList.add('select-container');
var makeForm = function (form, ctrls, parent, containerSearch) {
    for (var _i = 0, ctrls_1 = ctrls; _i < ctrls_1.length; _i++) {
        var control = ctrls_1[_i];
        var elem = void 0;
        if (control.type === "select") {
            var labelselect = document.createElement('label');
            labelselect.appendChild(document.createTextNode(control.name));
            selectContainer.appendChild(labelselect);
        }
        switch (control.type) {
            case "select":
                elem = document.createElement("select");
                for (var _a = 0, _b = control.options; _a < _b.length; _a++) {
                    var option = _b[_a];
                    var op = document.createElement("option");
                    elem.appendChild(op);
                    op.value = option.id.toString();
                    op.appendChild(document.createTextNode(option.name));
                    selectContainer.appendChild(elem);
                }
                break;
            default:
                elem = document.createElement("input");
                elem.type = control.type;
                elem.placeholder = placeHolderText;
                inputContainer.appendChild(icon);
                inputContainer.appendChild(elem);
                break;
        }
    }
    selectContainer.appendChild(button);
    form.appendChild(inputContainer);
    form.appendChild(selectContainer);
    containerSearch.appendChild(tittleSearch);
    containerSearch.appendChild(form);
    parent.appendChild(containerSearch);
    document.body.appendChild(parent);
};
makeForm(formSearch, controlsSearch, main, searchContainerGeneral);
//-----------------API COMICS---------------
var baseUrl = "https://gateway.marvel.com:443/v1/public/comics";
var apiKey = "b7ce8a4b69bf121a9d6e0b3caa7da4dc";
var hash = "bca60ca0198d3e720005add814760dde";
var url = baseUrl + "?ts=1&apikey=" + apiKey + "&hash=" + hash + "&offset=5";
