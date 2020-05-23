import React, { Component } from 'react'
import {Button, Row, Col, InputGroup, FormControl, Card, Image, Table} from 'react-bootstrap';

export default class AssetTab extends Component {
    constructor(props) {
        super(props);


    }
    render() {
        return (
            <div >
                <div style={{display:'flex', marginTop:10, marginLeft:10}}>
                    <p style={{fontSize:20, fontWeight:'bold', color:'slate'}}>Artist</p>
                    <p style={{fontSize:18, fontWeight:'bold', color:'grey', marginLeft:10}}>{this.props.artist.artist}</p>
                </div>
                <div style={{display:'flex', marginLeft:10, marginBottom:10 }}>
                    <p style={{fontSize:16, fontWeight:'bold', color:'slate'}}>Total Shares</p>
                    <p style={{fontSize:16, fontWeight:'bold', color:'grey', marginLeft:10}}>{this.props.artist.quantity}</p>
                </div>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <Button onClick={this.props.onBuyClick} size="lg" style={{ width:180, background:'whitesmoke', fontSize:22, color:'slategrey'}}>
                        Buy Shares
                    </Button>
                    <Button  onClick={this.props.onSellClick}  size="lg" style={{ margin:15, width:180, background:'slategray', fontSize:22, color:'whitesmoke'}}>
                        Sell Shares
                    </Button>
                </div>




                <p style={{ marginTop:20, marginLeft:10, fontSize:20, fontWeight:'bold', color:'slate'}}>History</p>
                <Table responsive>
                    <tbody>
                    <tr>
                        <td>Lil Wayne</td>
                        <td>3.0 Shares</td>
                        <td style={{color:'grey'}}>02/01/20</td>
                    </tr>
                    <tr>
                        <td>Lil Yaughty</td>
                        <td>2.0 Shares</td>
                        <td style={{color:'grey'}}>02/01/20</td>
                    </tr>
                    <tr>
                        <td>Lil Pump</td>
                        <td>7.5 Shares</td>
                        <td style={{color:'grey'}}>02/01/20</td>
                    </tr>
                    <tr>
                        <td>Lil Peep</td>
                        <td>6.5 Shares</td>
                        <td style={{color:'grey'}}>02/01/20</td>
                    </tr>
                    </tbody>
                </Table>
                <div style={{display:'flex', justifyContent:'flex-start'}}>
                    <p style={{fontSize:16, fontWeight:'bold', color:'slate', margin:20}}>Shares Created &nbsp;</p>
                    <p style={{fontSize:16, fontWeight:'bold', color:'grey', margin:20}}>(Bet Against)</p>
                </div>
                <Table responsive>
                    <tbody>
                    <tr>
                        <td>Big Pun</td>
                        <td>3.0 Shares</td>
                        <td style={{color:'grey'}}>02/01/20</td>
                    </tr>
                    <tr>
                        <td>Notorious BIG</td>
                        <td>2.0 Shares</td>
                        <td style={{color:'grey'}}>02/01/20</td>
                    </tr>
                    <tr>
                        <td>Fat Joe</td>
                        <td>7.5 Shares</td>
                        <td style={{color:'grey'}}>02/01/20</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}


