import React from 'react'
import H1 from '../components/H1'
import CheckBox from '../components/checkbox'
class Unlike extends React.Component {
	constructor () {
		super()
		this.state = {
			list:['羊肉','西瓜','海鲜','洋葱', '芹菜','芹菜','胡萝卜','胡萝卜','韭菜','香菜']
		}
		this.gotoFeeling = this.gotoFeeling.bind(this)
	}
	gotoFeeling () {
		let { push } = this.props.history
		push('/feeling')
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
							{
								this.state.list.map((item, index) => {
									return <CheckBox item={item} key={index}/>
								})
							}
						</section>
						<button onClick={this.gotoFeeling}>开始测试</button>
					</div>
				</div>
			</div>
		)
	}
}
export default Unlike