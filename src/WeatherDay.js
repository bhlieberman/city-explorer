import React from 'react';
import Card from 'react-bootstrap/Card';

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

export default WeatherDay;