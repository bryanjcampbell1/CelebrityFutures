import React, { Component } from 'react'
import {Button, InputGroup, FormControl, Modal, Card} from 'react-bootstrap';

import {ChevronLeft, X, PlusCircle, DashCircle} from 'react-bootstrap-icons';

import ABIs from "./abis";
let SynthTokenAddress = '0x7788d27d015C7f88dEDe5f3C5C66f8BAE8C6f955';

class WithdrawCollateralModal extends Component {
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


    async withdrawCollateral(){
        console.log("withdraw collateral");

        //Gnache host 9545 address
        let address = '0xa7Efdc8745a8a8D9C6D6DB60cF18056675C42fC4';
        let TravisScottContract = new this.state.web3.eth.Contract(ABIs.empABI, address);

        await TravisScottContract.methods.requestWithdrawal({ rawValue: this.state.web3.utils.toWei("10") }).send({from: this.state.accounts[0]})
            .then(function(receipt){
                // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
                console.log(receipt);
            });
        this.props.onHide();
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
                                        <p style={{color:'slate', fontSize:14, fontWeight:'bold', marginTop:20}}>Add Collateral</p>

                                        <Card style={{backgroundColor:'whitesmoke'}}>
                                            <Card.Body>
                                                <p>Stuff</p>
                                            </Card.Body>
                                        </Card>
                                        <div style={{display:'flex', justifyContent:'center', marginTop:40 }}>
                                            <Button size="lg" onClick={() => this.withdrawCollateral()} style={{color:'white', backgroundColor:'seagreen'}}>Preview Add</Button>
                                        </div>
                                    </div>);
                                case 2:
                                    return(
                                        <div>

                                        </div>);
                                case 3:
                                    return(<div>

                                    </div>
                                    );
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

export default WithdrawCollateralModal;

