import React, { Component } from 'react';
import classes from './App.module.css';
import Player from './Player/Player'
import InitGame from './InitGame/InitGame'
import avatars from './Player/avatar/avatar.js'

class App extends Component {
  state = {
    /* Game resources */
    players: [],
    card: [
      1, 1, 1, 1,
      2, 2, 2, 2,
      3, 3, 3, 3,
      4, 4, 4, 4,
      5, 5, 5, 5,
      6, 6, 6, 6,
      7, 7, 7, 7,
      8, 8, 8, 8,
      9, 9, 9, 9,
      10, 10, 10, 10,
      10, 10, 10, 10,
      10, 10, 10, 10
    ],
    playerCount: 0,
    /* game controls */
    error: '',
    turn: 0,
    /* display controls */
    phase: 0 // 0: Init, 1: Game, 2: End
  }

  /* Game initialization phase */
  /* Custom number of players */
  playerNumberHandler = (event) => {
    let playerCount = event.target.value, error = "";
    if (playerCount > 10) {
      error = "Maximum 10 players!"
      playerCount = 10;
    }
    /* Random avatar allocate */
    for (let i = avatars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [avatars[i], avatars[j]] = [avatars[j], avatars[i]];
    }
    const players = [];
    let n = 0;
    for (let i = 0; i < playerCount; i++) {
      players.push({
        id: i,
        name: `player-${i}`,
        card: [],
        avatar: avatars[n++]
        /* cardNumber: 0, */ //remove due to inconsistent
        /*  score: 0 */ //remove due to inconsistent
      })
    }
    this.setState({ players: players, playerCount: playerCount, error: error });
  }
  /* Modify player's name */
  changeName = (event, index) => {
    const players = [...this.state.players];
    players[index].name = event.target.value;
    this.setState({ players: players })
  }
  gameStart = () => {
    if (this.state.playerCount > 1) {
      /* shuffle deck */
      const card = [...this.state.card];
      for (let i = card.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [card[i], card[j]] = [card[j], card[i]];
        console.log(j);
      }


      /* Distributes cards */
      let players = [...this.state.players];
      for (let i = 0; i < 2; i++) players = players.map(player => { player.card.push(card.pop()); return player });

      /* hide init & display game UI */
      this.setState({ players: players, card: card, phase: 1, error: "" });
    } else this.setState({ error: "There must be at least 2 players" })

  }

  /* Game phase */
  draw = () => {
    const players = [...this.state.players];
    const activePlayerIndex = this.state.turn % this.state.playerCount;
    const activePlayer = players[activePlayerIndex];

    /* maximum 5 cards */
    if (activePlayer.card.length < 5) {
      const deck = this.state.card;
      activePlayer.card[activePlayer.card.length] = deck.pop();
      /* calculate score */
      const score = activePlayer.card.reduce((score, cardValue) => score + cardValue)
      /* announce winner if card = 5 and value < 21 */
      if (activePlayer.card.length === 5 && score <= 21) { }

      this.setState({ players: players, error: "" })
    } else
      this.setState({ error: "5 cards max!" })
  }

  deal = () => {
    const players = [...this.state.players];
    const activePlayer = players[this.state.turn];
    /* if last player then announce winner */
    if (this.state.turn === Number(this.state.playerCount - 1) && players[this.state.playerCount - 1].card.reduce((score, cardValue) => score + cardValue) > 15) {
      /* End game */
      this.setState({ phase: 2, error: "" });
    } else {
      /* only deal if score > 16 */
      if (activePlayer.card.reduce((score, cardValue) => score + cardValue) > 15 || activePlayer.card.length === 5) {
        let turn = this.state.turn;
        turn++;
        this.setState({ turn: turn, error: "" });
      } else this.setState({ error: "Score > 15 to deal" })
    }
  }

  render() {
    let ui = null;
    switch (this.state.phase) {
      case 0:
        ui = (
          <div className={classes.init}>
            <h3>Numbers of players</h3>
            <input autofocus className={classes.inputNumber} type="number" max="10" onChange={this.playerNumberHandler} />
            <button className={classes.startBtn} onClick={this.gameStart} value="Game Start!">Game Start!</button>
            <InitGame changeName={this.changeName} count={this.state.playerCount} players={[...this.state.players]}  />
          </div>
        );
        break;
      case 1:
        const playerComponent = [...this.state.players].map(player => {
          const score = player.card.reduce((score, cardValue) => score + cardValue);
          const active = this.state.turn === Number(player.id);
          return (
            <Player key={player.name} active={active} avatar={player.avatar} name={player.name} card={player.card} cardNumber={player.card.length} score={score > 21 ? "BUSTED" : player.card.length === 5 ? "WINNER" : score} />
          )
        }
        )
        ui = (
          <div className={classes.game}>
            {playerComponent}
            <button className={classes.button} onClick={this.draw}>Draw</button>
            <button className={classes.button} onClick={this.deal}>Deal</button>
          </div>
        )
        break;
      case 2:
        ui = (<p>End Game &lt;&lt;In Construction&gt;&gt;</p>);
        break;
      default:
        ui = (<p>Whoops! Something went wrong ... </p>)
    }
    return (
      <div className={classes.App} >
        <h1 className={classes.title}>Vietnamese Poker</h1>
        <div className={classes.container}>
          {ui}
          <p className={classes.error}>{this.state.error}</p>
        </div>

      </div>
    );

  }
}

export default App;