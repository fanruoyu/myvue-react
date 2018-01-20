import React, {Fragment} from 'react'
import H1 from '../components/H1'
import {connect} from 'react-redux'
import mapStateToProps from './food/state'
import mapDispatchToProps from './food/dispatch'
import CheckBox from '../components/checkbox'
class Food extends React.Component {
	constructor () {
		super()
		this.state = {
			ind: 0,
			type: '',
			list: ['羊肉','海鲜','芹菜','胡萝卜','芹菜','肝病','芹菜']
		}
		this.gotoUnlike = this.gotoUnlike.bind(this)
		this.callBack = this.callBack.bind(this)
	}
	gotoUnlike () {
		let { push } = this.props.history
		if (document.querySelector('.checked')) {
			if (document.querySelector('.ischecked')) {
				if (document.querySelectorAll('.food_maincont .active').length == 0) {
					window.confirm('请选择过敏食物')
				} else {
					push('/unlike')
				}
			} else {
				push('/unlike')
			}
		} else  {
			window.confirm('有无过敏食物')
		}
	}
	showBox(i) {
		this.setState(state => {
			return state.ind = i
		})
		if (i == 1) {
			this.setState(state => {
				state.type = '0'
				return state
			}) 
		} else {
			this.setState(state => {
				state.type = '1'
				return state
			})
		}
	}
	callBack (val) {
		let arr = []
		val.ind.forEach(item => {
			arr.push(this.state.list[item])
		})
		this.props.updata_food({
			type: this.state.type,
			data: arr
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
									<span onClick={() => this.showBox(2)} className= {this.state.ind == 2? 'checked ischecked': ''}>√</span>有
								</p>
							</div>
							{
								this.state.ind == 2 && <div className="showBox">
									<b></b>
									<CheckBox callBack = {this.callBack}>
										{
											this.state.list.map((val, index) => {
												return <Fragment key={index}>{val}</Fragment>
											})
										}
									</CheckBox>
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
export default connect(mapStateToProps, mapDispatchToProps)(Food)