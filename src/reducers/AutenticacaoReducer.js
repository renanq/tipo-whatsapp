import { MODIFICA_EMAIL, 
    MODIFICA_NOME,
    MODIFICA_SENHA,
    CADASTRO_USUARIO_SUCESSO,
    CADASTRO_USUARIO_ERRO,
    CADASTRO_EM_ANDAMENTO,
    LOGIN_USUARIO_SUCESSO,
    LOGIN_USUARIO_ERRO,
    LOGIN_EM_ANDAMENTO} from '../actions/types';

const INITIAL_STATE = {
    nome: '',
    email: '',
    senha: '',
    erroCadastro: '',
    erroLogin: '',
    loading_login: false,
    loading_cadastro: false

}

export default (state = INITIAL_STATE, action) => {
    //console.log(state);
    //console.log(action);
    switch(action.type){
        case MODIFICA_EMAIL:
            return { ...state, email: action.payload }
        case MODIFICA_SENHA:
            return { ...state, senha: action.payload }
        case MODIFICA_NOME: 
            return { ...state, nome: action.payload }
        case CADASTRO_USUARIO_ERRO: 
            return { ...state, erroCadastro: action.payload, loading_cadastro:false }
        case CADASTRO_USUARIO_SUCESSO: 
            return { ...state, nome: '', senha: '' }
        case LOGIN_USUARIO_ERRO:
            return { ...state, erroLogin: action.payload, loading_login: false }
        case LOGIN_EM_ANDAMENTO:
            return { ...state, loading_login: true}
        case CADASTRO_EM_ANDAMENTO:
            return { ...state, loading_cadastro: true}
        default: 
            return state;
    }
}