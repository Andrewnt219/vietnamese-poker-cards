import React from 'react';
import classes from './InitGame.module.css'
const initGame = (props) => {
    let players =[], changeName = props.changeName;
    for (let i = 0; i < props.count; i++) {
        players[i] = (
            <div className={classes.player} key={props.players[i].id}>
                <label htmlFor="">
                    <p>Player {i + 1}'s name</p><input type="text" onChange={(event) => {changeName(event, i)}}/>
                </label>
            </div>
        )
    }
    return (
        <div className={classes.container}>
            {players}
        </div>
    )
}

export default initGame;