import React from 'react';

import classes from './Player.module.css'
import cardIcon from './gaming.svg'



const player = (props) => {
    let styledPlayer = [classes.player], score = "?";
    if (props.active) {
        styledPlayer.push(classes.active);
        score = props.score;
    }
    return (
        <div className={styledPlayer.join(' ')} >
            <img src={props.avatar} alt="Avatar" className={classes.avatar} />
            <div className={classes.name}>{props.name}</div>
            <div>
                <img className={classes.icon} src={cardIcon} alt="Cards" />
                <p className={classes.text}>{props.cardNumber}</p>
            </div>
            <div className={classes.score}>{score}</div>
        </div>
    )
}

export default player;