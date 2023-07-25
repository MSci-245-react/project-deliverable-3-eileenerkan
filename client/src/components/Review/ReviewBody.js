import * as React from 'react';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';

const ReviewBody = ({ enteredReview, handleReviewChange }) => {
  return (
    <>
      <label>Enter your review:</label>
      <TextField
        multiline
        rows={4}
        value={enteredReview}
        onChange={handleReviewChange}
        inputProps={{ maxLength: 200 }} 
        variant="outlined"
        fullWidth
      />
      <Typography variant="caption" color="textSecondary">
        {enteredReview.length}/200 characters
      </Typography>
    </>
  );
};

export default ReviewBody;