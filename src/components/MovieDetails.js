// jshint ignore: start
import React from 'react';

const MovieDetails = (props) => {
	const movieData = props.movieData;	

	//--------- set backdrop as body background -------//
	if (movieData.backdrop_path) {
		const backdropURL = `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`;

		document.body.classList.add('backdrop');
		document.body.style = `background-image: url(${backdropURL});
														background-size: cover;
														background-repeat: no-repeat;
														`;
	} else {
		document.body.style = 'background-color: #242424';
	}

	//--------- format Vote Average --------//
	let vote_average = movieData.vote_average;

	if (vote_average === 0) {
		vote_average = '-';
	} else {
		vote_average += '/10';
	}


	//--------- format Vote Average --------//
	let revenue = movieData.revenue;	

	if (revenue === 0) {
		revenue = '-';
	} else {
		revenue = `$${revenue.toLocaleString()}`;
	}

	return (
		<div className="movie-details row">
			<div className="col-md-7 col-md-push-5 col-sm-7 col-sm-push-5 details-container">
				<h1>{movieData.title}</h1>

				<h2 className="genres">
					{ movieData.genres.map(genre => {
							return <span key={genre.id} className="genre">{genre.name}</span>
						})
				 	}
				</h2>

				<h3>Overview:</h3>
				<p className="overview-content">{ movieData.overview }</p>

				<div className="row">
					<div className="col-md-6 col-sm-6 col-xs-6">
						<h3>Release Date:</h3>
						<p>{ movieData.release_date }</p>
					</div>

					<div className="col-md-6 col-sm-6 col-xs-6">
						<h3>Running Time:</h3>
						<p>{ movieData.runtime } mins</p>
					</div>
				</div>

				<div className="row">
					<div className="col-md-6 col-sm-6 col-xs-6">
						<h3>Box Office:</h3>
						<p>{ revenue }</p>
					</div>

					<div className="col-md-6 col-sm-6 col-xs-6">
						<h3>Vote Average:</h3>
						<p>{ vote_average }</p>
					</div>
				</div>
			</div>

			<div className="col-md-5 col-md-pull-7 col-sm-5 col-sm-pull-7 poster-container">
				<img className="poster" src={'https://image.tmdb.org/t/p/w500' + movieData.poster_path} alt=""/>
			</div>
		</div>

	);
	
};

export default MovieDetails;