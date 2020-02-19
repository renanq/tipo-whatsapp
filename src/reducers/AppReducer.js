import { MODIFICA_ADICIONA_CONTATO_EMAIL,
    ADICIONA_CONTATO_ERRO,
    ADICIONA_CONTATO_SUCESSO,
    ADICIONA_CONTATO_EM_ANDAMENTO,
    MODIFICA_MENSAGEM } from '../actions/types';

const INITIAL_STATE = {
    adiciona_contato_email: '',
    erroAdicionaContato: '',
    sucessoAdicionaContato: false,
    loading_adiciona_contato: false,
    mensagem: ''
};

export default(state = INITIAL_STATE, action) => {
    //console.log(action);
    switch (action.type) {
        case MODIFICA_ADICIONA_CONTATO_EMAIL: 
            return { ...state, adiciona_contato_email: action.payload }
        case ADICIONA_CONTATO_ERRO:
            return {...state, erroAdicionaContato: action.payload, loading_adiciona_contato: false}
        case ADICIONA_CONTATO_SUCESSO:
            return {...state, sucessoAdicionaContato: action.payload, adiciona_contato_email: '', loading_adiciona_contato: false }
        case ADICIONA_CONTATO_EM_ANDAMENTO:
            return { ...state, loading_adiciona_contato: true}
        case MODIFICA_MENSAGEM:
            return { ...state, mensagem: action.payload };
        default:
            return state;
    }
}