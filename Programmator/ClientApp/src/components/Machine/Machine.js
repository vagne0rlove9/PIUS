import React, { useEffect, Component } from 'react';
import './Machine.css'
import * as SignalR from '@aspnet/signalr';

class Machine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hubConnection: null,
            blocksYZ: [],
            blocksXZ: [],
            blocksXY: [],
            curX: 1,
            curY: 1,
            curZ: 1,
            maxX: 0,
            maxY: 0,
            maxZ: 0,
            delay: 500,
            delayIter: 500,
            delayX: 500,
            delayY: 500,
            delayZ: 500,
        };
    }

    componentDidMount() {
        this.setConnection();
        this.setBlocksYZ();
        this.setBlocksXZ();
        this.setBlocksXY();
    }

    setBlocksYZ() {
        var blocks = []
        for (var i = 0; i < 42; i++) {
            if (i % 7 !== 0) {
                blocks.push(<div id={"yz" + i}  key={i} className="block-init-yz"/>)
            } else {
                blocks.push(<br key={i} />)
            }
        }
        this.setState({ blocksYZ: blocks })
    }

    setBlocksXZ() {
        var blocks = []
        for (var i = 0; i < 156; i++) {
            if (i % 26 !== 0) {
                blocks.push(<div id={"xz" + i} key={i} className="block-init-xz" />)
            } else {
                blocks.push(<br key={i} />)
            }
        }
        this.setState({ blocksXZ: blocks })
    }

    setBlocksXY() {
        var blocks = []
        for (var i = 0; i < 156; i++) {
            if (i % 26 !== 0) {
                blocks.push(<div id={"xy" + i} key={i} className="block-init-xy" />)
            } else {
                blocks.push(<br key={i} />)
            }
        }
        this.setState({ blocksXY: blocks })
    }

    setConnection() {
        const hubConnection = new SignalR.HubConnectionBuilder().withUrl("/commandhub").build();

        this.setState({ hubConnection }, () => {
            this.state.hubConnection
                .start()
                .then(() => console.log('Connection started!'))
                .catch(err => console.log('Error while establishing connection :('));

            this.state.hubConnection.on('ReceiveMessage', (recievedMessage) => {
                //console.log(recievedMessage.split(' '))
                this.setState({
                    maxX: recievedMessage.split(' ')[0],
                    maxY: recievedMessage.split(' ')[1],
                    maxZ: recievedMessage.split(' ')[2],
                    delay: recievedMessage.split(' ')[3],
                }, () => { this.setDelayIter() }) 

            })
        })
    }

    setDelayIter() {
        let max = Math.max(this.state.curX + Number(this.state.maxX) - 1, this.state.curY + Number(this.state.maxY) - 1, this.state.curZ + Number(this.state.maxZ) - 1);

        this.setState({
            delayIter: max * this.state.delay,
            delayX: (this.state.curX + Number(this.state.maxX) - 1) * this.state.delay,
            delayY: (this.state.curY + Number(this.state.maxY) - 1) * this.state.delay,
            delayZ: (this.state.curZ + Number(this.state.maxZ) - 1) * this.state.delay
        }, () => {
            this.deleteBlockInXZ();
            this.deleteBlockInYZ();
            this.deleteBlockInXY();
        })
        
    }

    rigthMovaeXZ(str) {
        console.log("r" + str)
        let interval;
        let ind = this.state.curX + 1;

        interval = setInterval(() => { console.log("xz" + Number(ind + 26 * str)); document.getElementById("xz" + Number(ind + 26 * str)).style.backgroundColor = "white"; document.getElementById("xz" + Number(ind + 26 * str)).style.border = "1px solid"; ind++ }, this.state.delay);
        setTimeout(() => { clearInterval(interval) }, this.state.delay * (this.state.curX + Number(this.state.maxX) - 1));
    }

    leftMovaeXZ(str) {
        console.log("le" + str)
        let interval;
        let ind = this.state.curX + Number(this.state.maxX);

        interval = setInterval(() => { document.getElementById("xz" + Number(ind + 26 * str)).style.backgroundColor = "white"; document.getElementById("xz" + Number(ind + 26 * str)).style.border = "1px solid"; ind-- }, this.state.delay);
        setTimeout(() => { clearInterval(interval) }, this.state.delay * (this.state.curX + Number(this.state.maxX) - 1));
    }

    deleteBlockInXZ() {
        for (let i = 0; i < this.state.maxZ; i++) {
            console.log(i);
            if (i === 0)
                this.rigthMovaeXZ(i);
            else {
                if (i % 2 === 0)
                    setTimeout(() => this.rigthMovaeXZ(i), this.state.delayIter * i);
                else setTimeout(() => this.leftMovaeXZ(i), this.state.delayIter * i);
            }
        }
    }

    rigthMovaeYZ(str) {
        console.log("r" + str)
        let interval;
        let ind = this.state.curY + 1;

        //interval = setInterval(() => { document.getElementById("yz" + Number(ind + 7 * str)).style.backgroundColor = "white"; document.getElementById("yz" + Number(ind + 7 * str)).style.border = "1px solid"; ind++ }, this.state.delay);
        //setTimeout(() => { clearInterval(interval) }, this.state.delay * (this.state.curY + Number(this.state.maxY) - 1));
        //interval = setInterval(() => { document.getElementById("yz" + Number(ind + 7 * str)).style.backgroundColor = "white"; document.getElementById("yz" + Number(ind + 7 * str)).style.border = "1px solid"; ind-- }, this.state.delay);
        interval = setInterval(() => { document.getElementById("yz" + Number(ind + 7 * str)).style.backgroundColor = "white"; document.getElementById("yz" + Number(ind + 7 * str)).style.border = "1px solid"; ind++ }, this.state.delayX);
        setTimeout(() => { clearInterval(interval) }, this.state.delayX * (this.state.curY + Number(this.state.maxY) - 1));
    }

    leftMovaeYZ(str) {
        console.log("le" + str)
        let interval;
        let ind = this.state.curY + Number(this.state.maxY);
        
        //interval = setInterval(() => { document.getElementById("yz" + Number(ind + 7 * str)).style.backgroundColor = "white"; document.getElementById("yz" + Number(ind + 7 * str)).style.border = "1px solid"; ind-- }, this.state.delay);
        interval = setInterval(() => { document.getElementById("yz" + Number(ind + 7 * str)).style.backgroundColor = "white"; document.getElementById("yz" + Number(ind + 7 * str)).style.border = "1px solid"; ind-- }, this.state.delayX);
        setTimeout(() => { clearInterval(interval) }, this.state.delayX * (this.state.curY + Number(this.state.maxY) - 1));
    }

    deleteBlockInYZ() {
        for (let i = 0; i < this.state.maxZ; i++) {
            console.log(i);
            if (i === 0)
                this.rigthMovaeYZ(i);
            else {
                if (i % 2 === 0)
                    setTimeout(() => this.rigthMovaeYZ(i), this.state.delayIter * i);
                else setTimeout(() => this.leftMovaeYZ(i), this.state.delayIter * i);
            }
        }
    }

    rigthMovaeXY(str) {
        console.log("r" + str)
        let interval;
        let ind = this.state.curX + 27;

        interval = setInterval(() => { document.getElementById("xy" + Number(ind + 26 * str)).style.backgroundColor = "white"; document.getElementById("xy" + Number(ind + 26 * str)).style.border = "1px solid"; ind++ }, this.state.delay);
        setTimeout(() => { clearInterval(interval) }, this.state.delay * (this.state.curX + Number(this.state.maxX) - 1));
    }

    leftMovaeXY(str) {
        console.log("le" + str)
        let interval;
        let ind = this.state.curX + 26 + Number(this.state.maxX);

        interval = setInterval(() => { document.getElementById("xy" + Number(ind + 26 * str)).style.backgroundColor = "white"; document.getElementById("xy" + Number(ind + 26 * str)).style.border = "1px solid"; ind-- }, this.state.delay);
        setTimeout(() => { clearInterval(interval) }, this.state.delay * (this.state.curX + Number(this.state.maxX) - 1));
    }

    deleteBlockInXY() {
        for (let i = 0; i < this.state.maxY; i++) {
            console.log(i);
            if (i === 0)
                this.rigthMovaeXY(i);
            else {
                if (i % 2 === 0)
                    setTimeout(() => this.rigthMovaeXY(i), this.state.delayIter * i);
                else setTimeout(() => this.leftMovaeXY(i), this.state.delayIter * i);
            }
        }
    }

    render() {
        return (
            <div className="container-form">
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Станок</h2>
                <div className="container-row-first">
                    <div className="container-xz">
                        <h5 style={{ textAlign: "center", marginBottom: "20px" }}>Вид сбоку XZ</h5>
                        <div className="container-center">
                            {
                                this.state.blocksXZ
                                    ?
                                    this.state.blocksXZ.map((item, index) => {
                                        return item;
                                    })
                                    : null
                            }
                        </div>
                    </div>
                    <div className="container-yz">
                        <h5 style={{ textAlign: "center", marginBottom: "20px" }}>Вид спереди YZ</h5>
                        <div className="container-center">
                            {
                                this.state.blocksYZ
                                    ?
                                    this.state.blocksYZ.map((item, index) => {
                                        return item;
                                    })
                                    : null
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <div className="container-xy">
                        <h5 style={{ textAlign: "center", marginBottom: "20px" }}>Вид сверху XY</h5>
                        <div className="container-center">
                            {
                                this.state.blocksXY
                                    ?
                                    this.state.blocksXY.map((item, index) => {
                                        return item;
                                    })
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Machine;
