import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";
import AddNewListInput from "./components/AddNewListInput";
import {AppBar, Container, Grid, IconButton, Menu, Paper, Toolbar, Typography} from '@material-ui/core';


export type ActivityType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type ActivityStateType = {
    [key: string]: Array<ActivityType>
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let todoListId1 = v1()
    let todoListId2 = v1()


    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListId1, title: 'Titles', filter: 'all'},
        {id: todoListId2, title: 'Doramas', filter: 'all'},
    ])

    let [activities, setActivities] = useState<ActivityStateType>({
            [todoListId1]: [
                {id: v1(), title: "On or Off", isDone: true},
                {id: v1(), title: "Bj Alex", isDone: true},
                {id: v1(), title: "Shanri-la no tori", isDone: false},
                {id: v1(), title: "Good teacher", isDone: true},
                {id: v1(), title: "Love is an illusion", isDone: true},
                {id: v1(), title: "Taiming", isDone: true},
                {id: v1(), title: "Walk on the water", isDone: true},
                {id: v1(), title: "Under the green light", isDone: false},
            ],
            [todoListId2]: [
                {id: v1(), title: "KihnPorshe", isDone: false},
                {id: v1(), title: "Yumi's cells", isDone: false},
                {id: v1(), title: "It's ok not ot be ok", isDone: false},
                {id: v1(), title: "Moon lovers", isDone: true},
                {id: v1(), title: "Hotel DelLuna", isDone: true},
            ],
        }
    )
    const addActivity = (title: string, todolistId: string) => {
        const newActivity = {id: v1(), title: title, isDone: false}
        activities[todolistId] = [newActivity, ...activities[todolistId]]
        setActivities({...activities})
    }

    const removeActivity = (activityId: string, todolistId: string) => {
        activities[todolistId] = activities[todolistId].filter(a => a.id !== activityId)
        setActivities({...activities})
    }

    const checkboxStatus = (activityId: string, newActivityValue: boolean, todolistId: string) => {
        const updatedStatus = activities[todolistId].map(a => a.id === activityId ? {
            ...a,
            isDone: newActivityValue
        } : a)
        setActivities({...activities, [todolistId]: updatedStatus})
    }

    const changefilter = (filterValue: FilterValuesType, todolistId: string) => {
        const filteredActivities = todoLists.map(t => t.id === todolistId ? {...t, filter: filterValue} : t)
        setTodoLists(filteredActivities)
    }
    const addNewList = (title: string) => {
        let newList: TodolistType = {id: v1(), title: title, filter: 'all'};
        setTodoLists([...todoLists, newList])
        setActivities({...activities, [newList.id]: []})
    }
    const removeTodolist = (todolistID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todolistID))
        delete activities[todolistID]
    }

    const changeTitle = (title: string, todolistId: string) => {
        const changedTitled = todoLists.map(t => t.id === todolistId ? {...t, title} : t)
        setTodoLists(changedTitled)
    }
    const changeActivityTitle = (title: string, todolistId: string, activityId: string) => {
        let updatedActivityTitle = activities[todolistId].map(a => a.id === activityId ? {...a, title} : a)
        setActivities({...activities, [todolistId]: updatedActivityTitle})
    }

    const todolistsComponents = todoLists.map(tl => {
        let tasksForRender;
        switch (tl.filter) {
            case "active":
                tasksForRender = activities[tl.id].filter(t => !t.isDone)
                break
            case "completed":
                tasksForRender = activities[tl.id].filter(t => t.isDone)
                break
            default:
                tasksForRender = activities[tl.id]
        }

    return (
        <Grid item key={tl.id}>
            <Paper elevation={6} style={{padding: "5px 20px 20px 20px", background: '#e5ffff'}}>
                <Todolist key={tl.id}
                          id={tl.id}
                          title={tl.title}
                          filterValue={tl.filter}

                          activities={tasksForRender}
                          removeActivity={removeActivity}
                          addActivity={addActivity}
                          checkboxStatus={checkboxStatus}
                          changefilterTasks={changefilter}
                          changeTitle={changeTitle}
                          changeActivityTitle={changeActivityTitle}
                          removeTodolist={removeTodolist}
                />
            </Paper>
        </Grid>
    )
        })
    return (
        <div className="App">
            <AppBar position="static" color={'secondary'}>
                <Toolbar style={{justifyContent: "space-between"}} >
                    <Typography variant="h6">
                        My Lists
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}>
                    <AddNewListInput addNewList={addNewList}/></Grid>
                <Grid container spacing={4}>{todolistsComponents}</Grid>
            </Container>
        </div>
    );
}



export default App;
