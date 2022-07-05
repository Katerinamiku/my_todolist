import {ActivityType, FilterValuesType} from "../App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import EditableSpan from "./EditableSpan";
import {ButtonUni} from "./ButtonUni";
import {CheckboxUni} from "./CheckboxUni";
import s from './todolist.module.css';
import {IconButton, List, ListItem} from "@material-ui/core";
import {Clear, CloseRounded, DeleteForeverOutlined} from "@material-ui/icons";

type ToDoListPropsType = {
    id: string
    title: string
    activities: Array<ActivityType>
    filterValue: FilterValuesType
    removeActivity: (activityId: string, todolistId: string) => void
    addActivity: (title: string, todolistId: string) => void
    checkboxStatus: (activityId: string, newActivityValue: boolean, todolistId: string) => void
    changefilterTasks: (filterValue: FilterValuesType, todolistId: string) => void
    changeTitle: (title: string, todolistId: string) => void
    changeActivityTitle: (title: string, todolistId: string, activityId: string) => void
    removeTodolist: (todolistID: string) => void
}

export const Todolist = (props: ToDoListPropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState('')

    const addActivityHandler = () => {
        if (title.trim() === '') {
            setError('Incorrect value')
        } else {
            props.addActivity(title.trim(), props.id)
            setTitle('')
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError('')
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        (e.key === 'Enter') && addActivityHandler()
    }

    const onClickHandler = (filterValue: FilterValuesType) => {
        props.changefilterTasks(filterValue, props.id);
    }
    const removeTodolist = () => props.removeTodolist(props.id)
    const changeTitle = (title: string) => {
        props.changeTitle(title, props.id)
    }
    return (
        <div className={s.list}>
            <h3>
                <EditableSpan title={props.title}
                              onChange={changeTitle}/>
                <IconButton onClick={removeTodolist}><DeleteForeverOutlined/></IconButton>
            </h3>
            <div>

                <input value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}/>
                <ButtonUni callBack={addActivityHandler}
                           name={'Add'}/>
                {error && <div> {error} </div>}
            </div>
            <List>
                {
                    props.activities.map((t) => {
                        const removeTaskHandler = () => props.removeActivity(t.id, props.id)

                        const checkedHandler = (eventValue: boolean) => {
                            props.checkboxStatus(t.id, eventValue, props.id)
                        }
                        const changeActivityTitle = (title: string) => {
                            props.changeActivityTitle(title, props.id, t.id)
                        }

                        return <ListItem key={t.id}
                                         dense
                                         style={{padding: '0'}}
                                         divider>
                            <CheckboxUni isDone={t.isDone} callBack={checkedHandler}/>
                            <EditableSpan title={t.title} onChange={changeActivityTitle}/>

                            <IconButton size={'small'} onClick={removeTaskHandler}><CloseRounded/></IconButton>
                        </ListItem>
                    })
                }
            </List>
            <div>
                <ButtonUni name={'All'} callBack={() => onClickHandler('all')}/>
                <ButtonUni name={'In progress'} callBack={() => onClickHandler('active')}/>
                <ButtonUni name={'Completed'} callBack={() => onClickHandler('completed')}/>

            </div>
        </div>
    )
};
