import React, {Fragment} from 'react'
import Table from './table'
import { Pagination } from 'antd'
import 'antd/lib/pagination/style'
function tablecont (MyDom) {
	class Tablecont extends React.Component{
		constructor() {
			super()
			this.state = {
				pageSize: 10,
				len: 0,
				startPage: 1,
				list: null
			}
			this.changePage = this.changePage.bind(this)
		}
		componentWillMount () {
			let feeling = {
				page: this.state.startPage,
				pageSize: this.state.pageSize
			}
			fetch('/test/list', {
				method: 'post',
				body:  JSON.stringify(feeling),
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			}).then(res => {
				return res.json()
			}) .then(res => {
				this.setState(state => {
					state.list = res.list
					state.len = res.len
					return state
				})
			})
		}
		changePage (page, pageSize) {
			let feeling = {
				page: page,
				pageSize: pageSize
			}
			fetch('/test/list', {
				method: 'post',
				body:  JSON.stringify(feeling),
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			}).then(res => {
				return res.json()
			}) .then(res => {
				this.setState(state => {
					return state.list = res.list
				})
			})
		}
		render() {
			return (
				<Fragment>
					<MyDom list={this.state.list}/>
					<Pagination defaultCurrent={this.state.startPage} total={this.state.len} pageSize = {this.state.pageSize} onChange={this.changePage}/>	
				</Fragment>
			)
		}
	}
	return Tablecont
}
let MyCont = tablecont(Table)
export default MyCont