import s from './ContentSignin.module.css'
import TitleIn from "./TitleIn";
import FormSign from "./FormSign";
function ContentSignin ({name, setName, email, setEmail ,acessCad, setAcessCad, password, setPassword, confirmPassword, setConfirmPassword, consumer, setConsumer, delivery, setDelivery, store, setStore, setDetails, cad, setConfirma}) {
    return (
        <div className={s.informations}>
            <div className={s.title}>
                <TitleIn text={'Starting Now'}></TitleIn>
            </div>
            <div className={s.form}>
                <FormSign name={name} setName={setName} email={email} setEmail={setEmail} acessCad={acessCad} setAcessCad={setAcessCad} password={password} setPassword={setPassword}
                          confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} consumer={consumer}
                          setConsumer={setConsumer} delivery={delivery} setDelivery={setDelivery} store={store}
                          setStore={setStore} setDetails={setDetails} cad={cad} setConfirma={setConfirma}></FormSign>
            </div>
        </div>
    )
}

export default ContentSignin