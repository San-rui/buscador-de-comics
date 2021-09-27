//-----------LOADING-----------
const containerLoading= document.createElement('div');
containerLoading.setAttribute('class', 'container-loadig');

const loading= document.createElement('div');
loading.setAttribute('class', 'loading');

containerLoading.appendChild(loading)
document.body.appendChild(containerLoading);

window.onload= function(){
	containerLoading.style.visibility='hidden';
	containerLoading.style.opacity='0';
}



//-------------GO BACK PARAMETERS------------------
const goBack= document.createElement('a');
goBack.innerHTML="Volver";
goBack.setAttribute('href', "javascript:history.back()");
goBack.classList.add('go-back');  

//-------------SEARCH BAR-------------
const controlsSearch = [
    {
        type: "search",
        name: "addSearch",
        id: "addSearch",
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
                        name: "A-Z",
                    },
                    {
                        id: "-title",
                        name: "Z-A",
                    },
                    {
                        id: "-focDate",
                        name: "Más nuevos",
                    },
                    {
                        id: "focDate",
                        name: "Más viejos",
                    },
                ],
            },
            {
                id: "characters",
                name: "PERSONAJES",
                options: [
                    {
                        id: "name",
                        name: "A-Z",
                    },
                    {
                        id: "-name",
                        name: "Z-A",
                    },
                ],
            },
        ],
    },
];

const container= document.createElement('div');
const main= document.createElement('main');
const formSearch = document.createElement("form");
const searchContainerGeneral = document.createElement('div');
const placeHolderText="Ingresa tu búsqueda";
const icon = document.createElement('i');
const tittleSearch= document.createElement('h2');
const inputContainer = document.createElement('div');
const selectContainer = document.createElement('div');
const button = document.createElement("button");
button.type = "submit";
button.appendChild(document.createTextNode("Buscar"));

main.classList.add('container');
container.appendChild(main);
searchContainerGeneral.classList.add('search-container-general')
formSearch.classList.add('form-search')
icon.classList.add("fas", "fa-search", 'fa-lg');
tittleSearch.appendChild(document.createTextNode("Búsqueda"));
inputContainer.classList.add('input-container')
selectContainer.classList.add('select-container');

const elemOrder = document.createElement("select");
elemOrder.id="order";


const handlerSubmit =(event)=>{
    event.preventDefault();
    elemOrder.innerHTML="";

    const typeInfo= event.target;
	const ctrl = controlsSearch.filter(elem => elem.name === 'Tipo')[0];

	for( const element of ctrl.options) {
		if(element.id==typeInfo.value){

			for(const item of element.options){
				const op = document.createElement("option");
				op.value = item.id.toString();
				op.appendChild(document.createTextNode(item.name));
				elemOrder.appendChild(op);
			};
		} ;
	};
};

