import React, { useMemo, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import api from '../../services/api';

interface OrphanageVisitationRouteParams {
  position: {
    latitude: number;
    longitude: number;
  };
  name: string;
  about: string;
  images: string[];
}

export default function OrphanageVisitation() {
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);

  const formValid = useMemo(() => !!instructions && !!opening_hours, [
    instructions,
    opening_hours,
  ]);

  const { params } = useRoute() as { params: OrphanageVisitationRouteParams };
  const navigation = useNavigation();

  async function handleCreateOrphanage() {
    const { latitude, longitude } = params.position;

    const data = new FormData();

    data.append('name', params.name);
    data.append('about', params.about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    params.images.forEach((image, index) => {
      data.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: image,
      } as any);
    });

    await api.post('orphanages', data);

    navigation.reset({
      index: 1,
      routes: [{ name: 'OrphanagesMap' }, { name: 'OrphanageCreated' }],
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
        <Text style={styles.title}>Visitação</Text>

        <Text style={styles.pageIndicator}>
          01 - <Text style={styles.pageIndicatorCurrent}>02</Text>
        </Text>
      </View>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={instructions}
        onChangeText={setInstructions}
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
        value={opening_hours}
        onChangeText={setOpeningHours}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={open_on_weekends}
          onValueChange={setOpenOnWeekends}
        />
      </View>

      <View style={{ flex: 1 }} />

      <RectButton
        style={[styles.nextButton, formValid && styles.nextButtonEnabled]}
        enabled={formValid}
        onPress={handleCreateOrphanage}
      >
        <Text style={styles.nextButtonText}>Cadastrar</Text>
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

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#3CDC8C88',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonEnabled: {
    backgroundColor: '#3CDC8C',
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
});
