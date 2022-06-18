import React,{useContext,useState,useEffect,useRef} from 'react';
import {useNavigate as useHistory,Navigate as Redirect} from 'react-router-dom';
import {addScore,checkloggein } from './../../services/services';
//import $ from 'jquery';
import userContext from '../../context/userContext';
import { SET_CHOICE, RESET_CHOICE,SET_SCORE,SET_CURRENT_USER} from '../../store/actions';
import {Card,Grid,CardContent,Typography,Button} from '@mui/material';
//import {makeStyles} from '@mui/styles';
//const theme = createTheme();

var duration = null;

/*
const mystyles = makeStyles(()=>({  
  card_: { maxWidth: 800 },  
  content_: { marginTop: theme.spacing(1)}
}));
*/

export default function QuizMain() {
   
    let history=useHistory();
    let [state,dispatch] = useContext(userContext);
    let {user,isloggedin,course,correct_ans,user_choice,quiz_type,quiz_questions,current_question}=state;
    let [accurate_choice,setaccurate]=useState(0);
    let [bomb_choice,setbomb]=useState(0);
    let [qid,setqid]=useState(0);
    let [thisq,setthisq]=useState("");
    let [uranswer,setueanswer]=useState("");
    let [num_answered,setnum_answered]=useState(0);
    let [logs,setlogs] = useState([]);
    const [btstart, setStart] = useState(false);
    //const classes = mystyles();
    let baseuri ="http://localhost:7575/question_files";
    const interid = useRef();

   

duration = course._duration;

let quiz_time=()=>{

interid.current= setInterval(()=>{

  
  if(duration.sec===60 && duration.min!==0){
    duration.sec=0;
    duration.min=duration.min-1;
 
  }

  else if(duration.sec===60 && duration.min===0 && duration.hr!==0){
    duration.sec=0;
    duration.min=59;
    duration.hr=duration.hr-1
  }

  else if(duration.sec===60 && duration.min===0 && duration.hr===0){
    clearInterval(interid.current);
    duration.sec=0;
    duration.min=0;
    duration.hr=0;
    let bt=document.querySelector('#sub_butt');
    if((bt!==null )){
      bt.click();
    }
  }else{
    duration.sec++;
  }
   

  let nhr,nmin,nsec;
  if(duration.min<10){
    nmin="0"+duration.min;
  }else{
    nmin=duration.min;
  }

  if(duration.sec<10){
    nsec="0"+duration.sec;
  }else{
    nsec=duration.sec;
  }

  if(duration.hr<10){
    nhr="0"+duration.hr;
  }else{
    nhr=duration.hr;
  }

   let ntime = `${nhr}:${nmin}  ${nsec}`;
   let tmdiv=document.querySelector('#utime');
    
    if(tmdiv!==null){
      tmdiv.innerHTML=ntime;
    }

  },1000);
 
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



async function handlepause(){
  clearInterval(interid.current);
}



async function handlereset(){
 await handlepause();
 quiz_time();
};

  
    const handleanswer =(id,asval)=>{
        //e.preventDefault();
        dispatch({type:RESET_CHOICE,current_question,user_choice,correct_ans});
        //let iid = e.target.dataset.ext;
        let iid = id;
        setqid(iid);
        //let usans = e.target.value;
        let usans = asval;
        setueanswer(usans);
        let curr_q = quiz_questions.find(i=>i._id===iid);
        setthisq(curr_q.question);
        let pchoice=curr_q.correct_answer;
        dispatch({type:SET_CHOICE,current_question:curr_q.question,user_choice:usans,correct_ans:pchoice});
    }

    const check_choice = (e)=>{
        e.preventDefault();
      let now_ans={
         _id:null,
         _question:null,
         _user_choice:null,
         _correct_answer:null

       };

        if(!(qid===0)){
          let chk = logs.find(i=>i._id===qid);
          if(chk){
            if(chk._user_choice===chk._correct_answer){
                setaccurate(prev=>prev-1);
                setnum_answered(prev=>prev-1);
            }else{
              setbomb(prev=>prev-1);
              setnum_answered(prev=>prev-1);
            }
            let _di = logs.findIndex(i=>i._id===qid);
            logs.splice(_di,1);
          }
          now_ans._id=qid;
          now_ans._question=current_question;
          now_ans._user_choice=uranswer;
          now_ans._correct_answer=correct_ans;
          setlogs(prev=>[...prev,now_ans]);

          if(uranswer===correct_ans){
                setaccurate(prev=>prev+1);
                setnum_answered(prev=>prev+1);
            }
            else{
                 setbomb(prev=>prev+1);
                 setnum_answered(prev=>prev+1);
            }
   }

    };

   const submit_quiz=(e)=>{
    e.preventDefault();
    handlepause();
   let ttq=quiz_questions.length;
   let numans=logs.length;

   if(!(numans===0)){

   let this_score={
     _quiz_type:quiz_type,
     _total_questions:ttq,
     _total_attempted:numans,
     _correctly_answered:accurate_choice,
     _wrongly_answered:bomb_choice
   };

let torecord=null;
let nodate = new Date();
let ampm = null;
let nstring =nodate.toDateString();
let th = nodate.getHours();
th=th<10?'0'+th:th;
if(th>=12){
  ampm="pm"
}
else{
  ampm="am"
}
let tt = nodate.getMinutes();
tt=tt<10?'0'+tt:tt;
let ts = nodate.getSeconds();
ts=ts<10?'0'+ts:ts;
let ft = `${nstring} ${th}:${tt} ${ts} ${ampm}`;

if(quiz_type==="past_question"){
  torecord = {
    quiz_type:quiz_type,
    level:`${course.level}(${course.year}) - ${course.exam_type} `,
    course:course.coursename,
    total_questions:ttq,
    total_attempted:numans,
    correctly_answered:accurate_choice,
    wrongly_answers:bomb_choice,
    total_unanswered:ttq-numans,
    date_quiz_taken:ft
   };
}

if(quiz_type==="general"){
  torecord = {
    quiz_type:quiz_type,
    level:course.level,
    course:`${course.coursename}`,
    total_questions:ttq,
    total_attempted:numans,
    correctly_answered:accurate_choice,
    wrongly_answers:bomb_choice,
    total_unanswered:ttq-numans,
    date_quiz_taken:ft
   };
}
   
   addScore(torecord);
   dispatch({type:SET_SCORE,score:this_score});
   history("/quizresult");
}else{
   alert("Sorry,you did not attempt any of the questions!")
   quiz_start();
   //history.goBack();
}
  };

  const quiz_start = ()=>{
    handlereset();
    setStart(true);
  };

  useEffect(()=>{
    document.title="Quiz Main";
    handle_log_in();

    return()=>{
      handlepause();
    }
},[]);


   if(!(isloggedin) && !(user.usertype==="normal")){
      return <Redirect to="/"/>
  }else{
      
 if(btstart){
   
  return (
    <div className='mt-5'>
      <div className="text-center"><h3>LEVEL:{course.level.toUpperCase()}{course.quiztype==="past_question" && '('+course.year+')'+","+course.exam_type.toUpperCase()} | | SUBJECT:{course.coursename.toUpperCase()} <br/><span> (Time: <span id="utime"></span> )</span></h3></div>
      <br/>
      <div className="text-center">
        {course.quiztype==="past_question"?
       <button><a href={`${baseuri}/past_question/${course.quiz_file}`}>DOWNLOAD QUIZ FILE</a></button>: 
       <button><a href={`${baseuri}/general/${course.quiz_file}`}>DOWNLOAD QUIZ FILE</a></button>
        }
      </div>
      <Grid container>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
      { quiz_questions.map((one_question,index)=>{
            return(
              <div key={index}>
        <Card>
        <CardContent>
        <Typography variant="h4"><span>{index+1}. </span>{one_question.question}</Typography>
        <table>
        <tr><p><input name="answer" type="radio" value={one_question.answer_a} onClick={()=>{handleanswer(one_question._id,one_question.answer_a)}}  /><span> {one_question.answer_a}</span></p></tr>
        <tr><p><input name="answer" type="radio" value={one_question.answer_b} onClick={()=>{handleanswer(one_question._id,one_question.answer_b)}} /><span> {one_question.answer_b}</span></p></tr>
        <tr><p><input name="answer" type="radio" value={one_question.answer_c} onClick={()=>{handleanswer(one_question._id,one_question.answer_c)}} /><span> {one_question.answer_c}</span></p></tr>
        <tr><p><input name="answer" type="radio" value={one_question.answer_d} onClick={()=>{handleanswer(one_question._id,one_question.answer_d)}} /><span> {one_question.answer_d}</span></p></tr>
        </table>
        <Button variant='outlined' color='primary' onClick={check_choice}>confirm choice</Button>
        </CardContent>
        </Card>
        <br/>
        </div>
        )
       })}

<Button variant='contained' color='secondary' id="sub_butt" onClick={submit_quiz}>Submit Quiz</Button>
<br/>
<br/>
</Grid>
<Grid item xs={1}></Grid>
</Grid>
</div> 
  )
}else{
  return(
    <div className='mt-5'>
    <div className="text-center">
      <h3>LEVEL:{course.level.toUpperCase()}{course.quiztype==="past_question" && "("+course.year+")"+ " - "+course.exam_type.toUpperCase()} | | SUBJECT:{course.coursename.toUpperCase()}</h3>
      <button onClick={quiz_start}>START QUIZ</button>
    </div>
    </div>
  )
}


  }
}

