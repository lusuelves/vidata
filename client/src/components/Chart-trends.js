import React from 'react'
import ProjectTrendsServices from '../services/project.services'
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
         // data={[
        //     { x: 1, y: 2, amount: 30 },
        //     { x: 2, y: 3, amount: 40 },
        //     { x: 3, y: 5, amount: 25 },
        //     { x: 4, y: 4, amount: 10 },
        //     { x: 5, y: 7, amount: 45 }
        // ]}
        data = {info}

        />)
    
}

export default ChartTrends