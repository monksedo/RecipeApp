import { elements } from './base';

// Read the input field value 
const getInput = () => elements.searchInput.value;

// Reset the input field 
const clearInput = () => {
   elements.searchInput.value = '';
};

// Remove the past result list
const clearResults = () => {
   elements.resultList.innerHTML = '';
}

// Display results on UI
const renderRecipe = recipe => {
   const markup = `
      <li>
         <a class="likes__link" href="#${recipe.recipe_id}">
            <figure class="likes__fig">
               <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="likes__data">
               <h4 class="likes__name">${recipe.title}</h4>
               <p class="likes__author">${recipe.publisher}</p>
            </div>
         </a>
      </li>
   `;
   elements.resultList.insertAdjacentHTML('beforeend', markup);
};

// Iterate though result list 
const renderResults = recipes => {
   recipes.forEach(renderRecipe);
};

// Make function available to external modules
export { getInput, renderResults, clearInput, clearResults };