import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SuperButton.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
    title?:string
    disabled?:boolean

}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        red, className,title,disabled,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {
    const finalClassName = disabled ? `${s.custom_btn} ${s.btnStyle} ${s.btnStyleDisabled}` : `${s.custom_btn} ${s.btnStyle}`

    return (
        <button
            disabled={disabled }
            className={finalClassName}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        >
            {/*<span>Click!</span>*/}
            <span className={s.title}>{title}</span>
        </button>
    )
}

export default SuperButton
