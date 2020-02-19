import React, { Component } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { cabecalhoUsuarioFetch } from '../actions/AppActions';
import { Actions } from 'react-native-router-flux';

class Conversas extends Component {
    
    UNSAFE_componentWillMount() {
        this.props.cabecalhoUsuarioFetch();
        console.log( this.props.cabecalhos );
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
                </View>
            </TouchableOpacity>
        );
      }
    
    render(){
        return (
            <SafeAreaView>
                <FlatList
                    data={this.props.cabecalhos}
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
    const cabecalhos = _.map(state.ListaCabecalhoReducer, (val, uid) => {
        return { ...val, uid };
    })
    return(
        { cabecalhos }
    );
}

export default connect(mapStateToProps, { cabecalhoUsuarioFetch })(Conversas);