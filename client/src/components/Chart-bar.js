import React from 'react'
import {VictoryBar, VictoryChart, VictoryZoomContainer } from 'victory'

const BarChart = (props) => {
    console.log(props)
        return<div>
            <h3>Click Me</h3>
            <VictoryChart
                domain={{x: [0, 1000]}}
                containerComponent={<VictoryZoomContainer zoomDomain={{x: [0, 10], y: [0, 20000]}}/>}
                animate = {{ duration: 2000, easing: "bounce" }}
                >
            <VictoryBar horizontal
                style={{
                data: { fill: "#c43a31" }
                }}
                events={[{
                target: "data",
                eventHandlers: {
                    onClick: (e, propsClicked) => {
                        console.log(propsClicked)
                    return [
                        {
                        target: "data",
                        mutation: (props) => {
                            const fill = props.style && props.style.fill;
                            return fill === "black" ? null : { style: { fill: "black" } }
                        }
                        }, {target: "labels",
                        mutation: (props) => {
                          return props.text === propsClicked.datum.y ?
                            null : { text: propsClicked.datum.y};
                        }
                    }
                    ]
                    }
                }
                }]}
                animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 }
                }}
                data = {props.info}
            />
            </VictoryChart>
            </div>
                }


export default BarChart