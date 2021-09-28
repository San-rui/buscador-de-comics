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
//-------------VARIABLES-------------------
var comicClass = "comics";
var characterClass = "characters";
var results = document.createElement('div');
var containerElement = document.createElement('div');
var tittleResult = document.createElement('h2');
var resultNumber = document.createElement('p');
//---------------------------------------
formSearch.addEventListener('submit', function () {
    getFormInfo(event, "index.html?");
});
//----------- CREATE CARD -------------
results.classList.add('results-container');
containerElement.classList.add('img-item');
tittleResult.innerHTML = "Resultados";
resultNumber.classList.add('style-result-number');
var createCard = function (list, classCont, resultsList) {
    results.appendChild(tittleResult);
    results.appendChild(containerElement);
    results.appendChild(resultNumber);
    if (resultsList.length == 0) {
        results.appendChild(noResuls);
    }
    for (var _i = 0, resultsList_1 = resultsList; _i < resultsList_1.length; _i++) {
        var item = resultsList_1[_i];
        var detail = item.id;
        params.set('info', detail);
        params.set('page', "1");
        contentHTML += "\n            <div class=" + classCont + ">\n                <a href=\"./pages/info.html?" + params.toString() + "\">\n                    <img src=\"" + item.thumbnail.path + "." + item.thumbnail.extension + "\" alt=\"" + (item.name || item.title) + "\">\n                    <h3>" + (item["name"] || item["title"]) + "</h3>\n                    </a>\n            </div>\n            ";
    }
    ;
    var pagesTotal = getNumberPages(list.total, list.limit);
    resultNumber.innerHTML = list.total + " RESULTADOS";
    containerElement.innerHTML = contentHTML;
    results.appendChild(containerElement);
    createButtons(pagesTotal, results, "./index.html?");
    main.appendChild(results);
};
//-------------SEARCH FILTERS-----------------
var updateResults = function (results) {
    var type = params.get('type');
    var filtersAppy = [];
    if (type == "comics") {
        filtersAppy = results.filter(function (Element) { return Element.characters; });
    }
    else {
        filtersAppy = results.filter(function (Element) { return Element.comics; });
    }
    return filtersAppy;
};
//-------------GET COMICS AND CHARACTERS FROM MARVEL API-------
var offset = (pageClicked) ? Number(pageClicked) * 20 - 20 : 0;
var typeData = (params.get("type")) ? (params.get("type")) : "comics";
var orderData = (params.get("order"));
var toSearch = encodeURIComponent(params.get('wordToSearch'));
//-------------------GET URL --------------------------------
var getURL = function () {
    var url = "";
    if (params.get("type") == null) {
        url = "" + baseUrl + typeData + "?orderBy=title&ts=1&apikey=" + apiKey + "&hash=" + hash + "&offset=" + offset;
    }
    else if (typeData == "comics" && toSearch !== "") {
        url = "" + baseUrl + typeData + "?titleStartsWith=" + toSearch + "&orderBy=" + orderData + "&ts=1&apikey=" + apiKey + "&hash=" + hash + "&offset=" + offset;
    }
    else if (toSearch == "") {
        url = "" + baseUrl + typeData + "?orderBy=" + orderData + "&ts=1&apikey=" + apiKey + "&hash=" + hash + "&offset=" + offset;
    }
    else if (typeData == "characters" && toSearch !== "") {
        url = "" + baseUrl + typeData + "?nameStartsWith=" + toSearch + "&orderBy=" + orderData + "&ts=1&apikey=" + apiKey + "&hash=" + hash + "&offset=" + offset;
    }
    return url;
};
var urlToUse = getURL();
//-------------GET MARVEL SELECTION: COMICS OR CHARACTERS---------------
var getMarvelSection = function (url, className) { return __awaiter(_this, void 0, void 0, function () {
    var response, items, listItems, resultsItems, array, _i, array_1, item, err_1;
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
                array = updateResults(resultsItems).length !== 0 ? updateResults(resultsItems) : resultsItems;
                for (_i = 0, array_1 = array; _i < array_1.length; _i++) {
                    item = array_1[_i];
                    if (item.thumbnail.path == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available') {
                        item.thumbnail.path = './assets/images/clean';
                    }
                }
                createCard(items.data, className, array);
                getNumberPages(items.data.total, items.data.limit);
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
getMarvelSection(urlToUse, typeData);
main.appendChild(goBack);