const makeForm = (form, ctrls, parent, containerSearch) => {
    let elem;

    for (const control of ctrls) {

        switch (control.type) {
            case "select":

				const labelselect = document.createElement('label');
				labelselect.appendChild(document.createTextNode(control.name));
				selectContainer.appendChild(labelselect);
                
                if(control.type=="select" && control.options!==undefined){

                    const labelselectOrder = document.createElement('label');
                    labelselectOrder.appendChild(document.createTextNode("ORDEN"));
                    
                    elem = document.createElement("select");

                    elem.addEventListener('change', handlerSubmit);

                    for(const cont of control.options){

                        const op = document.createElement("option");
                        op.value = cont.id.toString();
                        op.appendChild(document.createTextNode(cont.name));
                        elem.appendChild(op)
                        selectContainer.appendChild(elem);
                        selectContainer.appendChild(labelselectOrder);
                        selectContainer.appendChild(elemOrder);
                    
                            if(cont.id=="comics"){
        
                                for(const item of cont.options){
                                    const op = document.createElement("option");
                                    op.value = item.id.toString();
                                    op.appendChild(document.createTextNode(item.name));
                                    elemOrder.appendChild(op);
                                }
                            }
                    }
                }
            break;

			case "search":
				elem = document.createElement("input");
                elem.type = control.type;
                elem.placeholder=placeHolderText;
                inputContainer.appendChild(icon)
                inputContainer.appendChild(elem);
                break;

            default:
        }
        elem.name= control.name;
        elem.id= control.id;
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

const baseUrl: string = "https://gateway.marvel.com:443/v1/public/";

const apiKey: string = "b7ce8a4b69bf121a9d6e0b3caa7da4dc";
const hash : string ="bca60ca0198d3e720005add814760dde";

//-------------------GET NUMBER OF PAGES---------------

const getNumberPages = (total, limitPerPage)=>{
    let pages=0;
    return pages = Math.ceil(total/ limitPerPage);
};

//------------- PAGINATION-----------------------

let params= new URLSearchParams(window.location.search);
let pageClicked = Number(params.get("page"));

const containerPages= document.createElement('div');
containerPages.classList.add('container-pages');
const listUl = document.createElement('ul');

let firstPage= document.createElement('a');
let firstPageArrow= document.createElement('img');
firstPageArrow.setAttribute('src', '../assets/images/first.png');
firstPageArrow.classList.add('arrow');
firstPage.appendChild(firstPageArrow);

let lastPage= document.createElement('a');
let lastPageArrow= document.createElement('img');
lastPageArrow.setAttribute('src', '../assets/images/last.png');
lastPageArrow.classList.add('arrow');
lastPage.appendChild(lastPageArrow);

let previousPage= document.createElement('a');
let previousPageArrow= document.createElement('img');
previousPageArrow.setAttribute('src', '../assets/images/previous.png');
previousPageArrow.classList.add('arrow');
previousPage.appendChild(previousPageArrow)

let nextPage= document.createElement('a');
let nextPageArrow= document.createElement('img');
nextPageArrow.setAttribute('src', '../assets/images/next.png');
nextPageArrow.classList.add('arrow');
nextPage.appendChild(nextPageArrow);

containerPages.appendChild(firstPage);
containerPages.appendChild(previousPage);

const createButtons =(pagesNumber, container, pageloc)=>{

	let params= new URLSearchParams(window.location.search);
    let count = 0;
    let arrayPageNumber =[];
    let auxArray=[];

	if(pagesNumber>=5){
		auxArray= (pageClicked>5)? [pageClicked -4, pageClicked -3, pageClicked -2, pageClicked -1, pageClicked]:  [1,2,3,4,5];

	}else if(pagesNumber<5){
		for(let i=0; i<pagesNumber; i++){
			auxArray.push(i+1);
			previousPage.classList.add('hidden');
			nextPage.classList.add('hidden');
		}
	}

    if(pagesNumber>1){
        for (let i=0; i < pagesNumber; i++){
            count ++
            arrayPageNumber.push(count);
        };

        for(const page of auxArray){
    
            //---CREATE LIST OF ANCHORS-----
            const itemList= document.createElement('li');
            itemList.classList.add('pagination-number');
            const pageNumber = document.createElement('a');
            pageNumber.setAttribute('id', `${page}`);
            itemList.appendChild(pageNumber);
            pageNumber.innerHTML=`${page}`;

			let next=(!pageClicked)? pageClicked=1 :Number(pageClicked)+1;
			let previous= Number(pageClicked)-1;
			nextPage.setAttribute('id', `${next}`);
			previousPage.setAttribute('id', `${previous}`);

    
            if(Number(pageNumber.innerHTML)==pageClicked || !pageClicked && Number(pageNumber.innerHTML) == 1){
                itemList.classList.add('clicked-number');
            };
            //---SET QUERY PARAMS TO NUMBER BUTTONS-----
            params.set('page', pageNumber.id);
            pageNumber.setAttribute('href', `${pageloc}${params.toString()}`);

			//---HIDE INACTIVE BUTTONS-----
            if(!pageClicked || pageClicked==1){
				previousPage.classList.add('hidden');
				firstPage.classList.add('hidden');
			} else{
				params.set('page', "1");
				firstPage.setAttribute('href', `${pageloc}${params.toString()}`);
				params.set('page', previousPage.id);
				previousPage.setAttribute('href', `${pageloc}${params.toString()}`);
				firstPage.classList.add('anchor-page-style');
				previousPage.classList.add('anchor-page-style');
			}

            if(pageClicked==arrayPageNumber.length){
				nextPage.classList.add('hidden');
				lastPage.classList.add('hidden');
			}else{
				params.set('page', nextPage.id);
				nextPage.setAttribute('href', `${pageloc}${params.toString()}`);
				params.set('page', `${pagesNumber}`);
				lastPage.setAttribute('href', `${pageloc}${params.toString()}`);
				lastPage.classList.add('anchor-page-style');
				nextPage.classList.add('anchor-page-style');
			}
            
            //---SET ITEMS INTO CONTAINER-----
            listUl.appendChild(itemList);
            containerPages.appendChild(listUl);
            containerPages.appendChild(nextPage);
			containerPages.appendChild(lastPage);
            container.appendChild(containerPages);
        };
    }
};



//-----------SEARCH BY FILTERS------------

const getFormInfo = (event, data:string)=>{

    event.preventDefault();
    const form= event.target;
    params.set('wordToSearch', null);
    params.set('type', null);
    params.set('order', null);
	params.set('info', null);

    params.set('wordToSearch', form.addSearch.value);
    params.set('type', form.type.value);
    params.set('order', form.order.value);
    params.set('page', "1");
    window.location.href=data+params.toString();
};