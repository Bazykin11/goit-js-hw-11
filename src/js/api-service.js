import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const KEY = "30801739-e3a2cbc338b2430906e4a5a86";

export default class PixApiService {
    constructor (){
        this.seachQuery= '';
        this.page = 1;
        this.per_page = 40;
    }

    async fetchArticles(){
        const options = new URLSearchParams ({
            key: KEY,
            q: this.seachQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            page: this.page,
            per_page: '40',
            })

            return await axios.get(`${BASE_URL}?${options}`).then(response => {
                this.incrementPage();
                
            return response.data;
            })
    }


    incrementPage(){
        this.page += 1;
    }

    resetPage(){
        this.page = 1;
    }

    get query(){
        return this.seachQuery;
    }

    set query(newQuery){
        this.seachQuery = newQuery;
    }

}       