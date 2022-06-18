import React,{useContext,useState,useEffect,useRef} from 'react';
import {useNavigate as useHistory,Navigate as Redirect} from 'react-router-dom';
import {do_change_password,checkloggein } from './../../services/services';
import userContext from '../../context/userContext';
import { SET_CURRENT_USER } from '../../store/actions';
import {Grid,TextField,Button,Paper,createTheme} from '@mui/material';
import { monitor_fade } from '../../services/custom';
import {makeStyles} from '@mui/styles';
const theme = createTheme();

let dtimer = 40;

    const _cdoStyle=makeStyles(()=>({
        root:{
            backgroundColor:'#fdfdff',
        },
        _cdopad:{
            padding:theme.spacing(2)
        }
    }));

export default function ChangePassword() {
    let history=useHistory();
    let [state,dispatch] = useContext(userContext);
    let {user,isloggedin}=state;
    //let baseuri ="http://localhost:8595/";
    let [oldpassword,setopass] = useState("");
    let [newpassword,setnpass] = useState("");
    let [newpassword_co,setnpass_co] = useState("");
    let [currmessages,setcurrmessages]=useState([]);
    let [iserr,seterr] = useState(false);
    let u_ref = useRef();
    let _cdstyle = _cdoStyle();
    

    const handleopass = (e)=>{
      e.preventDefault();
      setopass(e.target.value);
    };


    const handlenpass = (e)=>{
        e.preventDefault();
      setnpass(e.target.value);
        
    };

    const handlenpass_co = (e)=>{
        e.preventDefault();
      setnpass_co(e.target.value);  
    };

    const handle_log_in =async ()=>{
        if(!(user==={})){
        checkloggein().then(res=>{
            if(!(res===user.loggedInTime)){
            alert("Sorry,you logged in elswhere.We will log you out here");
            dispatch({type:SET_CURRENT_USER,user:{},isloggedin:false,loggedin_time:null});
            history("/");
            }
        });
    }
    };

    const flush_user = ()=>{
        dispatch({type:SET_CURRENT_USER,user:{},isloggedin:false});
        history("/");
    };

    const dosubmit = ()=>{
        if(!(oldpassword===""||newpassword===""|| newpassword_co==="")){
            if(newpassword_co===newpassword){
                let data = {
                    usertype:"normal",
                    oldpassword:oldpassword,
                    password:newpassword,
                }
                do_change_password(data).then(res=>{
                    if(res.success === true){
                        setcurrmessages(prev=>[...prev,res.message]);
                        seterr(false);
                    }else{
                        setcurrmessages(prev=>[...prev,res.message]);
                        seterr(true);
                    }
                    

                });
            }else{
                setcurrmessages(prev=>[...prev,"Sorry,password mismatch"]);
                seterr(true);
            }
        }else{
            setcurrmessages(prev=>[...prev,"Sorry,Fill all fields."]);
            seterr(true);
        }
        
    };

    const update_user_tick = ()=>{
        dtimer--;
        if(dtimer===0){
            clearInterval(u_ref.current);
            flush_user();
        }
        
    };

    const userTimed =()=>{
        u_ref.current = setInterval(update_user_tick,1000);
    };

    const reset_time = ()=>{
        dtimer=40;
    };

    const check_active = ()=>{
        window.addEventListener("mousemove",reset_time);
        window.addEventListener("mouseover",reset_time);
        window.addEventListener("keydown",reset_time);
    };

    useEffect(()=>{
        document.title="change password";
        handle_log_in();
        userTimed();
        return(()=>{
            clearInterval(u_ref.current);
        });
    },[]);

    useEffect(()=>{
        monitor_fade();
        check_active();
     });



if(!(isloggedin) && !(user.usertype==="normal")){
        return <Redirect to="/"/>
    }else{
    return (
        <div className='mt-5'>
<Grid container spacing={2}>
<Grid item xs={2}></Grid>
<Grid item xs={8}>

<Paper className={_cdstyle.root}>
              <div className={_cdstyle._cdopad}>
            <h2>CHANGE PASSWORD</h2>
            {
            iserr===true?
            currmessages.length!==0 && currmessages.map((msg,index)=>{
                    return <p key={index} className="alert alert-warning tofd">{msg}</p>
                }):
            currmessages.length!==0 && currmessages.map((msg,index)=>{
                    return <p key={index} className="alert alert-success tofd">{msg}</p>
                })    
                }
                <Grid container spacing={2}>
                <Grid item>
                <TextField  label="old password" type="password" name ="oldpassword" onChange={handleopass} value={oldpassword} required/>
                </Grid>
                <Grid item>
                <TextField  label="new password" type="password" name ="newpassword" onChange={handlenpass} value={newpassword} required/>
                </Grid>
                <Grid item>
                <TextField  label="repeat new password" type="password" name ="newpassword_co" onChange={handlenpass_co} value={newpassword_co} required/>
                </Grid>
                </Grid>
                <br/>
                <p><Button variant="contained" type="button" onClick={dosubmit}>SUBMIT</Button></p>

</div>
</Paper> 
        </Grid>
        <Grid item xs={2}></Grid>
        </Grid>
        </div>
    )
    }
}
