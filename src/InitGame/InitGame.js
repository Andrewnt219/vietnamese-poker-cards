import React from 'react';
import classes from './InitGame.module.css'

const initGame = (props) => {
    let players =[];
    for (let i = 0; i < props.count; i++) {
        players[i] = (
            <div className={classes.player}>
                <label htmlFor="">
                    <p classname={classes.p}>Player {i + 1}'s name</p><input className={classes.inputName} type="text" onChange={(event) => {props.changeName(event, i)}}/>
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