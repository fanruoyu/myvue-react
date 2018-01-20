export default function mapDispatchToProps (dispatch) {
	return {
		updata_illness: (obj) => {
			dispatch({
				type: obj.type,
				data: obj
			})
		}
	}
}