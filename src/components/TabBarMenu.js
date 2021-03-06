import React from 'react';
import { View, Text, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from '../Firebase';
import { habilitaAdicionarContato } from '../actions/AppActions';

const TabBarMenu = props => (
    <View >
        <StatusBar backgroundColor="#114D44"/>
        
            <View style={styles.cabacalho}>
                <Text style={styles.cabecalhoTxt}>Tipo Um WhatsApp</Text>
                <View style={styles.btns}>
                    <View>
                        <TouchableOpacity onPress={() => { Actions.adicionarContato(); props.habilitaAdicionarContato() }}>
                            <Image source={require('../imgs/btn-add-contato.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.sair}>
                        <TouchableOpacity
                         onPress={() => firebase.auth().signOut().then(() => Actions.formLogin())}
                        >
                            <Image source={require('../imgs/btn-sair.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        

        <TabBar {...props} style={styles.tabBar}/>
    </View>
)

const styles = StyleSheet.create({
    cabacalho: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#114D44',
        paddingTop: 25,
        paddingHorizontal: 10,
        height: 90,
        elevation: 5,
    },
    cabecalhoTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        color: '#FFF',
        marginTop: 10,
    },
    tabBar: {
        backgroundColor: '#114D44',
    },
    btns: {
        flexDirection: 'row',
        paddingTop: 10,
    },
    sair: {
        paddingLeft: 10,
    }
});

export default connect(null, { habilitaAdicionarContato })(TabBarMenu);