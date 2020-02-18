import { MODIFICA_ADICIONA_CONTATO_EMAIL,
    ADICIONA_CONTATO_ERRO } from '../actions/types';
const INITIAL_STATE = {
    adiciona_contato_email: '',
    erroAdicionaContato: ''
};

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MODIFICA_ADICIONA_CONTATO_EMAIL: 
            return { ...state, adiciona_contato_email: action.payload }
        case ADICIONA_CONTATO_ERRO:
            return {...state, erroAdicionaContato: action.payload}
        default:
            return state;
    }
}