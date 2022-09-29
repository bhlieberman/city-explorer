import React from 'react';
import { Container, Card } from 'react-bootstrap'

class Movies extends React.Component {
    render() {
        return(
            <Container>
                {this.props.movies.map((movie, index) => {
                    return (<Card key={index}>
                        <Card.Body className="border-1">
                            <Card.Text>Title: {movie.title}</Card.Text>
                            <Card.Text>Summary: {movie.overview}</Card.Text>
                            <Card.Text>Popularity: {movie.popularity}</Card.Text>
                            <Card.Text>Release date: {movie.release_date}</Card.Text>
                            <Card.Text>Average vote: {movie.vote_average}</Card.Text>
                            <Card.Text># of votes: {movie.vote_count}</Card.Text>
                        </Card.Body>
                    </Card>)
                })}
            </Container>
        )
    }
}

export default Movies;