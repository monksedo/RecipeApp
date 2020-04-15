export const elements = {
   searchForm: document.querySelector('.search'),
   searchInput: document.querySelector('.search__field'),
   searchResult: document.querySelector('.results'),
   resultList: document.querySelector('.results__list')
};

export const elementStings = {
   loader: 'loader',
}

export const renderLoader = parent => {
   const loader = `
      <div class="loader">
         <svg>
            <use href="img/icons.svg#icon-cw"></use>
         </svg>
      </div>
   `
   parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
   const loader = document.querySelector(`.${elementStings.loader}`);
   if (loader) loader.parentElement.removeChild(loader);
}

