import './App.css';
import React from 'react';
import axios from 'axios';
import { Form, Button, Card, Collapse, Container } from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css";

import Weather from './Weather.js';
import Movies from './Movies';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      error: '',
      map: '',
      open: false,
      weather: [],
      movies: []
    }
  }
  key = process.env.REACT_APP_CITY_KEY;
  heroku = process.env.HEROKU;
  getLocation = async () => {
    const API = `https://us1.locationiq.com/v1/search.php?key=${this.key}&q=${this.state.searchQuery}&format=json`;
    try {
      const res = await axios.get(API);
      console.log(res.data[0].display_name)
      const { lat, lon } = res.data[0];
      this.setState({
        location: res.data[0],
        map: `https://maps.locationiq.com/v3/staticmap?key=${this.key}&center=${lat},${lon}&zoom=17`,
      });
    } catch (error) {
      this.setState({ error: `${error.code}: ${error.message}` });
    }
  }
  getWeather = async () => {
    const { lat, lon } = this.state.location;
    const API = `${heroku}/weather?lat=${lat}&lon=${lon}&searchQuery=${this.state.searchQuery}`;
    try {
      const weather = await axios.get(API);
      this.setState({ weather: weather.data });
    } catch (error) {
      this.setState({ error: `${error.code}: ${error.message}` })
    }
  }
  getMovies = async () => {
    const API = `${heroku}/movies?searchQuery=${this.state.location.display_name.split(',')[0]}`;
    console.log(API);
    try {
      const movies = await axios.get(API);
      this.setState({ movies: movies.data })
    } catch (error) {
      console.log(error);
      this.setState({ error: `${error.code}: ${error.message}` })
    }
  }
  setOpen = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  }
  render() {
    return (
      <Container>
        <Form className="d-inline-block text-center p-2 border-3 justify-content-center" onChange={(e) => this.setState({ searchQuery: e.target.value })}>
          <Form.Label className="lead">Location</Form.Label>
          <Form.Control type="text" placeholder="Enter location" />
        </Form>
        <Button variant="primary" type="submit" onClick={() => { this.getLocation(); this.setOpen() }} aria-controls="locdata" aria-expanded={this.state.open}>
          Submit
        </Button>
        <Collapse in={this.state.open}>
          <Card id="locdata" className="text-center mw-25 h-auto">
            <Card.Body>
              {this.state.location.place_id && <><Card.Text className="fst-italic">The city is: {this.state.location.display_name}</Card.Text>
                <Card.Text className="fst-italic">The longitude is: {this.state.location.lon}</Card.Text>
                <Card.Text className="fst-italic">The latitude is: {this.state.location.lat}</Card.Text></>}
              <Card.Text className="fst-italic">{this.state.error ? this.state.error : ''}</Card.Text>
              <Card.Img src={this.state.map}
                alt={this.state.location.display_name && `map of ${this.state.location.display_name}`}
                className="img-thumbnail img-fluid float-left"></Card.Img>
              <Button variant="primary" onClick={() => this.getWeather()}>Get Weather</Button>
              <Weather forecastData={this.state.weather} />
              <Button variant="primary" onClick={() => this.getMovies()}>Get Movies</Button>
              <Movies movies={this.state.movies} />
            </Card.Body>
          </Card>
        </Collapse>
      </Container>
    );
  }
}

export default App;
