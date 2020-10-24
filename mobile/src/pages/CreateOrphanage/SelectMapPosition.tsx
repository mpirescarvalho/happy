import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';

import { useHeader } from '../../contexts/header';

import mapMarkerImg from '../../images/map-marker.png';
import cursorImg from '../../images/cursor.png';

export default function SelectMapPosition() {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [instructionsVisible, setInstructionsVisible] = useState(true);
  const navigation = useNavigation();
  const [, setHeaderShown] = useHeader();

  function handleNextStep() {
    navigation.navigate('OrphanageData', { position });
  }

  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  function handleInstructionsClick() {
    setInstructionsVisible(false);
    setHeaderShown(true);
  }

  return (
    <View style={styles.container}>
      {instructionsVisible && (
        <LinearGradient
          colors={['#15D6D6cc', '#15B6D6cc']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.instructionsOverlay}
          onTouchEnd={handleInstructionsClick}
        >
          <Image source={cursorImg} />

          <Text style={styles.instructionsOverlayText}>
            Toque no mapa{'\n'}
            para adicionar um{'\n'}
            orfanato
          </Text>
        </LinearGradient>
      )}

      <MapView
        initialRegion={{
          latitude: -11.3024798,
          longitude: -41.8589281,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >
        {position.latitude !== 0 && (
          <Marker icon={mapMarkerImg} coordinate={position} />
        )}
      </MapView>

      {position.latitude !== 0 && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  instructionsOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 20,

    alignItems: 'center',
    justifyContent: 'center',
  },

  instructionsOverlayText: {
    marginTop: 24,
    textAlign: 'center',

    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 24,
    color: '#FFF',
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
});
