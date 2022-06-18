import React,{useContext,useEffect,useRef,useState} from 'react';
import {useNavigate as useHistory,Navigate as Redirect} from 'react-router-dom';
import { checkloggein,getCourses_,showScore } from './../../services/services';
import userContext from '../../context/userContext';
import { SET_CURRENT_USER } from '../../store/actions';
//import {makeStyles,useTheme} from '@mui/styles';
import { monitor_fade,rand_course } from '../../services/custom';
import AppSidebar from './../AppSidebar';
let q_t = ["general","past question"];

    let dtimer = 40;

/*
    const _usdoStyle=makeStyles(()=>({
        root:{
            backgroundColor:'#fdfdff',
        },
        _usdopad:{
            padding:useTheme().spacing(2)
        }
    }));
*/
export default function UserDashboard() {
    //let _usdstyle = _usdoStyle();
    let history=useHistory();
    let [state,dispatch] = useContext(userContext);
    let {user,isloggedin}=state;
    let u_ref = useRef();
    let [two_pqs,setpqs]=useState([]);
    let [two_gqs,setgqs]=useState([]);
    let [twohis, set_his] = useState([]);
    let [is_his, set_is_his] = useState(false);
    let [twopay, set_pay] = useState([]);
    let [is_pay, set_is_pay] = useState(false);
    

console.log("Two quiz history",twohis);


const _do_randsubject = (_type)=>{
  let a_type=null;
  let level_course=[];
  _type==="past question"?a_type="past_question":a_type="general";
   getCourses_({qt_ype:a_type}).then(all=>{
    let arr = all.courses;
    arr.forEach(element => {
        if(element.level===user.level){
            level_course.push(element);
        }
        if (element.level==="bece" && user.level==="jhs" ) {
            level_course.push(element);
        } 

        if (element.level==="wassce" && user.level==="shs" ) {
            level_course.push(element);
        } 
    });
    let ran1=null;
    let ran2=null;
    ran1 = Math.floor(Math.random()*level_course.length);
    ran1===level_course.length?ran2=ran1-1:ran2=ran1+1;
    let sbj1 = level_course[ran1];
    let sbj2 = level_course[ran2];
    console.log(_type,level_course[ran1],level_course[ran2]);
    if(_type==="general"){
        if(sbj1!==undefined && sbj2!==undefined){
            setgqs([sbj1,sbj2])
        }
        if(sbj1===undefined && sbj2!==undefined){
            setgqs([sbj2])
        }
        if(sbj1!==undefined && sbj2===undefined){
            setgqs([sbj1])
        }
    }

    if(_type==="past question"){
        if(sbj1!==undefined && sbj2!==undefined){
            setpqs([sbj1,sbj2])
        }
        if(sbj1===undefined && sbj2!==undefined){
            setpqs([sbj2])
        }
        if(sbj1!==undefined && sbj2===undefined){
            setpqs([sbj1])
        }
    }


   });

}


const _dorandpayment = ()=>{
    let ran1=null;
    let ran2=null;
    let _his = [];
    
}

const _dorandhistory = ()=>{
    let ran1=null;
    let ran2=null;
    showScore({user:user._id}).then(res=>{
        if(!(res.success)){
            console.log(res.message);
            set_is_his(false);
            set_his([]);
        }else{
           set_is_his(true);
           let hs = res.scores.quiz_history;
           console.log(hs);
           ran1 = Math.floor(Math.random()*hs.length);
           ran1===hs.length?ran2=ran1-1:ran2=ran1+1;
           let h1_ = hs[ran1];
           let h2_ = hs[ran2];
           if(h1_!==undefined && h2_!==undefined){
            set_his([h1_,h2_])
           }
           if(h1_===undefined && h2_!==undefined){
            set_his([h2_])
           }
           if(h1_!==undefined && h2_===undefined){
            set_his([h1_])
           }
           
        }
    })

}

    const flush_user = ()=>{
        dispatch({type:SET_CURRENT_USER,user:{},isloggedin:false});
        history("/");
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
    };
    

    useEffect(()=>{
       document.title="user Dashboard";
       handle_log_in();
       userTimed();
       _dorandhistory();
       _do_randsubject("general");
       _do_randsubject("past question");
       _dorandhistory();
       return (()=>{
           clearInterval(u_ref.current);
       })
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
        <div>
             <div id ="_sbar">
    <AppSidebar/>
    </div>
    
    <div id="_usmd">
        <div className="_one">
          <h5 className='_dhd'>SAMPLE HISTORY</h5>
           <span id='_us'>
           <table className='table table-striped'>
             <thead>
               <tr>
               <th>Quiz Type</th>
               <th>Course</th>
               <th>Action</th>
               </tr>
             </thead>
             <tbody>
           
                 {
                    is_his!==false?
                     twohis!==undefined && twohis.map(s=>(
                        <tr key={s._id}>
                        <td>{s.quiz_type}</td>
                        <td>{s.course}</td>
                        <td><button className='_Sbutton' onClick={()=>_dorandhistory()}>Next</button></td>
                      </tr>
                     )):
                     <tr className='mt-4'><td>NO QUIZ HISTORY</td></tr>
                 }
              
             </tbody>
             </table>
           </span>
        </div>


        <div className="_one">
        <h5 className='_dhd'>GENERAL QUIZ SUBJECTS</h5>
        <table className='table table-striped'>
             <thead>
               <tr>
               <th>Subject</th>
               <th>Level</th>
               <th>Action</th>
               </tr>
             </thead>
             <tbody>
                 {
                     two_gqs!==undefined && two_gqs.map(s=>(
                        <tr key={s._id}>
                        <td>{s.course}</td>
                        <td>{s.level}</td>
                        <td><button className='_Sbutton' onClick={()=>_do_randsubject("general")}>Next</button></td>
                      </tr>
                     ))
                   
                 }
              
             </tbody>
             </table>
        </div>
        </div>

        <div id="_usmd1">
        <div className="_one">
          <h5 className='_dhd'>PAYMENT HISTORY</h5>
         
        </div>
        <div className="_one">
          <h5 className='_dhd'>PAST QUESTION SUBJECTS</h5>

          <table className='table table-striped'>
             <thead>
               <tr>
               <th>Subject</th>
               <th>Level</th>
               <th>Year</th>
               <th>Action</th>
               </tr>
             </thead>
             <tbody>
                 {
                     two_pqs!==undefined && two_pqs.map(s=>(
                        <tr key={s._id}>
                        <td>{s.course}</td>
                        <td>{s.level}({s.exam_type})</td>
                        <td>{s.year}</td>
                        <td><button className='_Sbutton' onClick={()=>_do_randsubject("past question")}>Next</button></td>
                      </tr>
                     ))
                 }
              
             </tbody>
             </table>
            
        </div>
        </div>

    </div>
    )
    }
}
