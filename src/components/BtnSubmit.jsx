import s from './BtnSubmit.module.css'
function BtnSubmit ({title, functions}) {
    return (
        <button className={s.all} onClick={functions}>
            {title}
        </button>
    )
}

export default BtnSubmit