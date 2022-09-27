import './App.css';
import React from 'react';
import axios from 'axios';
import { Form, Button, Card, Collapse, Container } from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css";

import Weather from './Weather.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      error: '',
      map: '',
      open: false,
      weather: []
    }
  }
  key = process.env.REACT_APP_CITY_KEY;
  getLocation = async () => {
    const API = `https://us1.locationiq.com/v1/search.php?key=${this.key}&q=${this.state.searchQuery}&format=json`;
    try {
      const res = await axios.get(API);
      const { lat, lon } = res.data[0];
      const weather = await axios.get(`http://localhost:3001/weather?lat=${lat}&lon=${lon}&searchQuery=${this.state.searchQuery}`);
      this.setState({
        location: res.data[0],
        map: `https://maps.locationiq.com/v3/staticmap?key=${this.key}&center=${lat},${lon}&zoom=17`,
        weather: weather.data
      });
    } catch (error) {
      this.setState({ error: `${error.code}: ${error.message}` });
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
              <Weather forecastData={this.state.weather} />
            </Card.Body>
          </Card>
        </Collapse>
      </Container>
    );
  }
}

export default App;
