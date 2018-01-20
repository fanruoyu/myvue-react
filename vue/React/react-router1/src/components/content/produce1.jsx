import React from 'react'
class Produce1 extends React.Component {
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
				list: res.list1
			})
		}) 
	}
	render () {
		return (
			<div className="produce1">
				{
					this.state.list.map((item, index) => {
						return <div key={index} className='sections1'>
							<p>{item.name}<span>{item.text}</span></p>
							<section>
								<p><em>{item.persent}<b>.0%</b></em><small>年化收益</small></p>
								<p><small>期限</small><span>{item.date}</span>个月</p>
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
export default Produce1
/*
<p>{name}<span>{text}</span></p>
				<section>
					<p><em>{persent}<b>.0%</b></em><small>年化收益</small></p>
					<p><small>期限</small><span>{date}</span>个月</p>
					<div>
						<p>抢购</p>
						<small>已有<span>{num}人</span>购买</small>
					</div>
				</section>
*/