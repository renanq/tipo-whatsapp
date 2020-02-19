import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ImageBackground, 
    TextInput, 
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    SafeAreaView, 
    FlatList} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { 
    modificaMensagem, 
    enviaMensagem, 
    conversaUsuarioFetch } from '../actions/AppActions';

class Conversa extends Component {

    UNSAFE_componentWillMount() {
        this.props.conversaUsuarioFetch(this.props.contatoEmail);
    }

    _enviaMensagem() {
        const { mensagem, contatoNome, contatoEmail } = this.props;
        this.props.enviaMensagem(mensagem, contatoNome, contatoEmail);
    }

    Item(tipo, mensagem) {
        if(tipo === 'e') {
            return (
                <View style={styles.msgE}>
                    <Text style={styles.itemE}>{mensagem}</Text>
                </View>
            )
        }
        return (
            <View style={styles.msgR}>
                <Text style={styles.itemR}>{mensagem}</Text>
            </View>
        )
      }

    render() {
        return (
            
            <ImageBackground style={styles.principalBg} source={require('../imgs/bg.png')}>
                <View style={styles.conversa}>
                    <SafeAreaView>
                        <FlatList
                            data={this.props.conversa}
                            renderItem={({item}) => this.Item(item.tipo, item.mensagem)}
                            keyExtractor={ item => item.uid }
                        />
                    </SafeAreaView>
                </View>

                <KeyboardAvoidingView contentContainerStyle={styles.box} 
                    style={styles.box}
                    keyboardVerticalOffset="85"
                    behavior={Platform.select({
                        ios: 'position',
                        android: null,
                })}>
                    
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
        width: '103%',
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
    },
    conversa: {
        flex: 1,
        paddingBottom: 20,
        paddingHorizontal: 5,
        paddingTop: 5,
    },
    msgE: {
        paddingBottom: 5,
        alignItems: 'flex-end', 
        marginBottom: 5, 
        marginLeft: 40,
    },
    msgR: {
        paddingBottom: 5,
        alignItems: 'flex-start', 
        marginBottom: 5, 
        marginRight: 40,
    },
    itemE: {
        padding: 10,
        backgroundColor: 'rgba(105, 246, 105, 0.7)',
        borderWidth: 1,
        borderColor: '#114D44',
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
    },
    itemR: {
        padding: 10,
        backgroundColor: 'rgba(246, 246, 105, 0.7)',
        borderWidth: 1,
        borderColor: '#114D44',
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
    },
    itemMsg: {
        fontSize: 16,
        color: '#000',
    },
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