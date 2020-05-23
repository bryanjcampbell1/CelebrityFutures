import React, { Component } from 'react'
import {Button, Row, Col, InputGroup, FormControl, Card, Image, Table} from 'react-bootstrap';



export default class History extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (
            <div >
                <p style={{fontSize:20, fontWeight:'bold', color:'slate', margin:10}}>History</p>
                <p style={{fontSize:16, fontWeight:'bold', color:'', margin:10}}>Shares Bought</p>
                <Table responsive>
                    <tbody>
                    {
                        this.props.history.map((row, id) => (
                            <tr key={row}  onClick={() => this.rowClicked(id) }>
                                <td >{row.artist}</td>
                                <td>{row.quantity} Shares</td>
                                <td style={{color:'grey'}}>{row.date}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
                <div style={{display:'flex', justifyContent:'flex-start'}}>
                    <p style={{fontSize:16, fontWeight:'bold', color:'slate', margin:20}}>Shares Created&nbsp;</p>
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


