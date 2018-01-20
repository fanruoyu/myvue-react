import Index from '../views/index'
import Sex from '../views/sex'
import Thick from '../views/thick'
import Food from '../views/food'
import Unlike from '../views/unlike'
import Feeling from '../views/feelings'
import Result from '../views/result'

const router = {
	routes: [
		{
			path: '/index',
			component: Index
		},
		{
			path: '/sex',
			component: Sex
		},
		{
			path: '/thick',
			component: Thick
		},
		{
			path: '/food',
			component: Food
		},
		{
			path: '/unlike',
			component: Unlike
		},
		{
			path: '/feeling',
			component: Feeling
		},
		{
			path: '/result',
			component: Result
		}
	]
}
export default router