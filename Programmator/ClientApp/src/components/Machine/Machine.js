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
            startX: 1,
            startY: 1,
            startZ: 1,
            delay: 500,
            delayIter: 500,
            delayX: 500,
            delayY: 500,
            delayZ: 500,
            readyXZ: false,
            readyXY: false,
            readyYZ: false,
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
                blocks.push(<div id={"yz" + i} key={i} className="block-init-yz" />)
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
            delayX: (this.state.startX + Number(this.state.maxX) - 1) * this.state.delay,
            delayY: (this.state.startX + Number(this.state.maxY) - 1) * this.state.delay,
            delayZ: (this.state.startX + Number(this.state.maxZ) - 1) * this.state.delay
        }, () => {
            this.deleteBlockInXZ();
            this.deleteBlockInYZ();
            this.deleteBlockInXY();
        })

    }

    rigthMoveXZ(str, count) {
        //console.log("r" + str)
        //let interval;
        //let ind;
        //if (count < this.state.maxX)
        //    ind = this.state.startX + 2;
        //else ind = this.state.startX + 1;

        //interval = setInterval(() => { document.getElementById("xz" + Number(ind + 26 * str)).style.backgroundColor = "white"; document.getElementById("xz" + Number(ind + 26 * str)).style.border = "1px solid"; ind++ }, this.state.delay);
        //setTimeout(() => { clearInterval(interval) }, this.state.delay * (count));
        let interval;
        let ind;
        ind = this.state.startX + 1;

        interval = setInterval(() => { document.getElementById("xz" + Number(ind + 26 * str)).style.backgroundColor = "white"; document.getElementById("xz" + Number(ind + 26 * str)).style.border = "1px solid"; ind++ }, this.state.delay);
        setTimeout(() => { clearInterval(interval) }, this.state.delayX + 100);
    }

    leftMoveXZ(str) {
        //console.log("le" + str)
        //let interval;

        //let ind = this.state.startX + Number(this.state.maxX);
        //let start = ind;
        //interval = setInterval(() => { document.getElementById("xz" + Number(ind + 26 * str)).style.backgroundColor = "white"; document.getElementById("xz" + Number(ind + 26 * str)).style.border = "1px solid"; ind-- }, this.state.delay);
        //setTimeout(() => {
        //    clearInterval(interval);
        //    //if ((start - ind) < (this.state.maxX)) {
        //    //    if ((start - ind) !== (this.state.maxX - 1)) {
        //    //        //setTimeout(() => { document.getElementById("xy" + Number(ind - 1 + 26 * (str + 1))).style.backgroundColor = "white"; document.getElementById("xy" + Number(ind - 1 + 26 * (str + 1))).style.border = "1px solid"; ind-- }, this.state.delay);
        //    //        document.getElementById("xz" + Number(ind - 1 + 26 * (str))).style.backgroundColor = "white"; document.getElementById("xz" + Number(ind - 1 + 26 * (str))).style.border = "1px solid";
        //    //    }
        //    //    else {
        //    //        document.getElementById("xz" + Number(ind + 26 * (str))).style.backgroundColor = "white"; document.getElementById("xz" + Number(ind + 26 * (str))).style.border = "1px solid";
        //    //    }
        //    //}
        //}, this.state.delayX);
        let interval;

        let ind = this.state.startX + Number(this.state.maxX);
        interval = setInterval(() => { document.getElementById("xz" + Number(ind + 26 * str)).style.backgroundColor = "white"; document.getElementById("xz" + Number(ind + 26 * str)).style.border = "1px solid"; ind-- }, this.state.delay);
        setTimeout(() => {clearInterval(interval);}, this.state.delayX + 100);
    }

    deleteBlockInXZ() {
        //setTimeout(() => {
        //    document.getElementById("xz" + Number(this.state.startX)).style.backgroundColor = "white";
        //    document.getElementById("xz" + Number(this.state.startX)).style.border = "1px solid";
        //}, this.state.delay);
        for (let i = 0; i < this.state.maxZ; i++) {
            if (i === 0)
                this.rigthMoveXZ(i);
            else {
                //if (i % 2 === 0)
                //    setTimeout(() => this.rigthMoveXZ(i, this.state.maxX), this.state.delayX * i * this.state.maxY);
                //else if (i === 1)
                //    setTimeout(() => this.leftMoveXZ(i), this.state.delayX * i * this.state.maxY);
                //else setTimeout(() => this.leftMoveXZ(i), this.state.delayX * i * this.state.maxY);
                if (i % 2 === 0)
                    setTimeout(() => this.rigthMoveXZ(i), this.state.delayX * i * this.state.maxY);
                else setTimeout(() => this.leftMoveXZ(i), this.state.delayX * i * this.state.maxY);
            }
        }
    }

    rigthMoveYZ(str, count) {
        //console.log("r" + str)
        //let interval;
        //let ind;
        //if (count < this.state.maxY)
        //    ind = this.state.startY + 2;
        //else ind = this.state.startY + 1;


        ////interval = setInterval(() => { document.getElementById("yz" + Number(ind + 7 * str)).style.backgroundColor = "white"; document.getElementById("yz" + Number(ind + 7 * str)).style.border = "1px solid"; ind++ }, this.state.delay);
        ////setTimeout(() => { clearInterval(interval) }, this.state.delay * (this.state.curY + Number(this.state.maxY) - 1));
        ////interval = setInterval(() => { document.getElementById("yz" + Number(ind + 7 * str)).style.backgroundColor = "white"; document.getElementById("yz" + Number(ind + 7 * str)).style.border = "1px solid"; ind-- }, this.state.delay);
        //interval = setInterval(() => { document.getElementById("yz" + Number(ind + 7 * str)).style.backgroundColor = "white"; document.getElementById("yz" + Number(ind + 7 * str)).style.border = "1px solid"; ind++ }, this.state.delayX);
        //setTimeout(() => { clearInterval(interval) }, this.state.delayX * (count));
        let interval;
        let ind;
        ind = this.state.startY + 1;

        interval = setInterval(() => { document.getElementById("yz" + Number(ind + 7 * str)).style.backgroundColor = "white"; document.getElementById("yz" + Number(ind + 7 * str)).style.border = "1px solid"; ind++ }, this.state.delayX);
        setTimeout(() => { clearInterval(interval) }, this.state.delayX * this.state.maxY + 100);
    }

    leftMoveYZ(str) {
        //console.log("le" + str)
        //let interval;
        //let ind = this.state.startY + Number(this.state.maxY);

        ////interval = setInterval(() => { document.getElementById("yz" + Number(ind + 7 * str)).style.backgroundColor = "white"; document.getElementById("yz" + Number(ind + 7 * str)).style.border = "1px solid"; ind-- }, this.state.delay);
        //interval = setInterval(() => { document.getElementById("yz" + Number(ind + 7 * str)).style.backgroundColor = "white"; document.getElementById("yz" + Number(ind + 7 * str)).style.border = "1px solid"; ind-- }, this.state.delayX);
        //setTimeout(() => { clearInterval(interval) }, this.state.delayX * (this.state.startY + Number(this.state.maxY) - 1));
        let interval;
        let ind = this.state.startY + Number(this.state.maxY);

        interval = setInterval(() => { document.getElementById("yz" + Number(ind + 7 * str)).style.backgroundColor = "white"; document.getElementById("yz" + Number(ind + 7 * str)).style.border = "1px solid"; ind-- }, this.state.delayX);
        setTimeout(() => { clearInterval(interval) }, this.state.delayX * this.state.maxY + 100);
    }

    deleteBlockInYZ() {
        //setTimeout(() => {
        //    document.getElementById("yz" + Number(this.state.startX)).style.backgroundColor = "white";
        //    document.getElementById("yz" + Number(this.state.startX)).style.border = "1px solid";
        //}, this.state.delay);
        for (let i = 0; i < this.state.maxZ; i++) {
            if (i === 0)
                this.rigthMoveYZ(i);
            else {
                //if (i % 2 === 0)
                //    setTimeout(() => this.rigthMoveYZ(i, this.state.maxY), this.state.delay * (this.state.startX + Number(this.state.maxX) - 1) * i);
                ////else setTimeout(() => this.leftMoveYZ(i), this.state.delayX * i);
                //else if (i === 1)
                //    setTimeout(() => this.leftMoveYZ(i), this.state.delay * (this.state.startX + Number(this.state.maxX) - 2) * i * this.state.maxY);
                //else setTimeout(() => this.leftMoveYZ(i), this.state.delayX * i);
                if (i % 2 === 0)
                    setTimeout(() => this.rigthMoveYZ(i), this.state.delayX * i * this.state.maxY);
                else setTimeout(() => this.leftMoveYZ(i), this.state.delayX * i * this.state.maxY);
            }
        }
    }

    rigthMoveXY(str, count) {
        //let interval;
        //let ind;
        //if (count < this.state.maxX)
        //    ind = this.state.startX + 28;
        //else ind = this.state.startX + 27;

        //interval = setInterval(() => { document.getElementById("xy" + Number(ind + 26 * str)).style.backgroundColor = "white"; document.getElementById("xy" + Number(ind + 26 * str)).style.border = "1px solid"; ind++ }, this.state.delay);
        //setTimeout(() => { clearInterval(interval); }, this.state.delay * (count));
        let interval;
        let ind;
        ind = this.state.startX + 27;

        interval = setInterval(() => { document.getElementById("xy" + Number(ind + 26 * str)).style.backgroundColor = "white"; document.getElementById("xy" + Number(ind + 26 * str)).style.border = "1px solid"; ind++ }, this.state.delay);
        setTimeout(() => { clearInterval(interval); }, this.state.delayX + 100);
    }

    leftMoveXY(str) {
        //console.log("leXY" + str)
        //let interval;
        //let ind = this.state.startX + Number(this.state.maxX);
        //let start = ind;

        //interval = setInterval(() => { document.getElementById("xy" + Number(ind + 26 * (str + 1))).style.backgroundColor = "white"; document.getElementById("xy" + Number(ind + 26 * (str + 1))).style.border = "1px solid"; ind-- }, this.state.delay);
        //setTimeout(() => {
        //    clearInterval(interval);
        //    //if ((start - ind) < (this.state.maxX)) {
        //    //    if ((start - ind) !== (this.state.maxX - 1)) {
        //    //        //setTimeout(() => { document.getElementById("xy" + Number(ind - 1 + 26 * (str + 1))).style.backgroundColor = "white"; document.getElementById("xy" + Number(ind - 1 + 26 * (str + 1))).style.border = "1px solid"; ind-- }, this.state.delay);
        //    //        document.getElementById("xy" + Number(ind - 1 + 26 * (str + 1))).style.backgroundColor = "white"; document.getElementById("xy" + Number(ind - 1 + 26 * (str + 1))).style.border = "1px solid";
        //    //    }
        //    //    else {
        //    //        document.getElementById("xy" + Number(ind + 26 * (str + 1))).style.backgroundColor = "white"; document.getElementById("xy" + Number(ind + 26 * (str + 1))).style.border = "1px solid"; ind--
        //    //    }
        //    //}
        //}, this.state.delayX);

        console.log("leXY" + str)
        let interval;
        let ind = this.state.startX + Number(this.state.maxX);

        interval = setInterval(() => { document.getElementById("xy" + Number(ind + 26 * (str + 1))).style.backgroundColor = "white"; document.getElementById("xy" + Number(ind + 26 * (str + 1))).style.border = "1px solid"; ind-- }, this.state.delay);
        setTimeout(() => { clearInterval(interval); }, this.state.delayX + 100);

    }

    deleteBlockInXY() {
        //setTimeout(() => {
        //    document.getElementById("xy" + Number(this.state.startX + 27)).style.backgroundColor = "white";
        //    document.getElementById("xy" + Number(this.state.startX + 27)).style.border = "1px solid";
        //}, this.state.delay); 
        for (let i = 0; i < this.state.maxY; i++) {
            if (i === 0)
                this.rigthMoveXY(i);
            else {
                if (i % 2 === 0)
                    setTimeout(() => this.rigthMoveXY(i), this.state.delayX * i);
                else setTimeout(() => this.leftMoveXY(i), this.state.delayX * i);
                //if (i % 2 === 0)
                //    setTimeout(() => this.rigthMoveXY(i, this.state.maxX), this.state.delayX * i);
                //else if (i === 1)
                //    setTimeout(() => this.leftMoveXY(i), this.state.delayX * i);
                //else setTimeout(() => this.leftMoveXY(i), this.state.delayX * i);
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
