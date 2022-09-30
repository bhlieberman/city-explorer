import React from 'react'
import Container from 'react-bootstrap/Container'

import WeatherDay from './WeatherDay'

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

export default Weather;

