import { useState } from "react";
import s from './FormSign.module.css';
import EntraceInput from "./EntraceInput";
import SignFormPassword from "./SignFormPassword";
import BtnSubmit from "./BtnSubmit";
import PasswordBar from "./PasswordBar";
import ClientType from "./ClientType";
import { useNavigate } from "react-router-dom";

function FormSign({ name, setName, email, setEmail, setAcessCad, password, setPassword, confirmPassword, setConfirmPassword, consumer, setConsumer, delivery, setDelivery, store, setStore, setDetails, setConfirma }) {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const validatePasswords = () => {
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return false;
        }
        setErrorMessage('');
        return true;
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!validatePasswords()) {
            return;
        }

        const signUpData = {
            'name':name,
            'email':email,
            'password': password
        }

        console.log(signUpData)

        try {
            const response = await fetch('http://127.0.0.1:5000/' + 'register', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signUpData),
            })
                .then((resp) => resp.json())
                .then(function(data) {
                    let acert = data // saberemos se deu certo
                    if (acert.status === true){
                        console.log('approved')
                        localStorage.setItem('eValidation', JSON.stringify(acert.resp))
                        setConfirma('flex')
                    }
                    else {
                        console.log('recused')
                        setErrorMessage('Erro no servidor: ' + acert.status);
                    }

                }).catch(function(error) {
                    console.log(error);
                    setErrorMessage('Erro no servidor: ' + error)
                });

            const data = await response.json();

        } catch (error) {
            console.error('Erro no servidor:', error);
        }
    };

    return (
        <form onSubmit={handleSignUp} className={s.all}>
            <div className={s.aling}>
                <EntraceInput
                    type={'text'}
                    placeholder={'Name'}
                    value={name}
                    setar={setName} // Atualiza o estado do nome
                />
                <EntraceInput
                    type={'email'}
                    placeholder={'Email'}
                    value={email}
                    setar={setEmail} // Atualiza o estado do email
                />
                <div className={s.password}>
                    <div className={s.passalign}>
                        <SignFormPassword
                            placeholder={'Password'}
                            type={'password'}
                            value={password}
                            setar={setPassword} // Atualiza o estado da senha
                        />
                        <SignFormPassword
                            placeholder={'Confirm'}
                            type={'password'}
                            value={confirmPassword}
                            setar={setConfirmPassword} // Atualiza o estado da confirmação
                        />
                    </div>
                </div>
                <div className={s.progressbar}>
                    <PasswordBar senha={password} setPermitirCad={setAcessCad} confirmPassword={confirmPassword} />
                </div>
            </div>
            <div className={s.btnSub}>
                <BtnSubmit title={'Signin'}/>
            </div>
            {errorMessage && <p className={s.errorMessage}>{errorMessage}</p>}
        </form>
    );
}

export default FormSign;
