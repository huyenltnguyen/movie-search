import React from 'react';

const MovieDetails = (props) => {
	const movieData = props.movieData;

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
			<div className="col-sm-5 poster-container">
				<img className="poster img-responsive" src={'https://image.tmdb.org/t/p/w500' + movieData.poster_path} alt=""/>
			</div>

			<div className="col-sm-7 details-container">
				<h1>{movieData.title}</h1>

				<div className="row movie-info">
					<div className="col-xs-4">
						<p>{ movieData.release_date.substring(0, 4) }</p>
					</div>

					<div className="col-xs-4">
						<p>{ movieData.runtime } mins</p>
					</div>

					<div className="col-xs-4">
						<p>{ vote_average }</p>
					</div>

				</div>

				<h2 className="genres">
					{ movieData.genres.map(genre => {
							return <span key={genre.id} className="genre">{genre.name}</span>
						})
				 	}
				</h2>

				<p className="overview-content">{ movieData.overview }</p>
			</div>
		</div>

	);

};

export default MovieDetails;