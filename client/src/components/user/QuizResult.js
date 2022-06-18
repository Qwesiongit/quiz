import React,{/*useState,*/useContext,useEffect,useRef} from 'react';
import {useNavigate as useHistory,Navigate as Redirect} from 'react-router-dom';
import userContext from '../../context/userContext';
import {Card,Grid,CardContent,Table,Typography,TableRow,
    TableCell,TableHead,Button} from '@mui/material';
import { do_logout,checkloggein} from './../../services/services';
import { RESET_QUIZ, RE_QUIZ,LOGOUT_USER,SET_CURRENT_USER } from '../../store/actions';
let dtimer = 40;

export default function QuizResult() {
    let history=useHistory();
    let [state,dispatch] = useContext(userContext);
    let {user,isloggedin,score,course,correct_ans,user_choice,quiz_type,quiz_questions,current_question}=state;
    let u_ref = useRef();

    const logout =()=>{
        do_logout("normal").then(res=>{
        dispatch({type:LOGOUT_USER,user:{},isloggedin:false});
        dispatch({type:RE_QUIZ,current_question,user_choice,correct_ans,score});
        dispatch({type:RESET_QUIZ,quiz_type,quiz_questions});
        history("/");
          });
        
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

    const flush_user = ()=>{
        dispatch({type:SET_CURRENT_USER,user:{},isloggedin:false});
        history("/");
    };


    let retake_quiz=(e)=>{
       e.preventDefault();
       dispatch({type:RE_QUIZ,current_question,user_choice,correct_ans,score});
       history("/quizmain");
    }

    let other_quiz=(e)=>{
        e.preventDefault();
        dispatch({type:RE_QUIZ,current_question,user_choice,correct_ans,score});
        dispatch({type:RESET_QUIZ,quiz_type,quiz_questions});
       history("/quizhome");

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
        document.title="Quiz Result";
        handle_log_in();
        userTimed();
        return(()=>{
            clearInterval(u_ref.current);
        });
    },[]);

    useEffect(()=>{
        check_active();
    });
       

    if(!(isloggedin) && !(user.usertype==="normal")){
        return <Redirect to="/"/>
    }else{

    return (
        <div className='mt-3'>

            <h2 className="text-center">YOUR QUIZ RESULT</h2>
      <Grid container>
      <Grid item xs={2}></Grid>
      <Grid item xs={8}>
      <Card>
        <CardContent>
            { quiz_type==="general" && <Typography variant="h5">Level:{course.level} || Subject:{course.coursename}</Typography> }
    { quiz_type==="past_question" && <Typography variant="h5">{course.level}({course.year}),{course.exam_type},{course.coursename}</Typography> }
            <br/>
            <Table>
                <TableHead>

                 <TableRow>
                <TableCell>Number of questions</TableCell>
                <TableCell>{score._total_questions}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Total Attempted</TableCell>
                <TableCell>{score._total_attempted}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Total Correctly attempted</TableCell>
                <TableCell>{score._correctly_answered}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Total Wrongly attempted</TableCell>
                <TableCell>{score._wrongly_answered}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell>Total Un-attempted</TableCell>
                <TableCell>{score._total_questions  - score._total_attempted}</TableCell>
                </TableRow>
                </TableHead>
            </Table>
            <br/>
           <span> <Button variant='outlined' onClick={retake_quiz}>Re-do quiz</Button> <Button variant='outlined' color='primary' onClick={other_quiz}>Take another quiz</Button> <Button variant='outlined' color='secondary' onClick={logout}>logout</Button> </span>
           
        </CardContent>
        </Card>
</Grid>
<Grid item xs={2}></Grid>
</Grid>
        </div>
    )

}

}

