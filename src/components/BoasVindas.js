import React from 'react';
import { ImageBackground, View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default props => (
    <ImageBackground style={styles.principalBg} source={require('../imgs/bg.png')}>
        <View style={styles.principal}>
            <View style={styles.cabacalho}>
                    <Image source={require('../imgs/logo.png')} />
                    <Text style={styles.cabecalhoTxt}>Seja muito bem-vindo ao</Text>
                    <Text style={styles.cabecalhoTxt}>Tipo Um WhatsApp</Text>
                    
            </View>
            <View style={styles.inferior} >
                <TouchableOpacity 
                        style={styles.inferiorButton} 
                        onPress={() => Actions.formLogin()}
                    >
                    <Text style={styles.inferiorButtonTxt}>Fazer Login</Text>
                </TouchableOpacity>
            </View>
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