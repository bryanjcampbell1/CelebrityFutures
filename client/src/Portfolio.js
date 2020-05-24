

import React, { Component } from 'react'
import {Row, Col, Table, Card, InputGroup, FormControl, Button} from 'react-bootstrap';

import getWeb3 from "./getWeb3";

import BalanceStats from "./BalanceStats";
import History from "./History";
import AssetTab from "./AssetTab";
import CollateralizedShares from "./CollateralizedShares";
import BuyModal from './BuyModal';
import SellModal from "./SellModal";
import AddCollateralModal from "./AddCollateralModal";
import WithdrawCollateralModal from "./WithdrawCollateralModal";

import mock from "./MockData";
import ABIs from "./abis";
import abi from "./abi";
import addresses from "./addresses";


class Portfolio extends Component {
  constructor(props) {
    super(props)
    this.state = {account: '',
                  web3: null,
                  accounts: null,
                  sideTab: 'history',
                  contract: null,
                  selectedAsset: null,
                  assetsArray: [],
                  sharesHistory: [],
                  selectedArtist: null,
                  selectedArtistAvailableShares: [],
                  collateralizedShares: [],
                  selectedCollateralizedShares: null,
                  buyModalShow: false,
                  sellModalShow: false,
                  addModalShow: false,
                  withdrawModalShow: false,

                }
  }

