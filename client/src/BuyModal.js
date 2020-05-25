import React, { Component } from 'react'
import {Button, InputGroup, FormControl, Modal, Card, Table} from 'react-bootstrap';

import {ChevronLeft, X, PlusCircle, DashCircle} from 'react-bootstrap-icons';

import abi from "./abi"
import addresses from "./addresses";

class BuyModal extends Component {
  constructor(props) {
    super(props)
    this.state = {account: '',
                  screen: 1,
                  quantity: 0,
                  moreDetails: false,
                  selectedShares: this.props.availableShares[0],
    }
  }

  moreDetails(){
    this.setState({moreDetails:true})
  }

  updateQuantity(e){
      this.setState({quantity:e})
  }

  rowClicked(e){
    console.log(e);

    let clickedShares = this.props.availableShares[e];
    this.setState({selectedShares: clickedShares })

  }

  hideModal(){
      this.setState({account: '',
          screen: 1,
          quantity: 0,
          moreDetails: false,
          alert: false,
          selectedShares: this.props.availableShares[0],
      });

      this.props.onHide();
  }

  validateAndMoveToScreen2(){

      if( (!isNaN(this.state.quantity)) &&  (this.state.selectedShares.quantityAvailable >= this.state.quantity)  ){
          this.setState({screen:2});
      }
      else{
          this.setState({screen:5});
      }
  }

    async approve(){
        console.log("send b");

        let tokenB = new this.props.web3.eth.Contract(abi.erc20.abi, addresses.collateralToken);
        const num = 1000 * Math.pow(10, 18);
        const numAsHex = "0x" + num.toString(16);

        await tokenB.methods.approve(addresses.swapContract, numAsHex).send({from: this.props.accounts[0]})
            .then((receipt) => {
                console.log(receipt);

            });


        this.setState({screen:3})


    }

