import React, { Component } from 'react';
import { View, TextInput, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { modificaAdicionaContatoEmail,
adicionaContato } from '../actions/AppActions'

class AdicionarContato extends Component {
    
    renderAdicionaContato() {
        if(!this.props.sucessoAdicionaContato) {
            return (
                    <View style={styles.principal}>
                        <View style={styles.cabacalho}>
                            <Text style={styles.cabecalhoTxt}>Adicione um novo contato:</Text>
                            <View style={styles.ajuste}>
                                <TextInput placeholder="E-mail" 
                                    placeholderTextColor={'#000000'} style={styles.cabecalhoInput} 
                                    onChangeText={(texto) => this.props.modificaAdicionaContatoEmail(texto)}
                                    value={this.props.adiciona_contato_email}
                                />
                            </View>
                            <Text style={styles.erroMsg}>{this.props.erroAdicionaContato}</Text>
                        </View>
                        <View style={styles.inferior} >
                            <TouchableOpacity 
                                    style={styles.inferiorButton} 
                                    onPress={() => this.props.adicionaContato(this.props.adiciona_contato_email) }                    
                            >
                                <Text style={styles.inferiorButtonTxt}>Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            )
        }else {
            return (
                <View style={styles.principal}>
                    <View style={styles.cabacalho}>
                        <Text style={styles.cabecalhoTxt}>Contato adicionado com sucesso!</Text>
                    </View>
                </View>
            )
        }
    }
    
    render() {
        return (
            <ImageBackground style={styles.principalBg} source={require('../imgs/bg.png')}>
                {this.renderAdicionaContato()}
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
        width: '100%',
    },
    cabecalhoTxt: {
        fontSize: 20,
        backgroundColor: 'transparent',
        color: '#FFFFFF',
        marginBottom: 30,
       },
    cabecalhoInput: {
        color: '#FFFFFF',
        fontSize: 20, 
        height: 45,
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF',
    },
    erroMsg: {
        fontSize: 16,
        color: '#F78181',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    ajuste: {
        width: '100%',
    },
    inferior: {
        flex: 2,
        justifyContent: 'flex-start',
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

const mapStateToProps = state => (
    {
        adiciona_contato_email: state.AppReducer.adiciona_contato_email,
        erroAdicionaContato: state.AppReducer.erroAdicionaContato,
        sucessoAdicionaContato: state.AppReducer.sucessoAdicionaContato,
    }
)

export default connect(mapStateToProps, { 
    modificaAdicionaContatoEmail,
    adicionaContato })(AdicionarContato);
