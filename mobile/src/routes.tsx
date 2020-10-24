import React, { useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import Onboarding from './pages/Onboarding';

import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';

import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import OrphanageData from './pages/CreateOrphanage/OrphanageData';
import OrphanageVisitation from './pages/CreateOrphanage/OrphanageVisitation';
import OrphanageCreated from './pages/CreateOrphanage/OrphanageCreated';
import CancelCreation from './pages/CreateOrphanage/CancelCreation';

import Header from './components/Header';

export default function Routes() {
  const [isFirstTime, setIsFirstTime] = useState<Boolean | null>(null);

  const OnboardingRoute = useMemo(
    () => () => <Onboarding onOnboardingDone={handleOnboardingDone} />,
    []
  );

  useEffect(() => {
    AsyncStorage.getItem('is_first_time').then(value => {
      setIsFirstTime(value === null || Boolean(value));
    });
  }, []);

  async function handleOnboardingDone() {
    await AsyncStorage.setItem('is_first_time', String(false));
    setIsFirstTime(false);
  }

  if (isFirstTime === null) {
    return null;
  }

  return (
    <>
      <StatusBar />
      <NavigationContainer>
        {isFirstTime ? (
          <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="Onboarding" component={OnboardingRoute} />
          </Navigator>
        ) : (
          <Navigator
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: '#f2f3f5' },
            }}
          >
            <Screen name="OrphanagesMap" component={OrphanagesMap} />

            <Screen
              name="OrphanageDetails"
              component={OrphanageDetails}
              options={{
                headerShown: true,
                header: () => <Header showCancel={false} title="Orfanato" />,
              }}
            />

            <Screen
              name="SelectMapPosition"
              component={SelectMapPosition}
              options={{
                headerShown: true,
                header: () => (
                  <Header
                    cancelConfirmation={true}
                    title="Adicione um orfanato"
                  />
                ),
              }}
            />

            <Screen
              name="OrphanageData"
              component={OrphanageData}
              options={{
                headerShown: true,
                header: () => (
                  <Header
                    cancelConfirmation={true}
                    title="Adicione um orfanato"
                  />
                ),
              }}
            />

            <Screen
              name="OrphanageVisitation"
              component={OrphanageVisitation}
              options={{
                headerShown: true,
                header: () => (
                  <Header
                    cancelConfirmation={true}
                    title="Adicione um orfanato"
                  />
                ),
              }}
            />

            <Screen name="OrphanageCreated" component={OrphanageCreated} />

            <Screen name="CancelCreation" component={CancelCreation} />
          </Navigator>
        )}
      </NavigationContainer>
    </>
  );
}
