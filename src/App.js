import React, { Component } from 'react';
import classes from './App.module.css';
import Player from './Player/Player'
import InitGame from './InitGame/InitGame'

class App extends Component {
  state = {
    /* Game stats */
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
    gameEnd: false,
    /* display controls */
    showInit: true,
    showGame: false
  }

  /* Game initialization phase */
  /* Custom number of players */
  playerNumberHandler = (event) => {
    let playerCount = event.target.value, error = "";
    if (playerCount > 15) {
      error = "Maximum 15 players!"
      playerCount = 15;
    }
    const players = [];
    for (let i = 0; i < playerCount; i++) {
      players.push({
        asset: 200,
        id: `player-${i}`,
        name: `player-${i}`,
        card: [],
        /* cardNumber: 0, */ //remove due to inconsistent
        bet: 50,
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
  gameStart = (event) => {
    /* Start game with custom asset 
    const players = [...this.state.players];
    event.target.value === "Game Start!" ? players.map(player => {player.}) */

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

    /* hide init */
    /* display Game UI */
    this.setState({ players: players, card: card, showInit: false, showGame: true, error:"" });

  }

  /* Game phase */
  draw = () => {
    const players = [...this.state.players];
    const activePlayer = players[this.utils.activePlayerIndex()];

    /* maximum 5 cards */
    if (activePlayer.card.length < 5) {
      const deck = this.state.card;
      activePlayer.card[activePlayer.card.length] = deck.pop();
      /* calculate score */
      const score = activePlayer.card.reduce((score, cardValue) => score + cardValue)
      /* announce winner if card = 5 and value < 21 */
      this.setState({ players: players, error: "" })
    } else 
      this.setState({error:"5 cards max!"})
  }

  deal = () => {
    /* if last player then announce winner */
    if (this.state.turn === Number(this.state.playerCount - 1)) {
      /* disable */
      this.setState({ gameEnd: true, error:"" });
      /* Result here */
    } else {
      /* only deal if score > 16 */
      const players = [...this.state.players];
      const activePlayer = players[this.utils.activePlayerIndex()];
      if (activePlayer.card.reduce((score, cardValue) => score + cardValue) > 15) {
        let turn = this.state.turn;
        turn++;
        this.setState({ turn: turn, error:"" });
      } else this.setState({error: "Score > 15 to deal"})
    }
    /* set active */
  }

  /* Utilities */
  utils = {
    joinClass: (...css) => css.join(' '),
    activePlayerIndex: () => this.state.turn % this.state.playerCount
  }
  render() {
    /* Init UI */
    let init = (
      <div className={classes.init}>
        <label htmlFor="">Numbers of players<br /><input type="number" max="15" onChange={this.playerNumberHandler} /></label>
        <InitGame changeName={this.changeName} count={this.state.playerCount} players={[...this.state.players]} />
        <button onClick={this.gameStart} value="Game Start">Game Start!</button>
        <button onClick={this.gameStart} value="Quick Start">Quick Start</button>
      </div>
    );
    if (!this.state.showInit) init = null;

    /* Gaminng UI */
    let game = null, playerComponent = null, btn = null;
    if (this.state.showGame) {
      playerComponent = [...this.state.players].map(player => {
        const score = player.card.reduce((score, cardValue) => score + cardValue);
        return (
          <Player name={player.name} card={player.card} cardNumber={player.card.length} bet={player.bet} score={score > 21 ? "BUSTED" : score} />
        )
      })
      if (!this.state.gameEnd) btn = (
        <div className={classes.buttonControls}>
          <button className={classes.button} onClick={this.draw}>Draw</button>
          <button className={this.utils.joinClass(classes.button, classes.red)} onClick={this.deal}>Deal</button>
        </div>
      )
      game = (
        <div className={classes.gameUI}>
          {playerComponent}
          {btn}
        </div>
      )
    }

    /* Announcement phase */
    let result = null;
    return (
      <div className={classes.App} >
        {init}
        {game}
        {this.state.error}
      </div>
    );

  }
}

export default App;