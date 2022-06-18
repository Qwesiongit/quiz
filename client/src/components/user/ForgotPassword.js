import React,{/*useContext,*/useState,useEffect} from 'react';
//import {useNavigate as useHistory} from 'react-router-dom';
import {do_reset_password } from './../../services/services';
//import userContext from '../../context/userContext';
import {Grid,TextField,Button,Paper,createTheme} from '@mui/material';
import { monitor_fade } from '../../services/custom';
import {makeStyles} from '@mui/styles';
const theme = createTheme();

    const _fdoStyle=makeStyles(()=>({
        root:{
            backgroundColor:'#fdfdff',
        },
        _fdopad:{
            padding:theme.spacing(2)
        }
    }));

export default function ForgotPassword() {
    //let history=useHistory();
    //let [state,dispatch] = useContext(userContext);
    let [fullname,setname] = useState("");
    let [email,setmail] = useState("");
    let [anyerr,setanyerr] = useState(false);
    let [currmessages,setcurrmessages]=useState([]);
    let _fdstyle = _fdoStyle();


    const handlemail=(e)=>{
        e.preventDefault();
        setmail(e.target.value);
    };

    const handlename=(e)=>{
        e.preventDefault();
        setname(e.target.value);
    };


    const dosubmit=(e)=>{
       if(!(fullname==="")|| !(email==="")){
            let data ={
                usertype:"normal",
                fullname,
                email
            }
             do_reset_password(data).then(done=>{
                if(done.success===true){
                setcurrmessages(prev=>[...prev,done.message]);
                setanyerr(false);
                }else{
                    setcurrmessages(prev=>[...prev,done.message]);
                    setanyerr(true);
                }
                

             })
           
       }else{
        setcurrmessages(prev=>[...prev,"Sorry,Fill both email and password fieldS."]);
        setanyerr(true);
       }
       
    };

    useEffect(()=>{
        document.title="forgot password";
        //handle_log_in();
    },[]);

    useEffect(()=>{
        monitor_fade();
     });


    return (
        <div className='mt-5'>
<Grid container>
<Grid item xs={3}></Grid> 
<Grid item xs={6}>

<Paper className={_fdstyle.root}>
              <div className={_fdstyle._fdopad}>
             <h4>PASSWORD RESET</h4>

             {
             anyerr===true?
             currmessages.length!==0 && currmessages.map((msg,index)=>{
                    return <p key={index} className="alert alert-warning tofd">{msg}</p>
                }):
            currmessages.length!==0 && currmessages.map((msg,index)=>{
                    return <p key={index} className="alert alert-success tofd">{msg}</p>
                })  

            }
 
        <Grid container spacing={6}>
                <Grid item>
                <TextField label="full name" name ="fullname" onChange={handlename} value={fullname} required/>
                </Grid>
                <Grid item>
                <TextField label="email" type="email" name ="email" onChange={handlemail} value={email} required/>
                </Grid>
                </Grid>
                <br/>
                <p><Button variant="contained" type="button" onClick={dosubmit}>SUBMIT</Button></p>
</div>
</Paper>
</Grid>
<Grid item xs={3}></Grid> 
</Grid>

        </div>
    )
}
