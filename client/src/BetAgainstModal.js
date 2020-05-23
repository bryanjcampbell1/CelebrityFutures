import React, { Component } from 'react'
import {Button, InputGroup, FormControl, Modal, Card} from 'react-bootstrap';



import {ChevronLeft, X, PlusCircle, DashCircle} from 'react-bootstrap-icons';

import getWeb3 from "./getWeb3";
import ABIs from "./abis.js";

class BetAgainstModal extends Component {
  constructor(props) {
    super(props)
    this.state = {account: '',
                  screen: 1,
                  quantity: 0,
                  popularity:null,
                  moreDetails: false,
                  web3: null,
                  accounts: null,

    }
  }

  componentDidMount = async () => {
        try {
            const popularity = 87;
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();

            this.setState({ web3, accounts, popularity });
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
  }

  moreDetails(){
    this.setState({moreDetails:true})
  }

  async sponsorShares(){

      //Gnache host 9545 address
      let address = '0xa7Efdc8745a8a8D9C6D6DB60cF18056675C42fC4';
      let TravisScottContract = new this.state.web3.eth.Contract(ABIs.empABI, address);

      let synthTokenAmount = this.state.quantity;
      let collateralTokenAmount = this.state.quantity*1.5;


      await TravisScottContract.methods.create({ rawValue: this.state.web3.utils.toWei(collateralTokenAmount.toString() ) }, { rawValue: this.state.web3.utils.toWei(synthTokenAmount.toString() ) }).send({from: this.state.accounts[0]})
          .then(function(receipt){
              // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"

          });

      this.setState({screen:3})
  }

  updateQuantity(e){
    this.setState({quantity:e})
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
                              <p style={{color:'slate', fontSize:14, fontWeight:'bold', marginTop:20}}>Bet Against by Creating Shares</p>
                                {
                                    (this.state.moreDetails )?
                                        <div>
                                            <div style={{display:'flex'}}>
                                                <DashCircle color={"grey"}
                                                            size={16}
                                                            style={{ marginTop: 4}}
                                                            onClick={() => this.setState({moreDetails:false})}/>

                                            </div>
                                            <div>
                                                <p style={{color:'slate', fontSize:14, fontWeight:'bold', marginTop:20}}>Example: Creating 1 Drake Share at 100 DAI/Share</p>
                                                <div style={{display:'flex'}}>
                                                    <p style={{color:'slate', fontSize:12, fontWeight:'bold',}}>1) Create a Share by paying</p>
                                                    <p style={{color:'salmon', fontSize:12, fontWeight:'bold',}}>&nbsp;current value (100 DAI) </p>
                                                    <p style={{fontSize:14, color:'slate', marginTop:-5}}>&nbsp; + &nbsp; </p>
                                                    <p style={{color:'salmon', fontSize:12, fontWeight:'bold',}}>collateral (20 DAI)</p>
                                                </div>

                                                <div>
                                                    <p style={{color:'slate', fontSize:12, fontWeight:'bold',}}>
                                                        This money is locked away in a vault until either the share is sold back to the vault,
                                                        or it reaches its expiration date
                                                    </p>
                                                </div>

                                                <div style={{display:'flex'}}>
                                                    <p style={{color:'slate', fontSize:12, fontWeight:'bold',}}>At this point you are down</p>
                                                    <p style={{color:'salmon', fontSize:12, fontWeight:'bold',}}>&nbsp;(120 DAI)</p>
                                                </div>


                                                <div style={{display:'flex', marginTop:15}}>
                                                    <p style={{color:'slate', fontSize:12, fontWeight:'bold',}}>2) Sell your new Drake Share at its current value  </p>
                                                    <p style={{color:'lightgreen', fontSize:12, fontWeight:'bold',}}>&nbsp;(100 DAI) </p>
                                                </div>
                                                <div style={{display:'flex'}}>
                                                    <p style={{color:'slate', fontSize:12, fontWeight:'bold',}}>At this point you are down</p>
                                                    <p style={{color:'salmon', fontSize:12, fontWeight:'bold',}}>&nbsp;(20 DAI)</p>
                                                </div>


                                                <p style={{color:'grey', fontStyle:'italic', fontSize:12, fontWeight:'bold', marginTop:15,}}>If you bet correctly and Drake's popularity decreases to 70 DAI/Share</p>

                                                <div style={{display:'flex',}}>
                                                    <p style={{ color:'slate', fontSize:12, fontWeight:'bold',marginTop:15,}}>
                                                        3) When the new owner of the Drake Share sells it back to the vault, they get 70 DAI and you get the remaining balance, 50 DAI
                                                    </p>
                                                </div>

