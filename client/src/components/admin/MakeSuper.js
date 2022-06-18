import React,{useState,useContext,useEffect} from 'react';
import {useNavigate as useHistory,Navigate as Redirect} from 'react-router-dom';
import {do_register,doAdminExist} from '../../services/services';
import userContext from '../../context/userContext';
import { monitor_fade } from '../../services/custom';
import { SET_DONE_SUPER} from '../../store/actions';
import {Grid,TextField,Button,Paper,createTheme} from '@mui/material';
import {makeStyles} from '@mui/styles';
const theme = createTheme();

    const _msdoStyle=makeStyles(()=>({
        root:{
            backgroundColor:'#fdfdff',
        },
        _msdopad:{
            padding:theme.spacing(2)
        }
    }));

export default function MakeSuper() {
    let msdstyle = _msdoStyle();
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [fullname, setname] = useState('');
    let [password_co, setPassword1] = useState('');
    let [file, setfile] = useState('');
    let [cuerrors, setcuerrors] = useState([]);
    let history=useHistory();
    let [/*state,*/dispatch] = useContext(userContext);
    let [containadmin, setcontainadmin] = useState(false);
    //let{user}=state;
    
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
    }

   
    const dosubmit=(e)=>{
     e.preventDefault();
        if (!(email==="" || password==="" || fullname==="" ||password_co==="" || file==="")) {
            
            const formdata = new FormData();
            formdata.append("usertype","admin");
            formdata.append("fullname",fullname);
            formdata.append("admin_type","super");
            formdata.append("email",email);
            formdata.append("password",password);
            formdata.append("password_co",password_co);
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
                  dispatch({type:SET_DONE_SUPER,forsuper:true});
                  setcuerrors(prev=>[...prev,"Super admin successfully created.Login now."]);
                  history("/admin");              
               }
            }).catch(er=>console.log(er));
        
  
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
        document.title="add super admin"
        isAdmin();
    }, []);

    useEffect(()=>{
        monitor_fade();
     });


   if(containadmin){
    return <Redirect to="/admin"/>
 }else{
    return (
        <div className='mt-5'>
<Grid container>
<Grid item xs={2}></Grid>
<Grid item xs={8}>

<Paper className={msdstyle.root}>
            <div className={msdstyle._msdopad}>

                <h6>ADD SUPER ADMIN HERE</h6>
                {cuerrors.length!==0 && cuerrors.map((err,index)=>{
                    return <p key={index} className="alert alert-warning tofd">{err}</p>
                })}
             
             <Grid container spacing={6}>
                <Grid item>
                <TextField label="full name" name ="fullname" onChange={handlename} required/>
                </Grid>
                <Grid item>
               <TextField label="email" type="email" name ="email" onChange={handlemail} required/>
                </Grid>
                <Grid item>
                <TextField label="password" type="password" name ="password" onChange={handlepass} required/>
                </Grid>
                <Grid item>
                <TextField label="comfirm password" type="password" name ="password_co" onChange={handlepass1} required/>
                </Grid>
                <Grid item>
                <p>Your image <br/><input type="file" name ="file" onChange={handleimg} required/></p>
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
