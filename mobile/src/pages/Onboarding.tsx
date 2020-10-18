import React from 'react';
import { Image, StyleSheet, Dimensions, View } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

import onboarding1Img from '../images/onboarding-img-1.png';
import onboarding2Img from '../images/onboarding-img-2.png';

interface SquareProps {
  selected: boolean;
}

const Square = ({ selected }: SquareProps) => {
  return <View style={[styles.square, selected && styles.squareSelected]} />;
};

const Next = ({ ...props }) => (
  <RectButton style={styles.nextButton} {...props}>
    <Feather name="arrow-right" size={20} color="#15B6D6" />
  </RectButton>
);

interface OnBoardingProps {
  onOnboardingDone(): void;
}

export default function Onbarding({ onOnboardingDone }: OnBoardingProps) {
  return (
    <Onboarding
      containerStyles={styles.container}
      showSkip={false}
      DotComponent={Square}
      NextButtonComponent={Next}
      DoneButtonComponent={Next}
      bottomBarColor="#f2f3f5"
      onDone={onOnboardingDone}
      pages={[
        {
          backgroundColor: '#f2f3f5',
          image: <Image source={onboarding1Img} />,
          title: 'Leve\nfelicidade\npara o\nmundo',
          subtitle: 'Visite orfanatos e mude o\ndia de muitas crianças.',
          titleStyles: {
            ...styles.title,
            ...styles.titleLg,
          },
          subTitleStyles: styles.subtitle,
        },
        {
          backgroundColor: '#f2f3f5',
          image: <Image source={onboarding2Img} />,
          title: 'Escolha um\norfanato no mapa\ne faça uma visita',
          subtitle: '',
          titleStyles: {
            ...styles.title,
            ...styles.titleMd,
          },
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Nunito_800ExtraBold',
    color: '#0089A5',
    width: Dimensions.get('window').width,
  },

  titleLg: {
    fontSize: 48,
    lineHeight: 48,
    textAlign: 'left',
    paddingHorizontal: 40,
  },

  titleMd: {
    fontSize: 30,
    textAlign: 'right',
    paddingHorizontal: 40,
  },

  subtitle: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#5C8599',
    fontSize: 20,
    lineHeight: 30,
    width: Dimensions.get('window').width,
    textAlign: 'left',
    paddingHorizontal: 40,
  },

  container: {
    paddingBottom: 80,
  },

  square: {
    width: 8,
    height: 4,
    backgroundColor: '#BECFD8',
    marginHorizontal: 2,
    borderRadius: 4,
    marginBottom: 20,
  },

  squareSelected: {
    width: 16,
    backgroundColor: '#FFD152',
  },

  nextButton: {
    width: 56,
    height: 56,
    backgroundColor: '#D1EDF2',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 40,
    marginBottom: 20,
  },
});
