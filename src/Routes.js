import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';

import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import BoasVindas from './components/BoasVindas';
import Principal from './components/Principal';
import AdicionarContato from './components/AdicionarContato';
import { StyleSheet } from 'react-native';

export default props => (
    <Router>
        <Stack key="root" >
            <Scene key='formLogin' component={FormLogin} 
                title="Login" backTitle=' ' hideNavBar={false}
            />
            <Scene key='formCadastro' component={FormCadastro} 
                title="Cadastre-se" backTitle=' ' hideNavBar={false}
            />
            <Scene key='boasVindas' component={BoasVindas} 
                title="Tipo WhatsApp" hideNavBar={false}
                left={()=>null}
            />
            <Scene key='principal' component={Principal} 
                title="Tipo Um Whatsapp" hideNavBar={true} 
                //esconde o botão de voltar
                left={()=>null}
            />
            <Scene key='adicionarContato' component={AdicionarContato} 
                title="Adicionar Contato" hideNavBar={false} 
                titleStyle={styles.statusBarTxt}
                navigationBarStyle={styles.statusBar}
                backTitle=' '
                headerTintColor="#FFF"
            />
        </Stack>
    </Router>
);

const styles = StyleSheet.create({
    statusBar: {
        backgroundColor: '#114D44',
        color: '#FFF',
    },
    statusBarTxt: {
        color: '#FFF',
    }
});
