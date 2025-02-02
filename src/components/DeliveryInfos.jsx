import s from './DeliveryInfos.module.css'
import TitleIn from "./TitleIn";
import EntraceInput from "./EntraceInput";
import SignFormPassword from "./SignFormPassword";
import {useState} from "react";
function DeliveryInfos ({driverLicence, setDriverLicence, birth, setBirth, userId, setUserId}) {
    const [teste, setTeste] = useState()
    return (
        <div className={s.all}>
            <div className={s.title}>
                <TitleIn text={'Delivery Register'}></TitleIn>
            </div>
            <div className={s.form}>
                <EntraceInput type={'number'} placeholder={'Driver License'} setar={setDriverLicence} setado={driverLicence}></EntraceInput>
                <div className={s.otherInfos}>
                    <EntraceInput type={'date'} placeholder={'Date of Birth'} setar={setBirth} setado={birth}></EntraceInput>
                    <div className={s.secondInput}>
                        <EntraceInput type={'number'} placeholder={'Confirm ID'} setar={setUserId} setado={userId}></EntraceInput>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeliveryInfos