import s from "./DeliveryInfos.module.css";
import TitleIn from "./TitleIn";
import EntraceInput from "./EntraceInput";

function StoreInfos ({storeRegister, setStoreRegister}) {
    return (
        <div className={s.all}>
            <div className={s.title}>
                <TitleIn text={'Store Register'}></TitleIn>
            </div>
            <div className={s.form}>
                <EntraceInput type={'number'} placeholder={'Store Register'} setar={setStoreRegister} setado={storeRegister}></EntraceInput>
            </div>
        </div>
    )
}

export default StoreInfos