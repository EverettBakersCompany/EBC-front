import s from './Signin.module.css'
import VoltaLogin from "../components/VoltaLogin";
import ContentSignin from "../components/ContentSignin";
import CodeInput from "../components/CodeInput";

import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
function Signin ({tokenValid}) {
    const navigate = useNavigate();

    useEffect(() => {
        var result = tokenValid(setConfirma)
        if (result) {
            navigate('/home')
        }
    }, []);

    const [acessCad, setAcessCad] = useState(false)
    //infos
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState()

    //code
    const [code, setCode] = useState(0)
    const [confirma, setConfirma] = useState('none')
    const [statusC, setStatusC] = useState('')

    //type of consumer
    const [consumer, setConsumer] = useState(false)
    const [delivery, setDelivery] = useState(false)
    const [store, setStore] = useState(false)
    
    //extra infos
    const [driverLicence, setDriverLicence] = useState('')
    const [birth, setBirth] = useState()
    const [userId, setUserId] = useState()

    const [storeRegister, setStoreRegister] = useState()

    //access control
    const [details, setDetails] = useState(false)

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

            await fetch('http://127.0.0.1:5000/' + '/confirmRegister', {
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
                        setStatusC('')
                        setConfirma('none')
                        localStorage.setItem('token', JSON.stringify(acert.resp))
                        localStorage.removeItem('eValidation')
                        console.log('fim do cadastro')
                        navigate('/home')
                    }
                    else {
                        setStatusC(acert.status)
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
        else {
            setStatusC('código vencido')
        }
    }

    return(
        <div className={s.main}>
            <div className={s.info}>
                <div className={s.header}>
                    <VoltaLogin title={'Log in'} screen={'login'} side={'right'}></VoltaLogin>
                </div>
                <CodeInput confirma={confirma} setCode={setCode} confereCode={confereCode} setConfirma={setConfirma} statusC={statusC}></CodeInput>
                <ContentSignin name={name} setName={setName} email={email} setEmail={setEmail} acessCad={acessCad} setAcessCad={setAcessCad} password={password} setPassword={setPassword}
                               confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} consumer={consumer}
                               setConsumer={setConsumer} delivery={delivery} setDelivery={setDelivery} store={store}
                               setStore={setStore} setDetails={setDetails} setConfirma={setConfirma}></ContentSignin>
            </div>
        </div>
    )
}

export default Signin