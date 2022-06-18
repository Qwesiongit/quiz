import React,{useContext,useState,useEffect,useRef} from 'react';
import {useNavigate as useHistory,Navigate as Redirect} from 'react-router-dom';
import { SET_QUIZ,SET_CURRENT_USER } from '../../store/actions';

import { _getCourses,checkloggein} from './../../services/services';
import userContext from '../../context/userContext';
import { monitor_fade } from '../../services/custom';
import {Grid,Paper,Button,createTheme} from '@mui/material';
import {makeStyles} from '@mui/styles';
const theme = createTheme();

let dtimer = 40;

let cr = "core";
let cr1 = "Core";

let duration={
  min:null,
  hr:null,
  sec:null
}

  //var d = new Date;

  const _qdoStyle=makeStyles(()=>({
    root:{
        backgroundColor:'#fdfdff',
    },
    _qdopad:{
        padding:theme.spacing(2)
    }
}));

export default function QuizHome() {

  let history=useHistory();
  let u_ref = useRef();
  const [state,dispatch] = useContext(userContext);
  const {user,isloggedin/*,quiz_type,course,quiz_questions*/}=state;
  const [qtype,setType] = useState("");
  const [iscourse,setiscourse] = useState("");
  const [coursename,setcoursename] = useState("");
  const [qfile,setfile] = useState("");
  const [questions,setquestions] = useState([]);
  let [year,setyear] = useState("");
  let [level,setlevel] = useState("");
  let [coursed,set_coursed] = useState(false);
  let [is_typed,set_typed] = useState(false);
  let [iscored_el,set_cored_el] = useState(false);
  let [lvl,setlvl] = useState("");
  let [examType,setExamType] = useState("");
  let [is_shs,set_shs] = useState(false);
  let [done,setdone] = useState(false);
  let [_duration,setduration] = useState({});
  let [is_wassce,set_iswacce] = useState(false);
  let [wholecourses,setcourses] = useState([]);
  let [_levelcourses,setlvlcourses] = useState([]);
  let [_levelcore,setlvlcore] = useState([]);
  let [_levelel,setlvlel] = useState([]);
  let [currmessages,setcurrmessages]=useState([]);
  let [is_core,setiscore] = useState(false);
  let [is_elec,setiselec] = useState(false);
  let [core_el,setcore_el] = useState("");
  let [isleveled,setIsleveld] = useState(false);
  let _qdstyle = _qdoStyle();
  //let dc = [];


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
  
    const handletype = (e)=>{
      set_typed(false);
      e.preventDefault();
      let tp = e.target.value;
      let lv  = user.level;
      if(tp!==""){
        setIsleveld(true);
        setlvlcourses([]);
        setlvlcore([]);
        setlvlel([]);
        setdone(false);
      setType(e.target.value);
      set_typed(true);
    
      let qt = {
        type:tp,
        level:lv
    };
    
    _getCourses(qt).then(allcourses=>{
      //console.log(allcourses)
      let hh = allcourses.courses;
      hh.forEach(element => {
        setlvlcourses(prev=>[...prev,element]);
        if(user.level === "shs"){
          if(element.course.includes(cr)||element.course.includes(cr1)){
            setlvlcore(prev=>[...prev,element]);
          }
          else{
            setlvlel(prev=>[...prev,element]);
          }
        }

      });
    });
  }else{
    setIsleveld(false);
    set_typed(false);
    setType("");
    setcurrmessages(prev=>[...prev,"Sorry,you did not select a quiz type"]);
  }
      
  };

 const handlelvl = (e) =>{
  let _lvl = e.target.value;
  set_shs(false);
  set_iswacce(false);
  setiselec(false);
  setiselec(false);
  setlvlcore([]);
  setlvlel([]);
  setcore_el("");
  let cr = "core";
  let cr1 = "Core";
  setlvl("");
  if(_lvl!==""){
    setlvlcourses([]);
    setlvl(_lvl);
    setIsleveld(true);
    if(_lvl==="shs"){
      set_shs(true);
    }else{
      set_shs(false);
    }
    if(_lvl==="wassce"){
      set_iswacce(true);
    }else{
      set_iswacce(false);
    }
   if(_lvl==="shs" || _lvl==="wassce"){
   if(wholecourses!==null){
    wholecourses.forEach(element => {
      //console.log(element.course.includes(cr) || element.course.includes(cr1) );
      if(element.level===_lvl && (element.course.includes(cr)||element.course.includes(cr1))){
      setlvlcore(prev=>[...prev,element]);
      }
      if((element.level===_lvl && (element.course.includes(cr)===false && element.course.includes(cr1)===false))){
        setlvlel(prev=>[...prev,element]);
        }
    });
  }
  }else{

if(wholecourses!==null){
    wholecourses.forEach(element => {
      if(element.level===_lvl){
      setlvlcourses(prev=>[...prev,element]);
      }
    });
  }

  }

  }else{
    setIsleveld(false);
    setcurrmessages(prev=>[...prev,"Sorry,you did not select any level"]);
  }
 } 

 const handlecore_el = (e)=>{
  e.preventDefault();
  let ce = e.target.value;
  setiselec(false);
  setiscore(false);
  if(ce!==""){
  setcore_el(ce);
  if(ce === "core"){
   setiselec(false);
    setiscore(true);
    set_cored_el(true);
  }
  if(ce === "elective"){
   setiscore(false);
   setiselec(true);
   set_cored_el(true);
 }
}else{
 setcore_el("");
 set_cored_el(false);
}
}

const handlecourse = (e)=>{
  let dcs = e.target.value;
  //console.log("which",dcs);
  if(dcs!==""){
  setquestions([]);
  setlevel(e.target.options[e.target.selectedIndex].dataset.level);
  qtype==="past_question" &&  setyear(e.target.options[e.target.selectedIndex].dataset.year);
  qtype==="past_question" && setExamType(e.target.options[e.target.selectedIndex].dataset.examtype);
  setcoursename(e.target.options[e.target.selectedIndex].dataset.course);
  setfile(e.target.options[e.target.selectedIndex].dataset.question_file);
  setiscourse(e.target.value);
  set_coursed(true);
  
  let gh=_levelcourses.find(o=>o.short_name===e.target.value);
  duration={
    hr:Number(gh.duration.hr),
    min:Number(gh.duration.min),
    sec:Number(gh.duration.sec)
  }
  setduration(duration);
  //console.log("duration",duration);
  let qitem = gh.question_items;
  qitem.forEach(one=>{
    setquestions(prev=>[...prev,one]);
  });
}else{
  setiscourse("");
  set_coursed(false);
  setcurrmessages(prev=>[...prev,"Sorry,you did not select any subject."]);
}
};

const dosubmit =(e)=>{
  e.preventDefault(); 
  
  let qall={};
   if(qtype==="past_question"){
    qall = {
        quiztype:"past_question",
        level:level,
        year:year,
        exam_type:examType,
        coursename:coursename,
        short_name:iscourse,
        quiz_file:qfile,
        _duration:_duration
    }
  }
  if(qtype==="general"){
    qall = {
      quiztype:"general",
      level:level,
      coursename:coursename,
      short_name:iscourse,
      quiz_file:qfile,
      _duration:_duration
  }
};

if(qtype==="" || coursename===""){
setcurrmessages(prev=>[...prev,"Sorry,please select both quiz type and subject."]);
}else{
dispatch({type:SET_QUIZ,quiz_type:qtype,course:qall,quiz_questions:questions})
history("/quizmain");
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
      document.title="Quiz Home";
      handle_log_in();
      userTimed();
        return(()=>{
            clearInterval(u_ref.current);
        });
  },[]);

  useEffect(()=>{
    monitor_fade();
    check_active();
  });

    if(!(isloggedin) && !(user.usertype==="normal")){
      return <Redirect to="/"/>
  }else{

  return (
    <div className='mt-5'>
  
  <Grid container>
  <Grid item xs={2}></Grid>
  <Grid item xs={8}>
  <Paper className={_qdstyle.root}>
  <div className={_qdstyle._qdopad}>
      <h4>CHOOSE QUIZ TYPE AND COURSE</h4>
      {currmessages.length!==0 && currmessages.map((msg,index)=>{
                    return <p key={index} className="alert alert-warning tofd">{msg}</p>
                })}
      <br/>
      <Grid container spacing={6}>
                <Grid item>
      <select className="form-control" name="qtype" onChange={handletype} value={qtype}>
               <option value="">select quiz type</option>
               <option value="general">General</option>
              { user.level.includes("prim")===false &&   <option value="past_question">Past Questions</option>}
          </select>
</Grid>

           {qtype!=="" && qtype==="general" &&
<>


{user.level!=="shs" && is_typed && isleveled===true &&
  
  <Grid item>
           <select className="form-control" name="subject" onChange={handlecourse} value={iscourse}>
           <option value="">Select Subjects</option>
                {_levelcourses!==null && _levelcourses.map((course)=>{
                    return(
                    <option key={course._id} data-question_file={course.question_file} data-level={course.level} data-course={course.course} value={course.short_name}>{course.course}</option>
                    )
                })}
                
            </select>
</Grid>
  }

  {
    user.level==="shs" && is_typed &&
    <Grid item>
      <select className="form-control" name="core_el" onChange={handlecore_el} value={core_el}>
               <option value="">Core or Elective</option>
               <option value="core">Core</option>
               <option value="elective">Elective</option>
          </select>
</Grid>
  }
{is_core===true && user.level==="shs" &&

<Grid item>
           <select className="form-control" name="core" onChange={handlecourse} value={iscourse}>
           <option value="">Core Subjects</option>
                {_levelcore!==null && _levelcore.map((course)=>{
                    return(
                    <option key={course._id} data-duration={course.duration} data-question_file={course.question_file} data-level={course.level} data-course={course.course} value={course.short_name}>{course.course}</option>
                    )
                })}
                
            </select>
</Grid>
}

{is_elec===true && user.level==="shs" &&
<Grid item>
           <select className="form-control" name="elective" onChange={handlecourse} value={iscourse}>
           <option value="">Elective Subjects</option>
                {_levelel!==null && _levelel.map((course)=>{
                    return(
                    <option key={course._id} data-duration={course.duration} data-question_file={course.question_file} data-level={course.level} data-course={course.course} value={course.short_name}>{course.course}</option>
                    )
                })}
                
            </select>
</Grid>

} 

</>
           }

{qtype!=="" &&  qtype==="past_question" &&
<>

{user.level!=="shs" && isleveled===true && is_typed &&
  <Grid item>
           <select className="form-control" name="subject" onChange={handlecourse} value={iscourse}>
               <option value="">Select subject</option>
                {_levelcourses!==null && _levelcourses.map((course)=>{
                    return(
                    <option key={course._id}  data-question_file={course.question_file} data-level={course.level} data-examtype={course.exam_type} data-year={course.year} data-course={course.course} value={course.short_name}>{course.course.replace("_"," ")} ({course.year}) - {course.exam_type}</option>
                    )
                })}
                
            </select>
           
            </Grid>
}

{
  user.level==="shs" && is_typed &&
  <Grid item>
      <select className="form-control" name="core_el" onChange={handlecore_el} value={core_el}>
               <option value="">Core or Elective</option>
               <option value="core">Core</option>
               <option value="elective">Elective</option>
          </select>
</Grid>

}

{is_core===true && user.level==="shs" && iscored_el && 

<Grid item>
           <select className="form-control" name="core" onChange={handlecourse} value={iscourse}>
           <option value="">Core Subjects</option>
                {_levelcore!==null && _levelcore.map((course)=>{
                    return(
                    <option key={course._id}  data-question_file={course.question_file} data-examtype={course.exam_type} data-year={course.year} data-level={course.level} data-course={course.course} value={course.short_name}>{course.course}({course.year}) - {course.exam_type}</option>
                    )
                })}
                
            </select>
</Grid>
}

{is_elec===true && user.level==="shs" && iscored_el &&
<Grid item>
           <select className="form-control" name="elective" onChange={handlecourse} value={iscourse}>
           <option value="">Elective Subjects</option>
                {_levelel!==null && _levelel.map((course)=>{
                    return(
                    <option key={course._id}  data-question_file={course.question_file} data-level={course.level} data-examtype={course.exam_type} data-year={course.year} data-course={course.course} value={course.short_name}>{course.course}({course.year}) - {course.exam_type}</option>
                    )
                })}
                
            </select>
</Grid>

} 



</>
           }
</Grid>


<br/>
           <p><Button variant="contained" onClick={dosubmit}>submit</Button></p>
</div> 
</Paper>
</Grid>
<Grid item xs={2}></Grid>
</Grid>
</div>
  )
  
  }



}
