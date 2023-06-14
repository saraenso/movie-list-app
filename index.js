// Получаем необходимые элементы из DOM
const movieAddInputNode = document.querySelector('.js-movie-add-input');
const movieAddButtonNode = document.querySelector('.js-movie-add-btn');
const moviesNode = document.querySelector('.js-movies');

// Массив объектов-фильмов
let movies = [];

// Функция для сохранения списка фильмов в локальном хранилище
const saveMoviesToLocalStorage = () => {
  localStorage.setItem('movies', JSON.stringify(movies));
};

// Функция для восстановления списка фильмов из локального хранилища
const restoreMoviesFromLocalStorage = () => {
  const storedMovies = localStorage.getItem('movies');
  if (storedMovies) {
    movies = JSON.parse(storedMovies);
    renderMovies();
  }
};

// Функция для отрисовки списка фильмов
const renderMovies = () => {
  moviesNode.innerHTML = '';

  movies.forEach((movie) => {
    const listItemHTML = `
      <li class='movie ${movie.isChecked ? "checked" : ""}'>
        <div class='movie-inner'>
          <input class='movie-checkbox' id='checkbox' type='checkbox' ${movie.isChecked ? "checked" : ""} />
          <label class='movie-name' for='checkbox'>${movie.title}</label>
        </div>
        <div class='movie-inner-btn'>
          <button class='js-movie-remove-btn movie-remove-btn'></button>
        </div>
      </li>
    `;

    moviesNode.insertAdjacentHTML('beforeend', listItemHTML);
  });
};

// Функция для добавления фильма
const addMovie = () => {
  const movieTitle = movieAddInputNode.value.trim();

  if (movieTitle !== '') {
    const movie = {
      title: movieTitle,
      isChecked: false
    };

    movies.push(movie);
    saveMoviesToLocalStorage();
    renderMovies();

    movieAddInputNode.value = '';
  }
};

// Обработчик события ввода в поле заголовка
movieAddInputNode.addEventListener('input', () => {
  const movie = movieAddInputNode.value;
});

// Обработчик события клика на кнопку
movieAddButtonNode.addEventListener('click', addMovie);

// Обработчик события нажатия клавиши в поле ввода
movieAddInputNode.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addMovie();
  }
});

// Обработчик события клика на кнопку удаления фильма
moviesNode.addEventListener('click', (event) => {
  if (event.target.classList.contains('js-movie-remove-btn')) {
    const listItem = event.target.closest('.movie');
    const movieIndex = Array.from(listItem.parentNode.children).indexOf(listItem);
    movies.splice(movieIndex, 1);
    saveMoviesToLocalStorage();
    renderMovies();
  }
});

// Обработчик события клика на чекбокс
moviesNode.addEventListener('click', (event) => {
  if (event.target.classList.contains('movie-checkbox')) {
    const movieItem = event.target.closest('.movie');
    const movieIndex = Array.from(movieItem.parentNode.children).indexOf(movieItem);
    movies[movieIndex].isChecked = !movies[movieIndex].isChecked;
    saveMoviesToLocalStorage();
    renderMovies();
  }
});

// Восстанавливаем список фильмов при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  restoreMoviesFromLocalStorage();
});
