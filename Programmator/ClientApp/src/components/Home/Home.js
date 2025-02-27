﻿import React, { Component } from 'react';
import Operator from '../Operator/Operator';
import './Home.css'

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div className="container-home">
                <button className="home-button" onClick={() => this.props.history.push('/operator')}>Пульт оператора</button>
                <button className="home-button">Станок</button>
            </div>
        );
    }
}
