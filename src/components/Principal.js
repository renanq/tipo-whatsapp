import React from 'react';
import { ImageBackground, View, StyleSheet, Text } from 'react-native';

export default Principal = props => (
    <ImageBackground style={styles.principalBg} source={require('../imgs/bg.png')}>
        <View style={styles.principal}>
            <Text style={styles.cabecalhoTxt}>Tipo Um WhatsApp Principal</Text>
        </View>
    </ImageBackground>
);

const styles = StyleSheet.create({
    principalBg: {
        flex: 1,
    },
    principal: {
        flex: 1, 
        padding: 10,
    },
    cabacalho: {
        flex: 2, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    cabecalhoTxt: {
        fontSize: 25,
        backgroundColor: 'transparent',
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginTop: 10,
       },
    inferior: {
        flex: 1,
    },
    inferiorButton: {
        backgroundColor: '#115E54',
        height: 45,
        justifyContent: 'center',
        borderColor: '#FFFFFF',
        borderWidth: 1,
    },
    inferiorButtonTxt: {
        color: '#FFFFFF',
        fontSize: 20, 
        textAlign: 'center',
    },
})