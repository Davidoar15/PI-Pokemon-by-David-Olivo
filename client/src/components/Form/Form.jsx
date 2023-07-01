import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createPokemon } from '../../redux/actions';
import style from './Form.module.css';
import validateForm from './validation';

function Form({ createPokemon }) {

  const [pkmnFormData, setPkmnFormData] = useState({
    name: '',
    hp: 0,
    attack: 0,
    defense: 0,
    spcatk: 0,
    spcdef: 0,
    speed: 0,
    height: 0,
    weight: 0,
    image: '',
    types: []
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setPkmnFormData({ ...pkmnFormData, [event.target.name]: event.target.value })
  };

  const handleTypeChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions);
    const selectedTypes = selectedOptions.map((option) => option.value);
    setPkmnFormData({ ...pkmnFormData, types: selectedTypes });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = validateForm(
      pkmnFormData.name,
      pkmnFormData.hp,
      pkmnFormData.attack,
      pkmnFormData.defense,
      pkmnFormData.spcatk,
      pkmnFormData.spcdef,
      pkmnFormData.speed,
      pkmnFormData.height,
      pkmnFormData.weight,
      pkmnFormData.image,
      pkmnFormData.types,
    );
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      createPokemon(pkmnFormData);
      alert("Data Completed Correctly. New Pokémon Registered");
      setPkmnFormData({ 
        name: '',
        hp: 0,
        attack: 0,
        defense: 0,
        spcatk: 0,
        spcdef: 0,
        speed: 0,
        height: 0,
        weight: 0,
        image: '',
        types: []
      });
      setErrors({});
    } else {
      alert("Data is Incompleted. All fields must be filled");
    }
  }

  return (
    <div className={style.Form}>

      <div className={style.presentationForm}>
        <h1>Let's Register a New Pokémon!</h1>
        <NavLink to={'/home'}>
          <button>Back</button>
        </NavLink>
      </div>

      <div className={style.formContainer}>

        <div className={style.imgContainer}>
          <img className={style.imgForm} src='https://31.media.tumblr.com/11ba7df56075ffa8f27649ed437fc2d1/tumblr_mt10t8YbwE1svfmkro1_500.gif' alt="pokedexImg"/>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div className={style.inputs}>
              <div className={style.inputName}>
                <label className={style.labelForm}>Name:</label>
                <input 
                  name='name'
                  placeholder='Insert Name of Pokémon'
                  type='text'
                  value={pkmnFormData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className={style.error}>{errors.name}</p>
                )}
              </div>

              <div className={style.inputHp}>
                <label className={style.labelForm}>HP:</label>
                <input 
                  name='hp'
                  placeholder='Insert HP Stat (Health Points)'
                  type='number'
                  value={pkmnFormData.hp}
                  onChange={handleChange}
                />
                {errors.hp && (
                  <p className={style.error}>{errors.hp}</p>
                )}
              </div>

              <div className={style.inputAttack}>
                <label className={style.labelForm}>Attack:</label>
                <input 
                  name='attack'
                  placeholder='Insert Attack Stat'
                  type='number'
                  value={pkmnFormData.attack}
                  onChange={handleChange}
                />
                {errors.attack && (
                  <p className={style.error}>{errors.attack}</p>
                )}
              </div>

              <div className={style.inputDefense}>
                <label className={style.labelForm}>Defense:</label>
                <input 
                  name='defense'
                  placeholder='Insert Defense Stat'
                  type='number'
                  value={pkmnFormData.defense}
                  onChange={handleChange}
                />
                {errors.defense && (
                  <p className={style.error}>{errors.defense}</p>
                )}
              </div>

              <div className={style.inputSpcAtk}>
                <label className={style.labelForm}>Special Attack:</label>
                <input 
                  name='spcatk'
                  placeholder='Insert Special Attack Stat'
                  type='number'
                  value={pkmnFormData.spcatk}
                  onChange={handleChange}
                />
                {errors.spcatk && (
                  <p className={style.error}>{errors.spcatk}</p>
                )}
              </div>

              <div className={style.inputSpcDef}>
                <label className={style.labelForm}>Special Defense:</label>
                <input 
                  name='spcdef'
                  placeholder='Insert Special Defense Stat'
                  type='number'
                  value={pkmnFormData.spcdef}
                  onChange={handleChange}
                />
                {errors.spcdef && (
                  <p className={style.error}>{errors.spcdef}</p>
                )}
              </div>

              <div className={style.inputSpeed}>
                <label className={style.labelForm}>Speed:</label>
                <input 
                  name='speed'
                  placeholder='Insert Speed Stat'
                  type='number'
                  value={pkmnFormData.speed}
                  onChange={handleChange}
                />
                {errors.speed && (
                  <p className={style.error}>{errors.speed}</p>
                )}
              </div>

              <div className={style.inputHeight}>
                <label className={style.labelForm}>Height:</label>
                <input 
                  name='height'
                  placeholder='Insert Height'
                  type='number'
                  value={pkmnFormData.height}
                  onChange={handleChange}
                />
                {errors.height && (
                  <p className={style.error}>{errors.height}</p>
                )}
              </div>

              <div className={style.inputWeight}>
                <label className={style.labelForm}>Weight:</label>
                <input 
                  name='weight'
                  placeholder='Insert Weight'
                  type='number'
                  value={pkmnFormData.weight}
                  onChange={handleChange}
                />
                {errors.weight && (
                  <p className={style.error}>{errors.weight}</p>
                )}
              </div>

              <div className={style.inputImage}>
                <label className={style.labelForm}>Photo:</label>
                <input 
                  name='image'
                  placeholder='Insert a URL to see the Pokémon'
                  type='text'
                  value={pkmnFormData.image}
                  onChange={handleChange}
                />
                {errors.image && (
                  <p className={style.error}>{errors.image}</p>
                )}
              </div>

              <div className={style.inputTypes}>
                <label className={style.labelForm}>Types:</label>
                <select
                  name="types"
                  value={pkmnFormData.types}
                  onChange={handleTypeChange}
                  multiple
                >
                  <option value="normal">Normal</option>
                  <option value="grass">Grass</option>
                  <option value="fire">Fire</option>
                  <option value="water">Water</option>
                  <option value="bug">Bug</option>
                  <option value="poison">Poison</option>
                  <option value="electric">Electric</option>
                  <option value="rock">Rock</option>
                  <option value="ground">Ground</option>
                  <option value="psychic">Psychic</option>
                  <option value="fighting">Fighting</option>
                  <option value="dark">Dark</option>
                  <option value="flying">Flying</option>
                  <option value="ghost">Ghost</option>
                  <option value="ice">Ice</option>
                  <option value="steel">Steel</option>
                  <option value="dragon">Dragon</option>
                  <option value="fairy">Fairy</option>
                  <option value="unknown">Unknown</option>
                  <option value="shadow">Shadow</option>
                </select >
                <label className={style.labelTypeInst}>To Select 2 Types, please keep push Ctrl and Select the 2 Types</label>
                {errors.types && (
                  <p className={style.error}>{errors.types}</p>
                )}
              </div>
            </div>

            <div className={style.divBtnSubmit}>
              <button className={style.btnSubmit} type="submit">Submit</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPokemon: (pkmnFormData) => dispatch(createPokemon(pkmnFormData))
  };
};

export default connect(null, mapDispatchToProps)(Form);