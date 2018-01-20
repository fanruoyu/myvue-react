import React from 'react'
import H1 from '../components/H1'
import Dailog from '../components/dailog'
class Sex extends React.Component {
	constructor () {
		super()
		this.state = {
			ind: 0
		}
		this.dailog = this.dailog.bind(this)
		this.showBox = this.showBox.bind(this)
	}
	
	showBox(i) {
		this.setState({
			ind: i
		})
	}
	dailog () {
		this.refs.dailog.show()
	}
	render () {
		return (
			<div className='router sex'>
				<H1 go={this.props.history.go}>
					基本信息
				</H1>
				<div className="sex_maincont">
					<div className="main">
						<p>请选择您的性别</p>
						<section>
							<dl>
								<dt><i className="icon iconfont icon-nansheng"></i></dt>
								<dd>
									<p>我是男神</p>
									<span onClick={() => this.showBox(1)} className= {this.state.ind == 1? 'checked': ''}>√</span>
								</dd>
							</dl>
							<dl>
								<dt><i className="icon iconfont icon-nvsheng"></i></dt>
								<dd>
									<p>我是女神</p>
									<span onClick={() => this.showBox(2)} className= {this.state.ind == 2? 'checked': ''}>√</span>
								</dd>
							</dl>
						</section>
						<button onClick={this.dailog}>继续</button>
					</div>
				</div>
				<Dailog ref='dailog'/>
			</div>
		)
	}
}
export default Sex