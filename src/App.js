import React from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import axios from 'axios'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      result: {},
      location: '',
      showCard: false,
      showError: false
    }
  }

  sub = async (e) => {
    e.preventDefault();
    console.log(e.target.locationForm.value)
    if (e.target.locationForm.value) {
      console.log('lolol')
      await this.setState({
        location: e.target.locationForm.value
      })

      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${this.state.location}&format=json`;
      let temResult = await axios.get(url);
      console.log('cccccccc', temResult.data[0]);

      this.setState({
        result: temResult.data[0],
        showCard: true
      })
    } else {
      console.log('l')
      this.setState({
        showError: true
      })
    }
  }


  render() {
    return (
      <div>
        <Form onSubmit={this.sub}>
          <Form.Group >
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" name='locationForm' placeholder="Enter Location" />
          </Form.Group>
          <Button type="submit">
            Explore!
          </Button>
        </Form>

        <Alert show={this.state.showError} variant="success">
          <Alert.Heading>Enter a valid location</Alert.Heading>
          <div className="d-flex justify-content-end">
            <Button onClick={() => this.setState({
              showError: false
            })} variant="outline-success">
              Close
            </Button>
          </div>
        </Alert>

        {this.state.showCard &&
          <>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{this.state.location}</Card.Title>
                <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=${this.state.result.lat},${this.state.result.lon}&zoom=10`} />
                <Card.Text>
                  <p>latitude: {this.state.result.lat}</p>
                  <p>longitude: {this.state.result.lon} </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </>
        }

      </div>
    )
  }
}

export default App
