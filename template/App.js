/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import type { Node } from 'react';

import '@src/core/conf'; // Load settings
import Entry from '@src/Entry';

const App: () => Node = () => {
  return <Entry />;
};

export default App;
