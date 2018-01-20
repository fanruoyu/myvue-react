import React from 'react'
import Swiper from  '../stantic/libs/swiper.min.js'
import '../stantic/libs/swiper.min.css'
class Index extends React.Component{
	constructor() {
		super()
	}
	componentDidMount() {
		var swiper = new Swiper('.swiper', {
			loop: true,
			autoplay:2000,
			pagination: '.pagination',
			paginationClickable: true,
			autoplayDisableOnInteraction:false
		})
	}
	render () {
		return (<div className='index'>
			<div className="swiper-container swiper">
				<div className="swiper-wrapper">
					<div className="swiper-slide"><img src="./src/stantic/img/1.jpg" alt=""/></div>
					<div className="swiper-slide"><img src="./src/stantic/img/2.jpg" alt=""/></div>
					<div className="swiper-slide"><img src="./src/stantic/img/3.jpg" alt=""/></div>
					<div className="swiper-slide"><img src="./src/stantic/img/4.jpg" alt=""/></div>
				</div>
				<div className="swiper-pagination pagination"></div>
			</div>
		</div>)
	}
}
export default Index