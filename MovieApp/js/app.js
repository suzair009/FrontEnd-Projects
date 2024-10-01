document.addEventListener('DOMContentLoaded', function () {
    const movieForm = document.getElementById('movieForm');
    const movieList = document.getElementById('movieList');
    const searchInput = document.getElementById('searchInput');
  
    // Load movies from local storage
    let movies = JSON.parse(localStorage.getItem('movies')) || [];
  
    // Function to add a movie to the list and update local storage
    function addMovie(title, description, rating) {
      const movie = { title, description, rating };
      movies.push(movie);
      updateMovieList();
      localStorage.setItem('movies', JSON.stringify(movies));
    }
  
    // Function to render movie list
    function updateMovieList() {
      movieList.innerHTML = '';
      movies.forEach((movie, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
  
        li.innerHTML = `
          <div>
            <h5>${movie.title}</h5>
            <p>${movie.description}</p>
            <small>Rating: ${movie.rating}/10</small>
          </div>
          <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button>
        `;
        movieList.appendChild(li);
      });
    }
  
    // Delete movie from the list
    movieList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const index = e.target.getAttribute('data-index');
        movies.splice(index, 1);
        updateMovieList();
        localStorage.setItem('movies', JSON.stringify(movies));
      }
    });
  
    // Handle the form submission to add a new movie
    movieForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const title = document.getElementById('movieTitle').value;
      const description = document.getElementById('movieDescription').value;
      const rating = document.getElementById('movieRating').value;
  
      addMovie(title, description, rating);
  
      // Clear the form
      movieForm.reset();
    });
  
    // Search function
    searchInput.addEventListener('input', function (e) {
      const query = e.target.value.toLowerCase();
      const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(query));
      renderFilteredMovies(filteredMovies);
    });
  
    // Render filtered movies based on the search input
    function renderFilteredMovies(filteredMovies) {
      movieList.innerHTML = '';
      filteredMovies.forEach((movie, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
  
        li.innerHTML = `
          <div>
            <h5>${movie.title}</h5>
            <p>${movie.description}</p>
            <small>Rating: ${movie.rating}/10</small>
          </div>
          <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button>
        `;
        movieList.appendChild(li);
      });
    }
  
    // Initial render
    updateMovieList();
  });
  