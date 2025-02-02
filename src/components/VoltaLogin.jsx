import s from './VoltaLogin.module.css'
import {Link} from "react-router-dom";
function VoltaLogin({title, screen, side}) {
    return (
        <div className={s.total}>
            {side == 'left' ?
                <Link to={'/' + screen} className={s.text}>
                    <img className={s.left} src='/img/chevron.svg'/>
                    {title}
                </Link>
                 :
                <Link to={'/' + screen} className={s.text}>
                    {title}
                    <img className={s.right} src='/img/chevron.svg'/>
                </Link>
            }
        </div>

    )
}

export default VoltaLogin