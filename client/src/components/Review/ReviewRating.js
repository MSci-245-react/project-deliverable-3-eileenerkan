import React from 'react';
import { FormControl, FormControlLabel, RadioGroup, Radio, Typography } from '@mui/material';




function ReviewRating({ selectedRating, handleReviewRatingChange }) {
return (
<FormControl component="fieldset">
<Typography>Enter your rating Here:</Typography>
<RadioGroup value={selectedRating} onChange={handleReviewRatingChange} row>
<FormControlLabel value="1" control={<Radio />} label="1" />
<FormControlLabel value="2" control={<Radio />} label="2" />
<FormControlLabel value="3" control={<Radio />} label="3" />
<FormControlLabel value="4" control={<Radio />} label="4" />
<FormControlLabel value="5" control={<Radio />} label="5" />
</RadioGroup>
</FormControl>
);
}

export default ReviewRating;