import React, {ChangeEvent} from 'react';
import {Checkbox} from "@material-ui/core";

type CheckboxType = {
    isDone: boolean
    callBack: (eventValue: boolean) => void
} //тип чекбокса

export const CheckboxUni = (props: CheckboxType) => {
    const changeCheckboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.callBack(event.currentTarget.checked)
    } //функция по клику на чекбокс передает ткущее состояние checked в callback
    return (
        <Checkbox size={'small'} color={'primary'} onChange={changeCheckboxHandler} checked={props.isDone}/>
    )
} // по умолчанию имеет статус как приходит в props, по изменению запускает функцию изменения
