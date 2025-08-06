import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import AddPlant from '../pages/AddPlant';
import MyPlants from '../pages/MyPlants';
import AllPlants from '../pages/AllPlants';
import PlantDetails from '../pages/PlantDetails';
import UpdatePlant from '../pages/UpdatePlant';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';
import AddBlogPost from '../pages/AddBlogPost';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/add-plant', element: <PrivateRoute><AddPlant /></PrivateRoute> },
      { path: '/my-plants', element: <PrivateRoute><MyPlants /></PrivateRoute> },
      { path: '/add-blog', element: <PrivateRoute><AddBlogPost /></PrivateRoute> },
      { path: '/all-plants', element: <AllPlants /> },
      { path: '/plants/:id', element: <PrivateRoute><PlantDetails /></PrivateRoute> },
      { path: '/update-plant/:id', element: <PrivateRoute><UpdatePlant /></PrivateRoute> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);