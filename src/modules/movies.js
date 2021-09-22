import React from 'react'
import { Table } from 'react-bootstrap'

class movies extends React.Component {
    render() {
        return (
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.movie.map((ele, idx) => {
                            return (
                                <tr key={idx}>
                                    <td >{ele.title}</td>
                                    <td>{ele.vote_average}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        )
    }
}

export default movies