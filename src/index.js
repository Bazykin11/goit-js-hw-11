
import './css/styles.css';
import PixApiService from './js/api-service'
import { Notify } from 'notiflix';
import appendMarkup  from './js/appendMarkup';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';


const inputForm = document.querySelector('#search-form');
const btn = document.querySelector('[data-action="load-more"]');
const imgContainer = document.querySelector('.container');
const guard = document.querySelector('.guard')

const pixApiService = new PixApiService();

// const lightBox = new SimpleLightbox('.gallery div a', {
//   captionDelay: 250,
//   captionsData: 'alt',
// });

inputForm.addEventListener('submit',submitForm)
// btn.addEventListener('click',onLoadMore);


function submitForm(e){
    e.preventDefault(); 
    clearArticlesContainer();
    pixApiService.query = e.currentTarget.elements.query.value.trim(); 
    if (pixApiService.query === ""){
      Notify.info('Enter your request');
      return
    }
    pixApiService.resetPage();
    // pixApiService.fetchArticles().then(creatMarkup);
    fetchArticles()
    
}



function creatMarkup(hits){
 
  try{
    const creatMarkup = appendMarkup(hits);
    imgContainer.insertAdjacentHTML('beforeend',creatMarkup);
    observer.observe(guard);

    if (hits.totalHits < (pixApiService.page - 1) * 40) {
      Notify.failure("We're sorry, but you've reached the end of search results.");
      return;
  }
  } catch (error){
    console.log(error);
  }

}

function clearArticlesContainer (){
  imgContainer.innerHTML = '';
}


function onLoadMore(entries){
  const entry = entries[0];
  if(entry.isIntersecting){
      pixApiService.fetchArticles().then(creatMarkup);
  }
}

function fetchArticles() {
  pixApiService.fetchArticles().then(hits => {
      const totalHits = hits.totalHits
      if (totalHits === 0) {
      return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      }
      else {
        Notify.success(`Hooray! We found ${totalHits} images.`);
    }
      creatMarkup(hits)
  })
}

// -----------------------SCROLL-----------------
const options = {
  root: null,
  rootMargin: '50px',
  threshold: 1
}

const observer = new IntersectionObserver(onLoadMore,options)



