import React , {useState , useEffect} from 'react'
import './Progress.css'
import DoneAllIcon from '@material-ui/icons/DoneAll';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
function Progress({ done }) {

    const [styles , setStyles] = useState({
        opacity : 1 , 
        width: `${done}%` 
    })


    useEffect(() => {
        setStyles({
            opacity : 1 , 
            width : `${done}%`
        })
    } , [done])

    return (
        <div className="percentage" style={styles}><p><label>{done===100?'Completed' : done}</label><label>{done===100? <CheckCircleIcon className="ok"/> : '%'}</label></p></div>
    )
}

export default Progress