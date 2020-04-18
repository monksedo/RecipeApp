// Make DOM lemement list available to external modules
export const elements = {
   searchForm: document.querySelector('.search'),
   searchInput: document.querySelector('.search__field'),
   searchResult: document.querySelector('.results'),
   resultList: document.querySelector('.results__list'),
   resultPage: document.querySelector('.results__pages'),
   recipe: document.querySelector('.recipe'),
   shopping: document.querySelector('.shopping__list'),
   likesMenu: document.querySelector('.likes__field'),
   likesList: document.querySelector('.likes__list'),
};

// make loader string available to external modules
export const elementStings = {
   loader: 'loader',
}

// Generate HTML class and icon loader 
export const renderLoader = parent => {
   const loader = `
      <div class="loader">
         <svg>
            <use href="img/icons.svg#icon-cw"></use>
         </svg>
      </div>
   `;
   parent.insertAdjacentHTML('afterbegin', loader);
};

// Remove the loader progress icon
export const clearLoader = () => {
   const loader = document.querySelector(`.${elementStings.loader}`);
   if (loader) loader.parentElement.removeChild(loader);
}

