import React,{useContext,useState,useEffect} from 'react';
import {/*useNavigate as useHistory,*/ Navigate as Redirect} from 'react-router-dom';
import {getCourses,addQuestion,add_question_file } from './../../services/services';
import userContext from '../../context/userContext';
import { monitor_fade } from '../../services/custom';
import {Grid,TextField,Button,Paper,createTheme} from '@mui/material';
import {makeStyles} from '@mui/styles';
const theme = createTheme();

    const _aqdoStyle=makeStyles(()=>({
        root:{
            backgroundColor:'#fdfdff',
        },
        _aqdopad:{
            padding:theme.spacing(4)
        }
    }));

export default function AddQuestion() {
    let aqdstyle = _aqdoStyle();
    //let history=useHistory();
    let [state/*,dispatch*/] = useContext(userContext);
let {user,isloggedin/*,quiz_type,course*/}=state;
    let [qtype,setqtype] = useState("");
    let [year,setyear] = useState("");
    let [thiscourse,setcourse] = useState("");
    let [_course,set_course] = useState("");
    let [level,setlevel] = useState("");
    let [subject/*,setsubject*/] = useState("");
    let [done,setdone] = useState(false);
    let [rank,_setrank] =  useState("");
    let [wholecourses,setcourses] = useState(null);
    let [question,setquestion] = useState("");
    let [answer_a,seta] = useState("");
    let [answer_b,setb] = useState("");
    let [answer_c,setc] = useState("");
    let [answer_d,setd] = useState("");
    let [allans,setallans] = useState({a:"",b:"",c:"",d:""});
    let [correct_answer,setcorrect] = useState("");
    let [currmsg, setcurrmsg] = useState([]);
    let [qfile,setqfile] = useState("");
    let [examType,setExamType] = useState("");
    let [isfile,setqisfile] = useState(false);
    let [iserr,setIserr] = useState(false);
    let [lvl,setlvl] = useState("");
    let [is_core,setiscore] = useState(false);
    let [is_elec,setiselec] = useState(false);
    let [core_el,setcore_el] = useState("");
    let [isleveled,setIsleveld] = useState(false);
    let [_levelcourses,setlvlcourses] = useState([]);
    let [_levelcore,setlvlcore] = useState([]);
    let [is_wassce,set_iswacce] = useState(false);
    let [is_shs,set_shs] = useState(false);
    let [is_tp,set_tp] =  useState(false);
    let [_levelel,setlvlel] = useState([]);
    //let baseuri ="http://localhost:8595/";


    const handlerank = (e)=>{
        _setrank(e.target.value);
        setdone(true);
    }

const handlelvl = (e)=>{
  let _lvl = e.target.value;
  set_shs(false);
  set_iswacce(false);
  setiselec(false);
  setiselec(false);
  setdone(false);
  setlvlcore([]);
  setlvlel([]);
  setcore_el("");
  let cr = "core";
  let cr1 = "Core";
  setlvl("");

  if(!(_lvl==="")){
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

      if(_lvl==="teacher_promotion"){
        set_tp(true);
      }else{
        set_tp(false);
      }

      if(_lvl==="shs" || _lvl==="wassce"){
        if(wholecourses!==null){
         wholecourses.forEach(element => {
           //console.log(element.course.includes(cr) || element.course.includes(cr1) );
           if(element.level===_lvl && (element.course.includes(cr)||element.course.includes(cr1))){
           setlvlcore(prev=>[...prev,element]);
           }
           if(element.level===_lvl && (!(element.course.includes(cr))||!(element.course.includes(cr1)))){
             setlvlel(prev=>[...prev,element]);
             }
         });
       }
       }
       else{
           let al =_lvl.replace("_"," ");
        if(wholecourses!==null){
            wholecourses.forEach(element => {
              if(element.level===al){
              setlvlcourses(prev=>[...prev,element]);
              }
            });
          }
          
       }

  }else{
    setlvl("");
    setIsleveld(false);
    setcurrmsg(prev=>[...prev,"Sorry,you did not select any level"]);
  }
    };

    const handlecore_el = (e)=>{
        e.preventDefault();
        let ce = e.target.value;
        setiselec(false);
        setiscore(false);
        setdone(false);
        setcore_el(ce);
        if(ce === "core"){
         setiselec(false);
          setiscore(true);
        }
        if(ce === "elective"){
         setiscore(false);
         setiselec(true);
       }
      };
    
    const handlefile = (e)=>{
        e.preventDefault();
        let file = e.target.files[0];
        setqfile(file);
    };

    const sendfile = ()=>{
        if(!(_course===""||qfile==="")){
            const formdata = new FormData();
            formdata.append("type",qtype);
            formdata.append("course",_course);
            formdata.append("file",qfile);

            add_question_file(formdata).then(res=>{
                setcurrmsg(prev=>[...prev,res.message]);
            });

        }else{
            setIserr(true);
            setcurrmsg(prev=>[...prev,"Sorry,course file is required!!"]);
        }
        
    };

    const isdofile = ()=>{
        setqisfile(init=>!init);
      };


    const handlesubmit = ()=>{
      
       if(!(question===""||answer_a===""||answer_b===""||answer_c===""||answer_d===""||correct_answer==="")){
        const data ={
             type:qtype,
             course:_course,
             question,
             answer_a,
             answer_b,
             answer_c,
             answer_d,
             correct_answer
        };
        addQuestion(data).then(res=>{
           if(res.success===true){
            setcurrmsg(prev=>[...prev,res.message]);
            setIserr(false);
           }else{
            setcurrmsg(prev=>[...prev,res.message]);
            setIserr(true);
           }
          
        });

       }else{
          setcurrmsg(prev=>[...prev,"Sorry,all fields are required!!"]);
          setIserr(true);
       }

     
    };

    const handlecourse = (e)=>{
        let mc = e.target.value;
        if(mc!==""){
        setlevel(e.target.options[e.target.selectedIndex].dataset.level);
        qtype==="past_question" &&  setyear(e.target.options[e.target.selectedIndex].dataset.year);
        qtype==="past_question" &&  setExamType(e.target.options[e.target.selectedIndex].dataset.examtype);
        setcourse(e.target.options[e.target.selectedIndex].dataset.course);
        set_course(e.target.value);
        setdone(true);
    }else{
        set_course("");
        setdone(false);
    }
    };

    const handletype = (e)=>{
        e.preventDefault();
        setIsleveld(false);
        setdone(false);
        let tp = e.target.value

        if(tp!==""){
      setqtype(tp);
      let qt ={
          type:e.target.value
      };
      
        getCourses(qt).then(allcourses=>{
            setcourses(allcourses.courses);
        });

    } else{
        setqtype("");
        setcurrmsg(prev=>[...prev,"Sorry,you did not select any quiz type!!!"]);
        setIserr(true);
    } 
    };

    const handlea = (e)=>{
        e.preventDefault();
        seta(e.target.value);
        let an = e.target.value;
        setallans(prev=>({...prev,a:an}));
    };
    const handleb = (e)=>{
        e.preventDefault();
        setb(e.target.value);
        let bn = e.target.value;
        setallans(prev=>({...prev,b:bn}));
        
    };
    const handlec = (e)=>{
        e.preventDefault();
        setc(e.target.value);
        let cn = e.target.value;
        setallans(prev=>({...prev,c:cn}));
    };
    const handled = (e)=>{
        e.preventDefault();
        setd(e.target.value);
        let dn = e.target.value;
        setallans(prev=>({...prev,d:dn}));
    };
    const handlecorrect = (e)=>{
        e.preventDefault();
        setcorrect(e.target.options[e.target.selectedIndex].value)
        //setcorrect(e.target.value);
    };

    const handlequestion = (e)=>{
        e.preventDefault();
        setquestion(e.target.value);
    };

    useEffect(()=>{
        document.title="add question";
    },[]);

    useEffect(()=>{
        monitor_fade();
     });


    if(!(isloggedin) && !(user.usertype==="admin")){
        return <Redirect to="/admin"/>
    }else{
    return (
        <div id="aq">
<Grid container>
<Grid item xs={2}></Grid>
<Grid item xs={8}>
   
    <Paper className={aqdstyle.root}>
    

            {
            iserr===true?
            currmsg.length!==0 && currmsg.map((msg,index)=>{
                    return <p key={index} className="alert alert-warning tofd">{msg}</p>
                }):
            currmsg.length!==0 && currmsg.map((msg,index)=>{
                    return <p key={index} className="alert alert-warning tofd">{msg}</p>
                })   

            }
 
 <div className={aqdstyle._aqdopad}>
 <h3>Add Question</h3>
           <Grid container spacing={6}>

           <Grid item>
           <select className="form-control" name="qtype" onChange={handletype} value={qtype}>
                <option value="">Choose Quiz Type</option>
                <option value="general">General</option>
                <option value="past_question">Past Questions</option>
            </select>
           </Grid>

           
           {qtype!=="" && qtype==="general" &&
          <>

          <Grid item>
      <select className="form-control" name="lvl" onChange={handlelvl} value={lvl}>
               <option value="">select level</option>
               <option value="lower_primary">LOWER PRIMARY</option>
               <option value="upper_primary">UPPER PRIMARY</option>
               <option value="jhs">JHS</option>
               <option value="shs">SHS</option>
          </select>
</Grid>

{is_shs===false && isleveled===true &&
    <Grid item>
           <select className="form-control" name="subject" onChange={handlecourse} value={thiscourse}>
           <option value="">Select Subjects</option>
                {_levelcourses!==null && _levelcourses.map((course,index)=>{
                    return(
                    <option key={index}  data-level={course.level} data-course={course.course} value={course.short_name}>{course.course}</option>
                    )
                })}
                
            </select>
</Grid>

}

{is_shs===true && isleveled===true &&
    <Grid item>
        <select className="form-control" name="core_el" onChange={handlecore_el} value={core_el}>
               <option value="">Core or Elective</option>
               <option value="core">Core</option>
               <option value="elective">Elective</option>
          </select>
    </Grid>

}
{is_core===true && is_shs===true &&
    <Grid item>
           <select className="form-control" name="core" onChange={handlecourse} value={thiscourse}>
           <option value="">Core Subjects</option>
                {_levelcore!==null && _levelcore.map((course)=>{
                    return(
                    <option key={course._id} data-level={course.level} data-course={course.course} value={course.short_name}>{course.course}</option>
                    )
                })}
                
            </select>
</Grid>

}

{is_elec===true && is_shs===true &&
<Grid item>
           <select className="form-control" name="elective" onChange={handlecourse} value={thiscourse}>
           <option value="">Elective Subjects</option>
                {_levelel!==null && _levelel.map((course)=>{
                    return(
                    <option key={course._id} data-level={course.level} data-course={course.course} value={course.short_name}>{course.course}</option>
                    )
                })}
                
            </select>
</Grid>

} 

            </>
           
           }

{qtype!=="" && qtype==="past_question" &&
           <>

<Grid item>
      <select className="form-control" name="lvl" onChange={handlelvl} value={lvl}>
               <option value="">select level</option>
               <option value="bece">BECE</option>
               <option value="wassce">SSCE/WASSCE</option>
               <option value="teacher_promotion">Teacher Promotion</option>
          </select>
</Grid>

{is_wassce===false && is_tp===false &&  isleveled===true &&
  <Grid item>
           <select className="form-control" name="subject" onChange={handlecourse} value={thiscourse}>
               <option value="">Select subject</option>
                {_levelcourses!==null && _levelcourses.map((course)=>{
                    return(
                    <option key={course._id}  data-level={course.level} data-examtype={course.exam_type} data-year={course.year} data-course={course.course} value={course.short_name}>{course.course.replace("_"," ")} ({course.year}) - {course.exam_type}</option>
                    )
                })}
                
            </select>
           
            </Grid>
}

{
  is_wassce===false && is_tp===true && isleveled===true &&
  <Grid item>
 
 <select className="form-control" name="rank" onChange={handlecourse} value={thiscourse}>
               <option value="">Rank</option>
               {_levelcourses!==null && _levelcourses.map((course)=>{
                    return(
                    <option key={course._id}  data-level={course.level}  data-year={course.year} data-course={course.course} value={course.short_name}>{course.course.replace("_"," ")} ({course.year})</option>
                    )
                })}
          </select>
          
</Grid>

}


{
  is_wassce===true && is_tp===false && isleveled===true &&
  <Grid item>
      <select className="form-control" name="core_el" onChange={handlecore_el} value={core_el}>
               <option value="">Core or Elective</option>
               <option value="core">Core</option>
               <option value="elective">Elective</option>
          </select>
</Grid>

}

{is_core===true && is_wassce===true &&

<Grid item>
           <select className="form-control" name="core" onChange={handlecourse} value={subject}>
           <option value="">Core Subjects</option>
                {_levelcore!==null && _levelcore.map((course)=>{
                    return(
                    <option key={course._id} data-examtype={course.exam_type} data-year={course.year} data-level={course.level} data-course={course.course} value={course.short_name}>{course.course}({course.year}) - {course.exam_type}</option>
                    )
                })}
                
            </select>
</Grid>
}

{is_elec===true && is_wassce===true &&
<Grid item>
           <select className="form-control" name="elective" onChange={handlecourse} value={subject}>
           <option value="">Elective Subjects</option>
                {_levelel!==null && _levelel.map((course)=>{
                    return(
                    <option key={course._id} data-level={course.level} data-examtype={course.exam_type} data-year={course.year} data-course={course.course} value={course.short_name}>{course.course}({course.year}) - {course.exam_type}</option>
                    )
                })}
                
            </select>
</Grid>

} 
        </>
      
           }


<Grid item>

{done &&
  <div>
  <p>upload/update the question file(urgent)<br/> <Button variant="contained" onClick={isdofile}>add/update question file</Button></p>
   
   </div>
}
</Grid>
<Grid item>
      {isfile && 
           <div>
               <h6>choose question file</h6>
               <input type="file" name="question_file" onChange={handlefile}/>
               <br/>
               <br/>
               <Button variant="contained" onClick={sendfile}>Add file</Button>
               <br/>
           </div>
     }       

</Grid>

</Grid>

</div>


            {done && 


            <div className={aqdstyle._aqdopad} id="question_area">
                 {qtype==="past_question" && is_tp===true && <h3>Add question for {lvl.replace("_"," ")},({year}),{thiscourse.replace("_"," ")}</h3> }
                {qtype==="past_question" && is_tp===false && <h3>Add question for {level},{examType}({year}),{thiscourse.replace("_"," ")}</h3> }
                {qtype==="general" && <h3>Add question for {level}, {thiscourse} </h3> }
                <Grid container spacing={6}>
             <Grid item>
             <TextField  label="question" multiline name="question" onChange={handlequestion} required />
             </Grid>
             <Grid item>
             <TextField  label="answer a" multiline name="answer_a" onChange={handlea} required/>
             </Grid>
             <Grid item>
             <TextField  label="answer b" multiline name="answer_b" onChange={handleb} required/>
             </Grid>
             <Grid item>
             <TextField  label="answer c" multiline name="answer_c" onChange={handlec} required/>
             </Grid>
             <Grid item>
             <TextField  label="answer d" multiline name="answer_d" onChange={handled} required/>
             </Grid>
            
             <Grid item>
             {allans.a!=="" && allans.b!=="" && allans.c!=="" && allans.d!==""?
            <select className="form-control" name="correct_answer" onChange={handlecorrect}>
            <option value="">choose correct answer</option>
            
            (
                <option value={allans.a}>{allans.a}</option>
                <option value={allans.b}>{allans.b}</option>
                <option value={allans.c}>{allans.c}</option>
                <option value={allans.d}>{allans.d}</option>
            )
            
            </select>:
    null
    }
             </Grid>
            </Grid>
            <br/>
            <p><Button variant="contained" onClick={handlesubmit}>Submit</Button></p>
            </div>

            }

</Paper>
</Grid>
<Grid item xs={2}></Grid>
</Grid>
        </div>
    )
    }
}
