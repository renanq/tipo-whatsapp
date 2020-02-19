import firebase from '../Firebase';
import b64 from 'base-64';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { MODIFICA_ADICIONA_CONTATO_EMAIL,
    ADICIONA_CONTATO_ERRO,
    ADICIONA_CONTATO_SUCESSO,
    ADICIONA_CONTATO_EM_ANDAMENTO,
    LISTA_CONTATO_USUARIO,
    MODIFICA_MENSAGEM,
    LISTA_CONVERSA_USUARIO,
    ENVIA_MENSAGEM_SUCESSO,
    LISTA_CABECALHO_CONVERSAS } from './types';

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
                    payload: 'Usuário não encontrado com o email informado.'
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

export const contatosUsuarioFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        let emailUsuarioB64 = b64.encode(currentUser.email);

        firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
            //cria um listenner    
            .on("value", snapshot => {
                dispatch({ type: LISTA_CONTATO_USUARIO, payload: snapshot.val() })
            })
    }
}

export const modificaMensagem = texto => {
    return({
        type: MODIFICA_MENSAGEM,
        payload: texto
    })
}

export const enviaMensagem = (mensagem, contatoNome, contatoEmail) => {
    //dados do usuario logado
    const { currentUser } = firebase.auth();
    const usuarioEmail = currentUser.email;
    return (dispatch) => {
        //convertendo pra vase 64
        const usuarioEmailB64 = b64.encode(usuarioEmail);
        const contatoEmailB64 = b64.encode(contatoEmail);
        //cadastra a mensagem enviada para o usuario que enviou
        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
            //tipo 'e' de envio
            .push({ mensagem, tipo: 'e' })
            .then(() => {
                //cadastra a mensagem recebida para o contato
                firebase.database().ref(`/mensagens/${contatoEmailB64}/${usuarioEmailB64}`)
                    //tipo 'r' de recebimento    
                    .push({ mensagem, tipo: 'r' })
                    .then(() => dispatch({ type: ENVIA_MENSAGEM_SUCESSO }))
            })
            .then(() => {
                //cadastra os cabeçalhos das conversas para a tela de conversas do usuario logado
                firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}/${contatoEmailB64}`)
                    //set sobrescreve caso exista  (não ter duplicatas)  
                    .set({ nome: contatoNome, email: contatoEmail })
            })
            .then(() => {
                //recuperando nome do usuario logado
                firebase.database().ref(`/usuarios/${usuarioEmailB64}`)
                    .once("value")
                    .then(snapshot => {
                        //converte em array
                        const dadosUsuario = _.first(_.values(snapshot.val()))
                        //cadastra os cabeçalhos das conversas para a tela de conversas do contato
                        firebase.database().ref(`/usuario_conversas/${contatoEmailB64}/${usuarioEmailB64}`)
                            //set sobrescreve caso exista  (não ter duplicatas)  
                            .set({ nome: dadosUsuario.nome, email: usuarioEmail })
                    })
            })
    }
}

export const conversaUsuarioFetch = contatoEmail => {

    const { currentUser } = firebase.auth();
    //emails na base 64
    let usuarioEmailB64 = b64.encode(currentUser.email);
    let contatoEmailB64 = b64.encode(contatoEmail);

    return dispatch => {
        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
            //cria listenner
            .on("value", snapshot => {
                dispatch({ type: LISTA_CONVERSA_USUARIO, payload: snapshot.val() });
            })
    }
}

export const cabecalhoUsuarioFetch = () => {

    const { currentUser } = firebase.auth();
    //emails na base 64
    let usuarioEmailB64 = b64.encode(currentUser.email);

    return dispatch => {
        firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}`)
            //cria listenner
            .on("value", snapshot => {
                dispatch({ type: LISTA_CABECALHO_CONVERSAS, payload: snapshot.val() });
            })
    }
}