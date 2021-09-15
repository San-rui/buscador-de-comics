
//-------------HEADER -------------

const createHeader = ()=>{
    const header = document.createElement('header');
    const mainTitle = document.createElement('h1');
    const headerImg = document.createElement('img');

    mainTitle.innerHTML="ADA COMICS"
    headerImg.setAttribute('src','./assets/images/pngwing.com.png');
    header.classList.add('primary-header');

    header.appendChild(mainTitle);
    header.appendChild(headerImg);
    document.body.appendChild(header);
}
createHeader();


//-------------SEARCH BAR-------------
const controlsSearch = [
	{
		type: "text",
		name: "addSearch",
		id: "addSearch",
	},
	{
		type: "select",
		name: "Tipo",
		id: "type",
		options: [
			{
				id: "comic",
				name: "COMIC",
			},
			{
				id: "personajes",
				name: "PERSONAJES",
			},
		],
	},
	{
		type: "select",
		name: "Orden",
		id: "order",
		options: [
			{
				id: "a-z",
				name: "A-Z",
			},
			{
				id: "z-a",
				name: "Z-A",
			},
            {
				id: "mas-nuevos",
				name: "Más nuevos",
			},
			{
				id: "mas-viejos",
				name: "Más viejos",
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

const makeForm = (form, ctrls, parent, containerSearch) => {

    for (const control of ctrls) {
		let elem;

        if(control.type === "select"){
            const labelselect = document.createElement('label');
            labelselect.appendChild(document.createTextNode(control.name));
            selectContainer.appendChild(labelselect);
        }

		switch (control.type) {
			
			case "select":
				elem = document.createElement("select");
				for (const option of control.options) {
					const op = document.createElement("option");
					elem.appendChild(op);
					op.value = option.id.toString();
					op.appendChild(document.createTextNode(option.name));
                    
                    selectContainer.appendChild(elem);
				}
				break;

			default:
				elem = document.createElement("input");
				elem.type = control.type;
                elem.placeholder=placeHolderText;
                inputContainer.appendChild(icon)
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

const baseUrl1: string = "https://gateway.marvel.com:443/v1/public/comics";
const baseUrl2: string = "https://gateway.marvel.com:443/v1/public/characters";

const apiKey: string = "b7ce8a4b69bf121a9d6e0b3caa7da4dc";
const hash : string ="bca60ca0198d3e720005add814760dde";




