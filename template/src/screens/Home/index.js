/**
 * @format
 * @flow
 */

import React from 'react';
import type { Node } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

import { SoftformanceLogo } from '@src/assets/images';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },
});

function HomeScreen(): Node {
  return (
    <View style={styles.root}>
      <Image source={SoftformanceLogo} />
      <Text style={styles.text}>Home Screen (Project Name)</Text>
    </View>
  );
}

export default HomeScreen;
