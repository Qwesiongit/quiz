import React,{useState,useEffect,useContext} from 'react';
import {Link,useNavigate as useHistory,Navigate as Redirect} from 'react-router-dom';
import {do_login,checkloggein} from '../services/services';
import userContext from './../context/userContext';
import { SET_CURRENT_USER } from '../store/actions';
import {Grid,TextField,Button,Paper,createTheme} from '@mui/material';
//import $ from 'jquery';
import { monitor_fade } from './../services/custom';
import {makeStyles} from '@mui/styles';

const theme = createTheme();

let tm = new Date();
var when_ = tm.toLocaleString();

const doStyle=makeStyles(()=>({
    root:{
        backgroundColor:'#fdfdff',
    },
    dopad:{
        padding:theme.spacing(1)
    }
}));

export default function Login() {

    let history=useHistory();
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [errmsgs, setErrmsgs] = useState([]);
    let [state,dispatch] = useContext(userContext);
    let {user,isloggedin}=state;
    let dstyle = doStyle();

    const handlepass=(e)=>{
        e.preventDefault();
        setPassword(e.target.value);
    };

  
    const handlemail=(e)=>{
        e.preventDefault();
        setEmail(e.target.value);
    }
    
    const dosubmit=()=>{
    
        if (!(email==="" || password==="")) {
            let user={
                usertype:"normal",
                email:email,
                password:password,
                logfrom:when_
            }

           do_login(user).then(lgg=>{
               //console.log(lgg);
               if(lgg.errors){
                let allerr=lgg.errors;
                for (const er in allerr) {
                    if (allerr.hasOwnProperty(er)) {
                        const element = allerr[er];
                        setErrmsgs(prev=>[...prev,element.msg]);
                    }
                }
               }else if(lgg.success===false && lgg.islg===true){
                setErrmsgs(prev=>[...prev,lgg.message]);
               }else if(lgg.success===false){
                setErrmsgs(prev=>[...prev,lgg.message]);
               }
               else{
                dispatch({type:SET_CURRENT_USER,user:lgg.user,isloggedin:true,loggedin_time:when_});
                history('/userdashboard');
               }
            });
  
        } else {
            setErrmsgs(prev=>[...prev,"Sorry,all fields are required"]);
        }
       
    };

    const handle_log_in = ()=>{
        checkloggein().then(res=>{
        });
    };

    useEffect(()=>{
        document.title="login";
        handle_log_in();
    },[]);

       
         useEffect(()=>{
            monitor_fade();
         });

   
    if(isloggedin && user.user_type==="admin"){
        return <Redirect to="/admindashbord"/>
    }else if(isloggedin && user.user_type==="normal"){
        return <Redirect to="/userdashboard"/>
    }else{
    return (
        <div className="mt-5">

<Grid container>
<Grid item xs={3}></Grid>
            
<Grid item xs={6}>
            
             <Paper className={dstyle.root}>
             <div className={dstyle.dopad}>
                <h5>LOGIN HERE</h5>
    {errmsgs.length!==0 && errmsgs.map((err,index)=>{
                    return <p key={index} className="alert alert-warning tofd">{err}</p>
                })}
                <Grid container spacing={6}>
                <Grid item>
                <TextField  label="email" name ="email" onChange={handlemail} required/>
                </Grid>
                <Grid item>
                <TextField  type="password"  label="password" name ="password" onChange={handlepass} required/>
                </Grid>
                </Grid>
                <br/>
                <br/>
                <p><Button variant="contained" onClick={dosubmit}>SUBMIT</Button>  <small><Link to="/userpasswordreset">forgot password</Link></small></p>
                </div>
         </Paper>
            <br/>
            <br/>
            <p className="text-center">Not registered? <br/> <span><Link to="/register"><Button variant="outlined">REGISTER</Button></Link></span></p>
            
</Grid>
            
            <Grid item xs={3}></Grid>
</Grid>

        </div>
    )
    }
}
