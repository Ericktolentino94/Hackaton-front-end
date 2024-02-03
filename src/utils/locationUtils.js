export const getUserLocation = () => {
    // getting user position can take some time - as a reuslt we are wrapping in a promise
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation is not supported by this browser.");
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (err) => {
            reject(err.message);
          }
        );
      }
    });
  };