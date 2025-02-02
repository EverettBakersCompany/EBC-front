import s from './PasswordRecovery.module.css'
import {Link} from "react-router-dom";
function PasswordRecovery ({title}) {
    return (
        <div className={s.all}>
            <Link to={'/passwordrecovery'} className={s.text}>{title}</Link>
        </div>
    )
}

export default PasswordRecovery