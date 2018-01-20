export default function mapDispatchToProps (dispatch) {
	return {
		updata_food: (data) => {
			dispatch ({
				type: data.type,
				data: data
			})
		}
	}
}