                                                <div style={{display:'flex'}}>
                                                    <p style={{color:'slate', fontSize:12, fontWeight:'bold',}}>At this point you are up</p>
                                                    <p style={{color:'lightgreen', fontSize:12, fontWeight:'bold',}}>&nbsp;(30 DAI)</p>
                                                </div>
                                                <p style={{color:'slate', fontSize:12, fontWeight:'bold',}}>You just made money betting against the artist!</p>

                                            </div>
                                        </div>
                                        :
                                        <div>
                                            <div style={{display:'flex'}}>
                                                <PlusCircle color={"grey"} size={16} style={{ marginTop: 4}} onClick={() => this.moreDetails()}/>
                                                <p style={{fontSize:14, color:'grey', marginLeft: 8}}>Example</p>
                                            </div>
                                        </div>
                                }
                              <Card style={{backgroundColor:'whitesmoke'}}>
                                <Card.Body>
                                    <div style={{display:'flex', justifyContent:'flex-start'}}>
                                        <div style={{display:'flex'}}>
                                            <p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Artist:&nbsp;</p>
                                            <p style={{fontSize:14, color:'slate'}}>Travis Scott</p>
                                        </div>
                                        <div style={{display:'flex', marginLeft: 40}}>
                                            <p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Current Popularity Score:&nbsp;</p>
                                            <p style={{fontSize:14, color:'seagreen'}}>87</p>
                                        </div>
                                    </div>

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
                                        <div style={{ marginLeft:-70}}>
                                            <p style={{fontSize:14, color:'slate', fontWeight:'bold', marginTop:5 }}>Settled On:</p>
                                        </div>
                                        <div>
                                            <p style={{fontSize:14, color:'slate', marginTop:5 }}>&nbsp;&nbsp;6/1/20</p>
                                        </div>
                                    </div>


                                    <hr/>
                                    <div>
                                        <p style={{fontSize:14, color:'slate', fontWeight:'bold', marginTop:5 }}>Value of Shares</p>
                                    </div>
                                    <div style={{display:'flex'}}>
                                        <p style={{fontSize:14, color:'slate'}}>{this.state.quantity}&nbsp;Shares </p>
                                        <p style={{fontSize:14, color:'slate'}}>&nbsp; x &nbsp; </p>
                                        <p style={{fontSize:14, color:'slate'}}> {this.state.popularity} Popularity</p>
                                        <p style={{fontSize:14, color:'slate'}}>&nbsp; x &nbsp; </p>
                                        <p style={{fontSize:14, color:'slate'}}>1 DAI</p>
                                        <p style={{fontSize:14, color:'slate'}}>&nbsp; = &nbsp; </p>
                                        <p style={{fontSize:14, color:'slate'}}>{this.state.quantity*this.state.popularity} DAI Value</p>
                                    </div>


                                    <div style={{display:'flex', marginTop: 10}}>
                                        <p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Colateral&nbsp;</p>
                                        <p style={{fontSize:12, color:'grey', marginTop:3}}>(total to be locked)</p>
                                    </div>

                                    <div style={{display:'flex', marginTop:-10}}>
                                        <p style={{fontSize:14, color:'slate'}}> Value of Shares</p>
                                        <p style={{fontSize:14, color:'slate'}}>&nbsp; x &nbsp; </p>
                                        <p style={{fontSize:14, color:'slate'}}>1.5</p>
                                        <p style={{fontSize:14, color:'slate'}}>&nbsp; = &nbsp; </p>
                                        <p style={{fontSize:14, color:'slate'}}>{this.state.quantity*this.state.popularity*1.5} DAI </p>
                                    </div>

                                  <hr/>

                                  <div style={{display:'flex'}}>
                                    <p style={{fontSize:14, color:'slate', fontWeight:'bold'}}>Total&nbsp;</p>
                                    <p style={{fontSize:14, color:'slate', marginLeft:10}}>{this.state.quantity*this.state.popularity*1.5} DAI</p>
                                  </div>
                                </Card.Body>
                              </Card>
                              <div style={{display:'flex', justifyContent:'center', marginTop:40 }}>
                                <Button size="lg" onClick={() => this.setState({screen:2})} style={{color:'white', backgroundColor:'seagreen'}}>Preview</Button>
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
                          <p style={{color:'slate', fontSize:14, fontWeight:'bold', marginTop:20}}>Review </p>

                          <Card style={{backgroundColor:'whitesmoke'}}>
                            <Card.Body>
                                <div style={{display:'flex',}}>
                                    <p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Creating {this.state.quantity} Shares</p>
                                </div>
                                <hr style={{marginTop:-3}}/>
                                <div style={{display:'flex', justifyContent:'flex-start'}}>
                                    <div style={{display:'flex'}}>
                                        <p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Artist:&nbsp;</p>
                                        <p style={{fontSize:14, color:'slate'}}>Travis Scott</p>
                                    </div>
                                    <div style={{display:'flex', marginLeft: 72}}>
                                        <p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Popularity Score:&nbsp;</p>
                                        <p style={{fontSize:14, color:'seagreen'}}>{this.state.popularity}</p>
                                    </div>
                                </div>

                                <div style={{display:'flex', justifyContent:'flex-start'}}>
                                    <div style={{display:'flex'}}>
                                        <p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Current Value:&nbsp;</p>
                                        <p style={{fontSize:14, color:'slate', }}>{this.state.quantity*this.state.popularity} DAI</p>
                                    </div>
                                    <div style={{display:'flex', marginLeft:43}}>
                                        <p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Settled On:&nbsp;</p>
                                        <p style={{fontSize:14, color:'slate', }}>06/01/20</p>
                                    </div>

                                </div>


                                <div style={{display:'flex', marginTop:30}}>
                                    <p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Price:&nbsp;&nbsp;&nbsp;</p>
                                    <p style={{fontSize:14, color:'slate'}}>{this.state.quantity*this.state.popularity*1.5} DAI</p>
                                    <p style={{fontSize:12, color:'grey', fontStyle:'italic', marginLeft:4 , marginTop:2}}>+2.99 DAI (fee) </p>
                                </div>

                                <hr/>
                                <div style={{display:'flex'}}>
                                    <p style={{fontSize:14, color:'slate', fontWeight:'bold'}}>Total:&nbsp;</p>
                                    <p style={{fontSize:14, color:'slate', }}>{this.state.quantity*this.state.popularity*1.5 + 2.99} DAI</p>
                                </div>

                            </Card.Body>
                          </Card>
                          <div style={{display:'flex', justifyContent:'center', marginTop:40 }}>
                            <Button size="lg" onClick={() => this.sponsorShares()    } style={{color:'white', backgroundColor:'seagreen'}}>Create Share</Button>
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
                              marginTop:20}}>Congratulations, you successfully created shares!</p>

                            <Card style={{backgroundColor:''}}>
                              <Card.Body>
                                <div style={{display:'flex'}}>
                                  <p style={{fontWeight:'bold', fontSize:14, color:'slate'}}>Travis Scott</p>
                                  <p style={{fontSize:14, color:'slate'}}>&nbsp; | &nbsp; </p>
                                  <p style={{fontSize:14, color:'slate'}}>{this.state.quantity} Shares at  {this.state.popularity}  DAI/share</p>
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

export default BetAgainstModal;

