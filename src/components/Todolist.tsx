import {ActivityType, FilterValuesType} from "../App";
import EditableSpan from "./EditableSpan";
import {ButtonUni} from "./ButtonUni";
import {CheckboxUni} from "./CheckboxUni";
import s from './todolist.module.css';
import {Checkbox, Icon, IconButton, List, ListItem, SvgIcon} from "@material-ui/core";
import {
    CloseRounded,
    DeleteOutline,
    EditOutlined,
    Favorite,
    FavoriteBorder,
    SentimentDissatisfied, SentimentDissatisfiedOutlined
} from "@material-ui/icons";
import AddingInput from "./AddingInput";


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
    const tasksJSX = props.activities.length
        ? props.activities.map((t) => {
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
                             className={t.isDone ? "task isDone" : "task"}
                             divider>
                <Checkbox style={{color: '#ed407a'}} icon={<FavoriteBorder/>} checkedIcon={<Favorite/>}/>
                <CheckboxUni isDone={t.isDone} callBack={checkedHandler}/>
                <EditableSpan title={t.title} onChange={changeActivityTitle}/>
                <IconButton size={'small'} onClick={removeTaskHandler}><CloseRounded/></IconButton>
            </ListItem>
        }) :
        <div>
            <SentimentDissatisfiedOutlined/>
            <span className={'emptyList'}>Your list is empty</span>
        </div>


    const onClickHandler = (filterValue: FilterValuesType) => {
        props.changefilterTasks(filterValue, props.id);
    }
    const removeTodolist = () => props.removeTodolist(props.id)
    const changeTitle = (title: string) => {
        props.changeTitle(title, props.id)
    }
    const addTask = (title: string) => props.addActivity(title, props.id)

    return (
        <div className={s.list}>
            <h3>
                <EditOutlined color={'primary'} style={{fontSize: '20px'}}/>
                <EditableSpan title={props.title}
                              onChange={changeTitle}/>
                <IconButton onClick={removeTodolist}><DeleteOutline/></IconButton>
            </h3>
            <div>
                <AddingInput addItem={addTask}/>
            </div>
            <List>
                {tasksJSX}
            </List>
            <div>
                <ButtonUni name={'All'} callBack={() => onClickHandler('all')}/>
                <ButtonUni name={'In progress'} callBack={() => onClickHandler('active')}/>
                <ButtonUni name={'Completed'} callBack={() => onClickHandler('completed')}/>

            </div>
        </div>
    )
};
