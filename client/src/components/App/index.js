import * as React from 'react';
import Review from '../Review';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from '../Landing';
import MyPage from '../MyPage';
import Search from '../Search';


const App = () => {
    return (
<Router>
<div>
<Routes>
<Route path="/Review" element={<Review />} />
<Route path="/" element={<Landing />} />
<Route path="/Search" element={<Search />} />
<Route path="/MyPage" element={<MyPage />} />
</Routes>
</div>
</Router>
);
};
export default App;