import React, { Component } from 'react'
import {Button, InputGroup, FormControl, Modal, Card} from 'react-bootstrap';

import {ChevronLeft, X, PlusCircle, DashCircle} from 'react-bootstrap-icons';

import ABIs from "./abis";
import addresses from "./addresses";
let SynthTokenAddress = '0x7788d27d015C7f88dEDe5f3C5C66f8BAE8C6f955';

class AddCollateralModal extends Component {
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


    async addCollateral(){
        console.log("adding collateral");

        let TravisScottContract = new this.state.web3.eth.Contract(ABIs.empABI, addresses.empContract);

        await TravisScottContract.methods.deposit({ rawValue: this.state.web3.utils.toWei("10") }).send({from: this.state.accounts[0]})
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
                                                <div style={{display:'flex'}}>
                                                    <div>
                                                        <p style={{fontSize:14, color:'slate', fontWeight:'bold', marginTop:5 }}>Quantity (DAI)</p>
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
                                            </Card.Body>
                                        </Card>
                                        <div style={{display:'flex', justifyContent:'center', marginTop:40 }}>
                                            <Button size="lg" onClick={() => this.addCollateral()} style={{color:'white', backgroundColor:'seagreen'}}>Preview Add</Button>
                                        </div>
                                    </div>);
                                case 2:
                                    return(
                                        <div>

                                        </div>);
                                case 3:
                                    return(<div>




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

export default AddCollateralModal;

