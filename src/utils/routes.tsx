import { RouteObject } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Packages from '../pages/Packages';
import Tracking from '../pages/Tracking';
import Trackers from '../pages/Trackers';
import Drivers from '../pages/Drivers';
import Login from '../pages/Login';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/packages',
    element: <Packages />
  },
  {
    path: '/tracking',
    element: <Tracking />
  },
  {
    path: '/trackers',
    element: <Trackers />
  },
  {
    path: '/drivers',
    element: <Drivers />
  },
  {
    path: '*',
    element: <Login />
  }
];

export default routes;