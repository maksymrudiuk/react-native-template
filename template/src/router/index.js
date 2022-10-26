/**
 * @format
 * @flow
 */

import React from 'react';
import type { Node } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SettingsScreen, HomeScreen } from '../../src/screens';

const Route = createBottomTabNavigator();

function Router(): Node {
  return (
    <NavigationContainer>
      <Route.Navigator initialRouteName="Home">
        <Route.Screen name="Home" component={HomeScreen} />
        <Route.Screen name="Settings" component={SettingsScreen} />
      </Route.Navigator>
    </NavigationContainer>
  );
}

export default Router;
