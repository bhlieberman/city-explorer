import React from 'react';
import { Container, Card, Collapse } from 'react-bootstrap'

class Movies extends React.Component {
    render() {
        return(
            <Container>
                {this.props.movies.map((movie, index) => {
                    return (<Card key={index}>
                        <Card.Body className="border-1">
                            <Card.Text>{movie.title}</Card.Text>
                            <Card.Text>{movie.overview}</Card.Text>
                            <Card.Text>{movie.popularity}</Card.Text>
                            <Card.Text>{movie.release_date}</Card.Text>
                            <Card.Text>{movie.vote_average}</Card.Text>
                            <Card.Text>{movie.vote_count}</Card.Text>
                        </Card.Body>
                    </Card>)
                })}
            </Container>
        )
    }
}

export default Movies;

class Movie {
    constructor(
        overview,
        popularity,
        poster_path,
        release_date,
        title,
        vote_average,
        vote_count) {
        this.overview = overview
        this.popularity = popularity
        this.poster_path = poster_path
        this.release_date = release_date
        this.title = title
        this.vote_average = vote_average
        this.vote_count = vote_count
    }
}