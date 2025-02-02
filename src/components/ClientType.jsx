import s from './ClientType.module.css'
import {useEffect, useState} from "react";
function ClientType ({type, text, setar, setado}) {

    const [colorClass, setColorClass] = useState('#89D7B1')
    const [textColor, setTextColor] = useState('#F4F6F1')

    function turnOption () {
        if (setado) {
            setar(false)
            setColorClass('#89D7B1')
            setTextColor('#F4F6F1')
        }
        else {
            setar(true)
            setColorClass('#F4F6F1')
            setTextColor('#89D7B1')
        }
        console.log(colorClass, textColor)
    }

    return (
        <div className={s.all} onClick={() => turnOption()} style={{backgroundColor: colorClass, color: textColor}}>
            <div className={s.icon}>
                <i className={type + ' ' + s.iconi}></i>
            </div>
            <div className={s.text}>
                <p className={s.describe}>
                    {text}
                </p>
            </div>
        </div>
    )
}

export default ClientType