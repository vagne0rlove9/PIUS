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
            delay: 500
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
                blocks.push(<div key={i} className="block-init-yz"/>)
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
                blocks.push(<div key={i} className="block-init-xz" />)
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
                blocks.push(<div key={i} className="block-init-xy" />)
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
                }, () => this.deleteBlockInXZ()) 

            })
        })
    }

    sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    delI(i) {
        this.sleep(this.state.delay*2)
        var blocks = this.state.blocksXZ
        blocks[i] = <div key={i} className="block-del-xz" />;
        this.setState({ blocksXZ: blocks })
    }

    deleteBlockInXZ() {
        var blocks = this.state.blocksXZ
        var blocks1 = this.state.blocksXZ
        var interval;

        blocks[1] = <div key={1015} className="block-del-xz" />;
        
        this.setState({ blocksXZ: blocks }, () => this.delI(2))

        //for (var i = this.state.curX + 1; i < this.state.curX + Number(this.state.maxX) + 1; i++) {
        //    blocks[i] = <div key={i} className="block-del-xz" />;
        //    //interval = setInterval(() => console.log(i), this.state.delay);
        //    this.sleep(this.state.delay * 2)
        //    console.log(i)
        //    await this.setState({ blocksXZ: blocks }, () => this.sleep(this.state.delay))
        //    //setTimeout(() => this.setState({ blocksXZ: blocks }), this.state.delay * i*i*i);
        //    //setTimeout(() => { clearInterval(interval) }, this.state.delay * this.state.maxX * this.state.maxY * this.state.maxZ);
        //}
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
