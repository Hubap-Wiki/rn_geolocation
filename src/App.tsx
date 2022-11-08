import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';

import {PermissionsAndroid, Platform, SafeAreaView, Text} from 'react-native';

const App = () => {
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [locationStatus, setLocationStatus] = useState('');

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Demande de permission requise',
              message:
                "Cette application a besoin d'avoir accès à votre position",
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getOneTimeLocation();
          } else {
            setLocationStatus('Permission refusée');
          }
        } catch (err: any) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Localisation en cours');
    Geolocation.getCurrentPosition(
      position => {
        setLocationStatus('Localisation terminée');
        setCurrentLongitude(JSON.stringify(position.coords.longitude));
        setCurrentLatitude(JSON.stringify(position.coords.latitude));
      },
      error => {
        setLocationStatus(error.message);
      },
    );
  };

  return (
    <SafeAreaView>
      <Text>Hubap Geolocation demo</Text>
      <Text>Status : {locationStatus}</Text>
      <Text>Longitude : {currentLongitude}</Text>
      <Text>Latitude : {currentLatitude}</Text>
    </SafeAreaView>
  );
};

export default App;
