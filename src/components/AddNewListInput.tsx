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
            <h3>Create new list</h3>
            <span className={s.input}>
                 <TextField size={'small'}
                            variant={'outlined'}
                            value={title}
                            onChange={onInputChangeHandler}
                            onKeyDown={onKeyPressHandler}
                            label={'List name'}
                            error={error}
                            helperText={error && "Title is required"}
                />
            </span>

            <ButtonUni name={'Create'}
                       callBack={addNewList}/>
            {error && <div className="errorMessage">{error}</div>}
        </div>
    );
};

export default AddNewListInput;
