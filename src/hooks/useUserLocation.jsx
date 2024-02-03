import { useState, useEffect } from 'react';

export const useUserLocation = () => {
	const [location, setLocation] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!navigator.geolocation) {
			setError('Geolocation is not supported by your browser');
			return;
	} 
	

		navigator.geolocation.getCurrentPosition(
			async (position) => {
				setLocation({
					lat: position.coords.latitude,
					lng: position.coords.longitude,

				});
			},
			(err) => {
				setError(`ERROR(${err.code}): ${err.message}`);
			}
		);
	}, []);
	
	return { location, error };
};
