import React,{/*useState,*/ useContext} from 'react';
import userContext from './../context/userContext';
import { SET_TO_PAY_USER } from '../store/actions';
import {Navigate as Redirect,useNavigate as useHistory} from 'react-router-dom';
//import {checkloggein} from '../services/services';

export default function ToPay() {
    let history=useHistory();
    let [state,dispatch] = useContext(userContext);
    let{user,topay}=state;

    const pay_later = (e)=>{
        e.preventDefault();
        dispatch({type:SET_TO_PAY_USER,user:{},topay:false});
        history('/');

    };

    const handlamount =(e)=>{
        e.preventDefault();

    };

    const pay_now = (e)=>{
        e.preventDefault();        
    };

    if(!(topay)){
        return <Redirect to="/"/>
    }else{
    
    return (
        <div>
            <h4>Welcome {user.fullname},your account has been created.Please pay to get activated now.</h4>
            <p>Amount <br/><input type="text" name ="amount" onChange={handlamount} required/></p>
            <p><button onClick={pay_now}>PAY NOW</button>  <button type="button" onClick={pay_later}>PAY LATER</button></p>
        </div>
    )
    }
}
