var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var offsetToInfo = (pageClicked) ? Number(pageClicked) * 20 - 20 : 0;
formSearch.addEventListener('submit', function () {
    getFormInfo(event, "../index.html?");
});
//------------------VARIABLES-------------------------
var info = encodeURIComponent(params.get('info'));
var type = (params.get("type")) ? (params.get("type")) : "comics";
var toSearchInfo = params.get('wordToSearch');
var containerAllInfo = document.createElement('div');
var containerInfo = document.createElement('div');
var imgInfo = document.createElement('img');
var title = document.createElement('h3');
var titleDescription = document.createElement('h4');
var description = document.createElement('p');
var urlAssociated = "";
var containerInfoAssociated = document.createElement('div');
var containerInfoPlusPages = document.createElement('div');
var containerPagination = document.createElement('div');
var totalResultTitle = document.createElement('h2');
var numberOfResult = document.createElement('p');
containerAllInfo.classList.add('container-all-info');
containerInfo.classList.add('container-info');
titleDescription.appendChild(document.createTextNode("Descripción:"));
containerInfoAssociated.classList.add('container-info-associated');
containerInfoPlusPages.classList.add('container-info-plus-pages');
totalResultTitle.innerHTML = (type == "comics") ? "Personajes" : "Comics";
numberOfResult.classList.add('style-result-number');
//------------------INFO ASSOCIATED-------------------------
var infoAssociated = function (data) {
    var results = (type == "comics") ? data[0].characters : data[0].comics;
    var array = results.collectionURI.split('/');
    array[0] = "https:";
    var urlFinal = array.toString();
    urlAssociated = urlFinal.replaceAll(',', '/') + "?ts=1&apikey=" + apiKey + "&hash=" + hash + "&offset=0";
    return urlAssociated;
};
var infoAsso = function (data) {
    var kind = (type == "comics") ? "characters" : "comics";
    var results = (type == "comics") ? data[0].characters.items : data[0].comics.items;
    var arrayReults = [];
    for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
        var item = results_1[_i];
        var array = item.resourceURI.split('/');
        var urlAssociatedId = "https://gateway.marvel.com:443/v1/public/" + kind + "/" + array[array.length - 1] + "/" + type + "?";
        urlAssociated = urlAssociatedId + "&ts=1&apikey=" + apiKey + "&hash=" + hash + "&offset=0";
        arrayReults.push(urlAssociated);
    }
    return arrayReults;
};
//------------------CREATE CARD INFO ASSOCIATED-------------------------
var createCardInfoAssociated = function (data, results) {
    if (results.length == 0) {
        main.appendChild(noResuls);
    }
    var classInfo = (type == "comics") ? "characters" : "comics";
    for (var _i = 0, results_2 = results; _i < results_2.length; _i++) {
        var item = results_2[_i];
        var id = item.id;
        params.set('page', "1");
        params.set('info', id);
        params.set('type', classInfo);
        var urlItem = item.urls[0].url;
        contentHTML += "\n                    <div class=\"" + classInfo + "\">\n                        <a href=\"./info.html?" + params.toString() + "\">\n                            <img src=\"" + item.thumbnail.path + "." + item.thumbnail.extension + "\" alt=\"" + (item.name || item.title) + "\">\n                            <h3>" + (item["name"] || item["title"]) + "</h3>\n                        </a>\n                    </div>\n        ";
    }
    var pagesTotal = getNumberPages(data.total, data.limit);
    numberOfResult.innerHTML = data.total + " RESULTADOS";
    containerInfoAssociated.innerHTML = contentHTML;
    containerInfoPlusPages.appendChild(containerInfoAssociated);
    containerInfoPlusPages.appendChild(containerPagination);
    main.appendChild(containerInfoPlusPages);
    createButtons(pagesTotal, containerPagination, "./info.html?");
};
//------------------CREATE CARD INFO COMICS-------------------------
var createComicCard = function (data) {
    title.innerHTML = data[0].title;
    var titlePublicationDate = document.createElement('h4');
    titlePublicationDate.appendChild(document.createTextNode("Publicado:"));
    var PublicationDate = document.createElement('p');
    var dateString = new Date(data[0].modified);
    var dateFinal = ("0" + dateString.getDate()).slice(-2) + "-" + ("0" + (dateString.getMonth() + 1)).slice(-2) + "-" +
        dateString.getFullYear();
    PublicationDate.innerHTML = dateFinal;
    var titleScreenwriter = document.createElement('h4');
    titleScreenwriter.appendChild(document.createTextNode("Guionistas:"));
    var screenwrite = document.createElement('p');
    var arrayCreators = data[0].creators.items;
    for (var _i = 0, arrayCreators_1 = arrayCreators; _i < arrayCreators_1.length; _i++) {
        var item = arrayCreators_1[_i];
        if (item.role == "writer") {
            screenwrite.innerHTML = item.name;
        }
    }
    description.innerHTML = data[0].description;
    containerInfo.appendChild(title);
    containerInfo.appendChild(titlePublicationDate);
    containerInfo.appendChild(PublicationDate);
    containerInfo.appendChild(titleScreenwriter);
    containerInfo.appendChild(screenwrite);
};
//------------------CREATE CARD INFO -------------------------
var createInfoCard = function (data) {
    var srcInfo = data[0].thumbnail.path + "." + data[0].thumbnail.extension;
    imgInfo.setAttribute('src', srcInfo);
    if (type == "comics") {
        createComicCard(data);
    }
    else {
        title.innerHTML = data[0].name;
        description.innerHTML = data[0].description;
        containerInfo.appendChild(title);
    }
    containerInfo.appendChild(titleDescription);
    containerInfo.appendChild(description);
    containerAllInfo.appendChild(imgInfo);
    containerInfo.appendChild(goBack);
    containerAllInfo.appendChild(containerInfo);
    main.appendChild(containerAllInfo);
    main.appendChild(totalResultTitle);
    main.appendChild(numberOfResult);
};
//------------------GET URL-------------------------
var getURLInfo = function () {
    var url = "";
    if (type == "comics") {
        url = "" + baseUrl + type + "/" + info + "?title=" + toSearchInfo + "&ts=1&apikey=" + apiKey + "&hash=" + hash + "&offset=0";
    }
    else if (type == "characters") {
        url = "" + baseUrl + type + "/" + info + "?name=" + toSearchInfo + "&ts=1&apikey=" + apiKey + "&hash=" + hash + "&offset=0";
    }
    return url;
};
var urlToUseInfo = getURLInfo();
//---------------GET INFO ASSOCISTED FROM API MARVEL-------------
var getInfoAssociated = function (url) { return __awaiter(_this, void 0, void 0, function () {
    var response, items, listItems, resultsItems, _i, resultsItems_1, item, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch(url)];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                items = _a.sent();
                listItems = items.data;
                resultsItems = listItems.results;
                for (_i = 0, resultsItems_1 = resultsItems; _i < resultsItems_1.length; _i++) {
                    item = resultsItems_1[_i];
                    if (item.thumbnail.path == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available') {
                        item.thumbnail.path = '../assets/images/clean';
                    }
                }
                createCardInfoAssociated(listItems, resultsItems);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                alert("La API esta fuera de servicio");
                return [3 /*break*/, 4];
            case 4:
                ;
                return [2 /*return*/];
        }
    });
}); };
//---------------GET INFO FROM API MARVEL-------------
var getMarvelInfo = function (url) { return __awaiter(_this, void 0, void 0, function () {
    var response, items, listItems, resultsItems, _i, resultsItems_2, item, infoResults, newURL, joinURL, finalURL, URLModified, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch(url)];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                items = _a.sent();
                listItems = items.data;
                resultsItems = listItems.results;
                for (_i = 0, resultsItems_2 = resultsItems; _i < resultsItems_2.length; _i++) {
                    item = resultsItems_2[_i];
                    if (item.thumbnail.path == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available') {
                        item.thumbnail.path = '../assets/images/clean';
                    }
                }
                ;
                createInfoCard(resultsItems);
                infoAssociated(resultsItems);
                infoResults = infoAssociated(resultsItems);
                newURL = infoResults.split('&');
                newURL.length = newURL.length - 1;
                joinURL = newURL.toString();
                finalURL = joinURL.replaceAll(',', '&');
                URLModified = finalURL + ("&offset=" + offsetToInfo);
                getInfoAssociated(URLModified);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                alert("La API esta fuera de servicio");
                return [3 /*break*/, 4];
            case 4:
                ;
                return [2 /*return*/];
        }
    });
}); };
getMarvelInfo(urlToUseInfo);
