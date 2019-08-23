import React from 'react'
import {VictoryBar} from 'victory'

const BarChart = (props) => {
        return<div>
            <h3>Click Me</h3>
            <VictoryBar horizontal
                style={{
                data: { fill: "#c43a31" }
                }}
                events={[{
                target: "data",
                eventHandlers: {
                    onClick: () => {
                    return [
                        {
                        target: "data",
                        mutation: (props) => {
                            const fill = props.style && props.style.fill;
                            return fill === "black" ? null : { style: { fill: "black" } }
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
            </div>
                }


export default BarChart