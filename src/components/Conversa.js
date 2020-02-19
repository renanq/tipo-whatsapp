import React, { Component } from 'react';
import { View, 
    Text, 
    StyleSheet, 
    ImageBackground, 
    TextInput, 
    TouchableOpacity,
    Image,
    KeyboardAvoidingView} from 'react-native';
    import { connect } from 'react-redux';
    import _ from 'lodash';
    import { modificaMensagem, enviaMensagem, conversaUsuarioFetch } from '../actions/AppActions';

class Conversa extends Component {

    UNSAFE_componentWillMount() {
        this.props.conversaUsuarioFetch(this.props.contatoEmail);
    }

    _enviaMensagem() {
        const { mensagem, contatoNome, contatoEmail } = this.props;
        this.props.enviaMensagem(mensagem, contatoNome, contatoEmail);
    }

    render() {
        return (
            
            <ImageBackground style={styles.principalBg} source={require('../imgs/bg.png')}>
                <View style={styles.conversa}>
                    <Text>Conversa</Text>
                </View>

                <KeyboardAvoidingView contentContainerStyle={styles.box} 
                behavior="position" keyboardVerticalOffset="85">
                    
                        <View style={styles.ajuste}>
                            <TextInput placeholder="Mensagem" 
                                placeholderTextColor={'#000000'} style={styles.input} 
                                onChangeText={ texto => this.props.modificaMensagem(texto) }
                                value={this.props.mensagem}
                            />
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={ this._enviaMensagem.bind(this) }
                            >
                                <Image source={require('../imgs/btn-enviar.png')} />
                            </TouchableOpacity>
                        </View>
                    
                </KeyboardAvoidingView>
            </ImageBackground>
            
        );
    }
}

const styles = StyleSheet.create({
    principalBg: {
        flex: 1,
    },
    conversa: {
        flex: 1,
        padding: 10,
        paddingBottom: 20,
    },
    box: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        flexDirection: 'row',
        height: 80,
        padding: 10,
        alignContent: 'center',
        backgroundColor: '#115e54',
        justifyContent: 'space-between',
        borderTopColor: '#FFF',
        borderTopWidth: 1,
    },
    ajuste: {
        width: '85%',
    },
    input: {
        fontSize: 18,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 5,
        paddingLeft: 10,
    }
});

mapStateToProps = state => {
    const conversa = _.map(state.ListaConversaReducer, (val, uid) => {
        return { ...val, uid }
    });
    console.log(conversa);
    return ({
        conversa,
        mensagem: state.AppReducer.mensagem
    })
}

export default connect(mapStateToProps, { 
    modificaMensagem, 
    enviaMensagem,
    conversaUsuarioFetch })(Conversa);