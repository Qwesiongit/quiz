import React,{/*useContext,*/ useState,useEffect} from 'react';
//import {useNavigate as useHistory} from 'react-router-dom';
import {do_reset_password } from './../../services/services';
//import userContext from '../../context/userContext';
import { monitor_fade } from '../../services/custom';
import {Grid,TextField,Button,Paper,createTheme} from '@mui/material';
import {makeStyles} from '@mui/styles';
const theme = createTheme();

    const _fgdoStyle=makeStyles(()=>({
        root:{
            backgroundColor:'#fdfdff',
        },
        _fgdopad:{
            padding:theme.spacing(2)
        }
    }));

export default function ForgottenPassword() {
    let fgstyle = _fgdoStyle();
    //let history=useHistory();
    //let [state,dispatch] = useContext(userContext);
    //let {user,isloggedin}=state;
    let [fullname,setname] = useState("");
    let [email,setmail] = useState("");
    let [currmessages,setcurrmessages]=useState([]);
    let {waserr,setwaserr}=useState(false);

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
                usertype:"admin",
                fullname,
                email
            }
             do_reset_password(data).then(done=>{
                 if(done.success===true){
                    setcurrmessages(prev=>[...prev,done.message]);
                    setwaserr(false);
                 }else{
                 setcurrmessages(prev=>[...prev,done.message]);
                 setwaserr(true);
                 }
             })
          
       }else{
        setcurrmessages(prev=>[...prev,"Sorry,Fill both email and password field."]);
        setwaserr(true);
       }
       
    };

    useEffect(()=>{
        document.title="forgotten password";
    },[]);

    useEffect(()=>{
        monitor_fade();
     });





    return (
        <div className='mt-5'>

<Grid container>
<Grid item xs={3}></Grid> 
<Grid item xs={6}>

<Paper className={fgstyle.root}>
              <div className={fgstyle._fgdopad}>
            <h1>Admin Password Reset</h1>

            {
            waserr===true?
            currmessages.length!==0 && currmessages.map((msg,index)=>{
                    return <p key={index} className="alert alert-warning tofd">{msg}</p>
                }):
            currmessages.length!==0 && currmessages.map((msg,index)=>{
                    return <p key={index} className="alert alert-successg tofd">{msg}</p>
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
