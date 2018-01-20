import React from 'react'
import H1 from '../components/H1'

class Thick extends React.Component {
	constructor () {
		super()
		this.state = {
			ind: 0,
			list: ['心脏病','冠心病','肺癌','心脏病','心脏病','肺癌','肝病','肺癌'],
			id: 0
		}
		this.gotoFood = this.gotoFood.bind(this)
		this.showBox = this.showBox.bind(this)
		this.changeInd = this.changeInd.bind(this)
	}
	gotoFood () {
		let { push } = this.props.history
		push('/food')
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
			<div className='router thick'>
				<H1 go={this.props.history.go}>
					基本信息
				</H1>
				<div className="thick_maincont">
					<div className="main">
						<p>有无病史</p>
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
						<button onClick={this.gotoFood}>继续</button>
					</div>
				</div>
			</div>
		)
	}
}
export default Thick