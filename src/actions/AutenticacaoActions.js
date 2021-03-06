import firebase from '../Firebase';
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64';
import { MODIFICA_EMAIL, 
    MODIFICA_NOME,
    MODIFICA_SENHA,
    CADASTRO_USUARIO_SUCESSO,
    CADASTRO_USUARIO_ERRO,
    CADASTRO_EM_ANDAMENTO,
    LOGIN_USUARIO_SUCESSO,
    LOGIN_USUARIO_ERRO,
    LOGIN_EM_ANDAMENTO} from './types';

export const modificaEmail = (texto) => {
    return (
        {
            type: MODIFICA_EMAIL,
            payload: texto
        }
    );
}

export const modificaSenha = (texto) => {
    return (
        {
            type: MODIFICA_SENHA,
            payload: texto
        }
    );
}

export const modificaNome = (texto) => {
    return (
        {
            type: MODIFICA_NOME,
            payload: texto
        }
    );
}

export const cadastraUsuario = ({ nome, email, senha }) => {
    //devolve a action (objeto literal) para a store
    return dispatch => {

        dispatch({ type: CADASTRO_EM_ANDAMENTO });

        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(user => {
                let emailB64 = b64.encode(email);
                firebase.database().ref(`/usuarios/${emailB64}`)
                    .push({ nome })
                    .then(value => cadastroUsuarioSucesso(dispatch))
            })
            .catch(erro => cadastroUsuarioErro(erro, dispatch));
    }
}

const cadastroUsuarioSucesso = (dispatch) => {
    //em vez do return, o dispatch faz o retorno da action
    dispatch({ type: CADASTRO_USUARIO_SUCESSO });

    //navega para a tela de sucesso (boas Vindas)
    Actions.boasVindas();
}

const cadastroUsuarioErro = (erro, dispatch) => {
    let mensagemErro;
    if(erro.code == 'auth/weak-password'){
        mensagemErro = 'A senha deve conter, no mínimo, 6 caracteres';
    }
    if(erro.code == 'auth/email-already-in-use'){
        mensagemErro = 'Endereço de e-mail já cadastrado no sistema';
    }
    if(erro.code == 'auth/invalid-email'){
        mensagemErro = 'Endereço de e-mail inválido';
    }
    //em vez do return, o dispatch faz o retorno da action
    dispatch({ type: CADASTRO_USUARIO_ERRO, payload: mensagemErro });
}

export const autenticarUsuario = ({ email, senha }) => {
    return dispatch => {

        dispatch({ type: LOGIN_EM_ANDAMENTO });

        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(value => loginUsuarioSucesso(dispatch))
            .catch(erro => loginUsuarioErro(erro, dispatch));
    }
}

const loginUsuarioSucesso = (dispatch) => {
    //em vez do return, o dispatch faz o retorno da action
    dispatch({ type: LOGIN_USUARIO_SUCESSO });

    //navega para a tela de sucesso (boas Vindas)
    Actions.principal();
}

const loginUsuarioErro = (erro, dispatch) => {
    let mensagemErro;
    if(erro.code == 'auth/wrong-password'){
        mensagemErro = 'Senha incorreta para o email utilizado.';
    }
    if(erro.code == 'auth/user-not-found'){
        mensagemErro = 'Usuário não encontrado com o email utilizado.';
    }
    if(erro.code == 'auth/invalid-email'){
        mensagemErro = 'Utilize um endereço de e-mail válido.';
    }
    //em vez do return, o dispatch faz o retorno da action
    dispatch({ type: LOGIN_USUARIO_ERRO, payload: mensagemErro });
}
