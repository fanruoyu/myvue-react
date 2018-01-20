export default function mapDispatchToProps (dispatch) {
	return {
		updata_feel: (data) => {
			dispatch({
				type:data.type,
				data:data
			})
		}
	}
}