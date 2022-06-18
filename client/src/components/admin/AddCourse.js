import React,{useContext,useEffect,useState} from 'react';
import {useNavigate as useHistory,Navigate as Redirect} from 'react-router-dom';
//import { do_logout } from './../../services/services';
import userContext from '../../context/userContext';
import { SET_QUIZ_TYPE} from '../../store/actions';
import {Grid,Button,Paper,createTheme} from '@mui/material';
import { monitor_fade } from '../../services/custom';
import {makeStyles} from '@mui/styles';

const theme = createTheme();

    const _adcdoStyle=makeStyles(()=>({
        root:{
            backgroundColor:'#fdfdff',
        },
        _adcdopad:{
            padding:theme.spacing(4)
        }
    }));

export default function AddCourse() {
    let history=useHistory();
    let [state,dispatch] = useContext(userContext);
    let [qtype,setqtype] = useState("");
    let {user,isloggedin}=state;
   // let baseuri ="http://localhost:8595/";
    let adcdstyle = _adcdoStyle();
    let [iserr,setIserr] = useState(false);
    let [currmsg, setcurrmsg] = useState([]);

    
    const handletype =(e)=>{
        e.preventDefault();
        setqtype(e.target.value);
      };

      const handlesubmit = ()=>{
          
          console.log(qtype);
        dispatch({type:SET_QUIZ_TYPE,quiz_type:qtype});
        if(qtype==="general"){
            history("/addgencourse");
        }else if(qtype==="past_question"){
            history("/addpqcourse");
        }else{
            setIserr(true);
            setcurrmsg(prev=>[...prev,"Sorry,please choose quiz type!!"]);
        }
    };

    useEffect(()=>{
        document.title="add course";
    },[]);

    useEffect(()=>{
        monitor_fade();
     });


    if(!(isloggedin) && !(user.usertype==="admin")){
        return <Redirect to="/"/>
    }else{
    return (
        <div className='mt-5'>

<Grid container>
<Grid item xs={4}></Grid>
<Grid item xs={4}>

<Paper className={adcdstyle.root}>
{
            iserr===true?
            currmsg.length!==0 && currmsg.map((msg,index)=>{
                    return <p key={index} className="alert alert-warning tofd">{msg}</p>
                }):
            currmsg.length!==0 && currmsg.map((msg,index)=>{
                    return <p key={index} className="alert alert-success tofd">{msg}</p>
                })   

            }
            
            <div className={adcdstyle._adcdopad}>
            <h3>Add Course</h3>
           <p>Quiz Type <br/>
           <select className="form-control" name="qtype" onChange={handletype} value={qtype}>
                <option value="">Choose Quiz Type</option>
                <option value="general">General</option>
                <option value="past_question">Past Questions</option>
            </select>
            </p>

            <p><Button variant="contained" onClick={handlesubmit}>Submit</Button></p>
</div>
</Paper>
</Grid>
<Grid item xs={4}></Grid>
        </Grid>
        </div>
    )
    }
}
