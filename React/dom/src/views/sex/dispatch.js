export default function mapDispatchToProps (dispatch) {
	return {
		updata_sex: (data) => dispatch({
			type: 'updata_sex',
			data: data
		})
	}
}