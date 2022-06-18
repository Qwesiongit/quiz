import React,{useContext,useEffect,useState} from 'react';
import logo from '../_asset/qlo.png';
import avt from '../_asset/img.jpg';
import _off from '../_asset/ioff.jpg';
import userContext from '../context/userContext';
import { SET_CURRENT_USER } from '../store/actions';
import {useNavigate as useHistory,Navigate as Redirect,Link} from 'react-router-dom';
import { do_logout/*,checkloggein*/ } from './../services/services';
import {Card,Grid,CardContent,Typography,Button} from '@mui/material';
//import {_dotip} from '../services/custom';


export default function AppNavbar() {
  let [state,dispatch] = useContext(userContext);
  let {user,isloggedin}=state;
  let history=useHistory();


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
    
    <div className='menu-bar'>
     <Grid container>
     <Grid item xs={4}>
     <ul>
       <li><Link to="/"><img id="_logo" src={logo}  alt="pic"/></Link></li>
     </ul>
     </Grid>
     <Grid item xs={1}></Grid>
     <Grid item xs={7}>
       <div id="_menus">
       <ul>
       {
          !isloggedin &&
          <>
        <li className="f_ul"><Link to="/"><i className='fa fa-book'></i> HOME</Link></li>
        <li className="f_ul"><Link to="/"><i className='fa fa-book'></i> ABOUT</Link></li>
        <li className="f_ul"><Link to="/"><i className='fa fa-phone'></i> CONTACT</Link></li>
        <li className="f_ul"><Link to="/register"><i className='fa fa-car'></i> REGISTER</Link></li>
        <li className="f_ul"><Link to="/login"><i className='fa fa-bus'></i> LOGIN</Link></li>
       
        <li id="men_1"><Link to="#"><i className='fa fa-bus'></i> MENU</Link>
        <div id="m1_sub">
        <ul>
        <li><Link to="/"><i className='fa fa-book'></i> ABOUT</Link></li>
        <li><Link to="/"><i className='fa fa-phone'></i> CONTACT</Link></li>
        <li><Link to="/register"><i className='fa fa-car'></i> REGISTER</Link></li>
        <li><Link to="/login"><i className='fa fa-bus'></i> LOGIN</Link></li>
        </ul>
        </div>
        </li>
        </>
        }
        {
         isloggedin &&
         <>
       <li id='_navmenu'><Link to="#"><i className='fa fa-pen'></i> MENU</Link>
       <div className='sub-menu'>
         <ul>
         {
        user.user_type==="admin"?
        <>
        <ul>
        { user.admin_type==="super" && <li><Link className="_isdL" to="/addadmin">ADD ADMIN</Link></li>}
        <li><Link className="_isdL" to="/addquestion">ADD QUESTION</Link></li>
        <li><Link className="_isdL" to="/addcourse">ADD COURSE</Link></li>
        <li><Link className="_isdL" to="/adminupdate">EDIT BIO</Link></li>
        <li><Link className="_isdL" to="/alterpassword">CHANGE PASSWORD</Link></li>
        <li><Link className="_isdL" to="/doactivations">ACTIVATIONS</Link></li>
        <li><button onClick={handlogout} className='btn btn-danger'> LOGOUT</button></li>
      </ul>
        </>
        :
        <>
        <ul>
      <li><Link className="_isdL" to="/quizhome">TAKE QUIZ</Link></li>
      <li><Link className="_isdL" to="/quizhistory">QUIZ HISTORY</Link></li>
      <li><Link className="_isdL" to="/updatebio">EDIT BIO</Link></li>
      <li><Link className="_isdL" to="/changepassword">CHANGE PASSWORD</Link></li>
      <li><Link className="_isdL" to="/">PAYMENTS</Link></li>
      <li><button onClick={handlogout} className='btn btn-danger'> LOGOUT</button></li>
    </ul>
        </>
    }
         </ul>
        </div>
        </li>
        <li className="_twobutt"><button onClick={doback} className='btn btn-secondary'><i className='fa fa-book'></i> BACK</button></li>
        <li id="lgt" className="_twobutt"><button onClick={handlogout} className='btn btn-danger'> LOGOUT</button></li>
        </>
      }
       </ul>
       </div>
     </Grid>
     </Grid>
    </div>
    
  )
}
