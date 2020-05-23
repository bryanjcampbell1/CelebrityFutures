import React, { Component } from 'react'
import {Button, InputGroup, FormControl, Modal, Card} from 'react-bootstrap';

import {ChevronLeft, X, PlusCircle, DashCircle} from 'react-bootstrap-icons';
import getWeb3 from "./getWeb3";

import ABIs from "./abis";
let SynthTokenAddress = '0x7788d27d015C7f88dEDe5f3C5C66f8BAE8C6f955';

class SellModal extends Component {
    constructor(props) {
        super(props)

        this.state = {account: '',
            screen: 1,
            quantity: 0,
            moreDetails: false,
            web3: this.props.web3,
            accounts: this.props.accounts,
            popularity: null,
            synthBalance: null
        }
    }
    updateQuantity(e){
        this.setState({quantity:e})
    }


    moreDetails(){
        this.setState({moreDetails:true})
    }


    async sellShares(){

        //Gnache host 9545 address
        let address = '0xa7Efdc8745a8a8D9C6D6DB60cF18056675C42fC4';
        let TravisScottContract = new this.state.web3.eth.Contract(ABIs.empABI, address);

        let synthTokenAmount = this.state.quantity;
        let collateralTokenAmount = this.state.quantity*1.5;


        await TravisScottContract.methods.redeem({ rawValue: this.state.web3.utils.toWei(synthTokenAmount.toString() ) }).send({from: this.state.accounts[0]})
            .then(function(receipt){
                // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"

            });

        this.setState({screen:3})
    }

