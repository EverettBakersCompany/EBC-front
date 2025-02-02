import s from './Login.module.css'

import VoltaLogin from "../components/VoltaLogin";
import TitleIn from "../components/TitleIn";
import FormLogin from "../components/FormLogin";
import CodeInput from "../components/CodeInput";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
function Login ({tokenValid}) {
    const navigate = useNavigate();
    const [code, setCode] = useState(0)
    const [confirma, setConfirma] = useState('none')
    const [statusC, setStatusC] = useState('')

    useEffect(() => {
        var result = tokenValid(setConfirma)
        if (result) {
            navigate('/home')
        }
    }, []);

    function checandoValidade (date) {
        let today = new Date()
        let data2 = new Date(date)
        let timezone = today.getTimezoneOffset()
        data2.setMinutes(data2.getMinutes() + timezone)

        if (today >= data2) {
            return true
        }
        return false
    }

    async function confereCode () {
        var val = checandoValidade(JSON.parse(localStorage.getItem('eValidation')).down)

        if (localStorage.getItem('eValidation') !== null && val !== true) {
            const data = {
                'code': code,
                'token': JSON.parse(localStorage.getItem('eValidation'))
            }

            await fetch('http://127.0.0.1:5000/' + 'confereLog', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json' // Especifique o tipo de conteúdo como JSON
                },
                body: JSON.stringify(data) // Converta o objeto em uma string JSON
            })
                .then((resp) => resp.json())
                .then(function(data) {
                    let acert = data // saberemos se deu certo
                    if (acert.status === true) {
                        setConfirma('none')
                        localStorage.setItem('token', JSON.stringify(acert.resp))
                        localStorage.removeItem('eValidation')
                        console.log('fim do login')
                        navigate('/home');
                    }
                    else {
                        console.log(acert.status)
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
        else {
            console.log('código vencido')
        }
    }

    return (
        <div className={s.main}>
            <CodeInput confirma={confirma} setCode={setCode} confereCode={confereCode} setConfirma={setConfirma} statusC={statusC}></CodeInput>
            <div className={s.info}>
                <div className={s.header}>
                    <VoltaLogin title={'Sign in'} screen={'sign'} side={'left'}></VoltaLogin>
                </div>
                <div className={s.informations}>
                    <div className={s.title}>
                        <TitleIn text={'Welcome'}></TitleIn>
                    </div>
                    <div className={s.form}>
                        <FormLogin setConfirma={setConfirma}></FormLogin>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login