import * as React from 'react';
import { View, StyleSheet, Dimensions, ImageBackground} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import TabBarMenu from './TabBarMenu';
import Conversas from './Conversas';
import Contatos from './Contatos';

const initialLayout = { width: Dimensions.get('window').width };

export default function Principal() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'conversas', title: 'Conversas' },
    { key: 'contatos', title: 'Contatos' },
  ]);

  const renderScene = SceneMap({
    conversas: Conversas,
    contatos: Contatos,
  });

  _handleChangeTab = index => this.setState({ index });

  const renderTabBar = props => <TabBarMenu {...props} />

  return (
    <ImageBackground style={styles.principalBg} source={require('../imgs/bg.png')}>
        <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
        />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    principalBg: {
        flex: 1,
    },
    scene: {
        flex: 1,
    },
});