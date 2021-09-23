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
var apiKey = "11b3c5b160d3bbe8c3663a93aedc5517";
var hash = "657308e35113f895458620b0b5ec9384";
//-------------------GET NUMBER OF PAGES---------------
var getNumberPages = function (total, limitPerPage) {
    var pages = 0;
    return pages = Math.ceil(total / limitPerPage);
};
//------------- PAGINATION-----------------------
var params = new URLSearchParams(window.location.search);
var pageClicked = Number(params.get("page"));
var previousPage;
var nextPage;
var createButtons = function (pagesNumber, container) {
    var count = 0;
    var arrayPageNumber = [];
    var auxArray = (pageClicked > 5) ? [pageClicked - 4, pageClicked - 3, pageClicked - 2, pageClicked - 1, pageClicked] : [1, 2, 3, 4, 5];
    var containerPages = document.createElement('div');
    containerPages.classList.add('container-pages');
    var listUl = document.createElement('ul');
    previousPage = document.createElement('a');
    previousPage.innerHTML = "Página anterior";
    nextPage = document.createElement('a');
    nextPage.innerHTML = "Página Siguiente";
    previousPage.classList.add('page-next-previous');
    nextPage.classList.add('page-next-previous');
    containerPages.appendChild(previousPage);
    for (var i = 0; i < pagesNumber; i++) {
        count++;
        arrayPageNumber.push(count);
    }
    ;
    for (var _i = 0, auxArray_1 = auxArray; _i < auxArray_1.length; _i++) {
        var page = auxArray_1[_i];
        //---SET QUERY PARAMS PREVIOUS AND NEXT BUTTON-----
        (!pageClicked || pageClicked == 1) ? previousPage.classList.add('hidden') : previousPage.setAttribute('href', "./index.html?page=" + (pageClicked - 1) + "&wordTosearch=" + params.get('wordToSearch') + "&orderBy=" + params.get('order'));
        (pageClicked == arrayPageNumber.length) ? nextPage.classList.add('hidden') : nextPage.setAttribute('href', "./index.html?page=" + (pageClicked + 1) + "&wordTosearch=" + params.get('wordToSearch') + "&orderBy=" + params.get('order'));
        //---CREATE LIST OF ANCHORS-----
        var itemList = document.createElement('li');
        itemList.classList.add('pagination-number');
        var pageNumner = document.createElement('a');
        pageNumner.setAttribute('id', "" + page);
        itemList.appendChild(pageNumner);
        pageNumner.innerHTML = "" + page;
        if (Number(pageNumner.innerHTML) == pageClicked || !pageClicked && Number(pageNumner.innerHTML) == 1) {
            itemList.classList.add('clicked-number');
        }
        ;
        //---SET QUERY PARAMS TO NUMBER BUTTONS-----
        params.set('page', pageNumner.id);
        pageNumner.setAttribute('href', "./index.html?" + params.toString());
        //---SET ITEMS INTO CONTAINER-----
        listUl.appendChild(itemList);
        containerPages.appendChild(listUl);
        containerPages.appendChild(nextPage);
        container.appendChild(containerPages);
    }
    ;
};
var goBack = document.createElement('a');
goBack.innerHTML = "Volver";
goBack.setAttribute('href', "javascript:history.back()");
goBack.classList.add('go-back');
