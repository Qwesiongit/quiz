import React,{useContext,useEffect,useState} from 'react';
import {useNavigate as useHistory,Navigate as Redirect} from 'react-router-dom';
import { getUsers,all_payments } from './../../services/services';
import {trim_rand} from './../../services/custom';
import userContext from '../../context/userContext';
import AppSidebar from '../AppSidebar';
//import {makeStyles,createTheme} from '@mui/material';
//const theme = createTheme();

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
    let [two_active_users,set_two_active] = useState([]);
    let [two_pending_users,set_two_pending] = useState([]);
    let [two_rejected_users,set_two_rejected] = useState([]);
    let [two_users,set_two_users] = useState([]);
    let [two_expired_users,set_two_expired] = useState([]);
    let [two_recent_pay,set_recent_pay] = useState([]);
    let [whole_pay,set_whole_pay] = useState([]);
    let [whole_users,set_whole_users] = useState([]);
    //let baseuri ="http://localhost:8595/";



    const fetch_users = ()=>{
      var all_users = [];
      getUsers({type:"normal"}).then(res=>{
        if(res.success===true){
          all_users = res.users;
          set_whole_users(all_users);
        }
      });
    }

   const fetch_pays = ()=>{
    let al_p = [];
    all_payments().then(res=>{
      if(res.success===true){
        al_p = res.payment;
        set_whole_pay(al_p);
      }
    });
   }

    const two_penders = ()=>{
      let all_pend=[];
      if(whole_users.length!==0){
      whole_users.forEach(element => {
        if(element.active==="no"){
          all_pend.push(element)
        }
       });
       let df_ = trim_rand(all_pend);
        set_two_pending(df_);
      }
    }

    const two_pays = ()=>{
    if(whole_pay.length!==0){
      let ls = whole_pay.length-1;
      let pre_ls = ls-1;
      let p_s =[whole_pay[ls],whole_pay[pre_ls]];
      set_recent_pay(p_s);
      }


    }

    const two_actives = ()=>{
      let all_actv = [];
      if(whole_users.length!==0){
      whole_users.forEach(element => {
        if(element.active==="yes"){
          all_actv.push(element)
        }
       });
       let _df = trim_rand(all_actv);
       set_two_active(_df);
      }
    }

    const two_rej = ()=>{
      let all_rej = [];
      if(whole_users.length!==0){
      whole_users.forEach(element => {
        if(element.active!=="yes" && element.active!=="no" ){
          all_rej.push(element)
        }
       });
       let _df = trim_rand(all_rej);
       set_two_rejected(_df);
      }
    }


    const two_exp = ()=>{
    let expires=[];
    if(whole_pay.length!==0){
    whole_pay.forEach(el=>{
      if(el.expired==="yes"){
        expires.push(el);
      }
      });
    let df = trim_rand(expires);
    set_two_expired(df);
  }
    }


    const _two_users= ()=>{
     if(whole_users.length!==0){
     let d_f= trim_rand(whole_users);
     set_two_users(d_f);
     }
    }


    
    const two_site_users = ()=>{
      let all_pays =[];
      let expires =[];
      let all_users=[];
      let all_actv = [];
      let all_pend=[];
      let all_rej=[];

      all_payments().then(res=>{
        if(res.success===true){
          all_pays = res.payment;
          all_pays.forEach(el=>{
          if(el.expired==="yes"){
            expires.push(el);
          }
          });
      let df = trim_rand(expires);
      set_two_expired(df);
      

      if(all_pays.length!==0){
      let ls = all_pays.length-1;
      let pre_ls = ls-1;
      let p_s =[all_pays[ls],all_pays[pre_ls]];
      set_recent_pay(p_s);
      }

        }else{
          console.log(res.message);
        }
      });

       

      getUsers({type:"normal"}).then(res=>{
        if(res.success===true){
          all_users = res.users;

          let d_f= trim_rand(all_users);
          set_two_users(d_f);

       all_users.forEach(element => {
        if(element.active==="yes"){
          all_actv.push(element)
        }
        else if(element.active==="no"){
          all_pend.push(element)
        }else{
          all_rej.push(element);
        }
        
       });

       let df_ = trim_rand(all_pend);
        set_two_pending(df_);

        let _df = trim_rand(all_actv);
        set_two_active(_df);

        let r_j = trim_rand(all_rej);
        set_two_rejected(r_j);

        }else{
          console.log("User?",res.message);
        }
      });

    }
 
    

    useEffect(()=>{
        document.title="admin Dashboard";
        fetch_users();
        fetch_pays();
        two_site_users();
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
               <th>Level</th>
               <th>Action</th>
               </tr>
             </thead>

             <tbody>
              
                {
    
             two_users.length!==0 && two_users.map((s,id)=>(
                        <tr key={id}>
                        <td>{s.fullname}</td>
                        <td>{s.level}</td>
                        <td><button onClick={_two_users} className='_Sbutton'>Next</button></td>
                      </tr>
                     ))
                     

                 }
                 {
                    two_users.length===0 &&
                    <tr className='mt-4'><td>NO PAYMENT HISTORY</td></tr>
                    }
                  
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
               <th>Level</th>
               <th>Action</th>
               </tr>
             </thead>
             <tbody>
             {
    
    two_pending_users.length!==0 && two_pending_users.map((s,id)=>(
               <tr key={id}>
               <td>{s.fullname}</td>
               <td>{s.level}</td>
               <td><button onClick={two_penders} className='_Sbutton'>Next</button></td>
             </tr>
            ))
            

        }
        {
           two_pending_users.length===0 &&
           <tr className='mt-4'><td>NO PENDING USER</td></tr>
           }
         
             </tbody>
             </table>
        </div>

        
        <div className="one">
        <h5 className='_dhd'> RANDOM EXPIRED USERS</h5>
        <table className='table table-striped'>
             <thead>
               <tr>
               <th>name</th>
               <th>Level</th>
               <th>Action</th>
               </tr>
             </thead>
             <tbody>
              {
                
                two_expired_users.length!==0 && two_expired_users.map((s,id)=>(
                  <tr key={id}>
                  <td>{s.fullname}</td>
                  <td>{s.level}</td>
                  <td><button onClick={two_exp} className='_Sbutton'>Next</button></td>
                </tr>
               ))
              }

              {
                two_expired_users.length===0 &&
                <tr className='mt-4'><td>NO EXPIRED USER</td></tr>
              }
               
             </tbody>
             </table>
        </div>

        </div>

        <div id="_asmd1">
        <div className="one">
          <h5>RANDOM ACTIVE USERS</h5>
          <table className='table table-striped'>
             <thead>
               <tr>
               <th>name</th>
               <th>Level</th>
               <th>Action</th>
               </tr>
             </thead>
             <tbody>
              {
                
                two_active_users.length!==0 && two_active_users.map((s,id)=>(
                  <tr key={id}>
                  <td>{s.fullname}</td>
                  <td>{s.level}</td>
                  <td><button onClick={two_actives} className='_Sbutton'>Next</button></td>
                </tr>
               ))
              }

              {
                two_active_users.length===0 &&
                <tr className='mt-4'><td>NO EXPIRED USER</td></tr>
              }
               
             </tbody>
             </table>
        </div>
        <div className="one">
          <h5>LAST TWO PAYMENTS</h5>
          <table className='table table-striped'>
             <thead>
               <tr>
               <th>Subscription</th>
               <th>Anount</th>
               <th>Action</th>
               </tr>
             </thead>
             <tbody>
              {
                
                two_recent_pay.length!==0 && two_recent_pay.map((s,id)=>(
                  <tr key={id}>
                  <td>{s.subscription}</td>
                  <td>{s.payment_records[s.payment_records.length-1].amount_paid}</td>
                  <td><button onClick={two_pays } className='_Sbutton'>Next</button></td>
                </tr>
               ))
              }

              {
                two_recent_pay.length===0 &&
                <tr className='mt-4'><td>NO PAYMENT RECORDS</td></tr>
              }
               
             </tbody>
             </table>
        </div>
        <div className="one">
          <h5>SAMPLE REJECTED USERS</h5>
          <table className='table table-striped'>
             <thead>
               <tr>
               <th>Name</th>
               <th>Level</th>
               <th>Action</th>
               </tr>
             </thead>
             <tbody>
              {
                
                two_rejected_users.length!==0 && two_rejected_users.map((s,id)=>(
                  <tr key={id}>
                  <td>{s.fullname}</td>
                  <td>{s.level}</td>
                  <td><button onClick={two_rej} className='_Sbutton'>Next</button></td>
                </tr>
               ))
              }

              {
                two_recent_pay.length===0 &&
                <tr className='mt-4'><td>NO PAYMENT RECORDS</td></tr>
              }
               
             </tbody>
             </table>
        </div>
        </div>

           </div>
        </div>
    )
    }
}