    async pay(){
        let swapContract = new this.props.web3.eth.Contract(abi.swap4.abi, addresses.swapContract);

        const num = (this.state.quantity*87) * Math.pow(10, 18);
        //this.state.quantity*this.state.selectedShares.price
        const numAsHex = "0x" + num.toString(16);

        await swapContract.methods.tradeAforB(numAsHex).send({from: this.props.accounts[0]})
            .then((receipt2) =>{

            });

        this.setState({screen:4})

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
                                <X color="slate" size={20} onClick={() => this.hideModal()}/>
                              </div>
                              <p style={{color:'slate', fontSize:14, fontWeight:'bold', marginTop:20}}>Buy Shares</p>

                              <Card style={{backgroundColor:'whitesmoke'}}>
                                <Card.Body>
                                  <div style={{display:'flex'}}><p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Artist:&nbsp;</p><p style={{fontSize:14, color:'slate'}}>{this.state.selectedShares.artist}</p></div>

                                  <div style={{display:'flex'}}>
                                    <p style={{color:'seagreen', fontSize:14}}>{this.state.selectedShares.quantityAvailable} Available Shares </p>
                                    <p style={{fontSize:14, color:'slate'}}>&nbsp; | &nbsp; </p>
                                    <p style={{fontSize:14, color:'slate'}}>{this.state.selectedShares.price} DAI per Share</p>
                                    <p style={{fontSize:14, color:'slate'}}>&nbsp; | &nbsp; </p>
                                    <p style={{fontSize:14, color:'slate'}}>Settled on {this.state.selectedShares.settledOn}</p>
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
                                          <div>
                                              <Table responsive>
                                                  <tbody>
                                                  {
                                                      this.props.availableShares.map((row, id) => (
                                                          <tr key={row}  onClick={() => this.rowClicked(id) } style={{display:'flex'}}>
                                                              <p style={{color:'slate', fontSize:14}}>{row.quantityAvailable} Available Shares </p>
                                                              <p style={{fontSize:14, color:'slate'}}>&nbsp; | &nbsp; </p>
                                                              <p style={{fontSize:14, color:'slate'}}>{row.price} DAI per Share</p>
                                                              <p style={{fontSize:14, color:'slate'}}>&nbsp; | &nbsp; </p>
                                                              <p style={{fontSize:14, color:'slate'}}>Settled on {row.settledOn}</p>
                                                          </tr>

                                                      ))
                                                  }
                                                  </tbody>
                                              </Table>
                                          </div>
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
                                    <p style={{fontSize:14,
                                        color:'slate',
                                        fontWeight:'bold'}}>
                                        Price:&nbsp;
                                    </p>
                                    <p style={{fontSize:14, color:'slate', }}>
                                      {this.state.quantity*this.state.selectedShares.price} DAI
                                    </p>
                                  </div>
                                </Card.Body>
                              </Card>
                              <div style={{display:'flex', justifyContent:'center', marginTop:40 }}>
                                <Button size="lg" onClick={() => this.validateAndMoveToScreen2()  } style={{color:'white', backgroundColor:'seagreen'}}>Preview Buy</Button>
                              </div>
                          </div>);
                  case 2:
                    return(
                        <div>
                          <div style={{display:'flex', justifyContent:'space-between'}}>
                            <ChevronLeft color="slate" size={20}
                                         onClick={() => this.setState({screen:1})}/>
                            <X color="slate" size={20} onClick={() => this.hideModal()}/>
                          </div>
                          <p style={{color:'slate', fontSize:14, fontWeight:'bold', marginTop:20}}>Review Buy</p>

                          <Card style={{backgroundColor:'whitesmoke'}}>
                            <Card.Body>
                              <div style={{display:'flex'}}><p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Artist:&nbsp;</p><p style={{fontSize:14, color:'slate'}}>Travis Scott</p></div>

                                <div style={{display:'flex'}}>
                                    <p style={{color:'seagreen', fontSize:14}}>{this.state.selectedShares.quantityAvailable} Available Shares </p>
                                    <p style={{fontSize:14, color:'slate'}}>&nbsp; | &nbsp; </p>
                                    <p style={{fontSize:14, color:'slate'}}>{this.state.selectedShares.price} DAI per Share</p>
                                    <p style={{fontSize:14, color:'slate'}}>&nbsp; | &nbsp; </p>
                                    <p style={{fontSize:14, color:'slate'}}>Settled on {this.state.selectedShares.settledOn}</p>
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
                              <div style={{display:'flex'}}>
                                <p style={{fontSize:14, color:'slate', fontWeight:'bold'}}>Price:&nbsp;</p>
                                <p style={{fontSize:14, color:'slate', }}>{this.state.quantity*this.state.selectedShares.price}  DAI</p>
                                <p style={{fontSize:12, color:'grey', fontStyle:'italic', marginLeft:4 , marginTop:2}}>+2.99 DAI (fee) </p>
                              </div>
                              <hr/>
                              <div style={{display:'flex'}}>
                                <p style={{fontSize:14, color:'slate', fontWeight:'bold'}}>Total:&nbsp;</p>
                                <p style={{fontSize:14, color:'slate', }}>{this.state.quantity*this.state.selectedShares.price + 2.99}  DAI</p>
                              </div>
                                <div style={{display:'flex'}}>
                                    <p style={{fontSize:16, color:'red', fontWeight:'bold'}}>Note:&nbsp;</p>
                                    <p style={{fontSize:16, color:'red', }}>You will need to sign 2 transactions</p>
                                </div>

                            </Card.Body>
                          </Card>
                          <div style={{display:'flex', justifyContent:'center', marginTop:40 }}>
                            <Button size="lg" onClick={() => this.approve()  } style={{color:'white', backgroundColor:'seagreen'}}>Approve</Button>
                          </div>
                        </div>);
                    case 3:
                        return(
                            <div>
                                <div style={{display:'flex', justifyContent:'space-between'}}>
                                    <ChevronLeft color="slate" size={20}
                                                 onClick={() => this.setState({screen:1})}/>
                                    <X color="slate" size={20} onClick={() => this.hideModal()}/>
                                </div>
                                <p style={{color:'slate', fontSize:14, fontWeight:'bold', marginTop:20}}>Review Buy</p>

                                <Card style={{backgroundColor:'whitesmoke'}}>
                                    <Card.Body>
                                        <div style={{display:'flex'}}><p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Artist:&nbsp;</p><p style={{fontSize:14, color:'slate'}}>Travis Scott</p></div>

                                        <div style={{display:'flex'}}>
                                            <p style={{color:'seagreen', fontSize:14}}>{this.state.selectedShares.quantityAvailable} Available Shares </p>
                                            <p style={{fontSize:14, color:'slate'}}>&nbsp; | &nbsp; </p>
                                            <p style={{fontSize:14, color:'slate'}}>{this.state.selectedShares.price} DAI per Share</p>
                                            <p style={{fontSize:14, color:'slate'}}>&nbsp; | &nbsp; </p>
                                            <p style={{fontSize:14, color:'slate'}}>Settled on {this.state.selectedShares.settledOn}</p>
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
                                        <div style={{display:'flex'}}>
                                            <p style={{fontSize:14, color:'slate', fontWeight:'bold'}}>Price:&nbsp;</p>
                                            <p style={{fontSize:14, color:'slate', }}>{this.state.quantity*this.state.selectedShares.price}  DAI</p>
                                            <p style={{fontSize:12, color:'grey', fontStyle:'italic', marginLeft:4 , marginTop:2}}>+2.99 DAI (fee) </p>
                                        </div>
                                        <hr/>
                                        <div style={{display:'flex'}}>
                                            <p style={{fontSize:14, color:'slate', fontWeight:'bold'}}>Total:&nbsp;</p>
                                            <p style={{fontSize:14, color:'slate', }}>{this.state.quantity*this.state.selectedShares.price + 2.99}  DAI</p>
                                        </div>
                                        <div style={{display:'flex'}}>
                                            <p style={{fontSize:16, color:'red', fontWeight:'bold'}}>Note:&nbsp;</p>
                                            <p style={{fontSize:16, color:'red', }}>There is 1 more transaction</p>
                                        </div>

                                    </Card.Body>
                                </Card>
                                <div style={{display:'flex', justifyContent:'center', marginTop:40 }}>
                                    <Button size="lg" onClick={() => this.pay()  } style={{color:'white', backgroundColor:'seagreen'}}>Buy Shares</Button>
                                </div>
                            </div>);
                    case 4:
                        return(<div>
                            <div style={{display:'flex', justifyContent:'flex-end'}}>
                                <X color="slate" size={20} onClick={() => this.hideModal()}/>
                            </div>
                            <p style={{color:'grey',
                                fontSize:14,
                                fontWeight:'bold',
                                marginTop:20}}>Congratulations, you successfully bought shares!</p>

                            <Card style={{backgroundColor:''}}>
                                <Card.Body>
                                    <div style={{display:'flex'}}>
                                        <p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>{this.state.selectedShares.artist}</p>
                                        <p style={{fontSize:14, color:'slate'}}>&nbsp; | &nbsp; </p>
                                        <p style={{fontSize:14, color:'slate'}}>{this.state.quantity} Shares for {this.state.quantity*this.state.selectedShares.price + 2.99} DAI</p>
                                    </div>
                                </Card.Body>
                            </Card>
                            <div style={{display:'flex'}}>
                                <p style={{fontSize:14, color:'grey', marginTop:30}}>You may now check your portfolio for updates</p>
                            </div>
                            <div style={{display:'flex', justifyContent:'center', marginTop:30 }}>
                                <Button size="lg" onClick={() => this.hideModal()} style={{ background:'whitesmoke', fontSize:22, color:'slategray', width:150,}}>
                                    Ok
                                </Button>
                            </div>
                        </div>);
                  case 5:
                    return(<div>
                                <div style={{display:'flex', justifyContent:'space-between'}}>
                                    <ChevronLeft color="slate" size={20}
                                                 onClick={() => this.setState({screen:1})}/>
                                    <X color="slate" size={20} onClick={() => this.hideModal()}/>
                                </div>
                                <Card style={{backgroundColor:'whitesmoke', height:250}}>
                                    <Card.Body>

                                            <p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Please Review.</p>
                                            <p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Quantity Specified Was Invalid.</p>

                                    </Card.Body>
                                </Card>
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

export default BuyModal;


