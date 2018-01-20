import React from 'react'
class Produce2 extends React.Component {
	constructor () {
        super()
        this.state = {
			list: []
		}
    }
    componentWillMount () {
		fetch('./src/data/datalist.json')
		.then(res => {return res.json()})
		.then(res => {
			this.setState({
				list: res.list2
			})
        })
    } 
	render () {
		return (
			<div className="produce2">
				{
                    this.state.list.map((item, index) => {
                        return <div key={index} className='sections2'>
                            <p>{item.name}<span>{item.text}</span></p>
                            <section>
                                <p><em><b>+</b>{item.persent}<b>.{item.persent1}%</b></em><small>季涨幅</small></p>
                                <p><small>单位净值</small><span>{item.date}</span></p>
                                <div>
                                    <p>抢购</p>
                                    <small>已有<span>{item.num}人</span>购买</small>
                                </div>
                            </section>
                        </div>
                    })
                }
			</div>
		)
	}
}
export default Produce2