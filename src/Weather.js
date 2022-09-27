import React from 'react'
import { Container, Card, Collapse } from 'react-bootstrap'

class Weather extends React.Component {
    render() {
        return (
            <Container>
                {this.props.forecastData.map((day) => {
                    return (<Card>
                        <Card.Body className="border-1">
                            <Card.Text>{day.date}</Card.Text>
                            <Card.Text>{day.description}</Card.Text>
                        </Card.Body>
                    </Card>)
                })}
            </Container>
        )
    }
}

export default Weather;