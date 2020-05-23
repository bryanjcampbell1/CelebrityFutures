import React, { Component } from 'react'
import {Button, Row, Col, InputGroup, FormControl, Card, Image, Table} from 'react-bootstrap';
import ABIs from "./abis";

export default class CollateralizedShares extends Component {
    constructor(props) {
        super(props);

    }

    async withdraw(){

        let address = '0xa7Efdc8745a8a8D9C6D6DB60cF18056675C42fC4';
        let TravisScottContract = new this.props.web3.eth.Contract(ABIs.empABI, address);

        await TravisScottContract.methods.withdrawPassedRequest().send({from: this.props.accounts[0]})
            .then(function(receipt){
                // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
                console.log(receipt);
            });
    }

    render() {
        return (
            <div >
                <div style={{display:'flex', marginTop:10, marginLeft:10}}>
                    <p style={{fontSize:20, fontWeight:'bold', color:'slate'}}>Manage Collateral</p>
                </div>
                <div style={{display:'flex', marginTop:10, marginLeft:10}}>
                    <p style={{fontSize:16, fontWeight:'bold', color:'slate'}}>Artist</p>
                    <p style={{fontSize:16, fontWeight:'bold', color:'grey', marginLeft:10}}>{this.props.artist.artist}</p>
                </div>
                <div style={{display:'flex', marginLeft:10, marginTop:-10 }}>
                    <p style={{fontSize:16, fontWeight:'bold', color:'slate'}}>Total Shares</p>
                    <p style={{fontSize:16, fontWeight:'bold', color:'grey', marginLeft:10}}>{this.props.artist.quantityCreated}</p>
                </div>
                <div style={{display:'flex', marginLeft:10, marginTop:-10 }}>
                    <p style={{fontSize:16, fontWeight:'bold', color:'slate'}}>Value</p>
                    <p style={{fontSize:16, fontWeight:'bold', color:'grey', marginLeft:10}}>{this.props.artist.currentValueOfShares}</p>
                </div>
                <div style={{display:'flex', marginLeft:10, marginTop:-10 }}>
                    <p style={{fontSize:16, fontWeight:'bold', color:'slate'}}>Collateral</p>
                    <p style={{fontSize:16, fontWeight:'bold', color:'grey', marginLeft:10}}>{this.props.artist.collateral}</p>
                </div>
                <div style={{display:'flex', marginLeft:10, marginTop:-10 }}>
                    <p style={{fontSize:16, fontWeight:'bold', color:'slate'}}>Minimum Collateral</p>
                    <p style={{fontSize:16, fontWeight:'bold', color:'grey', marginLeft:10}}>
                        {this.props.artist.minimumCollateralizationRatio *  this.props.artist.currentValueOfShares}
                    </p>
                </div>

                <div style={{display:'flex', flexDirection:'column', alignItems:'center', margin:40, marginTop:20}}>
                    <Button onClick={this.props.onAddClick} size="lg" style={{ background:'whitesmoke', fontSize:22, color:'slategrey'}} block>
                        Deposit Collateral
                    </Button>
                    <Button  onClick={this.props.onWithdrawClick}  size="lg" style={{ marginTop:20, background:'slategray', fontSize:22, color:'whitesmoke'}} block>
                        Request Withdraw
                    </Button>
                </div>

                <hr/>
                <div style={{display:'flex', marginLeft:10, }}>
                    <p style={{fontSize:16, fontWeight:'bold', color:'slate'}}>Approved to Withdraw</p>
                    <p style={{fontSize:16, fontWeight:'bold', color:'grey', marginLeft:10}}>{this.props.artist.quantityCreated}</p>
                </div>

                <div style={{display:'flex', flexDirection:'column', alignItems:'center', margin:40, marginTop:10,  }}>

                    <Button  onClick={() => this.withdraw() }  size="lg"  style={{ margin:20, background:'slategray', fontSize:22, color:'whitesmoke'}} block>
                        Withdraw
                    </Button>
                </div>

            </div>
        )
    }
}


