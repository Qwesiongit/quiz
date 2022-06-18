import React,{useContext/*,useState,useEffect,useRef*/} from 'react';
import { AppBar/*,Card,Grid, CardContent*/,Typography,Button} from '@mui/material';
import {useNavigate as useHistory/*,Navigate as Redirect,Link*/} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ToolBar from '@mui/material/Toolbar';
import IconButton  from '@mui/material/IconButton';
import userContext from './../context/userContext';
import { SET_CURRENT_USER } from './../store/actions';
import { do_logout/*,checkloggein*/ } from './../services/services';
//import $ from 'jquery';
//import {makeStyles,useTheme} from '@mui/styles';
/*
const mystyles = makeStyles(()=>({  
      root:{
          color:'red'
      }
  }));
*/

export default function Header(props) {
    let [state,dispatch] = useContext(userContext);
    let {user,isloggedin}=state;
    let history=useHistory();
    let baseuri ="http://localhost:8595/";
     
    //const classes = mystyles();

    const doback=(e)=>{
         e.preventDefault();
         history(-1);
    };

    const handlogout = ()=>{
        let utype=user.user_type
                do_logout(utype).then(res=>{
                    dispatch({type:SET_CURRENT_USER,user:{},isloggedin:false});
                    utype==="admin"?history("/admin"):history("/");
                   });
        
      };

      

    return (
        <div style={{color:"red"}}>
             <AppBar position="fixed">      
             <ToolBar>        
            <IconButton  color="inherit" aria-label="Menu"> 
            <MenuIcon />
            </IconButton>
            <Typography variant="subtitle1" color="inherit">{props.title}</Typography> 
            {isloggedin && 
            <div id="mv_left"> 
            <span className="mr-2">{user.user_type==="normal"?<img className="rounded-circle" src={`${baseuri}/images/normal/${user.image}`} height="32px" width="32px" alt="pic here"/>:<img className="rounded-circle" src={`${baseuri}/images/admin/${user.image}`} height="32px" width="32" alt="pic here"/>} </span>
            <span>  <Button variant="outlined" color="secondary"   onClick={doback}>Back</Button>  <Button variant="outlined" color="warning" onClick={handlogout}>Logout</Button></span>
            </div>
            }
            
            </ToolBar>
            </AppBar> 
            <br/>
        </div>
    )
}
