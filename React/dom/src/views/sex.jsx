import React, {Fragment} from 'react'
import H1 from '../components/H1'
import {connect} from 'react-redux'
import mapStateToProps from './sex/state'
import mapDispatchToProps from './sex/dispatch'
import Dailog from '../components/dailog'
import Radio from '../components/radio'
class Sex extends React.Component {
	constructor () {
		super()
		this.state = {
			ind: 0
		}
		this.dailog = this.dailog.bind(this)
		this.callBack = this.callBack.bind(this)
	}
	dailog () {
		if (document.getElementsByClassName('checked').length == 0) {
			window.confirm('请选择您的性别')
		} else  {
			this.refs.dailog.show()
		}
	}
	callBack (val) {
		this.props.updata_sex({
			type: 'updata_sex',
			data: val
		})
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
							<Radio tag="dl" className='checked' callBack={this.callBack}>
								<Fragment>
									<dt><i className="icon iconfont icon-nansheng"></i></dt>
									<dd>
										<p>我是男神</p>
										<span>√</span>
									</dd>
								</Fragment>
								<Fragment>
									<dt><i className="icon iconfont icon-nvsheng"></i></dt>
									<dd>
										<p>我是女神</p>
										<span>√</span>
									</dd>
								</Fragment>
							</Radio>
						</section>
						<button onClick={this.dailog}>继续</button>
					</div>
				</div>
				<Dailog ref='dailog'/>
			</div>
		)
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Sex)