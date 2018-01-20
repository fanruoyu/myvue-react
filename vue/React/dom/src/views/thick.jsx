import React, {Fragment} from 'react'
import H1 from '../components/H1'
import {connect} from 'react-redux'
import mapStateToProps from './illness/state'
import mapDispatchToProps from './illness/dispatch'
import CheckBox from '../components/checkbox'
class Thick extends React.Component {
	constructor () {
		super()
		this.state = {
			ind: 0,
			type: '',
			list: ['心脏病','冠心病','肺癌','心脏病','心脏病','肺癌','肝病','肺癌']
		}
		this.gotoFood = this.gotoFood.bind(this)
		this.showBox = this.showBox.bind(this)
		this.callBack = this.callBack.bind(this)
	}
	gotoFood () {
		let { push } = this.props.history
		if (document.querySelector('.checked')) {
			if (document.querySelector('.ischecked')) {
				if (document.querySelectorAll('.thick_maincont .active').length == 0) {
					window.confirm('请选择病史')
				} else {
					push('/food')
				}
			} else {
				push('/food')
			}
		} else  {
			window.confirm('有无疾病')
		}
		
	}
	showBox(i) {
		this.setState(state => {
			return state.ind = i
		})
		if (i == 1) {
			this.setState(state => {
				state.type = 'no'
				return state
			})
		} else {
			this.setState(state => {
				state.type = 'yes'
				return state
			})
		}
	}
	callBack(val) {
		let arr = []
		val.ind.forEach(item => {
			arr.push(this.state.list[item])
		})
		this.props.updata_illness({
			type: this.state.type,
			data: arr
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
									<span onClick={() => this.showBox(2)} className= {this.state.ind == 2? 'checked ischecked': ''}>√</span>有
								</p>
							</div>
							{
								this.state.ind == 2 && <div className="showBox">
									<b></b>
									<CheckBox type='thick' callBack={this.callBack}>
										{
											this.state.list.map((val, index) => {
												return <Fragment key={index}>{val}</Fragment>
											})
										}
									</CheckBox>
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
export default connect(mapStateToProps, mapDispatchToProps)(Thick)