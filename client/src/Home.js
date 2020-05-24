import React, { Component } from 'react'
import { Button, Row, Col, InputGroup, FormControl, Modal, Card } from 'react-bootstrap';

import { ChevronCompactLeft, ChevronCompactRight, Search} from 'react-bootstrap-icons';

import ArtistCard from './ArtistCard'
import ArtistStats from './ArtistStats'
import BuyModal from './BuyModal'
import BetAgainstModal from "./BetAgainstModal";

import mock from "./MockData";
import SellModal from "./SellModal";
import getWeb3 from "./getWeb3";
let mock_AvailableShares = mock.availableShares;



let artist1 = {
  name: 'Travis Scott',
  thumbnail: './images/TravisScott_thumb.jpg', 
  bio: "A Houston-born hip-hop artist and producer affiliated with Kanye West's GOOD Music and T.I.'s Grand Hustle, Travis Scott became known during the early 2010s for his heavily Auto-Tuned half-sung/half-rapped vocal style.",
  popular: ['THE SCOTTS', 'SICKO MODE', 'HIGHEST IN THE ROOM', 'goosebumps','OUT WEST (feat. Young Thug)']
}



class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { account: '',
      buyModalShow: false,
      betModalShow:false,
      selectedArtist: 'Travis Scott',
      selectedArtistAvailableShares: mock_AvailableShares,
      web3:null,
      accounts: null,
    }
  }

  componentDidMount = async () => {
    try {

      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();

      await this.setState({ web3, accounts, } );
      this.getData();

    } catch (error) {

      console.error(error);
    }
  }


  render() {
    return (
      <div>

        <Row>
          <Col style={{ background: 'whitesmoke',textAlign: 'center'}}>
            <p style={{marginTop:15, fontSize:25, color:'midnightblue'}}>Make money when an artist rises in the charts by buying shares.</p>
            <p style={{marginTop:-15, fontSize:25, color:'midnightblue'}}>Make money when an artist drops in the charts by betting against and creating shares.</p>
            <div style={{display: 'flex', justifyContent:'center'}}><p style={{marginTop:-15,fontSize:25, color:'midnightblue'}}>Either way </p><p style={{marginTop:-15,fontWeight:'bold', fontSize:25, color:'midnightblue'}}>&nbsp; you make money!</p></div>

            <div style={{display: 'flex', justifyContent:'center'}}>

              <InputGroup style={{width:'40%', marginTop:30, marginBottom:60}}>
                <FormControl
                  placeholder="Search Artist Name"
                  aria-label="Search"
                  aria-describedby="search-artist"
                />
                <InputGroup.Append>
                  <InputGroup.Text><Search color="midnightblue" size={12} /></InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </div>
          </Col>
        </Row>


        <Row>
          <Col >
            <p style={{ margin:15, fontSize:22, color:'midnightblue'}}>Trending Artists</p>
          </Col>
        </Row>

        <Row style={{margin:40}}>
          <Col style={{display:'flex', justifyContent:'flex-start' }} sm={1}>
            <ChevronCompactLeft variant="link" color="midnightblue" size={50} style={{marginTop:150, marginLeft:20}}/>
          </Col>
          <Col >
            <ArtistCard thumbnail={artist1.thumbnail} bio={artist1.bio} popular={artist1.popular}/>
          </Col>
          <Col >
            <ArtistStats />
          </Col>
          <Col style={{display:'flex', justifyContent:'flex-end'}} sm={1}>
            <ChevronCompactRight variant="link" color="midnightblue" size={50} style={{marginTop:150, marginRight:20}}/>
          </Col>
        </Row>

        <Row>
          <Col style={{ background: 'whitesmoke',textAlign: 'center'}}>
           <p style={{marginTop:-15, fontSize:20, color:'midnightblue'}}>By using Spotify’s Popularity Score, we can identify whether an artist has gained or lost popularity over a fixed period of time.</p>
            <div style={{display: 'flex', justifyContent:'center'}}>
              <p style={{marginTop:-15,fontWeight:'bold', fontSize:20, color:'midnightblue'}}>BUY&nbsp;</p>
              <p style={{marginTop:-15,fontSize:20, color:'midnightblue'}}>shares to signal that the artist’s score will  </p>
              <p style={{marginTop:-15,fontWeight:'bold', fontSize:20, color:'midnightblue'}}>&nbsp; RISE</p>
            </div>
            <div style={{display: 'flex', justifyContent:'center'}}>
              <p style={{marginTop:-15,fontWeight:'bold', fontSize:20, color:'midnightblue'}}>SELL&nbsp;</p>
              <p style={{marginTop:-15,fontSize:20, color:'midnightblue'}}>to cash in </p>
            </div>
            <div style={{display: 'flex', justifyContent:'center'}}>
              <p style={{marginTop:-15,fontWeight:'bold', fontSize:20, color:'midnightblue'}}>CREATE&nbsp;</p>
              <p style={{marginTop:-15,fontSize:20, color:'midnightblue'}}>new shares to signal that the artist’s score will</p>
              <p style={{marginTop:-15,fontWeight:'bold', fontSize:20, color:'midnightblue'}}>&nbsp;FALL</p>
            </div>
          </Col>
        </Row>

        <Row style={{margin:40}}>


          <Col style={{display:'flex', justifyContent:'center'}}>
            <Button  onClick={() => this.setState({buyModalShow: true})} size="lg" style={{ background:'whitesmoke', fontSize:22, color:'slategray', width:120, marginRight:10}}>
              BUY
            </Button>
            <Button  onClick={() => this.setState({buyModalShow: true})} size="lg" style={{ background:'whitesmoke', fontSize:22, color:'slategray', width:120}}>
              SELL
            </Button>
            <Button onClick={() => this.setState({betModalShow: true})}  size="lg" style={{ background:'whitesmoke', fontSize:22, color:'slategray', width:120, marginLeft:10 }}>
              CREATE
            </Button>
          </Col>



        </Row>
        <BuyModal
            artist={this.state.selectedArtist}
            availableShares={this.state.selectedArtistAvailableShares}
            show={this.state.buyModalShow}
            onHide={() => this.setState({buyModalShow: false})}
            web3={this.state.web3}
            accounts={this.state.accounts}
        />
        <BetAgainstModal
            show={this.state.betModalShow}
            onHide={() => this.setState({betModalShow: false})}
        />

      </div>
    )
  }
}

export default Home