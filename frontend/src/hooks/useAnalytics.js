import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize("G-FMQRR01H53");
  }, []);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);
};

export default useAnalytics;