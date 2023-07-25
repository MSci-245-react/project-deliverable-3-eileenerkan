import React, { useEffect, useState } from 'react';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';
import MovieSelection from './MovieSelection';
import Typography from '@mui/material/Typography';
import { Grid, Button } from '@mui/material';

const Review = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredReview, setEnteredReview] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [completedSubmission, setCompletedSubmission] = useState({});
  const [userID, setUserID] = useState(1);
  const [movieID, setMovieID] = useState();


  useEffect(() => {
    callApiLoadMovies().then((movies) => {
      setMovies(movies);
    });
  }, []);

  const callApiLoadMovies = async () => {
    const url = '/api/getMovies';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return JSON.parse(body.express);
  };

  useEffect(() => {
    getMovies();
  }, [selectedMovie]);

  const getMovies = () => {
    const getID = movies.find((movie) => movie.name === selectedMovie);
    if (getID) {
      setMovieID(getID.id);
      console.log(getID.id);
    }
  };

  const callApiAddReview = async () => {
    const url = '/api/addReview';
    const review = {
      userID: userID,
      movieID: movieID,
      reviewTitle: enteredTitle,
      reviewScore: selectedRating,
      reviewContent: enteredReview,
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  const handleMovieChange = (event) => {
    setSelectedMovie(event.target.value);
  };

  const handleTitleChange = (event) => {
    setEnteredTitle(event.target.value);
  };

  const handleReviewChange = (event) => {
    setEnteredReview(event.target.value);
  };

  const handleReviewRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors({});

    const tempErrors = {};

    if (!selectedMovie) {
      tempErrors.movieError = 'Select your movie here';
    }
    if (!enteredTitle) {
      tempErrors.titleError = 'Enter your review title here';
    }
    if (!enteredReview) {
      tempErrors.reviewError = 'Enter your review here';
    }
    if (!selectedRating) {
      tempErrors.ratingError = 'Select the rating here';
    }

    setFormErrors(tempErrors);

    const submission = {
      selectedMovie,
      enteredTitle,
      enteredReview,
      selectedRating,
    };

    setCompletedSubmission(submission);

    if (Object.keys(tempErrors).length === 0) {
      try {
        callApiAddReview();
        setSelectedMovie('');
        setEnteredTitle('');
        setEnteredReview('');
        setSelectedRating('');
        setIsSubmitted(true);
      } catch (error) {
        console.error('Error submitting the review try again:', error);
      }
    }
  };
  const ratings = [1, 2, 3, 4, 5];
  
  return (
    <>
      <Typography variant="h3">Review a Movie</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MovieSelection
            movies={movies}
            selectedMovie={selectedMovie}
            handleMovieChange={handleMovieChange}
          />
          {isSubmitted && formErrors.movieError && (
            <Typography variant="body2" color="error">
              {formErrors.movieError}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <ReviewTitle
            enteredTitle={enteredTitle}
            handleTitleChange={handleTitleChange}
          />
          {isSubmitted && formErrors.titleError && (
            <Typography variant="body2" color="error">
              {formErrors.titleError}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <ReviewBody
            enteredReview={enteredReview}
            handleReviewChange={handleReviewChange}
          />
          {isSubmitted && formErrors.reviewError && (
            <Typography variant="body2" color="error">
              {formErrors.reviewError}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <ReviewRating
            ratings={ratings}
            selectedRating={selectedRating}
            handleReviewRatingChange={handleReviewRatingChange}
          />
          {isSubmitted && formErrors.ratingError && (
            <Typography variant="body2" color="error">
              {formErrors.ratingError}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" align="center" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
        {isSubmitted && !Object.keys(formErrors).length > 0 && (
          <Grid item xs={8}>
            <Typography variant="body1">
              Your review has successfully been received, thanks!
            </Typography>
            <Typography variant="body1">Movie: {completedSubmission.selectedMovie}</Typography>
            <Typography variant="body1">Title: {completedSubmission.enteredTitle}</Typography>
            <Typography variant="body1">Review: {completedSubmission.enteredReview}</Typography>
            <Typography variant="body1">Rating: {completedSubmission.selectedRating}</Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Review;