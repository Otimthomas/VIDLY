import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import { paginate } from './utils/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';

class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            movies: [],
            genres: [],
            pageSize: 4,
            currentPage: 1
         }
    }

    componentDidMount(){
        const genres = [{ name: 'All Genres'}, ...getGenres()]
        this.setState({movies: getMovies(), genres })
    }

    handleDelete = (movie) => {
       const movies = this.state.movies.filter(m => m._id !== movie._id);
       this.setState({movies});
    }

    handleInconChange = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    }

    handleGenreSelect = (genre) => {
        this.setState({selectedGenre: genre, currentPage: 1});
    }

    render() {
        const {length: count} = this.state.movies; 
        const {currentPage, pageSize, movies: allMovies, genres, selectedGenre} = this.state;
        if (count === 0)
            return <p>There are no movies in the database</p>;

        const filtered  = selectedGenre  && selectedGenre._id ? 
            (allMovies.filter(m => m.genre._id === selectedGenre._id )) : allMovies;

            console.log(genres);

        const movies = paginate(filtered, currentPage, pageSize);

        return (
            
            <React.Fragment>
                <div className="row">
                    <div className="col-3">
                        <ListGroup 
                            items={genres} 
                            onItemSelect={this.handleGenreSelect}
                            itemSelected={selectedGenre}
                        />
                    </div>
                    <div className="col">
                        <p>There are {filtered.length} in the database...</p>
                        <MoviesTable movies={movies} onLike={this.handleInconChange} onDelete={this.handleDelete}/>
                        <Pagination 
                        itemCount={filtered.length} 
                        pageSize={pageSize} 
                        onPageChange={this.handlePageChange}
                        currentPage={currentPage}/>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
 
export default Movies;