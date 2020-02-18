import firebase from '../Firebase';
import b64 from 'base-64';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { MODIFICA_ADICIONA_CONTATO_EMAIL,
    ADICIONA_CONTATO_ERRO } from './types';

//do campo email da tela Adicionar Contato
export const modificaAdicionaContatoEmail = (texto) => {
    return (
        {
            type: MODIFICA_ADICIONA_CONTATO_EMAIL,
            payload: texto
        }
    );
}

export const adicionaContato = email => {
    return dispatch => {
    
    let emailB64 = b64.encode(email);

    firebase.database().ref(`/usuarios/${emailB64}`)
        .once('value')
        .then(snapshot => {
            if(snapshot.val()){
                //dados do contato
                const dadosUsuario = _.first(_.values(snapshot.val()));
                //email do usuario logado
                const { currentUser } = firebase.auth();
                let emailUsuarioB64 = b64.encode(currentUser.email);
                firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
                    .push({ email: email, nome: dadosUsuario.nome })
                    .then(() => console.log('sucesso'))
                    .catch(erro => adicionaContatoErro(erro, dispatch));
            }else {
                dispatch({ 
                    type: ADICIONA_CONTATO_ERRO,
                    payload: 'Usuário não encontrado com o email cadastrado.'
                });
            }
        })
    }
}

const adicionaContatoErro = (erro, dispatch) => {
    dispatch (
        {
            ADICIONA_CONTATO_ERRO,
            payload: erro
        }
    )
}
