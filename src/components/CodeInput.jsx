import EntraceInput from "./EntraceInput";
import BtnSubmit from "./BtnSubmit";
import s from './CodeInput.module.css'

function CodeInput ({confirma, setCode, confereCode, setConfirma, statusC}) {
    return (
        <div className={s.conf} style={{display: confirma}}>
            <div className={s.confirmaEmail} style={{display: confirma}}>
                <form className={s.form} onSubmit={(e) => {
                    e.preventDefault()
                    confereCode()
                }}>
                    <EntraceInput setar={setCode} label={'Informe o código enviado por email'}
                                   align={'center'} type={'number'}></EntraceInput>
                    <BtnSubmit title={'mandar'}></BtnSubmit>
                </form>
                <button className={s.btnX} onClick={() => {
                    setConfirma('none')
                    localStorage.removeItem('eValidation')
                }}>cancelar
                </button>
                <p className={s.status}>{statusC}</p>
            </div>
            <div className={s.back}></div>
        </div>
    )
}

export default CodeInput