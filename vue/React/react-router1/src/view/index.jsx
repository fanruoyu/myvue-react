import React from 'react'
import Swiper from  '../../../react-libs/libs/swiper.min.js'
import '../../../react-libs/libs/swiper.min.css'
class Index extends React.Component{
	constructor() {
		super()
	}
	componentDidMount() {
		var swiper = new Swiper('.swiper', {
			loop: true,
			autoplay:1000,
			pagination: '.pagination',
			paginationClickable: true
		})
	}
	render () {
		return (<div className='index'>
			<div className="index_header">
				<h1><i className='icon iconfont icon-douzikongxin'></i>开财宝</h1>
				<i className='icon iconfont icon-kefu'></i>
			</div>
			<div className="swiper-container swiper">
				<div className="swiper-wrapper">
					<div className="swiper-slide"><img src="http://weixin.51tiancai.com/uploads/cc58a7f29c39ce4ab67f3eb0a6bea088.png" alt=""/></div>
					<div className="swiper-slide"><img src="http://weixin.51tiancai.com/uploads/e03d0a4ec2bb918e3ea9e46da21bfffd.jpg" alt=""/></div>
					<div className="swiper-slide"><img src="http://weixin.51tiancai.com/uploads/fe9d1c2e748488a52bec608f16ac5af0.png" alt=""/></div>
					<div className="swiper-slide"><img src="http://weixin.51tiancai.com/uploads/ca336071f5c3567e4e3e9f262e1d1131.png" alt=""/></div>
				</div>
				<div className="swiper-pagination pagination"></div>
			</div>
			<div className="doubledl">
				<dl>
					<dd>累计成交金额</dd>
					<dt>29,089.80<span>万元</span></dt>
				</dl>
				<dl>
					<dd>为投资人赚取利益</dd>
					<dt>594.89<span>万元</span></dt>
				</dl>
			</div>
		</div>)
	}
}
export default Index