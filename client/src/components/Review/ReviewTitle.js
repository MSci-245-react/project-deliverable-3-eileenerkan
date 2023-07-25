import * as React from 'react';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';


const reviewTitle = ({ enteredTitle, handleTitleChange }) => {
return (
<>
<label>Enter your review title:</label>
<TextField value={enteredTitle} onChange={handleTitleChange} variant="outlined" fullWidth />
</>
);
};


export default reviewTitle;