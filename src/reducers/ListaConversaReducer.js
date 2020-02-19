import { LISTA_CONVERSA_USUARIO, 
    LISTA_CABECALHO_CONVERSAS } from "../actions/types";

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {

    switch(action.type){
        case LISTA_CONVERSA_USUARIO:
            return action.payload;
        case LISTA_CABECALHO_CONVERSAS:
            return action.payload;
        default:
            return state;
    }
}