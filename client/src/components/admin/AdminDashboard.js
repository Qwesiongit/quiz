import React,{useContext,useEffect} from 'react';
import {useNavigate as useHistory,Navigate as Redirect} from 'react-router-dom';
//import { do_logout } from './../../services/services';
import userContext from '../../context/userContext';
import AppSidebar from '../AppSidebar';
//import {makeStyles,createTheme} from '@mui/material';
//const theme = createTheme();
//import QuizHistory from './../user/QuizHistory';

/*
    const _addoStyle=makeStyles(()=>({
        root:{
            backgroundColor:'#fdfdff',
        },
        _addopad:{
            padding:theme.spacing.(2)
        }
    }));
*/
export default function AdminDashboard() {
    //let addstyle = _addoStyle();
    let history=useHistory();
    let [state/*,dispatch*/] = useContext(userContext);
    let {user,isloggedin}=state;
    //let baseuri ="http://localhost:8595/";

  
 
    useEffect(()=>{
        document.title="admin Dashboard";
    },[]);


    if(!(isloggedin) && !(user.usertype==="admin")){
        return <Redirect to="/"/>
    }else{
    return (
        <div>
            <div id ="_sbar">
            <AppSidebar/>
            </div>
           
           <div id='_nxdsh'>
           <div id="_asmd">
        <div className="one">
          <h5 className='_dhd'>RANDOM USERS</h5>
           <span id='_us'>
             <table className='table table-striped'>
             <thead>
               <tr>
               <th>name</th>
               <th>user Type</th>
               <th>Action</th>
               </tr>
             </thead>
             <tbody>
              
               <tr>
                  <td>jam</td>
                 <td>normal</td>
                 <td><button className='_Sbutton'>More</button></td>
                </tr>
                  
             </tbody>
             </table>
           </span>
        </div>


        <div className="one">
        <h5 className='_dhd'> RANDOM PENDING USERS</h5>
        <table className='table table-striped'>
             <thead>
               <tr>
               <th>name</th>
               <th>user Type</th>
               <th>Action</th>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <td>kofi</td>
                 <td>Admin</td>
                 <td><button className='_Sbutton'>Activate</button></td>
               </tr>
               <tr>
                 <td>Yaba</td>
                 <td>Normal</td>
                 <td><button className='_Sbutton'>Activate</button></td>
               </tr>
             </tbody>
             </table>
        </div>

        
        <div className="one">
        <h5 className='_dhd'> RANDOM EXPIRED USERS</h5>
        <table className='table table-striped'>
             <thead>
               <tr>
               <th>name</th>
               <th>user Type</th>
               <th>Action</th>
               </tr>
             </thead>
             <tbody>
               <tr>
               <td>Ama</td>
              <td>Admin</td>
              <td><button className='_Sbutton'>More</button></td>
               </tr>
               <tr>
                 <td>Yaba</td>
                 <td>Normal</td>
                 <td><button className='_Sbutton'>More</button></td>
               </tr>
             </tbody>
             </table>
        </div>

        </div>

        <div id="_asmd1">
        <div className="one">
          <h1>one</h1>
        </div>
        <div className="one">
          <h1>one</h1>
        </div>
        <div className="one">
          <h1>one</h1>
        </div>
        </div>

           </div>
        </div>
    )
    }
}
