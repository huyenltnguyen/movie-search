import React from 'react';
import Autosuggest from 'react-autosuggest';
import MovieDetails from './MovieDetails';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: '',
			suggestions: [],
			movieId: '137116',
			movieTitles: []
		};
	}

	componentDidMount() {
		this.getMovieData();
	}

	getMovieData = () => {
		// themoviedb api has been moved to server side
    // and can be used by sending a POST request
    // with an appName and a movie id
		fetch('https://whispering-bolt.glitch.me/api', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				appName: 'movie search app',
				movieId: this.state.movieId
			})
		})
		.then(response => response.json())
		.then(json => {
			// response is a json containing a message
			// and the data the third-party api sends back
			// { message: 'blah blah', data: {} }
			this.setState({ selectedMovie: json.data });
		})
		.catch(err => console.error(err));
	}

	getMovieTitles = () => {
		// themoviedb api has been moved to server side
    // and can be used by sending a POST request
    // with an appName and a movie id
		fetch('https://whispering-bolt.glitch.me/api', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				appName: 'movie search app',
				movieTitle: this.state.value
			})
		})
		.then(response => response.json())
		.then(json => {
			// response is a json containing a message
			// and the data the third-party api sends back
			// { message: 'blah blah', data: {} }
			this.setState({ movieTitles: json.data.results.slice(0, 10) });
		})
		.catch(err => console.error(err));
	}

	// Change value everytime input changes
	onChange = (event, { newValue }) => {
		this.setState({
			value: newValue
		});

		if (this.state.value.trim().length >= 2) {
			setTimeout(function() {
				this.getMovieTitles();
			}.bind(this), 300);
		}
	}

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
	  const inputValue = value.trim().toLowerCase();
	  const inputLength = inputValue.length;
	  const movieTitles = this.state.movieTitles;

	  return inputLength === 0 ? [] : movieTitles.filter(movie =>
	    movie.title.toLowerCase().slice(0, inputLength) === inputValue
	  ).slice(0, 5);
	}

	// When suggestion is clicked, Autosuggest needs to populate the input
	// based on the clicked suggestion. Teach Autosuggest how to calculate the
	// input value for every given suggestion.
	getSuggestionValue = suggestion => suggestion.title

	// Use your imagination to render suggestions.
  renderSuggestion = suggestion => {
  		const valueLen = this.state.value.length;
  		const suggestionLen = suggestion.title.length;
	  	return (
	  		<span><span className="matched">{ this.state.value }</span>{ suggestion.title.slice(valueLen, suggestionLen) }</span>
  		);
	}

	// Autosuggest will call this function every time you need to update suggestions.
  onSuggestionsFetchRequested = ({ value }) => {
    setTimeout(() => {
      const suggestions = this.getSuggestions(value);
      this.setState({
          suggestions
      });
    }, 1000);
  }

	// Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
      movieTitles: []
    });
    //console.log('movie titles on clear:', this.state.movieTitles);
  }

  // Autosuggest will call this function every time suggestion is selected via mouse or keyboard.
  onSuggestionSelected = (event, { suggestion }) => {
    //console.log('Movie selected:', suggestion);
    this.setState({
    	movieId: suggestion.id,
  	});

  	setTimeout(function() {
				this.getMovieData();
			}.bind(this), 500);
  }

	render() {
		const { value, suggestions } = this.state;

		const inputProps = {
			placeholder: 'Search Movie Title...',
			value,
			onChange: this.onChange
		};

		if (!this.state.selectedMovie) {return <p className="loading-text text-center">Loading...</p>}

		return (
			<div className="App container">
				<div className="row">
					<div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 wrapper">
						<div className="row search-bar">
							<Autosuggest
				        suggestions={ suggestions }
				        onSuggestionsFetchRequested={ this.onSuggestionsFetchRequested }
				        onSuggestionSelected={ this.onSuggestionSelected }
				        onSuggestionsClearRequested={ this.onSuggestionsClearRequested }
				        getSuggestionValue={ this.getSuggestionValue }
				        renderSuggestion={ this.renderSuggestion }
				        inputProps={ inputProps }
							/>
						</div>

						<MovieDetails movieData={this.state.selectedMovie} />
					</div>
				</div>

				<footer className="text-center">
					<h4>Created by <a href='https://huyenltnguyen.com' target='_blank' rel="noopener noreferrer">Huyen Nguyen</a>.</h4>
				</footer>
		</div>

		);
	}
}

export default App;
