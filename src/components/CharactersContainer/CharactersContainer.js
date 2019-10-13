import React from 'react';
import './CharactersContainer.scss';
import CharacterCard from '../CharacterCard/CharacterCard'
import PropTypes from 'prop-types';

const CharactersContainer = ({ characters, addFavorite, removeFavorite }) => {
  return (
    <section className='characters-cont'>
      {characters.map((character, index) => {
        const { name, species, homeworld, relatedFilms } = character;
        return <CharacterCard
          key={index}
          name={name}
          species={species}
          homeworldName={homeworld.name}
          homeworldPop={homeworld.population}
          relatedFilms={relatedFilms}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
        />
      })}
    </section>
  )
}

CharactersContainer.propTypes = {
  character: PropTypes.object,
  index: PropTypes.number,
  name: PropTypes.string,
  species: PropTypes.string,
  homeworld: PropTypes.object,
  relatedFilms: PropTypes.array,
};

export default CharactersContainer