    render(){
        return (
            <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>


                    <div>
                        {(() => {
                            switch (this.state.screen) {
                                case 1:
                                    return(<div>
                                        <div style={{display:'flex', justifyContent:'flex-end'}}>
                                            <X color="slate" size={20} onClick={this.props.onHide}/>
                                        </div>
                                        <p style={{color:'slate', fontSize:14, fontWeight:'bold', marginTop:20}}>Sell Shares</p>

                                        <Card style={{backgroundColor:'whitesmoke'}}>
                                            <Card.Body>
                                                <div style={{display:'flex'}}><p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Artist:&nbsp;</p><p style={{fontSize:14, color:'slate'}}>Travis Scott</p></div>

                                                <div style={{display:'flex'}}>
                                                    <p style={{color:'seagreen', fontSize:14}}>{this.props.synthBalance} Available Shares </p>
                                                    <p style={{fontSize:14, color:'slate'}}>&nbsp; | &nbsp; </p>
                                                    <p style={{fontSize:14, color:'slate'}}>{this.props.popularity}  DAI per Share</p>
                                                    <p style={{fontSize:14, color:'slate'}}>&nbsp; | &nbsp; </p>
                                                    <p style={{fontSize:14, color:'slate'}}>Settled on 6/20/20</p>
                                                </div>
                                                {
                                                    (this.state.moreDetails )?
                                                        <div>
                                                            <div style={{display:'flex'}}>
                                                                <DashCircle color={"grey"}
                                                                            size={16}
                                                                            style={{ marginTop: 4}}
                                                                            onClick={() => this.setState({moreDetails:false})}/>
                                                                <p style={{fontSize:14, color:'grey', marginLeft: 8}}>Less</p>
                                                            </div>
                                                            <div style={{height:200, backgroundColor:'lightblue'}}></div>
                                                        </div>
                                                        :
                                                        <div>
                                                            <div style={{display:'flex'}}>
                                                                <PlusCircle color={"grey"} size={16} style={{ marginTop: 4}} onClick={() => this.moreDetails()}/>
                                                                <p style={{fontSize:14, color:'grey', marginLeft: 8}}>More Options</p>
                                                            </div>
                                                        </div>
                                                }
                                                <hr/>
                                                <div style={{display:'flex'}}>
                                                    <div>
                                                        <p style={{fontSize:14, color:'slate', fontWeight:'bold', marginTop:5 }}>Quantity</p>
                                                    </div>
                                                    <div>
                                                        <InputGroup size="sm" style={{width:'30%', marginLeft:10}}>
                                                            <FormControl
                                                                placeholder="0"
                                                                onChange={(e) => this.updateQuantity(e.target.value)}
                                                                aria-label="quantity"
                                                                aria-describedby="quantity-shares"
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                </div>
                                                <div style={{display:'flex'}}>
                                                    <p style={{fontSize:14, color:'slate', fontWeight:'bold'}}>Sell Price:&nbsp;</p><p style={{fontSize:14, color:'slate', }}>{this.state.quantity*this.props.popularity} DAI</p>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                        <div style={{display:'flex', justifyContent:'center', marginTop:40 }}>
                                            <Button size="lg" onClick={() => this.setState({screen:2})} style={{color:'white', backgroundColor:'seagreen'}}>Preview Sell</Button>
                                        </div>
                                    </div>);
                                case 2:
                                    return(
                                        <div>
                                            <div style={{display:'flex', justifyContent:'space-between'}}>
                                                <ChevronLeft color="slate" size={20}
                                                             onClick={() => this.setState({screen:1})}/>
                                                <X color="slate" size={20} onClick={this.props.onHide}/>
                                            </div>
                                            <p style={{color:'slate', fontSize:14, fontWeight:'bold', marginTop:20}}>Review Sell</p>

                                            <Card style={{backgroundColor:'whitesmoke'}}>
                                                <Card.Body>
                                                    <div style={{display:'flex'}}><p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Artist:&nbsp;</p><p style={{fontSize:14, color:'slate'}}>Travis Scott</p></div>

                                                    <div style={{display:'flex'}}>
                                                        <p style={{color:'seagreen', fontSize:14}}>{this.state.quantity} Shares </p>
                                                        <p style={{fontSize:14, color:'slate'}}>&nbsp; | &nbsp; </p>
                                                        <p style={{fontSize:14, color:'slate'}}>{this.props.popularity} DAI per Share</p>
                                                        <p style={{fontSize:14, color:'slate'}}>&nbsp; | &nbsp; </p>
                                                        <p style={{fontSize:14, color:'slate'}}>Settled on 6/20/20</p>
                                                    </div>

                                                    <hr/>
                                                    <div style={{display:'flex'}}>
                                                        <div>
                                                            <p style={{fontSize:14, color:'slate', fontWeight:'bold', marginTop:5 }}>Quantity:&nbsp;</p>
                                                        </div>
                                                        <div>
                                                            <p style={{fontSize:14, color:'slate', fontWeight:'bold', marginTop:5 }}>{this.state.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                    <div style={{display:'flex'}}>
                                                        <p style={{fontSize:14, color:'slate', fontWeight:'bold'}}>Sell Price:&nbsp;</p>
                                                        <p style={{fontSize:14, color:'slate', }}>{this.state.quantity*this.props.popularity} DAI</p>
                                                        <p style={{fontSize:12, color:'grey', fontStyle:'italic', marginLeft:4 , marginTop:2}}> 2.99 DAI (fee) </p>
                                                    </div>



                                                </Card.Body>
                                            </Card>
                                            <div style={{display:'flex', justifyContent:'center', marginTop:40 }}>
                                                <Button size="lg" onClick={() => this.sellShares() } style={{color:'white', backgroundColor:'seagreen'}}>Sell Shares</Button>
                                            </div>
                                        </div>);
                                case 3:
                                    return(<div>
                                        <div style={{display:'flex', justifyContent:'flex-end'}}>
                                            <X color="slate" size={20} onClick={this.props.onHide}/>
                                        </div>
                                        <p style={{color:'grey',
                                            fontSize:14,
                                            fontWeight:'bold',
                                            marginTop:20}}>Congratulations, you successfully sold shares!</p>

                                        <Card style={{backgroundColor:''}}>
                                            <Card.Body>
                                                <div style={{display:'flex'}}>
                                                    <p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Travis Scott</p>
                                                    <p style={{fontSize:14, color:'slate'}}>&nbsp; | &nbsp; </p>
                                                    <p style={{fontSize:14, color:'slate'}}>{this.state.quantity} Shares for {this.state.quantity*this.props.popularity} DAI</p>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                        <div style={{display:'flex'}}>
                                            <p style={{fontSize:14, color:'grey', marginTop:30}}>You may now check your portfolio for updates</p>
                                        </div>
                                        <div style={{display:'flex', justifyContent:'center', marginTop:30 }}>
                                            <Button size="lg" onClick={this.props.onHide} style={{ background:'whitesmoke', fontSize:22, color:'slategray', width:150,}}>
                                                Ok
                                            </Button>
                                        </div>


                                    </div>);
                                default:
                                    return null;
                            }
                        })()}
                    </div>


                </Modal.Body>
            </Modal>
        )
    }
}

export default SellModal;

