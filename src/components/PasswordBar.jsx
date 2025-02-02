import s from './PasswordBar.module.css'
import {useEffect, useState} from "react";
function CadastroBar ({senha, confirmPassword, setPermitirCad}) {
    const [message, setMessage] = useState('')
    const [conclued, setConclued] = useState(0)
    const [color, setColor] = useState('')

    useEffect(() => {
        setPermitirCad(false)
        const hasUpper = (str) => /[A-Z]/.test(str)
        const hasletter = (str) => /[a-z]/.test(str)
        const hasnumber = (str) => /[0-9]/.test(str)

        let regex = /^(?=.*[@!#$%&*/=_+-])/

        if (hasletter(senha) === false) {
            setMessage('Add at least one lowercase letter')
            setConclued('0')
            setColor('')
        }
        else if(hasUpper(senha) === false) {
            setMessage('Add a capital letter')
            setConclued('20%')
            setColor('#06D6A0')
        }
        else if(hasnumber(senha) === false) {
            setMessage('Add a number')
            setConclued('40%')
            setColor('#06D6A0')
        }
        else if (regex.test(senha) === false) {
            setMessage('Add some special character')
            setConclued('60%')
            setColor('#06D6A0')
        }
        else if(senha.length < 8) {
            setMessage('The password must be at least 8 characters long')
            setConclued('80%')
            setColor('#06D6A0')
        }
        else {
            setMessage('Strong password')
            setConclued('100%')
            setColor('#06D6A0')
            setPermitirCad(true)
        }


    }, [senha]);

    return (
        <div className={s.todo}>
            <div className={s.bar}>
                <div className={s.couter} style={{width: conclued, backgroundColor: color}}></div>
            </div>
            <div className={s.mess}>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default CadastroBar