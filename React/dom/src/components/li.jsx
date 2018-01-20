import React, {Fragment} from 'react'
import Radio from '../components/radio'
export default  class Li extends React.Component{
	constructor () {
		super()
		this.state= {
			splist: ['没有','很少','有时','经常','总是'],
		}
		this.callBack = this.callBack.bind(this)
	}
	callBack (i) {
		let obj = {}
		obj.index = this.props.id
		obj.text = this.state.splist[i]
		this.props.callBack(obj)
	}
	render () {
		return <li>
			{this.props.children}
			<Radio tag='span' className='active' type='feel' callBack={this.callBack}>
				{
					this.state.splist.map((item, index) => {
						return (
							<Fragment key={index}>{item}</Fragment>
						)
					})
				}
			</Radio>
		</li>
	}
}