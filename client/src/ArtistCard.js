import React, { Component } from 'react'
import { Button, Row, Col, InputGroup, FormControl, Card, Image } from 'react-bootstrap';

import { ChevronCompactLeft, ChevronCompactRight } from 'react-bootstrap-icons';

import artistImage from  "./TravisScott_thumb.jpg";

export default class ArtistCard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div >
        <Card style={{padding:20, height:300}}>

        <Row>
          <Col >
            <Image style={{width:'100%'}} src={artistImage}/>
          </Col>
          <Col sm={8} >
            <p style={{color:'slate', fontSize:14,}}>Popular</p>
            {
              this.props.popular.map( (row,key) =>{
                  return <p style={{color:'gray', fontSize:12, marginTop:-15}}> {key + 1 }. {row}</p>
                }
              )
            }
          </Col>
        </Row>
        <Row >
          <Col>
              <div style={{width:'90%'}}>
              <p style={{color:'slate', fontSize:14,}}>Artist Bio</p>
              <p style={{color:'gray', fontSize:12, marginTop:-15}}>{this.props.bio}</p>
              </div>
          </Col>
        </Row>
        
        </Card>
      </div>
    )
  }
}