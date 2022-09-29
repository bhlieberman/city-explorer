import React from 'react'
import { Container, Card } from 'react-bootstrap'

class Weather extends React.Component {
    render() {
        return (
            <Container>
                {this.props.forecastData.map((day, index) => {
                    return (<WeatherDay day={day} key={index} />)
                })}
            </Container>
        )
    }
}


class WeatherDay extends React.Component {
    render() {
        return (
            <Card>
                <Card.Body className="border-1">
                    <Card.Text>{this.props.day.date}</Card.Text>
                    <Card.Text>{this.props.day.description}</Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default Weather;

