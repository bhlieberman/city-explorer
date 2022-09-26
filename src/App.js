import './App.css';
import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      error: ''
    }
  }
  getLocation = async () => {
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchQuery}&format=json`;
    try {
      const res = await axios.get(API);
      console.log(res.data[0])
      this.setState({ location: res.data[0] });
    } catch (error) {
      this.setState({ error: `${error.code}: ${error.message}` });
    }
  }
  render() {
    return (
      <>
        <Form className="container" onChange={(e) => this.setState({ searchQuery: e.target.value })}>
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" placeholder="Enter location" />
        </Form>
        <Button variant="primary" type="submit" onClick={this.getLocation}>
          Submit
        </Button>
        <Card>
          <Card.Body>
            {this.state.location.place_id && <><Card.Text>The city is: {this.state.location.display_name}</Card.Text>
              <Card.Text>The longitude is: {this.state.location.lon}</Card.Text>
              <Card.Text>The latitude is: {this.state.location.lat}</Card.Text></>}
            <Card.Text>{this.state.error && this.state.error}</Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default App;
