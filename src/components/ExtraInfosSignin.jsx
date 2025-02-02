import s from './ExtraInfosSignin.module.css'

import DeliveryInfos from "./DeliveryInfos";
import StoreInfos from "./StoreInfos";
import BtnSubmit from "./BtnSubmit";
function ExtraInfosSignin ({delivery, store, driverLicence, setDriverLicence, birth, setBirth, userId, setUserId, storeRegister, setStoreRegister, cad}) {

    return (
        <div className={s.all}>
            <div className={s.form}>
                {delivery == true ? <DeliveryInfos setUserId={setUserId} setDriverLicence={setDriverLicence} setBirth={setBirth} birth={birth} driverLicence={driverLicence} userId={userId}></DeliveryInfos>:<></>}
                {store == true ? <StoreInfos storeRegister={storeRegister} setStoreRegister={setStoreRegister}></StoreInfos>:<></>}
            </div>
            <div className={s.btnSub}>
                <BtnSubmit title={'Send information'} functions={cad}></BtnSubmit>
            </div>
        </div>
    )
}

export default ExtraInfosSignin