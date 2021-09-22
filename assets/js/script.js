//-------------HEADER -------------
var createHeader = function () {
    var header = document.createElement('header');
    var mainTitle = document.createElement('h1');
    var headerImg = document.createElement('img');
    mainTitle.innerHTML = "ADA COMICS";
    headerImg.setAttribute('src', '../assets/images/pngwing.com.png');
    header.classList.add('primary-header');
    header.appendChild(mainTitle);
    header.appendChild(headerImg);
    document.body.appendChild(header);
};
createHeader();
//-------------SEARCH BAR-------------
var controlsSearch = [
    {
        type: "search",
        name: "addSearch",
        id: "addSearch"
    },
    {
        type: "select",
        name: "Tipo",
        id: "type",
        options: [
            {
                id: "comics",
                name: "COMIC",
                options: [
                    {
                        id: "title",
                        name: "A-Z"
                    },
                    {
                        id: "-title",
                        name: "Z-A"
                    },
                    {
                        id: "modified",
                        name: "Más nuevos"
                    },
                    {
                        id: "-modified",
                        name: "Más viejos"
                    },
                ]
            },
            {
                id: "characters",
                name: "PERSONAJES",
                options: [
                    {
                        id: "name",
                        name: "A-Z"
                    },
                    {
                        id: "-name",
                        name: "Z-A"
                    },
                ]
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
    var elem;
    var elemOrder;
    for (var _i = 0, ctrls_1 = ctrls; _i < ctrls_1.length; _i++) {
        var control = ctrls_1[_i];
        if (control.type === "select") {
            var labelselect = document.createElement('label');
            labelselect.appendChild(document.createTextNode(control.name));
            selectContainer.appendChild(labelselect);
        }
        switch (control.type) {
            case "select":
                if (control.type == "select" && control.options !== undefined) {
                    var labelselectOrder = document.createElement('label');
                    labelselectOrder.appendChild(document.createTextNode("ORDEN"));
                    elem = document.createElement("select");
                    elemOrder = document.createElement("select");
                    elemOrder.id = "order";
                    for (var _a = 0, _b = control.options; _a < _b.length; _a++) {
                        var cont = _b[_a];
                        var op = document.createElement("option");
                        op.value = cont.id.toString();
                        op.appendChild(document.createTextNode(cont.name));
                        elem.appendChild(op);
                        selectContainer.appendChild(elem);
                        selectContainer.appendChild(labelselectOrder);
                        selectContainer.appendChild(elemOrder);
                        var options = cont.options;
                        for (var _c = 0, options_1 = options; _c < options_1.length; _c++) {
                            var item = options_1[_c];
                            var op_1 = document.createElement("option");
                            op_1.value = item.id.toString();
                            op_1.appendChild(document.createTextNode(item.name));
                            elemOrder.appendChild(op_1);
                        }
                    }
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
        elem.name = control.name;
        elem.id = control.id;
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
var baseUrl = "https://gateway.marvel.com:443/v1/public/";
var apiKey = "b7ce8a4b69bf121a9d6e0b3caa7da4dc";
var hash = "bca60ca0198d3e720005add814760dde";
