import React from 'react'
import H1 from '../components/H1'

class Food extends React.Component {
	constructor () {
		super()
		this.state = {
			ind: 0,
			list: ['羊肉','海鲜','芹菜','胡萝卜','芹菜','肝病','芹菜'],
			id: 0
		}
		this.gotoUnlike = this.gotoUnlike.bind(this)
		this.showBox = this.showBox.bind(this)
		this.changeInd = this.changeInd.bind(this)
	}
	gotoUnlike () {
		let { push } = this.props.history
		push('/unlike')
	}
	showBox(i) {
		this.setState(state => {
			return state.ind = i
		})
	}
	
	changeInd (i) {
		this.setState(state => {
			return state.id = i
		})
	}
	render () {
		return (
			<div className='router food'>
				<H1 go={this.props.history.go}>
					基本信息
				</H1>
				<div className="food_maincont">
					<div className="main">
						<p>有无过敏食物</p>
						<section>
							<div className="chose">
								<p>
									<span onClick={() => this.showBox(1)} className= {this.state.ind == 1? 'checked': ''}>√</span>无
								</p>
								<p>
									<span onClick={() => this.showBox(2)} className= {this.state.ind == 2? 'checked': ''}>√</span>有
								</p>
							</div>
							{
								this.state.ind == 2 && <div className="showBox">
									<b></b>
									{
										this.state.list.map((item, index) => {
											return <span key={index} onClick={() => {this.changeInd(index)}} className={this.state.id === index? 'active': ''}>{item}</span>
										})
									}
								</div>
							}
						</section>
						<button onClick={this.gotoUnlike}>开始</button>
					</div>
				</div>
			</div>
		)
	}
}
export default Food