import React, { Component } from 'react';
import { ImageBackground, View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { 
    modificaEmail, 
    modificaSenha, 
    modificaNome,
    cadastraUsuario
 } from '../actions/AutenticacaoActions';

class formCadastro extends Component {

        //função para chamar a função Action Creator
    _cadastraUsuario() {
    
        const nome = this.props.nome;
        const email = this.props.email;
        const senha = this.props.senha;

        this.props.cadastraUsuario({ nome, email, senha });

    }

    render() {
        return(
            <ImageBackground style={styles.principalBg} source={require('../imgs/bg.png')}>
                <View style={styles.principal}>
                    <View style={styles.cabacalho}>
                        <Text style={styles.cabecalhoTxt}>Tipo Um WhatsApp</Text>
                    </View>
                    <View style={styles.superior}>
                        <View style={styles.ajuste}>
                            <TextInput value={this.props.nome} placeholder="Nome" 
                                placeholderTextColor={'#000000'} style={styles.superiorInput} 
                                onChangeText={ texto => this.props.modificaNome(texto)}
                            />
                            <TextInput value={this.props.email} placeholder="E-mail" 
                                placeholderTextColor={'#000000'} style={styles.superiorInput} 
                                onChangeText={ texto => this.props.modificaEmail(texto)}
                            />
                            <TextInput value={this.props.senha} placeholder="Senha" 
                                placeholderTextColor={'#000000'} style={styles.superiorInput} 
                                secureTextEntry onChangeText={ texto => this.props.modificaSenha(texto)}
                            />
                            <Text style={styles.erroMsg}>{this.props.erroCadastro}</Text>
                        </View>
                    </View>
                    <View style={styles.inferior} >
                        <TouchableOpacity 
                            style={styles.inferiorButton} 
                            onPress={() => this._cadastraUsuario()}
                        >
                            <Text style={styles.inferiorButtonTxt}>Cadastrar</Text>
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
    superior: {
        flex: 2, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    superiorInput: {
        color: '#FFFFFF',
        fontSize: 20, 
        height: 45,
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF',
    },
    ajuste: {
        width: '100%',
    },
    erroMsg: {
        fontSize: 16,
        color: '#F78181',
        marginTop: 10,
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
    console.log(state);
    return (
        {
            nome: state.AutenticacaoReducer.nome,
            email: state.AutenticacaoReducer.email,
            senha: state.AutenticacaoReducer.senha,
            erroCadastro: state.AutenticacaoReducer.erroCadastro
        }
    );
}

/* primeiro parametro as variaveis de stado
segundo parametro as actions creators */
export default connect(mapStateToProps, { 
    modificaEmail, 
    modificaSenha, 
    modificaNome,
    cadastraUsuario 
    })(formCadastro);