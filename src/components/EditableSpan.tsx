import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {

    let [inputActivated, setInputActivated] = useState(false)
    let [title, setTitle] = useState('')

    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

        setTitle(e.currentTarget.value)
    }
    const activateInput = () => {
        setInputActivated(true)
        setTitle(props.title)
    }
    const deactivateInput = () => {
        setInputActivated(false)
        props.onChange(title)
    }

    const onKeyDownChangeTitle = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && deactivateInput()

    return (
        inputActivated ?
            <TextField value={title}
                       onChange={onInputChangeHandler}
                       onBlur={deactivateInput}
                       onKeyDown={onKeyDownChangeTitle}
                       autoFocus/>

            : <span onDoubleClick={activateInput}>{props.title}</span>
    )
};

export default EditableSpan;
