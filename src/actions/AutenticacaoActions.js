import firebase from '../Firebase';
import { Actions } from 'react-native-router-flux';

export const modificaEmail = (texto) => {
    return (
        {
            type: 'modifica_email',
            payload: texto
        }
    );
}

export const modificaSenha = (texto) => {
    return (
        {
            type: 'modifica_senha',
            payload: texto
        }
    );
}

export const modificaNome = (texto) => {
    return (
        {
            type: 'modifica_nome',
            payload: texto
        }
    );
}

export const cadastraUsuario = ({ nome, email, senha }) => {
    //devolve a action (objeto literal) para a store
    return dispatch => {
        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(user => cadastroUsuarioSucesso(dispatch))
            .catch(erro => cadastroUsuarioErro(erro, dispatch));
    }
}

const cadastroUsuarioSucesso = (dispatch) => {
    //em vez do return, o dispatch faz o retorno da action
    dispatch({ type: 'cadastro_usuario_sucesso' });

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
    dispatch({ type: 'cadastro_usuario_erro', payload: mensagemErro });
}