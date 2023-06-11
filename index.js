// Получаем необходимые элементы из DOM
const movieAddInputNode = document.querySelector('.js-movie-add-input');
const movieAddButtonNode = document.querySelector('.js-movie-add-btn');
const moviesNode = document.querySelector('.js-movies');

// Функция для сохранения списка фильмов в локальном хранилище
const saveMoviesToLocalStorage = () => {
  const movieItems = Array.from(moviesNode.querySelectorAll('.movie'));
  const movieData = movieItems.map((item) => {
    const title = item.querySelector('.movie-name').textContent;
    const isChecked = item.querySelector('.movie-checkbox').checked;
    return { title, isChecked };
  });
  localStorage.setItem('movies', JSON.stringify(movieData));
};

// Функция для восстановления списка фильмов из локального хранилища
const restoreMoviesFromLocalStorage = () => {
  const storedMovies = localStorage.getItem('movies');
  if (storedMovies) {
    const movieData = JSON.parse(storedMovies);
    movieData.forEach((data) => {
      const { title, isChecked } = data;
      const listItemHTML = `
        <li class='movie ${isChecked ? "checked" : ""}'>
          <div class='movie-inner'>
            <input class='movie-checkbox' id='checkbox' type='checkbox' ${isChecked ? "checked" : ""} />
            <label class='movie-name' for='checkbox'>${title}</label>
          </div>
          <div class='movie-inner-btn'>
            <button class='js-movie-remove-btn movie-remove-btn'></button>
          </div>
        </li>
      `;
      moviesNode.insertAdjacentHTML('beforeend', listItemHTML);
    });
  }
};

// Обработчик события ввода в поле заголовка
movieAddInputNode.addEventListener('input', () => {
  const movie = movieAddInputNode.value;
});

// Функция для добавления фильма
const addMovie = () => {
  const movieTitle = movieAddInputNode.value.trim(); // Получаем значение фильма из инпута и удаляем лишние пробелы

  if (movieTitle !== '') {
    const listItemHTML = `
      <li class='movie'>
        <div class='movie-inner'>
          <input class='movie-checkbox' id='checkbox' type='checkbox' />
          <label class='movie-name' for='checkbox'>${movieTitle}</label>
        </div>
        <div class='movie-inner-btn'>
          <button class='js-movie-remove-btn movie-remove-btn'></button>
        </div>
      </li>
    `;

    moviesNode.insertAdjacentHTML('beforeend', listItemHTML);
    saveMoviesToLocalStorage(); // Сохраняем список фильмов в локальном хранилище

    // Очищаем поле ввода
    movieAddInputNode.value = '';
  }
};

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
    listItem.remove();
    saveMoviesToLocalStorage(); // Сохраняем список фильмов в локальном хранилище
  }
});

// Обработчик события клика на чекбокс
moviesNode.addEventListener('click', (event) => {
  if (event.target.classList.contains('movie-checkbox')) {
    const movieItem = event.target.closest('.movie');
    movieItem.classList.toggle('checked');
    saveMoviesToLocalStorage();
  }
});

// Восстанавливаем список фильмов при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  restoreMoviesFromLocalStorage();
});
