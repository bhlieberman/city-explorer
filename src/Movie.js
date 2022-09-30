import React from 'react';
import Card from 'react-bootstrap/Card';

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

export default Movie;