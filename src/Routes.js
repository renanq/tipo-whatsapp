import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';

import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import BoasVindas from './components/BoasVindas';

export default props => (
    <Router>
        <Stack key="root" >
            <Scene key='formLogin' component={FormLogin} title="Login" backTitle=' '/>
            <Scene key='formCadastro' component={FormCadastro} title="Cadastre-se" backTitle=' '/>
            <Scene key='boasVindas' component={BoasVindas} title="Tipo WhatsApp" backTitle=' '/>
        </Stack>
    </Router>
);