  componentDidMount = async () => {
    try {

      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();

       await this.setState({ web3, accounts, } );
       this.getData();

    } catch (error) {

      alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  async getData(){
    //1 Get assets, 2 Get Buy History, 3 Get Bet History, 4 Get Chart data

    //get synth token balance
    let TravisScottSynthToken = new this.state.web3.eth.Contract(ABIs.erc20ABI, addresses.synthToken);

    let synthBalance;
    await TravisScottSynthToken.methods.balanceOf(this.state.accounts[0]).call({from: this.state.accounts[0]})
      .then(function(result){
        console.log('Amount of TS token');
        console.log(result);
        synthBalance = result;
    });

    //this.setState({assetsArray:mock.assets, sharesHistory:mock.history, collateralizedShares:mock.collateralizedShares });
    let asset1 = {  artist: 'Travis Scott',
      quantity: (synthBalance * 1e-18).toFixed(2),
      boughtAt: '85',
      popularity: '87',
      date: '06/01/20',
    }
    let assets =[asset1];


    let collateralizedShare1 = { artist:'Travis Scott',
      quantityCreated: (synthBalance * 1e-18).toFixed(2),
      currentValueOfShares: '60',
      minimumCollateralizationRatio:'.2',
      collateral: '40',
      settledOn:'10/01/20',
      contractAddress: '0xa7Efdc8745a8a8D9C6D6DB60cF18056675C42fC4'
    }
    let collateralizedShares = [collateralizedShare1];

    this.setState({assetsArray:assets, sharesHistory:mock.history, collateralizedShares:collateralizedShares });


  }

  rowClicked(e){
    console.log(e);

    let clickedAsset = this.state.assetsArray[e];

    this.setState({selectedAsset: clickedAsset, selectedArtistAvailableShares: mock.availableShares, sideTab:'share' })

  }

  rowClicked2(e){
    console.log(e);
    let clickedAsset = this.state.collateralizedShares[e];

    this.setState({selectedCollateralizedShares: clickedAsset, sideTab:'created' })

  }

  render() {
    return (
      <div >
        <Row style={{marginLeft:15}}>
          <Col xs={12} md={8} lg={8}>
            <Row >
              <div style={{height:250,
                width:'100%',
                borderStyle: 'solid',
                borderWidth:'thin',
                borderColor: 'lightgrey',
                }}>
                <BalanceStats/>
              </div>
            </Row>

            <Row >
              <div style={{width:'100%', marginTop:15, width:'100%',
                borderStyle: 'solid',
                borderWidth:'thin',
                borderColor: 'lightgrey',
              }}>
                <p style={{fontSize:20, fontWeight:'bold', color:'slate', margin:10}}>Your Shares</p>
                <div style={{display:'flex', justifyContent:'space-between' }}>
                  <p style={{fontSize:12, fontWeight:'bold', color:'grey', margin:10}}>Artist</p>
                  <p style={{fontSize:12, fontWeight:'bold', color:'grey', margin:10}}>Quantity</p>
                  <p style={{fontSize:12, fontWeight:'bold', color:'grey', margin:10}}>Bought At</p>
                  <p style={{fontSize:12, fontWeight:'bold', color:'grey', margin:10}}>Settled On</p>
                </div>
                <Table responsive>
                  <tbody>
                  {
                    this.state.assetsArray.map((row, id) => (
                        <tr key={row}  onClick={() => this.rowClicked(id) }>
                          <td >{row.artist}</td>
                          <td>{row.quantity} Shares</td>
                          <td>{row.boughtAt}  DAI/Share</td>
                          <td>{row.date}</td>
                        </tr>
                    ))
                  }
                  </tbody>
                </Table>

              </div>
            </Row>

            <Row >
              <div style={{width:'100%', marginTop:15, width:'100%',
                borderStyle: 'solid',
                borderWidth:'thin',
                borderColor: 'lightgrey',
              }}>
                <p style={{fontSize:20, fontWeight:'bold', color:'slate', margin:10}}>Manage Collateral for Created Shares</p>
                <div style={{display:'flex', justifyContent:'space-between' }}>
                  <p style={{fontSize:12, fontWeight:'bold', color:'grey', margin:10}}>Artist</p>
                  <p style={{fontSize:12, fontWeight:'bold', color:'grey', margin:10}}>Quantity</p>
                  <p style={{fontSize:12, fontWeight:'bold', color:'grey', margin:10}}>Bought At</p>
                  <p style={{fontSize:12, fontWeight:'bold', color:'grey', margin:10}}>Settled On</p>
                </div>
                <Table responsive>
                  <tbody>
                  {
                    this.state.collateralizedShares.map((row, id) => (
                        <tr key={row}  onClick={() => this.rowClicked2(id) }>
                          <td >{row.artist}</td>
                          <td>{row.quantityCreated} Shares</td>
                          <td>Minimum Collateral: {row.minimumCollateralizationRatio * row.currentValueOfShares}  DAI</td>
                          <td>Collateral: {row.collateral}  DAI</td>
                        </tr>
                    ))
                  }
                  </tbody>
                </Table>

              </div>
            </Row>


          </Col>
          <Col xs={12} md={4} lg={4} >

            <Row style={{marginRight:15, marginLeft:0,}}>
              <div style={{ width:'100%',
                borderStyle: 'solid',
                borderWidth:'thin',
                borderColor: 'lightgrey',
              }}>
                {(() => {
                  switch (this.state.sideTab) {
                    case 'history':
                      return(<div>
                        <History history={this.state.sharesHistory}/>
                      </div>);
                    case 'share':
                      return(
                          <div>
                            <AssetTab artist={this.state.selectedAsset}
                                      onBuyClick={() => this.setState({buyModalShow: true})}
                                      onSellClick={() => this.setState({sellModalShow: true})}/>
                          </div>);
                    case 'created':
                      return(<div>
                        <CollateralizedShares artist={this.state.selectedCollateralizedShares}
                                  onAddClick={() => this.setState({addModalShow: true})}
                                  onWithdrawClick={() => this.setState({withdrawModalShow: true})}
                                              web3={this.state.web3}
                                              accounts={this.state.accounts}
                        />
                      </div>);
                    default:
                      return null;
                  }
                })()}
              </div>
            </Row>

          </Col>
        </Row>
        {(this.state.selectedAsset !== null)?
            <div>
              <BuyModal
                  artist={this.state.selectedAsset.artist}
                  availableShares={this.state.selectedArtistAvailableShares}
                  show={this.state.buyModalShow}
                  onHide={() => this.setState({buyModalShow: false})}
                  web3={this.state.web3}
                  accounts={this.state.accounts}
              />
              <SellModal
                  show={this.state.sellModalShow}
                  onHide={() => this.setState({sellModalShow: false})}
                  synthBalance={this.state.selectedAsset.quantity}
                  popularity={this.state.selectedAsset.popularity}
                  web3={this.state.web3}
                  accounts={this.state.accounts}
              />
            </div>
            :
            <div></div>
        }
        {(this.state.selectedCollateralizedShares !== null)?
            <div>
              <AddCollateralModal


                  show={this.state.addModalShow}
                  onHide={() => this.setState({addModalShow: false})}

                  web3={this.state.web3}
                  accounts={this.state.accounts}

              />
              <WithdrawCollateralModal
                  show={this.state.withdrawModalShow}
                  onHide={() => this.setState({withdrawModalShow: false})}

                  web3={this.state.web3}
                  accounts={this.state.accounts}
              />
            </div>
            :
            <div></div>
        }

      </div>

    )
  }
}

export default Portfolio