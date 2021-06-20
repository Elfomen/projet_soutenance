import React , { useState , useEffect } from 'react'
import './sub_task.css'
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createNewSubtask, completeSubTask , getOneProject } from '../../../../../redux/actions/Projectactions'
function Sub_task_check({ check , calculate_percent , name , loading }) {

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
      setChecked(event.target.checked);
    };


    return (
        <div className="check_form">
            <div className="finishedtask">
                <p>{name}</p>
                 {loading && <CircularProgress color="default"/>}
                 <Checkbox 
                 checked={check}
                 color="primary"
                 onChange={calculate_percent}
                 inputProps={{ 'aria-label': 'primary checkbox' }}/>
            </div>
        </div>
    )
}

export default Sub_task_check
