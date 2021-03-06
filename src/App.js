import React from 'react'
import { Form, Button, Card, Alert, Table } from 'react-bootstrap'
import axios from 'axios'
import Weather from './modules/weather';
import Movies from './modules/movies';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      result: {},
      weather: [],
      movie: [],
      location: '',
      showCard: false,
      showError: false
    }
  }

  sub = async (e) => {
    e.preventDefault();
    if (e.target.locationForm.value) {
      await this.setState({
        location: e.target.locationForm.value
      })

      let resultUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${this.state.location}&format=json`;
      let temResult = await axios.get(resultUrl);
      let weatherUrl = `${process.env.REACT_APP_SERVER_LINK}/weather?lat=${temResult.data[0].lat}&lon=${temResult.data[0].lon}`;
      let temWeather = await axios.get(weatherUrl);
      let movieUrl = `${process.env.REACT_APP_SERVER_LINK}/movie?title=${this.state.location}`;
      let temMovie = await axios.get(movieUrl);

      this.setState({
        result: temResult.data[0],
        weather: temWeather.data,
        movie: temMovie.data,
        showCard: true,
        showError: false
      })
    } else {
      this.setState({
        showError: true
      })
    }
  }


  render() {
    return (
      <div>
        <Form onSubmit={this.sub} style={{ width: '25%', margin: 'auto' }}>
          <Form.Group >
            <Form.Label style={{ fontSize: '30px' }}>Location</Form.Label>
            <Form.Control type="text" name='locationForm' placeholder="Enter Location" />
          </Form.Group>
          <Button type="submit">
            Explore!
          </Button>
        </Form>

        <Alert show={this.state.showError} variant="success" style={{ width: '25%', margin: '10px auto' }}>
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
          <div>
            <Card style={{ width: '30rem', margin: '10px auto', border: 'solid black 2px' }}>
              <Card.Body>
                <Card.Title style={{fontSize:'30px'}}>{this.state.location}</Card.Title>
                  <Card.Text style={{float: 'left'}}>latitude: {this.state.result.lat}</Card.Text>
                  <Card.Text style={{ float:'right'}}>longitude: {this.state.result.lon}</Card.Text>
                <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=${this.state.result.lat},${this.state.result.lon}&zoom=10`} style={{ border: 'solid black 2px' }} />
                <div>
                  <Weather weather={this.state.weather} />
                </div>
                <hr />
                {this.state.movie.length > 0 &&
                  <div>
                    <Movies movie={this.state.movie} />
                  </div>
                }
              </Card.Body>
            </Card>
          </div>
        }

      </div>
    )
  }
}

export default App
