import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createPokemon, getPkmnName } from '../../redux/actions';
import style from './Form.module.css';
import validateForm from './validation';

function Form({ createPokemon, getPkmnName }) {

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
  const isFormEmpty = Object.values(pkmnFormData).some(value => value === '' || value === 0);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setPkmnFormData({ ...pkmnFormData, [event.target.name]: event.target.value })
  };

  const handleTypeChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions);
    const selectedTypes = selectedOptions.map((option) => option.value);
    setPkmnFormData({ ...pkmnFormData, types: selectedTypes });
  };

  const handleSubmit = async (event) => {
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
    
    const existingPkmn = await getPkmnName(pkmnFormData.name);
    if (existingPkmn) {
      window.alert(`The Pokémon "${pkmnFormData.name}" already Exists`)
    } else {
      if (Object.keys(errors).length === 0) {
          createPokemon(pkmnFormData);
          alert("Data Completed Correctly. New Pokémon Registered!");
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
        alert("Data is Incompleted. All fields must be filled Correctly");
      }
    }
  }

  return (
    <div className={style.Form}>

      <div className={style.presentationForm}>
        <h1 className={style.h1Form}>Let's Register a New Pokémon!</h1>
        <NavLink to={'/home'}>
          <button className={style.btnForm}>Back</button>
        </NavLink>
      </div>

      <div className={style.formContainer}>

        <div className={style.inputsForm}>
          <form onSubmit={handleSubmit}>
            <div className={style.inputs}>
              <div className={style.inputSpace}>
                <div className={style.inputContainer}>
                  <label className={style.labelNormal}>Name</label>
                  <input  className={style.forInputs}
                    name='name'
                    placeholder='Insert Name of Pokémon'
                    type='text'
                    value={pkmnFormData.name}
                    onChange={handleChange}
                  />
                </div>
                {errors.name && (
                  <p className={style.error}>{errors.name}</p>
                )}
              </div>

              <div className={style.inputSpace}>
                <div className={style.inputContainer}>
                <label className={style.labelHP}>HP</label>
                  <input  className={style.forInputs}
                    name='hp'
                    placeholder='Insert HP Stat (Health Points)'
                    type='number'
                    value={pkmnFormData.hp}
                    onChange={handleChange}
                  />
                </div>
                {errors.hp && (
                  <p className={style.error}>{errors.hp}</p>
                )}
              </div>

              <div className={style.inputSpace}>
                <div className={style.inputContainer}>
                <label className={style.labelAtk}>Attack</label>
                  <input  className={style.forInputs}
                    name='attack'
                    placeholder='Insert Attack Stat'
                    type='number'
                    value={pkmnFormData.attack}
                    onChange={handleChange}
                  />
                </div>
                {errors.attack && (
                  <p className={style.error}>{errors.attack}</p>
                )}
              </div>

              <div className={style.inputSpace}>
                <div className={style.inputContainer}>
                  <label className={style.labelDef}>Defense</label>
                  <input  className={style.forInputs}
                    name='defense'
                    placeholder='Insert Defense Stat'
                    type='number'
                    value={pkmnFormData.defense}
                    onChange={handleChange}
                  />
                </div>
                {errors.defense && (
                  <p className={style.error}>{errors.defense}</p>
                )}
              </div>

              <div className={style.inputSpace}>
                <div className={style.inputContainer}>
                  <label className={style.labelSpcAtk}>Special Attack</label>
                  <input  className={style.forInputs}
                    name='spcatk'
                    placeholder='Insert Special Attack Stat'
                    type='number'
                    value={pkmnFormData.spcatk}
                    onChange={handleChange}
                  />
                </div>
                {errors.spcatk && (
                  <p className={style.error}>{errors.spcatk}</p>
                )}
              </div>

              <div className={style.inputSpace}>
                <div className={style.inputContainer}>
                  <label className={style.labelSpcDef}>Special Defense</label>
                  <input  className={style.forInputs}
                    name='spcdef'
                    placeholder='Insert Special Defense Stat'
                    type='number'
                    value={pkmnFormData.spcdef}
                    onChange={handleChange}
                  />
                </div>
                {errors.spcdef && (
                  <p className={style.error}>{errors.spcdef}</p>
                )}
              </div>

              <div className={style.inputSpace}>
                <div className={style.inputContainer}>
                  <label className={style.labelSpeed}>Speed</label>
                  <input  className={style.forInputs}
                    name='speed'
                    placeholder='Insert Speed Stat'
                    type='number'
                    value={pkmnFormData.speed}
                    onChange={handleChange}
                  />
                </div>
                {errors.speed && (
                  <p className={style.error}>{errors.speed}</p>
                )}
              </div>

              <div className={style.inputSpace}>
                <div className={style.inputContainer}>
                  <label className={style.labelNormal}>Height (dm)</label>
                  <input  className={style.forInputs}
                    name='height'
                    placeholder='Insert Height'
                    type='number'
                    value={pkmnFormData.height}
                    onChange={handleChange}
                  />
                </div>
                {errors.height && (
                  <p className={style.error}>{errors.height}</p>
                )}
              </div>

              <div className={style.inputSpace}>
                <div className={style.inputContainer}>
                <label className={style.labelNormal}>Weight (Hg)</label>
                  <input  className={style.forInputs}
                    name='weight'
                    placeholder='Insert Weight'
                    type='number'
                    value={pkmnFormData.weight}
                    onChange={handleChange}
                  />
                </div>
                {errors.weight && (
                  <p className={style.error}>{errors.weight}</p>
                )}
              </div>

              <div className={style.inputSpace}>
                <div className={style.inputContainer}>
                  <label className={style.labelNormal}>Photo</label>
                  <input className={style.forInputs}
                    name="image"
                    placeholder="Insert a URL to see the Pokémon"
                    type='text'
                    value={pkmnFormData.image}
                    onChange={handleChange}
                  /> 
                </div>
                {errors.image && (
                  <p className={style.error}>{errors.image}</p>
                )}
              </div>

              <div className={style.inputSpace}>
                <div className={style.inputContainer}>
                  <label className={style.labelTypes}>Types</label>
                  <select className={style.forInputs}
                    name="types"
                    value={pkmnFormData.types}
                    onChange={handleTypeChange}
                    multiple
                  >
                    <option className={style.oNormal} value="normal">Normal</option>
                    <option className={style.oGrass} value="grass">Grass</option>
                    <option className={style.oFire} value="fire">Fire</option>
                    <option className={style.oWater} value="water">Water</option>
                    <option className={style.oBug} value="bug">Bug</option>
                    <option className={style.oPoison} value="poison">Poison</option>
                    <option className={style.oElectric} value="electric">Electric</option>
                    <option className={style.oRock} value="rock">Rock</option>
                    <option className={style.oGround} value="ground">Ground</option>
                    <option className={style.oPsychic} value="psychic">Psychic</option>
                    <option className={style.oFighting} value="fighting">Fighting</option>
                    <option className={style.oDark} value="dark">Dark</option>
                    <option className={style.oFlying} value="flying">Flying</option>
                    <option className={style.oGhost} value="ghost">Ghost</option>
                    <option className={style.oIce} value="ice">Ice</option>
                    <option className={style.oSteel} value="steel">Steel</option>
                    <option className={style.oDragon} value="dragon">Dragon</option>
                    <option className={style.oFairy} value="fairy">Fairy</option>
                    <option className={style.oUnknown} value="unknown">Unknown</option>
                    <option className={style.oShadow} value="shadow">Shadow</option>
                  </select>
                </div>
                {errors.types && (
                  <p className={style.error}>{errors.types}</p>
                )}
              </div>
            </div>

            <div>
              <label className={style.labelTypeInfo}>To Select 2 Types, please keep push "Ctrl" and Select the 2 Types</label>
            </div>

            <div className={style.divBtnSubmit}>
              <button className={style.btnForm} type="submit" disabled={isFormEmpty}>Submit</button>
            </div>
          </form>
        </div>

        <div className={style.imgContainer}>
          <img className={style.imgForm} src='https://31.media.tumblr.com/11ba7df56075ffa8f27649ed437fc2d1/tumblr_mt10t8YbwE1svfmkro1_500.gif' alt="pokedexImg"/>
        </div>

      </div>


    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPokemon: (pkmnFormData) => dispatch(createPokemon(pkmnFormData)),
    getPkmnName: (name) => dispatch(getPkmnName(name))
  };
};

export default connect(null, mapDispatchToProps)(Form);