import React from 'react'
import {VictoryScatter} from 'victory'

const ChartTrends = ({info}) => {


        return (
        <VictoryScatter
        style={{ 
            data: { fill: (d) => d.fill, 
                    opacity: (d) => d.opacity
            }
        }}
        bubbleProperty="amount"
        maxBubbleSize={25}
        minBubbleSize={5}
        data = {info}
        />)
    
}

export default ChartTrends