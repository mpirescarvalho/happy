import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useHeader } from '../contexts/header';

interface HeaderProps {
  title: string;
  showCancel?: boolean;
  cancelConfirmation?: boolean;
}

export default function Header({
  title,
  showCancel = true,
  cancelConfirmation = false,
}: HeaderProps) {
  const navigation = useNavigation();
  const [headerShown] = useHeader();

  function handleGoBackToAppHomePage() {
    if (cancelConfirmation) {
      navigation.navigate('CancelCreation');
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'OrphanagesMap' }],
      });
    }
  }

  return (
    <View
      style={[styles.container, { display: headerShown ? 'flex' : 'none' }]}
    >
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15b6d6" />
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>

      {showCancel ? (
        <BorderlessButton onPress={handleGoBackToAppHomePage}>
          <Feather name="x" size={24} color="#ff669d" />
        </BorderlessButton>
      ) : (
        <View />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f9fafc',
    borderBottomWidth: 1,
    borderColor: '#dde3f0',
    paddingTop: 44,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#8fa7b3',
    fontSize: 16,
  },
});
