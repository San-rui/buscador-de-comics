const storageSearch = JSON.parse(localStorage.getItem('to-search-storage'));

const url3: string = `${baseUrl1}?ts=1&apikey=${apiKey}&hash=${hash}&offset=0`;
const url4: string = `${baseUrl2}?ts=1&apikey=${apiKey}&hash=${hash}&offset=0`;

const getMarvelInfo = async(url)=>{
    const response = await fetch(url);
    const items = await response.json();

    const listItems= items.data;
    const resultsItems= listItems.results;

    for(const item of resultsItems){
        if(item.thumbnail.path== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'){
            item.thumbnail.path='./assets/images/clean'
        }
    }

}

getMarvelInfo(url3);

