import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';

/*****************************
 * Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};
window.state = state;

// SEARCH CONTROLLER
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

// RECIPE CONTROLLER
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
         recipeView.renderRecipe(
            state.recipe,
            state.likes.isLiked(id)
         );

         console.log(state.recipe);
      } catch (err) {
         console.log(err);
         alert('Error processing recipe!');
      }
   }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// LIST CONTROLLER
const controlList = () => {
   // Create new list if none
   if (!state.list) state.list = new List();

   // Add ingredient to the list
   state.recipe.ingredients.forEach(el => {
      const item = state.list.addItem(el.count, el.unit, el.ingredient);
      listView.renderItems(item);
   });
}

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
   const id = e.target.closest('.shopping__item').dataset.itemid;

   // Hangle the delete button
   if (e.target.matches('.shopping__delete, .shopping__delete *')) {
      // Delete from state
      state.list.deleteItem(id);

      // Delete from UI
      listView.deleteItem(id);

      // handle updated count
   } else if (e.target.matches('.shpping__count-value')) {
      const val = parseFloat(e.target.value, 10);
      state.list.updateCount(id, val);
   }
});

// LIKE CONTROLLER
state.likes = new Likes(); // Testing
likesView.toggleLikeMenu(state.likes.getNumLikes()); // Testing

const controlLike = () => {
   if (!state.likes) state.likes = new Likes();
   const currentID = state.recipe.id;

   // User has NOT yet like current recipe
   if (!state.likes.isLiked(currentID)) {
      // Add like to the state
      const newLike = state.likes.addLike(
         currentID,
         state.recipe.title,
         state.recipe.author,
         state.recipe.img
      );
      // Toggle the like button
      likesView.toggleLikeBtn(true);
      
      // Add like to UI list
      likesView.renderLike(newLike);
      console.log(state.likes);
      
      // User HAS liked current recipe
   } else {
      // Remove like from the state
      state.likes.deleteLike(currentID)

      // Toggle the like button
      likesView.toggleLikeBtn(false);

      // Remove like from the UI
      likesView.deleteLike(currentID);
      console.log(state.likes);
   }
  likesView.toggleLikeMenu(state.likes.getNumLikes());
};


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
   } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
      // Add ingredient to shopping list
      controlList();
   } else if (e.target.matches('.recipe__love, .recipe__love *')) {
      // Like controller
      controlLike();
   }
   console.log(state.recipe);
});

window.list = new List();
