import s from './EntraceInput.module.css'
import {useEffect, useState} from "react";
function EntraceInput ({placeholder, type, setar, setado}) {
    const [name, setName] = useState('')
    const [tip, setTip] = useState('password')

    useEffect(() => {
        setName(type + '.svg')
        console.log(name)
    }, []);

    return (
        <div className={s.all}>
            {type == 'password' ?
                <div className={s.imp}>
                    <div className={s.icon}>
                        <img className={s.lefticon} src={'/img/' + name}/>
                    </div>
                    <input className={s.imputs} type={tip} placeholder={placeholder} onChange={(e) => {
                        setar(e.target.value)}} value={setado}/>
                    <button type='button' className={s.eye} onClick={() => {
                        if (tip === 'password') {
                            setTip('text')
                        } else {
                            setTip('password')
                        }
                    }}>{tip === 'password' ? <img className={s.iconpss} src="/img/closedEye.svg" alt=""/>:
                        <img className={s.iconpss} src="/img/openedEye.svg" alt=""/>}</button>
                </div> :
                <div className={s.imp}>
                    <div className={s.icon}>
                        <img className={s.lefticon} src={'/img/' + name}/>
                    </div>
                    <input className={s.imputs} type={type} placeholder={placeholder} onChange={(e) => {
                        setar(e.target.value)
                    }} value={setado}/>
                </div>
            }
        </div>
    )
}

export default EntraceInput