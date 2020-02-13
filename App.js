import React from 'react';
import { AppRegistry } from 'react-native';
import Whatsapp from './src/Whatsapp';

const App = props => (
  <Whatsapp />
)

AppRegistry.registerComponent('App', () => App);
export default App;