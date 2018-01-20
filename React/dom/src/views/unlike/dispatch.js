export default function mapDispatchToProps (dispatch) {
	return {
		updata_unlike: (data) => {
			dispatch({
				type: data.type,
				data:data
			})
		}
	}
}