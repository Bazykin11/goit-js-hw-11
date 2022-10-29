export default function appendMarkup (data){
  const markup = data.hits.map((hit) => {
       return `<div class="photo-card">
       <img class="start-img" src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" width=640 />
       <div class="info">
         <p class="info-item">
           <b>Likes</b>
           ${hit.likes}
         </p>
         <p class="info-item">
           <b>Views</b>
           ${hit.views}
         </p>
         <p class="info-item">
            <b>Comments</b>
           ${hit.comments}
         </p>
         <p class="info-item">
           <b>Downloads</b>
           ${hit.downloads}
         </p>
       </div>
     </div>`}).join('');
     return markup;
     
 };