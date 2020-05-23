import React, { Component } from 'react'
import { Button, Row, Col, InputGroup, FormControl, Card, Image } from 'react-bootstrap';


import '../node_modules/react-vis/dist/style.css';
import {XYPlot, 
        LineSeries,
        XAxis,
        YAxis,
        ChartLabel,
        makeVisFlexible,
        makeWidthFlexible,
        makeHeightFlexible,
      } from 'react-vis';



const data = [
      {x: 0, y: 5},
      {x: 1, y: 6},
      {x: 2, y: 5},
      {x: 3, y: 7},
      {x: 4, y: 8},
      {x: 5, y: 9},
      {x: 6, y: 10},
      {x: 7, y: 9},
      {x: 8, y: 10},
      {x: 9, y: 12}
    ];


const MSEC_DAILY = 86400000;

export default class ArtistStats extends Component {
  constructor(props) {
    super(props)

  }
  render() {
    const timestamp = new Date('March 15 2020').getTime();
    return (
      <div >
        <Card style={{padding:20, height:300}}>

          <XYPlot xType="time"  height={250} width={300}>
            <ChartLabel 
            text="Time"
            className="alt-x-label"
            includeMargin={false}
            xPercent={1.025}
            yPercent={1.01}
            style={{
              textAnchor: 'end',
            }}
            />

          <ChartLabel 
            text="Popularity Score"
            className="alt-y-label"
            includeMargin={false}
            xPercent={0.4}
            yPercent={0.06}
            style={{
              textAnchor: 'end',
            }}
            />
            <XAxis />
            <YAxis />
            {/*<LineSeries data={data} curve={'curveMonotoneX'}/>*/}
            <LineSeries 
                curve={'curveMonotoneX'}
                data={[
                  {x: timestamp + MSEC_DAILY, y: 3},
                  {x: timestamp + MSEC_DAILY * 2, y: 5},
                  {x: timestamp + MSEC_DAILY * 3, y: 15},
                  {x: timestamp + MSEC_DAILY * 4, y: 12}
                ]}

              />
          </XYPlot>


        </Card>
      </div>
    )
  }
}


