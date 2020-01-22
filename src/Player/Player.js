import React from 'react';

import classes from './Player.module.css'
import betIcon from './poker.svg'
import cardIcon from './gaming.svg'

const player = (props) => {
    return (
        <div className={classes.player}>
            <p className={classes.name}>{props.name}</p>
            <img src={props.srcAvatar} alt="Avatar" className={classes.avatar} />
            <div >
                <img  className={classes.icon} src={betIcon} alt="Bet" />
                <p className={classes.text}>{props.bet}</p>
            </div>
            <div>
                <img className={classes.icon} src={cardIcon} alt="Cards" />
                <p className={classes.text}>{props.cardNumber}</p>
            </div>
            <div className={classes.score}>{props.score}</div>
        </div>
    )
}

export default player;