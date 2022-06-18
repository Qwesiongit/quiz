import React,{useState,useContext,useEffect} from 'react';
import {Link,Navigate as Redirect,useNavigate} from 'react-router-dom';
import userContext from '../context/userContext';
import {handle_img,rand_course} from '../services/custom';
import {getCourses_} from '../services/services';
import {Card,Grid,CardContent,Typography,Button} from '@mui/material';
import $ from 'jquery';
let v_ = {};

export default function AppIndex() {
    let [state ,dispatch] = useContext(userContext);
    let {user,isloggedin}=state;
    let [general,setgentwo] = useState({});
    let [gen_info,setgen_info] = useState({});
    let [gen_qs,setgen_qs] = useState([]);
    let [pastqo,setpastwo] = useState({});
    let [gen_status,setgen_status] = useState(false);
    let [past_info,setpast_info] = useState({});
    let [past_qs,setpast_qs] = useState([]);
    let [past_status,setpast_status] = useState(false);

    const whole_courses = ()=>{
      setInterval(() => {
      getCourses_({qt_ype:"general"}).then(all=>{
        let cs = rand_course(all.courses);
        if(cs.status===true){
        setgen_status(true);
        setgen_info(cs.data.info);
        let q_s = cs.data.questions;
        setgen_qs(q_s);
        setgentwo(cs.data);
      }else{
        setgen_status(false);
        setgentwo({});
      }

      });
   

      getCourses_({qt_ype:"past_question"}).then(_all=>{
       let _cs = rand_course(_all.courses);
       if(_cs.status===true){
        setpast_status(true);
        setpast_info(_cs.data.info);
        let q_ss = _cs.data.questions;
        setpast_qs(q_ss);
        setpastwo(_cs.data);
       }else{
        setpast_status(false);
        setpastwo({});
       }
    
      });

    }, 90000);
    }

    const rand_img = ()=>{
      setInterval(() => {
        let img_rand = handle_img();
        $('.bg-image').css('background','url(_images/'+img_rand+')'); 
        $('.bg-image').css('background-position','center'); 
        $('.bg-image').css('background-repeat','no-repeat'); 
        $('.bg-image').css('background-size','cover');
      }, 90000);
  
    }
  

    useEffect(()=>{
        document.title="home";
        whole_courses();
    },[]);

    useEffect(()=>{
      const _somet = async ()=>{
        rand_img();
      }
       _somet();
    });

    if(isloggedin && user.user_type==="admin"){
        return <Redirect to="/admindashbord"/>
    }else if(isloggedin && user.user_type==="normal"){
        return <Redirect to="/userdashboard"/>
    }else{
  return (
    <div>
      <div id='showcase'>
    
    <div className="bg-image">

    </div>

    <div className="content-wrap">
        <div id ="push">
        <h1>Welcome to Quiz101</h1>
  <h5>Are u a basic or secondary school student? Solve all your objective test(Including BECE & SSSCE/WASSCE) here.</h5>
        <p>
        <span className='sh_btn'><Link to="/login">LOGIN</Link> </span>
        <span className='sh_btn'> <Link to="/register">REGISTER</Link></span>
        </p>
        <h5>Do you Want to download syllabus or past questions?</h5>
        <span className='sh_btn'> <Link to="edumaterials">DOWNLOAD METERIAL</Link></span>
        </div>
    </div>
    </div>


    <div id='main_'>
    <h2 className='text-center'>RANDOM QUESTIONS</h2>
    <div>
      <br/>
    <h3 className='text-center'>GENERAL QUESTIONS</h3>
    {
          gen_status===true &&
          <h5 className='text-center mb-3'>( {gen_info.course.toUpperCase()} | | {gen_info.level.toUpperCase()} )</h5>
        }
      <div id="_gqsamp"> 
      
   {
    gen_status===true && gen_qs!==undefined &&
    gen_qs.map(q=>(
      <div key={q._id}>
      <h6>Question: {q.question}</h6>
      <p><span>Answer A:  {q.answer_a}  </span>  <span> Answer B:  {q.answer_b} </span></p>
      <p><span>Answer C:  {q.answer_c}  </span>  <span> Answer D:  {q.answer_d} </span></p>
      </div>
    ))
   }
      </div>
     { gen_status===false && <h2 className='text-center'>QUESTIONS NOT LOADED</h2>}
      </div>

      <div>
        <br/><br/>
      <h3 className='text-center'>PAST QUESTIONS</h3>
     
      {
          past_status===true &&
          <h5 className='text-center mb-3'>( {past_info.course.toUpperCase()} | | {past_info.level.toUpperCase()} - {past_info.level==="teacher_promotion" || past_info.level==="bece"|| past_info.level==="wassce" && past_info.year} )</h5>
        }
      <div id="_pqsamp">
      {
        past_status===true && past_qs!==undefined &&
        past_qs.map(q=>(
           <div key={q._id}>
          <h6>Question: {q.question}</h6>
          <p><span>Answer A:  {q.answer_a} </span>   <span> Answer B:  {q.answer_b} </span></p>
          <p><span>Answer C:  {q.answer_c} </span>   <span> Answer D:  {q.answer_d} </span></p>
          </div>
           
        )) 
      }
      
      </div>
     {past_status===false && <h2 className='text-center'>QUESTIONS NOT LOADED</h2>}
     </div>
    </div>


    </div>
  )

}
}
