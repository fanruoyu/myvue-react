import React from 'react'
import H1 from '../components/H1'

class Feeling extends React.Component {
	constructor () {
		super()
		this.state = {
			list: ['您的皮肤一抓就红，并出现抓痕吗？','您平时痰多特别是咽喉部总感觉有痰堵塞吗？','您吃(喝)凉的东西会感到不舒服或者怕吃(喝)凉的东西吗?','您手脚发凉吗？','您胃脘部、背部或腰膝部怕冷吗？'],
			splist: ['没有','很少','有时','经常','总是']
		}
		this.submitFn = this.submitFn.bind(this)
	}
	submitFn () {
		console.log('提交')
	}
	render () {
		return (
			<div className='router feeling'>
				<H1 go={this.props.history.go}>
					你的感觉？
				</H1>
				<div className="feeling_maincont">
					<div className="main">
						<div className="list">
							<ul>
								{
									this.state.list.map((item, index) => {
										return <li key={index}>
											<h4>{item}</h4>
											{
												this.state.splist.map((val,ind) => {
													return <span key={ind}>{val}</span>
												})
											}
										</li>
									})
								}
							</ul>
						</div>
						<button onClick={this.submitFn}>提交</button>
					</div>
				</div>
			</div>
		)
	}
}
export default Feeling