import React, {Fragment} from 'react'
import H1 from '../components/H1'
import {connect} from 'react-redux'
import mapStateToProps from './unlike/state'
import mapDispatchToProps from './unlike/dispatch'
import CheckBox from '../components/checkbox'
class Unlike extends React.Component {
	constructor () {
		super()
		this.state = {
			list:['羊肉','西瓜','海鲜','洋葱', '芹菜','芹菜','胡萝卜','胡萝卜','韭菜','香菜']
		}
		this.gotoFeeling = this.gotoFeeling.bind(this)
		this.callBack = this.callBack.bind(this)
	}
	gotoFeeling () {
		let { push } = this.props.history
		if (document.querySelectorAll('.unlike_maincont .active').length == 0) {
			window.confirm('至少选择一个你不喜欢的食物')
		} else {
			push('/feeling')
		}
	}
	callBack (val) {
		let arr = []
		val.ind.forEach(item => {
			arr.push(this.state.list[item])
		})
		this.props.updata_unlike({
			type: 'updata_unlike',
			data: arr
		})
	}
	render () {
		return (
			<div className='router unlike'>
				<H1 go={this.props.history.go}>
					基本信息
				</H1>
				<div className="unlike_maincont">
					<div className="main">
						<p>不喜欢吃的食物</p>
						<section>
							<CheckBox callBack = {this.callBack}>
								{
									this.state.list.map((item, index) => {
										return <Fragment key={index}>
											<span>√</span>
											<small>{item}</small>
										</Fragment>
									})
								}
							</CheckBox>
						</section>
						<button onClick={this.gotoFeeling}>开始测试</button>
					</div>
				</div>
			</div>
		)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Unlike)