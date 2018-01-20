import React from 'react'
class My extends React.Component {
	constructor() {
		super()
		this.state = {
			list: [
				{
					icon: 'icon iconfont icon-liwu',
					val: '推荐有礼',
					id: 1
				},
				{
					icon: 'icon iconfont icon-bianji01',
					val: '签到',
					id: 2
				},
				{
					icon: 'icon iconfont icon-lijinquan',
					val: '礼券',
					id: 3
				},
				{
					icon: 'icon iconfont icon-jifen',
					val: '积分',
					id: 4
				}
			],
			olist: [
				{
					id: 1,
					icon: 'icon iconfont icon-touzi-copy',
					val: '我的投资',
					small: 0.00
				},
				{
					id: 2,
					icon: 'icon iconfont icon-jilu',
					val: '交易记录'
				},
				{
					id: 3,
					icon: 'icon iconfont icon-renzheng',
					val: '身份认证让',
					small: '未认证'
				},
				{
					id: 4,
					icon: 'icon iconfont icon-qia',
					val: '我的银行卡',
					small: '未认证'
				},
				{
					id: 5,
					icon: 'icon iconfont icon-shezhi',
					val: '设置'
				}
			]
		}
		this.gotoLogin = this.gotoLogin.bind(this)
		this.gotoResign = this.gotoResign.bind(this)
	}
	gotoLogin() {
		let { push } = this.props.history
		push('/')
	}
	gotoResign() {
		console.log('gotoResign')
	}
	componentDidMount() {
		let ls = localStorage
		let userObj = ls.getItem('userObj')
	}
	render() {
		return (<div className='router my'>

			<div className="topHeader">
				<h1><img src="./src/stantic/img/1.jpg" alt="" /></h1>
				{
					!JSON.parse(localStorage.getItem('userObj')) && <div className="btn">
						<button className='loginBtn' onClick={this.gotoLogin}>登录</button>
						<button className='resignBtn' onClick={this.gotoResign}>注册</button>
					</div>
				}
			</div>

			<div className="myContent">
				<ul className='my_list'>
					{
						this.state.list.map((item, index) => {
							return <li key={index}><i className={item.icon}></i><span>{item.val}</span></li>
						})
					}
				</ul>
				<ol className='ol_list'>
					{
						this.state.olist.map((item, index) => {
							return <li key={index}>
								<i className={item.icon}></i>
								<i className='icon iconfont icon-jiantou-copy-copy'></i>
								<span>{item.val}</span>
								{
									item.small && <small>{item.small}</small>
								}
							</li>
						})
					}
				</ol>
			</div>
		</div>)
	}
}
export default My