import React from 'react';
import Container from 'react-bootstrap/Container'
import Movie from './Movie';

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



export default Movies;