import React, { Component, Fragment } from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import PropTypes from 'prop-types'  
import { ThemeConsumer } from '../contexts/theme'
import { Link } from 'react-router-dom'

function Instructions () {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <div className='instructions-container'>
            <h1 className="center-text header-lg">Instructions</h1>
            <ul className="container-sm grid center-text battle-instructions">
              <li>
                <h3 className="header-sm">
                  Enter two github users
                </h3>
                <FaUserFriends className={`bg-${theme}`} color='#ffbf74' size={140}/>                   
              </li>
              <li>
                <h3 className="header-sm">
                  Battle
                </h3>
                <FaFighterJet className={`bg-${theme}`} color='#727272' size={140} />
              </li>
              <li>
                <h3 className="header-sm">
                  See Winners
                </h3>
                <FaTrophy className={`bg-${theme}`} color='#ffd700' size={140} />
              </li>
            </ul>
          </div>
        )}

      </ThemeConsumer>
    )
}

class PlayerInput extends Component {
  state = {
    username: ''
  }


  handleChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state.username)
  }

  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <form className="column player" onSubmit={this.handleSubmit}>
            <label htmlFor="username" className="player-label">
              {this.props.label}
            </label>
            <div className="row player-inputs sy">
              <input 
                type="text"
                id='username'
                className={`input-${theme}`}
                placeholder='github-username'
                autoComplete='off'
                value={this.state.username}
                onChange={this.handleChange}
              />
              <button
                className={`btn ${theme === 'dark' ? 'btn-light' : 'btn-dark'}`}
                type='🇸ubmit'
                disabled={!this.state.username}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </ThemeConsumer>
    )   
  }
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

function PlayerPreview ({ username, onReset, label }) {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className="column player width">
          <h3 className="player-label">{label}</h3>
          <div className={`row bg-${theme} flex width-1`}>
            <div className="player-info">
                <img 
                  src={`https://github.com/${username}.png?size=180`} 
                  alt={`Avatar for ${username}`} 
                  className="avatar-small" 
                />
                <a 
                  href={`https://github.com/${username}`}
                  className='link'
                >
                  {username}
                </a>   
                </div>
                <button 
                  type='button'
                  className='btn btn-clear flex-center'
                  onClick={onReset}
                >
                  <FaTimesCircle color='rgb(194, 57, 42)' size={26} />
                </button>    
          </div>
        </div>
      )}
    </ThemeConsumer>
  )
}

PlayerPreview.propTypes = {
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

export default class Battle extends Component {
  state = {
    playerOne: null,
    playerTwo: null,
  }

  handleSubmit = (id, player) => {
    this.setState({
      [id]: player
    })
  }

  handleReset = ( id ) => {
    this.setState({
      [id]: null
    })
  }
    
    
  render () {

    const { playerOne, playerTwo } = this.state
/**
|--------------------------------------------------
|        if (battle === true) {
|         return (
|          <Result 
|            playerOne={playerOne} 
|            playerTwo={playerTwo}
|            onReset={() => this.setState({
|             playerOne: null,
|             playerTwo: null,
|             battle: false
|             })}
|           />
|          )
|        } 
|--------------------------------------------------
*/  
        
    return (
      <Fragment>
        <Instructions />
        <ThemeConsumer>
          {({ theme }) => (
            <div className="player-container">
              <h1 className="center-text header-lg">Players</h1>
              <div className="row space-around">
                  {playerOne === null ?
                      <PlayerInput label='Player One'
                      onSubmit={( player ) => this.handleSubmit('playerOne', player)}
                      />
                  :   <PlayerPreview 
                          username={playerOne} 
                          label='Player One' 
                          onReset={() => this.handleReset('playerOne')}
                      />
                  }

                  {playerTwo === null ?
                      <PlayerInput label='Player Two'
                      onSubmit={( player ) => this.handleSubmit('playerTwo', player)}
                      />
              :   <PlayerPreview 
                      username={playerTwo} 
                      label='Player Two' 
                      onReset={() => this.handleReset('playerTwo')}
                  />
              }
              </div>



              {playerOne && playerTwo && (
                  <Link
                    className={`btn btn-dark btn-space`}
                    to={{
                      pathname: '/battle/result',
                      search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
                    }}
                  >
                      Battle
                  </Link>
              )}
            </div>            
          )}
        </ThemeConsumer>

        {/* <PlayerInput 
            label='Label!'
            onSubmit={(value) => console.log(value)}
        /> */}
      </Fragment>
    )
  }
}
