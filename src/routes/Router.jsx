import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import AddPlant from '../pages/AddPlant';
import MyPlants from '../pages/MyPlants';
import AllPlants from '../pages/AllPlants';
import PlantDetails from '../pages/PlantDetails';
import ViewBlog from '../pages/ViewBlog';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';
import AddBlogPost from '../pages/AddBlogPost';
import Profile from '../pages/Profile';
import SearchResults from "../pages/SearchResults";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path : "/search" , element : <SearchResults />},
      { path: '/add-plant', element: <PrivateRoute><AddPlant /></PrivateRoute> },
      { path: '/my-plants', element: <PrivateRoute><MyPlants /></PrivateRoute> },
      { path: '/add-blog', element: <PrivateRoute><AddBlogPost /></PrivateRoute> },
      { path: '/profile', element: <PrivateRoute><Profile /></PrivateRoute> },
      { path: '/all-plants', element: <AllPlants /> },
      { path: '/plants/:id', element: <PrivateRoute><PlantDetails /></PrivateRoute> },
      { path: '/blogpost/:id', element: <PrivateRoute><ViewBlog /></PrivateRoute> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);