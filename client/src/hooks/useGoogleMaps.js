import { useState, useEffect } from 'react';
import { loadGoogleMaps, DEFAULT_CENTER } from '../services/googleMapsService';

export const useGoogleMaps = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [mapsInstance, setMapsInstance] = useState(null);
  const [isSimulated, setIsSimulated] = useState(false);

  useEffect(() => {
    let mounted = true;

    loadGoogleMaps()
      .then((maps) => {
        if (!mounted) return;
        if (maps) {
          setMapsInstance(maps);
          setIsLoaded(true);
        } else {
          // No API key or script failed, switch gracefully to simulated map
          setIsSimulated(true);
          setIsLoaded(true);
        }
      })
      .catch((err) => {
        if (!mounted) return;
        console.warn('Google Maps loader error, using simulated provider:', err);
        setIsSimulated(true);
        setIsLoaded(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { isLoaded, loadError, mapsInstance, isSimulated, defaultCenter: DEFAULT_CENTER };
};
