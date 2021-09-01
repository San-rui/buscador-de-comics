//-----------TYPE---------------
// type Control ={
// 	type: string,
// 	name: string,
// 	id: string,
// 	options: option[]
// }


//-------------Header-------------

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
				name: "Comic",
			},
			{
				id: "personajes",
				name: "Personajes",
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
container.classList.add('container')

container.appendChild(main);
const formSearch = document.createElement("form");
formSearch.classList.add('form-search')
const searchContainerGeneral = document.createElement('div');
const placeHolderText="Ingresa tu búsqueda";
const icon = document.createElement('i');
icon.classList.add("fas", "fa-search");
//searchContainerGeneral.classList.add('search-container')

const makeForm = (form, ctrls, parent, containerSearch) => {

    const tittleH2= document.createElement('h2');
    tittleH2.appendChild(document.createTextNode("Búsqueda"));
    const inputContainer = document.createElement('div');
	inputContainer.classList.add('input-container')
    const selectContainer = document.createElement('div');
    selectContainer.classList.add('select-container')
	
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
                console.log(elem)
				break;
		}

	}

	const button = document.createElement("button");
	button.type = "submit";
	button.appendChild(document.createTextNode("Buscar"));
    selectContainer.appendChild(button);
    form.appendChild(inputContainer);
    form.appendChild(selectContainer);
    containerSearch.appendChild(tittleH2);
    containerSearch.appendChild(form); 
	parent.appendChild(containerSearch);
    document.body.appendChild(parent);

};

makeForm(formSearch, controlsSearch, container, searchContainerGeneral);