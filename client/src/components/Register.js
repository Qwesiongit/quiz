import React,{useState,useEffect,useContext} from 'react';
import {Link,useNavigate as useHistory,Navigate as Redirect} from 'react-router-dom';
import {do_register,checkloggein} from '../services/services';
import userContext from './../context/userContext';
import { SET_TO_PAY_USER } from '../store/actions';
import {Grid,TextField,Button,Paper,createTheme} from '@mui/material';
import { monitor_fade } from './../services/custom';
import {makeStyles} from '@mui/styles';
const theme = createTheme();

var is_loggedinfrom = false;
var here_ = navigator.userAgent;


    const _doStyle=makeStyles(()=>({
        root:{
            backgroundColor:'#fdfdff',
        },
        _dopad:{
            padding:theme.spacing(1)
        }
    }));


export default function Register() {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [fullname, setname] = useState('');
    let [_level, setlevel] = useState('');
    let [password1, setPassword1] = useState('');
    let [file, setfile] = useState('');
    let [cuerrors, setcuerrors] = useState([]);
    let history=useHistory();
    let [state,dispatch] = useContext(userContext);
    let{user,isloggedin/*topay*/}=state;
    //let [isloggedin, setloggedin] = useState(false);
    let _dstyle = _doStyle();
 

    const handlelevel = (e)=>{
        e.preventDefault();
        setlevel(e.target.value);
    }
    const handlepass=(e)=>{
        e.preventDefault();
        setPassword(e.target.value);
    }

    const handlepass1=(e)=>{
        e.preventDefault();
        setPassword1(e.target.value);
    }

    const handlemail=(e)=>{
        e.preventDefault();
        setEmail(e.target.value);
    }

    const handlename=(e)=>{
        e.preventDefault();
        setname(e.target.value);
    }

    const handleimg=(e)=>{
        e.preventDefault();
        let imgs = e.target.files[0];
        setfile(imgs);
    };

   
    const dosubmit=(e)=>{
     e.preventDefault();
        if (!(email==="" || _level==="" || password==="" || fullname==="" ||password1==="" || file==="")) {
            
            const formdata = new FormData();
            formdata.append("usertype","normal");
            formdata.append("fullname",fullname);
            formdata.append("level",_level.replace("_"," "));
            formdata.append("email",email);
            formdata.append("password",password);
            formdata.append("password_co",password1);
            formdata.append("_img",file);
  
           do_register(formdata).then(lgg=>{
               if(lgg.errors){
                   let allerr=lgg.errors;
                   for (const er in allerr) {
                       if (allerr.hasOwnProperty(er)) {
                           const element = allerr[er];
                           setcuerrors(prev=>[...prev,element.msg]);
                       }
                   }
               }else if(lgg.success===false){
                setcuerrors(prev=>[...prev,lgg.message]);
               }else{
                  dispatch({type:SET_TO_PAY_USER,user:lgg.user,topay:true});
                  history('/topay');
                  
               }
            }).catch(er=>console.log(er));
        
  
        } else {
            setcuerrors(prev=>[...prev,"Sorry,all fields are required"]);
        }

       
    };

    const handle_log_in = ()=>{
        checkloggein().then(res=>{
            console.log("location from db:",res);
            console.log("current location:",here_);
            is_loggedinfrom=res;
        });
    };

    useEffect(()=>{
        document.title="register";
        handle_log_in();
    },[]);

    useEffect(()=>{
        monitor_fade();
     });


    if(isloggedin && user.user_type==="admin"){
        return <Redirect to="/admindashbord"/>
    }else if(isloggedin && is_loggedinfrom===here_ && user.user_type==="normal"){
        return <Redirect to="/userdashboard"/>
    }else{
    
    return (
        <div className="mt-4">
            <Grid container>
<Grid item xs={2}></Grid>
<Grid item xs={8}>
             
<Paper className={_dstyle.root}>

         {cuerrors.length!==0 && cuerrors.map((err,index)=>{
          return <p key={index} className="alert alert-warning tofd">{err}</p>
                })}

              <div className={_dstyle._dopad}>
            <h5>REGISTER HERE</h5>
             <Grid container spacing={3}>
                <Grid item>
                <TextField label="full name" name ="fullname" onChange={handlename} required/>
                </Grid>
                <Grid item>
                <TextField label="email" name ="email" onChange={handlemail} required/>
                </Grid>
                <Grid item>
            <select className="form-control" name="level" onChange={handlelevel} value={_level}>
                <option value="">Choose Level</option>
                <option value="primary">PRIMARY</option>
                <option value="jhs">JHS</option>
                <option value="shs">SHS</option>
                <option value="teacher_promotion">TEACHER PROMOTION</option>
            </select>
            </Grid>
                <Grid item>
                <TextField  type="password" label="password" name ="password" onChange={handlepass} required/>
                </Grid>
                <Grid item>
                <TextField  type="password" label="repeat password" name ="password" onChange={handlepass1} required/>
                </Grid>
                <Grid item>
                <p>Your image <br/><input type="file" name ="file" onChange={handleimg} required/></p>
                </Grid>
                </Grid>
                <br/>
                <p><Button variant="contained" type="button" onClick={dosubmit}>SUBMIT</Button></p>
            </div>
</Paper>
            <br/>
            <br/>
            <p className="text-center">Already registerd? <br/> <span><Link to="/login"><Button variant="outlined">LOGIN</Button></Link></span></p>
            </Grid>
            <Grid item xs={2}></Grid>
            </Grid>
        </div>
    )
}
}
