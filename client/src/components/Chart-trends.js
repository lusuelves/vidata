import React from 'react'
import {VictoryScatter, VictoryZoomContainer, VictoryChart} from 'victory'

const ChartTrends = ({info}) => {


        return (<>
                {/* <VictoryChart
                        containerComponent={
                         <VictoryZoomContainer/>
                        }
                ></VictoryChart> */}
        <VictoryChart
        domain={{x: [0, 100]}}
        containerComponent={<VictoryZoomContainer zoomDomain={{x: [0, 10], y: [0, 10]}}/>}
        animate = {{ duration: 2000, easing: "bounce" }}
        >
        <VictoryScatter
        style={{ 
            data: { fill: (d) => d.fill, 
                    opacity: (d) => d.opacity
            }
        }}
        animate={{
                duration: 2000,
                onLoad: { duration: 1000 }
              }}
        bubbleProperty="amount"
        maxBubbleSize={25}
        minBubbleSize={5}
        data = {info}
        events={[{
                target: "data",
                eventHandlers: {
                  onClick: (e, propsClicked) => {
                        console.log(propsClicked.datum.amount)
                return [
                      {
                        target: "data",
                        mutation: (props) => {
                          const fill = props.style && props.style.fill;
                          return fill === "green" ? null : { style: { fill: "green" } };
                        }
                      }, {
                        target: "labels",
                        mutation: (props) => {
                          return props.text === propsClicked.datum.amount ?
                            null : { text: propsClicked.datum.amount };
                        }
                      }
                    ];
                  }
                }
              }]}
        ></VictoryScatter>
        </VictoryChart>
        </>
        )
    
}

export default ChartTrends