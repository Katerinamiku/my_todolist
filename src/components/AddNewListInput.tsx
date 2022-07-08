import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ButtonUni} from "./ButtonUni";
import s from './todolist.module.css'
import {TextField} from "@material-ui/core";

type AddNewListPropsType = {
    addNewList: (title: string) => void
}

const AddNewListInput = (props: AddNewListPropsType) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<boolean>(false)

    const addNewList = () => {
        if (title.trim() === '') {
            setError(true)
        } else {
            props.addNewList(title.trim())
            setTitle('')
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addNewList();

    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        error && setError(false)
    }

    return (

        <div className={s.newList}>

            {/*<TextField value={title}*/}
            {/*           onChange={onInputChangeHandler}*/}
            {/*           onKeyDown={onKeyPressHandler}*/}
            {/*           hiddenLabel*/}
            {/*           defaultValue="Small"*/}
            {/*           variant="standard"*/}
            {/*           size="small"*/}
            {/*           error={!!error}*/}
            {/*           label="Enter name"*/}
            {/*           helperText={error}*/}

            {/*/>*/}

                <input type={'text'}
                       placeholder={'Create new List'}
                       className={s.createInput}
                       value={title}
                       onChange={onInputChangeHandler}
                       onKeyDown={onKeyPressHandler}/>
            <ButtonUni name={'Create'}
                       callBack={addNewList}/>
        </div>
    );
};

export default AddNewListInput;
