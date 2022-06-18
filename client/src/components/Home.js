import React,{useContext,useEffect} from 'react';
import userContext from '../context/userContext';
import {Link,Navigate as Redirect} from 'react-router-dom';


export default function Home() {
let [state /*,dispatch*/] = useContext(userContext);
    let {user,isloggedin}=state;


    useEffect(()=>{
        document.title="home";
    },[]);

   //console.log(user);
 if(isloggedin && user.user_type==="admin"){
        return <Redirect to="/admindashbord"/>
    }else if(isloggedin && user.user_type==="normal"){
        return <Redirect to="/userdashboard"/>
    }else{
    return (
        <div>
            <h1>Welcome Home</h1>
            <span><Link to="/login"><button>LOGIN</button></Link></span>  <span><Link to="/register"><button>REGISTER</button></Link></span>
        </div>
    )
    }
}
