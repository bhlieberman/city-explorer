import './App.css';
import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      error: '',
      map: ''
    }
  }
  getLocation = async () => {
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchQuery}&format=json`;
    try {
      const res = await axios.get(API);
      this.setState({ location: res.data[0] });
      const mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${res.data[0].lat},${res.data[0].lon}&zoom=17`;
      this.setState({ map: mapUrl });
    } catch (error) {
      this.setState({ error: `${error.code}: ${error.message}` });
    }
  }
  render() {
    return (
      <>
        <Form className="container d-inline-block text-center p-2 justify-content-center" onChange={(e) => this.setState({ searchQuery: e.target.value })}>
          <Form.Label className="lead">Location</Form.Label>
          <Form.Control type="text" placeholder="Enter location" />
        </Form>
        <Button variant="primary" type="submit" data-bs-toggle="collapse" data-bs-target="#locdata" onClick={this.getLocation}>
          Submit
        </Button>
        <Card id="locdata" className="show text-center mw-25 h-auto">
          <Card.Body>
            {this.state.location.place_id && <><Card.Text className="fst-italic">The city is: {this.state.location.display_name}</Card.Text>
              <Card.Text className="fst-italic">The longitude is: {this.state.location.lon}</Card.Text>
              <Card.Text className="fst-italic">The latitude is: {this.state.location.lat}</Card.Text></>}
            <Card.Text className="fst-italic">{this.state.error && this.state.error}</Card.Text>
            <Image src={this.state.map}
              alt={this.state.location.display_name && `map of ${this.state.location.display_name}`}
              className="img-thumbnail img-fluid float-left"></Image>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default App;
