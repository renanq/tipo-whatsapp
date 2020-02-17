import React, { Component } from 'react';
import { ImageBackground, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { 
    modificaEmail, 
    modificaSenha,
    autenticarUsuario
} from '../actions/AutenticacaoActions';

class formLogin extends Component {

    _autenticarUsuario() {
        const { email, senha } = this.props;

        this.props.autenticarUsuario({ email, senha });
    }
    //console.log(props);
    render() {
        return (
            <ImageBackground style={styles.principalBg} source={require('../imgs/bg.png')}>
                <View style={styles.principal}>
                    <View style={styles.cabacalho}>
                        <Text style={styles.cabecalhoTxt}>Tipo Um WhatsApp</Text>
                    </View>
                    <View style={styles.miolo}>
                        <View style={styles.ajuste}>
                            <TextInput value={this.props.email} style={styles.mioloInput} 
                                placeholder='E-mail' placeholderTextColor={'#000000'}
                                onChangeText={ texto => this.props.modificaEmail(texto)}
                            />
                            <TextInput  value={this.props.senha} style={styles.mioloInput} 
                                placeholder='Senha' placeholderTextColor={'#000000'}
                                secureTextEntry onChangeText={ texto => this.props.modificaSenha(texto)}
                            />
                            <Text style={styles.erroMsg}>{this.props.erroLogin}</Text>
                            <TouchableOpacity onPress={() => Actions.formCadastro()}>
                                <Text style={styles.mioloTxt}>Ainda não tem cadastro? Cadastre-se</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.inferior}>
                        <TouchableOpacity style={styles.inferiorButton} 
                        onPress={() => this._autenticarUsuario()}>
                            <Text style={styles.inferiorButtonTxt}>Acessar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    principalBg: {
        flex: 1,
    },
    principal: {
        flex: 1, 
        padding: 10,
    },
    cabacalho: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    cabecalhoTxt: {
        fontSize: 25,
        backgroundColor: 'transparent',
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    miolo: {
        flex: 2,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    ajuste: {
        width: '100%',
    },
    mioloInput: {
        color: '#FFFFFF',
        fontSize: 20, 
        height: 45,
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF',
    },
    mioloTxt: {
        fontSize: 20,
        paddingTop: 10,
        textAlign: 'center',
        color: '#FFFFFF',
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "#FFF",
    },
    erroMsg: {
        fontSize: 16,
        color: '#F78181',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    inferior: {
        flex: 2,
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

/* mapa de variaveis de estado do Redux que serao 
convertidas em propriedades dentro do componente */
const mapStateToProps = state => {
    //console.log(state);

    return (
        {
            email: state.AutenticacaoReducer.email,
            senha: state.AutenticacaoReducer.senha,
            erroLogin: state.AutenticacaoReducer.erroLogin
        }
    );
}

/* primeiro parametro as variaveis de stado
segundo parametro as actions creators */
export default connect(mapStateToProps, { 
    modificaEmail, 
    modificaSenha, 
    autenticarUsuario 
    })(formLogin);