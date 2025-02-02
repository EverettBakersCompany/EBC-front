import { useState } from 'react';
import s from './FormLogin.module.css';
import { useNavigate } from 'react-router-dom';
import EntraceInput from "./EntraceInput";
import PasswordRecovery from "./PasswordRecovery";
import BtnSubmit from "./BtnSubmit";

function FormLogin({setConfirma}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = {
            "email": email,
            "password": password
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/' + 'login', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData),
            }).then((resp) => resp.json())
                .then(function(data) {
                    let acert = data // saberemos se deu certo
                    if (acert.status === true){
                        console.log('logged')
                        localStorage.setItem('eValidation', JSON.stringify(acert.resp))
                        console.log(acert)
                        setConfirma('flex')
                    }
                    else {
                        console.log('recused')
                    }

                }).catch(function(error) {
                    console.log(error);
                    setErrorMessage('Erro no servidor:' + error)
                });

        } catch (error) {
            console.error('Erro no servidor:', error);
            setErrorMessage('Erro no servidor. Tente novamente mais tarde.');
        }
    };

    return (
        <form onSubmit={handleLogin} className={s.all}>
            <div className={s.aling}>
                <EntraceInput
                    type={'email'}
                    placeholder={'Email'}
                    value={email}
                    setar={setEmail} // Atualiza o estado do email
                />
                <EntraceInput
                    type={'password'}
                    placeholder={'Password'}
                    value={password}
                    setar={setPassword} // Atualiza o estado da senha
                />
            </div>
            <div className={s.recovery}>
                <PasswordRecovery title={"Forgot the password?"} />
            </div>
            <div className={s.btnSub}>
                <BtnSubmit title={'Login'} />
            </div>
            {errorMessage && <p className={s.errorMessage}>{errorMessage}</p>}
        </form>
    );
}

export default FormLogin;
