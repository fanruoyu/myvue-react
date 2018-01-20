import React from 'react'
import Oli from '../components/oli'
class Result extends React.Component{
	constructor() {
		super()
		this.state = {
			flag: ['false', 'false'],
			icon: ['icon iconfont icon-jiantou2','icon iconfont icon-jiantou2'],
			text: ['宜食','不宜食'],
			ic: 'icon iconfont icon-jiantou2'
		}
		this.downFn = this.downFn.bind(this)
	}
	downFn (i) {
		if (!this.state.flag[i]) {
			this.state.ic = 'icon iconfont icon-jiantou2'
		} else {
			this.state.ic = 'icon iconfont icon-arw-top'
		}
		
		this.setState(state => {
			state.flag[i] = !this.state.flag[i]
			state.icon[i] = this.state.ic
			return state
		})
	}
	render () {
		return (
			<div className="router result">
				<h1>和平体质</h1>
				<div className="result_maincont">
					<div className="details">
						<small>您的体质为：</small>
						<h1>
                            平和质 偏阴虚
						</h1>
						<span>一样气血调和，一体太失踪，面临色红润，精力充沛等为主要特征。</span>
						<i className="icon iconfont icon-jiantou-copy-copy"></i>
					</div>
					<ol className="my_list">
						{
							this.state.text.map((item, index) => {
								return <Oli key={index} onClick={this.downFn} item={item} flag={this.state.flag[index]} downFn = {this.downFn} icon = {this.state.icon[index]} index={index}></Oli>
							})
						}
					</ol>
				</div>
			</div>
		)
	}
}

export default Result