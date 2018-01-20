import React from 'react'
import Li from './li'
class Mask extends React.Component {
    constructor() {
        super()
        this.state = {
            list: [
                {
                    text: '全部'
                },
                {
                    text: '押车宝'
                },
                {
                    text: '流水宝'
                },
                {
                    text: '黄金宝'
                },
                {
                    text: '体验包'
                }
            ]
        }
    }
    render() {
        return (<div className='mask'>
            <ul>
                {
                    this.state.list.map((val, index) => {
                        return <Li key={index} text={val.text}/>
                    })
                }
            </ul>
        </div>)
    }
}
export default Mask