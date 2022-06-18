import React,{useState,useContext,useEffect} from 'react';
import {useNavigate as useHistory,Navigate as Redirect,Link} from 'react-router-dom';
import userContext from '../../context/userContext';
import { SET_CURRENT_USER} from '../../store/actions';
import { do_login,doAdminExist } from './../../services/services';
import {Grid,TextField,Button,Paper,createTheme} from '@mui/material';
import {makeStyles} from '@mui/styles';

const theme = createTheme();

    const adhdoStyle=makeStyles(()=>({
        root:{
            backgroundColor:'#fdfdff',
        },
        adhdopad:{
            padding:theme.spacing(2)
        }
    }));

export default function AdminHome() {
    let history=useHistory();
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    //let [done_, setdone] = useState(false);
    let [state,dispatch] = useContext(userContext);
    let [containadmin, setcontainadmin] = useState(true);
    let [cuerrors, setcuerrors] = useState([]);
    let {/*user,isloggedin,*/forsuper}=state;
    let adhdstyle = adhdoStyle();
    
    
    const handlepass=(e)=>{
        e.preventDefault();
        setPassword(e.target.value);
    }

    const handlemail=(e)=>{
        e.preventDefault();
        setEmail(e.target.value);
    }
    
    const dosubmit=()=>{
    
        if (!(email==="" || password==="")) {
            let user={
                usertype:"admin",
                email:email,
                password:password
            }
            //console.log(user);
           do_login(user).then(lgg=>{
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
                dispatch({type:SET_CURRENT_USER,user:lgg.user,isloggedin:true});
                history('/admindashbord');
               }
            });
  
        } else {
            setcuerrors(prev=>[...prev,"Sorry,all fields are required"]);
        }
       
    };

    const isAdmin=()=>{
        doAdminExist().then(res=>{
            setcontainadmin(res.success);
        }).catch(err=>{
            console.log(err);
        });
    };

    useEffect(() => {
        document.title="admin home"
        isAdmin();
    }, [])

   if(!(containadmin)){
    return <Redirect to="/addsuper"/>
 }else{

    return (
        <div className='mt-5'>

<Grid container>
<Grid item xs={3}></Grid>

<Grid item xs={6}>

<Paper className={adhdstyle.root}>
             <div className={adhdstyle.adhdopad}>
            {forsuper && <h3>Congrats,you are now as super admin of this application.Pls login. </h3>}
            <h5>LOGIN HERE</h5>
            {cuerrors.length!==0 && cuerrors.map((err,index)=>{
                    return <p key={index} className="alert alert-warning">{err}</p>
                })}

<Grid container spacing={6}>
                <Grid item>
                <TextField  label="email" type="email" name ="email" onChange={handlemail} required/>
                </Grid>
                <Grid item>
                <TextField label="password" type="password"  name ="password" onChange={handlepass} required/>
                </Grid>
</Grid>
                <br/>
                <p><Button variant="contained" onClick={dosubmit}>SUBMIT</Button>    <small><Link to="/adminpasswordreset">forgot password</Link></small></p>

</div>
</Paper>

</Grid>
<Grid item xs={3}></Grid>          
</Grid>
        </div>
    )
            }
    
}
