import React from 'react'

class Table extends React.Component{
	render() {
		let {list} = this.props
		return (
			<table width='400px' border='1px solid #ccc'>
				<thead align='center'>
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>Sex</th>
						<th>Age</th>
						<th>Tel</th>
					</tr>
				</thead>
				<tbody>
					{
						list && list.map((item, index) => {
							return (<tr align='center' key={item.id}>
								<td>{item.id}</td>
								<td>{item.name}</td>
								<td>{item.sex}</td>
								<td>{item.age}</td>
								<td>{item.tel}</td>
							</tr>)
						})
					}
				</tbody>
			</table>
		)
	}
}

export default Table