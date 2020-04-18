import { elements } from './base';

// Read the input field value 
export const getInput = () => elements.searchInput.value;

// Reset the input field 
export const clearInput = () => {
   elements.searchInput.value = '';
};

// Remove the past result list
export const clearResults = () => {
   elements.resultList.innerHTML = '';
   elements.resultPage.innerHTML = '';
};

export const selectedBgColor = id => {
   const resultsArr = Array.from(document.querySelectorAll('.results__link--active'));
   resultsArr.forEach(el2 => {
      el2.classList.remove('results__link--active');
   });

   document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
};

// Set the recipes titles to 17 characters
export const limitRecipeTitle = (title, limit = 17) => {
   const newTitle = [];
   if (title.length > limit) {
      title.split(' ').reduce((acc, cur) => {
         if (acc + cur.length <= limit) {
            newTitle.push(cur);
         }
         return acc + cur.length;
      }, 0);

      // return the result title
   return `${newTitle.join(' ')}...`;
   }
   return title;
}

// Display results on UI
export const renderRecipe = recipe => {
   const markup = `
      <li>
         <a class="likes__link" href="#${recipe.recipe_id}">
            <figure class="likes__fig">
               <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="likes__data">
               <h4 class="likes__name">${limitRecipeTitle(recipe.title)}</h4>
               <p class="likes__author">${recipe.publisher}</p>
            </div>
         </a>
      </li>
   `;
   elements.resultList.insertAdjacentHTML('beforeend', markup);
};

// Type: 'prev' or 'next button
const createButton = (page, type) => `
   <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page -1 : page + 1}>
      <span>Page${type === 'prev' ? page - 1 : page + 1}</span>
      <svg class="search__icon">
         <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
      </svg>
   </button>
`;

// Check for the type of button to shown in UI
const renderButtons = (page, numResults, resPerPage) => {
   const pages = Math.ceil(numResults / resPerPage);

   let button;
   if (page === 1 && pages > 1) {
      // Buntton to go to next page
      button = createButton(page, 'next');
   } else if (page < pages) {
      // Both buttons
      button = `${createButton(page, 'prev')}${createButton(page, 'next')}`;

   } else if (page === pages && pages > 1) {
      // Only prev page button
      button = createButton(page, 'prev');
   }

   elements.resultPage.insertAdjacentHTML('afterbegin', button);
};

// Iterate though result list 
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
   // render result of current page
   const start = (page - 1) * resPerPage;
   const end = page * resPerPage;
   
   recipes.slice(start, end).forEach(renderRecipe);

   // call render buttons
   renderButtons(page, recipes.length, resPerPage);
};