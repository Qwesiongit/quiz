import React,{useState,useEffect,useContext} from 'react';
import {/*useNavigate as useHistory,*/Navigate as Redirect} from 'react-router-dom';
import {do_register } from './../../services/services';
import userContext from '../../context/userContext';
import {Grid,TextField,Button,Paper,createTheme} from '@mui/material';
import { monitor_fade } from '../../services/custom';
import {makeStyles} from '@mui/styles';

const theme = createTheme();

    const _admdoStyle=makeStyles(()=>({
        root:{
            backgroundColor:'#fdfdff',
        },
        _admdopad:{
            padding:theme.spacing(2)
        }
    }));

export default function AddAdmin() {
    //let history=useHistory();
    let [state/*,dispatch*/] = useContext(userContext);
    let {user,isloggedin}=state;
    //let baseuri ="http://localhost:8595/";
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [fullname, setname] = useState('');
    let [password_co, setPassword1] = useState('');
    let [file, setfile] = useState('');
    let [cuerrors, setcuerrors] = useState([]);
    let [iserr, setIserr] = useState(false);
    let addstyle = _admdoStyle();


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
            formdata.append("admin_type","normal");
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
                           setIserr(true);
                       }
                   }
               }else if(lgg.success===false){
                setcuerrors(prev=>[...prev,lgg.message]);
                setIserr(true);
               }else{
                setcuerrors(prev=>[...prev,lgg.message]);
                setIserr(false);              
               }
            }).catch(er=>console.log(er));
        
  
        } else {
            setcuerrors(prev=>[...prev,"Sorry,all fields are required"]);
            setIserr(true);
        }

       
    };

    useEffect(()=>{
        document.title="add admin";
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

<Paper className={addstyle.root}>
            <div className={addstyle._admdopad}>
                <h5>ADD ADMIN HERE</h5>

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
                <TextField label="full name" type="text" name ="fullname" onChange={handlename} required/>
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
