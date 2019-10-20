export const fetchFilms = async () => {
  const response = await fetch('https://swapi.co/api/films/');
  const films = await response.json();
  return await films.results.map((film) => {
    const { title, episode_id, release_date, opening_crawl } = film;
    var filmId
    if (film.episode_id >= 4 && film.episode_id <= 6) {
      filmId = film.episode_id - 3
    } else if (film.episode_id >= 1 && film.episode_id <= 3) {
      filmId = film.episode_id + 3
    } else {
      filmId = film.episode_id
    }
    return { title, episode_id, release_date, filmId, opening_crawl }
  }).sort((a, b) => a.episode_id - b.episode_id)
}

export const getCharacters = async (filmUrl) => {
  const response = await fetch(filmUrl);
  const data = await response.json();
  const characters = data.characters.splice(0, 10);
  const charactersInfo = characters.map(character => {
    return getCharacter(character).then(character => ({
      name: character[0],
      homeworld: character[1],
      species: character[2],
      relatedFilms: character[3]
    }))
  })
  return Promise.all(charactersInfo)
}

export const getCharacter = async (characterUrl) => {
  const response = await fetch(characterUrl);
  const character = await response.json();
  const { name, homeworld, species, films } = character;
  const home = getHomeworld(homeworld);
  const speciesName = getSpeciesData(species);
  const relatedMovies = getRelatedFilms(films);
  return Promise.all([name, home, speciesName, relatedMovies]);
}

export const getHomeworld = async (homeworldUrl) => {
  const response = await fetch(homeworldUrl);
  const homeworld = await response.json();
  const { name, population } = homeworld;
  return { name, population };
}

export const getSpeciesData = async (speciesArray) => {
  const speciesInfo = await speciesArray.map(speciesType => {
    return getSpecies(speciesType);
  })
  return Promise.all(speciesInfo);
}


export const getSpecies = async (speciesUrl) => {
  const response = await fetch(speciesUrl);
  const species = await response.json();
  return species.name;
}


export const getRelatedFilms = async (filmsArray) => {
  const relatedFilms = await filmsArray.map(film => {
    return getFilmName(film);
  })
  return Promise.all(relatedFilms);
}


export const getFilmName = async (filmUrl) => {
  const response = await fetch(filmUrl);
  const film = await response.json();
  return film.title;
}