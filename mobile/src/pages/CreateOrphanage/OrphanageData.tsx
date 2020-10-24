import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

interface OrphanageDataRouteParams {
  position: {
    latitude: number;
    longitude: number;
  };
}

export default function OrphanageData() {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const formValid = useMemo(() => !!name && !!about && images.length > 0, [
    name,
    about,
    images,
  ]);

  const { params } = useRoute() as { params: OrphanageDataRouteParams };
  const navigation = useNavigation();

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      alert('Eita, precisamos de acesso às suas fotos...');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const { uri: image } = result;

    setImages([...images, image]);
  }

  function handleGoToVisitationDataPage() {
    navigation.navigate('OrphanageVisitation', {
      position: params.position,
      name,
      about,
      images,
    });
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        padding: 24,
        minHeight: '100%',
      }}
    >
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Dados</Text>

        <Text style={styles.pageIndicator}>
          <Text style={styles.pageIndicatorCurrent}>01</Text> - 02
        </Text>
      </View>

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={about}
        onChangeText={setAbout}
      />

      {/* <Text style={styles.label}>Whatsapp</Text>
      <TextInput style={styles.input} /> */}

      <Text style={styles.label}>Fotos</Text>

      <View style={styles.uploadedImagesContainer}>
        {images.map(image => (
          <Image
            key={image}
            source={{ uri: image }}
            style={styles.uploadedImage}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <View style={{ flex: 1 }} />

      <RectButton
        style={[styles.nextButton, formValid && styles.nextButtonEnabled]}
        onPress={handleGoToVisitationDataPage}
        enabled={formValid}
      >
        <Text style={styles.nextButtonText}>Próximo</Text>
      </RectButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerTitle: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',

    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6',
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
  },

  pageIndicator: {
    color: '#8FA7B2',
    fontSize: 12,
    fontFamily: 'Nunito_600SemiBold',
  },

  pageIndicatorCurrent: {
    color: '#5C8599',
    fontSize: 12,
    fontFamily: 'Nunito_800ExtraBold',
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  uploadedImagesContainer: {
    flexDirection: 'row',
  },

  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  nextButton: {
    backgroundColor: '#15C3D688',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonEnabled: {
    backgroundColor: '#15C3D6',
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
});
