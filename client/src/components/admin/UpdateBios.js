import React,{useState,useContext,useEffect} from 'react';
import {/*useNavigate as useHistory,*/Navigate as Redirect} from 'react-router-dom';
import {do_updatebio } from './../../services/services';
import userContext from '../../context/userContext';
import { monitor_fade } from '../../services/custom';
import { SET_CURRENT_USER} from '../../store/actions';
import {Grid,TextField,Button,Paper,createTheme} from '@mui/material';
import {makeStyles} from '@mui/styles';
const theme = createTheme();


    const _updoStyle=makeStyles(()=>({
        root:{
            backgroundColor:'#fdfdff',
        },
        _updopad:{
            padding:theme.spacing(2)
        }
    }));

export default function UpdateBios() {
    let updstyle = _updoStyle();
    //let history=useHistory();
    let [state,dispatch] = useContext(userContext);
    let {user,isloggedin}=state;
    //let baseuri ="http://localhost:8595/";
    let [email, setEmail] = useState(user.email);
    let [fullname, setname] = useState(user.fullname);
    let [admintype, settype] = useState(user.admin_type);
    let [file, setfile] = useState('');
    let [iserr, setiserr] = useState(false);
    let [cuerrors, setcuerrors] = useState([]);


    const handletype=(e)=>{
        e.preventDefault();
        settype(e.target.value);
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
        if (!(email==="" || admintype==="" || fullname==="")) {
            
            const formdata = new FormData();
            if(file!==""){
                formdata.append("usertype","admin");
                formdata.append("fullname",fullname);
                formdata.append("admin_type",admintype);
                formdata.append("email",email);
                formdata.append("_img",file);
            }else{
                formdata.append("usertype","admin");
                formdata.append("fullname",fullname);
                formdata.append("admin_type",admintype);
                formdata.append("email",email);
            }
            

  
            do_updatebio(formdata).then(lgg=>{
               if(lgg.errors){
                   let allerr=lgg.errors;
                   for (const er in allerr) {
                       if (allerr.hasOwnProperty(er)) {
                           const element = allerr[er];
                           setcuerrors(prev=>[...prev,element.msg]);
                           setiserr(true);
                       }
                   }
               }else if(lgg.success===false){
                setcuerrors(prev=>[...prev,lgg.message]);
                setiserr(true);
               }else{
                dispatch({type:SET_CURRENT_USER,user:lgg.user,isloggedin:true});
                setcuerrors(prev=>[...prev,lgg.message]);
                setiserr(false);             
               }
            }).catch(er=>console.log(er));
        
  
        } else {
            setcuerrors(prev=>[...prev,"Sorry,all fields are required"]);
            setiserr(true);
        }

       
    };

    useEffect(()=>{
        document.title="update bio";
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
<Grid item xs={2}></Grid>

<Grid item xs={8}>

<Paper className={updstyle.root}>
              <div className={updstyle._updopad}>
            <h3>UPDATE BIOS</h3>
            {
            iserr===true?
            cuerrors.length!==0 && cuerrors.map((err,index)=>{
                    return <p key={index} className="alert alert-warning tofd">{err}</p>
                }):
            cuerrors.length!==0 && cuerrors.map((err,index)=>{
                    return <p key={index} className="alert alert-success tofd">{err}</p>
                })
                }

<Grid container spacing={6}>
                <Grid item>
                <TextField label="full name" name ="fullname" onChange={handlename} value={fullname} required/>
                </Grid>
                <Grid item>
                <TextField label="email" type="email" name ="email" onChange={handlemail} value={email} required/>
                </Grid>
                <Grid item>
                <p><input type="hidden" name ="admin_type" onChange={handletype} value={admintype} required/></p>
                </Grid>
                <Grid item>
                <p>Your image <br/><input type="file" name ="file" onChange={handleimg}/></p>
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
