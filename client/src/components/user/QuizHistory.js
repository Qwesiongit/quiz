import React,{useContext,useState,useEffect,useRef} from 'react';
import {useNavigate as useHistory,Navigate as Redirect} from 'react-router-dom';
import {showScore,checkloggein } from './../../services/services';
import userContext from '../../context/userContext';
import { SET_CURRENT_USER } from '../../store/actions';
//import {makeStyles} from '@mui/styles';
import $ from 'jquery'; 
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
//import "datatables.net/css/buttons.dataTables.min.css";



import "datatables.net/js/jquery.dataTables.min.js";
import "datatables.net/js/jquery.dataTables.min.js";
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.print';


//const theme = createTheme();


let dtimer = 40;

/*
const mystyles = makeStyles(()=>({  
    card_: { maxWidth: 800 },  
    content_: { marginTop: theme.spacing(1)}
  }));
*/

  const hist_table = ()=>{
      $(document).ready(()=>{
        $('#hisTable').DataTable({
            "lengthChange": false,
            destroy: true,
            dom:'lBfrtip',
            buttons:[
                { extend: 'print', className: 'btn btn-secondary'}
        ]
        });
      });

  };

export default function QuizHistory() {
    let history=useHistory();
    let [state,dispatch] = useContext(userContext);
    let {user,isloggedin}=state;
    let [_qhistory,setHis]=useState(null);
    let u_ref = useRef();
    //let baseuri ="http://localhost:8595/";

   
    const loadall = ()=>{
        showScore({user:user._id}).then(res=>{
            if(!(res.success)){
                return res.message;
            }else{
               //let htr = res.scores.quiz_history;
                 setHis(res.scores.quiz_history);
            }
            
          });
    };


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
    }
    
    useEffect(()=>{
      document.title="quiz history";
      handle_log_in();
      
      loadall();
      userTimed();
        return(()=>{
            clearInterval(u_ref.current);
        });
    },[]);

    useEffect(()=>{
        check_active();
      });

      useEffect(()=>{
          setTimeout(() => {
            hist_table();
          }, 1000);
        
      },[]);
    

    if(!(isloggedin) && !(user.usertype==="normal")){
        return <Redirect to="/"/>
    }else{
    return (
        <div className='container mt-5'>
           <h1>Quiz History</h1>
            <table className="table table-striped" id="hisTable">
            <thead>
                <tr>
                    <th>Quiz Type</th>
                    <th>Level</th>
                    <th>Course</th>
                    <th>Total Questions</th>
                    <th>Total Attemped</th>
                    <th>Total correctly answred</th>
                    <th>Total Wrongly answred</th>
                    <th>Total un-answred</th>
                    <th>Date of quiz</th>
                </tr>
            </thead>
            <tbody>

           {_qhistory!==null && _qhistory.map(one=>(
              
                <tr  key={one._id}>
                    <td>{one.quiz_type.replace("_"," ")}</td>
                    <td>{one.level}</td>
                    <td>{one.course}</td>
                    <td>{one.total_questions}</td>
                    <td>{one.total_attempted}</td>
                    <td>{one.correctly_answered}</td>
                    <td>{one.wrongly_answers}</td>
                    <td>{one.total_unanswered}</td>
                    <td>{one.date_quiz_taken}</td>
                </tr>
           ))}



            </tbody>
            </table>
        </div>
    )
}
}
