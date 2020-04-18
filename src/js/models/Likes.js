export default class Likes {
   constructor() {
      this.likes = [];
   };

   addLike(id, title, author, img) {
      const like = { id, title, author, img };
      this.likes.push(like);

      // Save data to local storage
      this.persistData();
      return like;
   };

   deleteLike(id) {
      const index = this.likes.findIndex(el => el.id === id);
      this.likes.splice(index, 1);

      // Update data on local storage
      this.persistData();
   };

   isLiked(id) {
      return this.likes.findIndex(el => el.id === id) !== -1;
   };

   getNumLikes() {
      return this.likes.length;
   };

   // Save data app data to local storage
   persistData() {
      localStorage.setItem('likes', JSON.stringify(this.likes));
   };

   // Read data from local storage
   readStorageData() {
      const storage = JSON.parse(localStorage.getItem('likes'));

      // Restore likes from local storage
      if (storage) this.likes = storage;
   }
};

