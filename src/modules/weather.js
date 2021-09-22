import React from 'react'
import { Table } from 'react-bootstrap'

class weather extends React.Component {
    render() {
        return (
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.weather.map((ele, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{ele.description}</td>
                                    <td>{ele.date}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        )
    }
}

export default weather