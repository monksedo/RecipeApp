import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

/*****************************
 * Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

// Search Controller 
const controlSearch = async () => {
   // 1. Get query from view
   const query = searchView.getInput();

   if (query) {
      // 2. New search object, add to state
      state.search = new Search(query);

      // 3. Prepare UI for results
      searchView.clearInput();
      searchView.clearResults();
      renderLoader(elements.searchResult);

      try {
         // 4. Search for recipes
         await state.search.getResults();
   
         // 5. Render results on UI
         clearLoader();
         searchView.renderResults(state.search.result);
      } catch (err) {
         alert('Something went wrong with the search...');
      }
   }
}

elements.searchForm.addEventListener('submit', e => {
   e.preventDefault();
   controlSearch();
});

elements.searchResult.addEventListener('click', e => {
   const btn = e.target.closest('.btn-inline');
   if (btn) {
      const goToPage = parseInt(btn.dataset.goto, 10);
      searchView.clearResults();
      searchView.renderResults(state.search.result, goToPage);
   }
});

// Recipe Controller
const controlRecipe = async () => {
   // Get ID from url
   const id = window.location.hash.replace('#', '');
   console.log(id);
   
   if (id) {
      // Prepare UI for changes
      recipeView.clearRecipe();
      renderLoader(elements.recipe);

      // Selected background color
      if (state.search) searchView.selectedBgColor(id);


      // Create new recipe objec
      state.recipe = new Recipe(id);
      
      try {
         // Get recipe data and parse the ingredient
         await state.recipe.getRecipe();
         state.recipe.parseIngredients();

         // Caluclate prep time and servings count
         state.recipe.calcTime();
         state.recipe.calcServings();
   
         // Render recipe
         clearLoader();
         recipeView.renderRecipe(state.recipe);

         console.log(state.recipe);
      } catch (err) {
         alert('Error processing recipe!');
      }
   }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// Handling recipe list click events
elements.recipe.addEventListener('click', e => {
   if (e.target.matches('.btn-decrease, .btn-decrease *')) {
      // Decrease button clicked
      if (state.recipe.servings > 1) {
         state.recipe.updateServings('dec');
         recipeView.updateIngCount(state.recipe);
      }
   } else if (e.target.matches('.btn-increase, .btn-increase *')) {
      // Increase button clicked
      state.recipe.updateServings('inc');
      recipeView.updateIngCount(state.recipe);
   }
   console.log(state.recipe);
});