import React from 'react';

import classes from './Player.module.css'
import cardIcon from './gaming.svg'



const player = (props) => {

    return (
        <div className={classes.player}>
            <img src={props.avatar} alt="Avatar" className={classes.avatar} />
            <div className={classes.name}>{props.name}</div>
            <div>
                <img className={classes.icon} src={cardIcon} alt="Cards" />
                <p className={classes.text}>{props.cardNumber}</p>
            </div>
            <div className={classes.score}>{props.score}</div>
        </div>
    )
}

export default player;