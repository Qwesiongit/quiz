import React,{useContext,useState,useEffect} from 'react';
import {/*useNavigate as useHistory,*/Navigate as Redirect} from 'react-router-dom';
import { do_change_password } from './../../services/services';
import userContext from '../../context/userContext';
import { monitor_fade } from '../../services/custom';
import {Grid,TextField,Button,Paper,createTheme} from '@mui/material';
import {makeStyles} from '@mui/styles';

const theme = createTheme();

    const _pcdoStyle=makeStyles(()=>({
        root:{
            backgroundColor:'#fdfdff',
        },
        _pcdopad:{
            padding:theme.spacing(2)
        }
    }));

export default function PasswordChange() {
    let pcdstyle = _pcdoStyle();
    //let history=useHistory();
    let [state/*,dispatch*/] = useContext(userContext);
    let {user,isloggedin}=state;
    //let baseuri ="http://localhost:8595/";
    let [_oldpassword,setopass] = useState("");
    let [_newpassword,setnpass] = useState("");
    let [_newpassword_co,setnpass_co] = useState("");
    let [currmessages,setcurrmessages]=useState([]);
    let [wserr, setwserr] = useState(false);
    

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

    const dosubmit = ()=>{
        if(!(_oldpassword===""||_newpassword===""||_newpassword_co==="")){
            if(_newpassword_co===_newpassword){
                let _data = {
                    usertype:"admin",
                    oldpassword:_oldpassword,
                    password:_newpassword,
                }
                do_change_password(_data).then(res=>{
                    if(res.success===true){
                    setcurrmessages(prev=>[...prev,res.message]);
                    setwserr(false);
                    }else{
                    setcurrmessages(prev=>[...prev,res.message]);
                    setwserr(true);
                    }
                });
            }else{
                setcurrmessages(prev=>[...prev,"Sorry,password mismatch"]);
                setwserr(true);
            }
            
        }else{
            setcurrmessages(prev=>[...prev,"Sorry,Fill all fields."]);
            setwserr(true);
        } 

    };

    useEffect(()=>{
        document.title="change password";
    },[]);

    useEffect(()=>{
        monitor_fade();
     });



    if(!(isloggedin) && !(user.usertype==="admin")){
        return <Redirect to="/"/>
    }else{
    return (
        <div className='mt-8'>
<Grid container>
<Grid item xs={2}></Grid>
<Grid item xs={8}>
<Paper className={pcdstyle.root}>
              <div className={pcdstyle._pcdopad}>
            <h3>CHANGE PASSWORD</h3>
            {
            wserr===true?
            currmessages.length!==0 && currmessages.map((msg,index)=>{
                    return <p key={index} className="alert alert-warning tofd">{msg}</p>
                }):
            currmessages.length!==0 && currmessages.map((msg,index)=>{
                    return <p key={index} className="alert alert-success tofd">{msg}</p>
                }) 
                }

<Grid container spacing={6}>
                <Grid item>
                <TextField  label="old password" type="password" name ="oldpassword" onChange={handleopass} value={_oldpassword} required/>
                </Grid>
                <Grid item>
               <TextField  label="new password" type="password" name ="newpassword" onChange={handlenpass} value={_newpassword} required/>
                </Grid>
                <Grid item>
                <TextField  label="repeat new password" type="password" name ="newpassword_co" onChange={handlenpass_co} value={_newpassword_co} required/>
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
