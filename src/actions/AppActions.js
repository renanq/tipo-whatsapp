import firebase from '../Firebase';
import b64 from 'base-64';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { MODIFICA_ADICIONA_CONTATO_EMAIL,
    ADICIONA_CONTATO_ERRO,
    ADICIONA_CONTATO_SUCESSO,
    ADICIONA_CONTATO_EM_ANDAMENTO } from './types';

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
    
    dispatch({ type: ADICIONA_CONTATO_EM_ANDAMENTO });

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
                    .then(() => adicionaContatoSucesso(dispatch))
                    .catch(erro => adicionaContatoErro(erro.message, dispatch));
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
            type: ADICIONA_CONTATO_ERRO,
            payload: erro
        }
    )
}

const adicionaContatoSucesso = dispatch => {
    dispatch (
        {
            type: ADICIONA_CONTATO_SUCESSO,
            payload: true
        }
    )
}

//altera a variavel para exibir o formulario de adição de contato
export const habilitaAdicionarContato = () => (
    {
        type: ADICIONA_CONTATO_SUCESSO,
        payload: false
    }
)