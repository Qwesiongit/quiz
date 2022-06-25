import React,{useState,useContext} from 'react';
import {Link} from 'react-router-dom';
import userContext from '../context/userContext';
//import {FontAwsomeIcon} from '@fontawsome/react-fontawsome';

export default function AppSidebar() {
    const [current_link,change_link]=useState(1);
    let [state,dispatch] = useContext(userContext);
    let {user,isloggedin}=state;
    let baseuri ="http://localhost:8595/";

  return (
     
    <div id="_isb">
    <>

    <div>
      <h3><span className='mb-2'>DASHBORAD</span>
     <br/>( <span><small><img className='rounded-circle' src={ user.user_type==="normal"?`${baseuri}images/normal/${user.image}`:`${baseuri}images/admin/${user.image}` } height="30px" width="30px" alt="pic here" /></small></span>
     <span><small id="sm_"> {user.fullname}</small></span> )
      </h3>
      
    </div>
    
    
    <div className='_links'>
    {
        user.user_type==="admin"?
        
        <>
        <ul>
        { user.admin_type=="super" && <li><Link className="_isdL" to="/addadmin">ADD ADMIN</Link></li>}
        <li><Link className="_isdL" to="/addquestion">ADD QUESTION</Link></li>
        <li><Link className="_isdL" to="/addcourse">ADD COURSE</Link></li>
        <li><Link className="_isdL" to="/adminupdate">EDIT BIO</Link></li>
        <li><Link className="_isdL" to="/alterpassword">CHANGE PASSWORD</Link></li>
        { user.admin_type=="super" &&<li><Link className="_isdL" to="/doactivations">ACTIVATIONS</Link></li>}
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
    </ul>
        </>
    }
    </div>

</>

   </div>

  )
}
