import React, { Component } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { contatosUsuarioFetch } from '../actions/AppActions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';

class Contatos extends Component {

    UNSAFE_componentWillMount() {
        this.props.contatosUsuarioFetch();
        //console.log( this.props.contatos );
    }

    Item(nome, email) {
        return (
            <TouchableOpacity
                onPress={ () => Actions.conversa(
                    { 
                        title: nome,
                        contatoNome: nome, 
                        contatoEmail: email 
                    }
                ) }
            >
                <View style={styles.item}>
                    <Text style={styles.itemNome}>{nome}</Text>
                    <Text style={styles.itemEmail}>{email}</Text>
                </View>
            </TouchableOpacity>
        );
      }
    
    render() {
        return (
            <SafeAreaView>
                <FlatList
                    data={this.props.contatos}
                    renderItem={({item}) => this.Item(item.nome, item.email)}
                    keyExtractor={ item => item.uid }
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderBottomWidth: 1,
        borderBottomColor: '#0A2A12',
    },
    itemNome: {
        fontSize: 20,
        color: '#FFF',
    },
    itemEmail: {
        fontSize: 16,
        color: '#FFF',
    },
});

const mapStateToProps = state => {
    const contatos = _.map(state.ListaContatosReducer, (val, uid) => {
        return { ...val, uid };
    })
    return(
        { contatos }
    );
}

export default connect(mapStateToProps, { contatosUsuarioFetch })(Contatos);
