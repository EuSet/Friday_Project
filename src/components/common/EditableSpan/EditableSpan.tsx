import React, {useState} from "react";
type PropsType = {
    title: string
    changeTitle: (params:{_id:string, name:string}) => void
    id:string
}
export const EditableSpan = React.memo((props: PropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const onEditMode = () => {
            setEditMode(true)
            setTitle(props.title)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle({name:title, _id:props.id})
    }
    return editMode ?
        <input value={title} onChange={(e) => {
            setTitle(e.currentTarget.value)
        }} autoFocus onBlur={offEditMode} type="text"/> :
        <span onDoubleClick={onEditMode}>{props.title}</span>
})
