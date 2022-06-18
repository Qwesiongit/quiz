import React,{useContext,useEffect,useState,useRef} from 'react';
import {useNavigate as useHistory,Navigate as Redirect} from 'react-router-dom';
import {do_updatebio,checkloggein } from './../../services/services';
import userContext from '../../context/userContext';
import { SET_CURRENT_USER} from '../../store/actions';
import {Grid,TextField,Button,Paper,createTheme} from '@mui/material';
import { monitor_fade } from '../../services/custom';
import {makeStyles} from '@mui/styles';

const theme = createTheme();
let dtimer = 40;

    const _updoStyle=makeStyles(()=>({
        root:{
            backgroundColor:'#fdfdff',
        },
        _updopad:{
            padding:theme.spacing(2)
        }
    }));

export default function UpdateBio() {
    let _updstyle = _updoStyle();
    let history=useHistory();
    let [state,dispatch] = useContext(userContext);
    let {user,isloggedin}=state;
    //let baseuri ="http://localhost:8595/";
    let [mail, setmail] = useState(user.email);
    let [fullname, setname] = useState(user.fullname);
    let [file, setfile] = useState('');
    let [cuerrors, setcuerrors] = useState([]);
    let [waserr,setwaserr] = useState(false);
    let u_ref = useRef();

    const handlemail=(e)=>{
        e.preventDefault();
        setmail(e.target.value);
    };

    const flush_user = ()=>{
        dispatch({type:SET_CURRENT_USER,user:{},isloggedin:false});
        history("/");
    };


    const handlename=(e)=>{
        e.preventDefault();
        setname(e.target.value);
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

    const handleimg=(e)=>{
        e.preventDefault();
        let imgs = e.target.files[0];
        setfile(imgs);
    };

   
    const dosubmit=(e)=>{
     e.preventDefault();

        if (!(mail==="" || fullname==="")) {
             
            const formdata = new FormData();
            if(file!==""){
                formdata.append("usertype","normal");
                formdata.append("fullname",fullname);
                formdata.append("email",mail);
                formdata.append("_img",file);
            }else{
                formdata.append("usertype","normal");
                formdata.append("fullname",fullname);
                formdata.append("email",mail);
            }

            do_updatebio(formdata).then(lgg=>{
               if(lgg.errors){
                   let allerr=lgg.errors;
                   for (const er in allerr) {
                       if (allerr.hasOwnProperty(er)) {
                           const element = allerr[er].message;
                           const tos = element.substring(5);
                           setcuerrors(prev=>[...prev,tos]);
                           setwaserr(true);
                       }
                   }
               }else if(lgg.success===false){
                setcuerrors(prev=>[...prev,lgg.message]);
                setwaserr(true);
               }else{
                dispatch({type:SET_CURRENT_USER,user:lgg.user,isloggedin:true});
                setcuerrors(prev=>[...prev,lgg.message]); 
                setwaserr(false);             
               }
            }).catch(er=>console.log(er));
        
  
        } else {
            setcuerrors(prev=>[...prev,"Sorry,all fields are required"]);
            setwaserr(true);
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
    }

    useEffect(()=>{
        document.title="update bio";
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
    }
    else{
    return (
        <div className='mt-5'>
<Grid container spacing={3}>
<Grid item xs={2}></Grid>

<Grid item xs={8}>
<Paper className={_updstyle.root}>
              <div className={_updstyle._updopad}>
            <h2>UPDATE BIO</h2>

            {
            waserr===false?
            cuerrors.length!==0 && cuerrors.map((err,index)=>{
                    return <p key={index} className="alert alert-success tofd">{err}</p>
                 }):
            cuerrors.length!==0 && cuerrors.map((err,index)=>{
                    return <p key={index} className="alert alert-warning tofd">{err}</p>
                 })

                }

                <Grid container spacing={2}>
                <Grid item>
                <TextField label="full name" name ="fullname" onChange={handlename} value={fullname} required/>
                </Grid>
                <Grid item>
                <TextField label="email" type="email" name ="email" onChange={handlemail} value={mail} required/>
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
