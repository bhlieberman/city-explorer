import React from 'react';
import { Container, Card } from 'react-bootstrap'

class Movies extends React.Component {
    render() {
        return(
            <Container>
                {this.props.movies.map((movie, index) => {
                    return (<Movie movie={movie} key={index} />)
                })}
            </Container>
        )
    }
}

class Movie extends React.Component {
    render() {
        return(<Card>
            <Card.Body className="border-1">
                <Card.Text>Title: {this.props.movie.title}</Card.Text>
                <Card.Text>Summary: {this.props.movie.overview}</Card.Text>
                <Card.Text>Popularity: {this.props.movie.popularity}</Card.Text>
                <Card.Text>Release date: {this.props.movie.release_date}</Card.Text>
                <Card.Text>Average vote: {this.props.movie.vote_average}</Card.Text>
                <Card.Text># of votes: {this.props.movie.vote_count}</Card.Text>
            </Card.Body>
        </Card>);
    }
}

export default Movies;