import React from 'react';
import {Button} from "@material-ui/core";
type ButtonPropsType = {
    name: string
    callBack: () => void
}

export const ButtonUni = (props: ButtonPropsType) => {
    const onClickButtonHandler = () => {
        props.callBack()
    }
    return (
        <Button onClick={onClickButtonHandler}
                size={'small'}
                variant={'contained'}
                disableElevation>{props.name}</Button>
    )
}
