import s from './TitleIn.module.css'

function TitleIn ({text}) {
    return (
        <div className={s.all}>
            <p className={s.title}>{text}</p>
        </div>
    )
}

export default TitleIn