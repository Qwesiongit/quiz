import React,{useContext,useEffect,useState} from 'react';
import {/*useNavigate as useHistory,*/Navigate as Redirect} from 'react-router-dom';
import {addCourse } from './../../services/services';
import userContext from '../../context/userContext';
//import { SET_QUIZ_TYPE} from '../../store/actions';
import {Grid,TextField,Button,Paper,createTheme} from '@mui/material';
import { monitor_fade } from '../../services/custom';
import {makeStyles} from '@mui/styles';
const theme = createTheme();

    const _agdoStyle=makeStyles(()=>({
        root:{
            backgroundColor:'#fdfdff',
        },
        _agdopad:{
            padding:theme.spacing(2)
        }
    }));

export default function AddGenCourse() {
    let agdstyle = _agdoStyle();
    //let history=useHistory();
    let [state/*,dispatch*/] = useContext(userContext);
    let [course,setcourse] =  useState("");
    let [thecourse,set_thecourse] =  useState("");
    let [_course,_setcourse] =  useState("");
    let [level,setlevel] =  useState("");
    let [is_shs,setIs_shs] =  useState(false);
    let [waserr,setwaserr] =  useState(false);

    let [min,setmin] =  useState("");
    let [hr,sethr] =  useState("");
    let [sec,setsec] =  useState("");

    let [currmessage,setcurrmessage] =  useState([]);
    let {user,quiz_type,isloggedin}=state;
    //let baseuri ="http://localhost:8595/";
    let [core_elective,setcore_elctive] =  useState('');
    let [core_,setcore_] =  useState(false);
    let [elective_,set_elective_] =  useState(false);
    let [levelled,set_levelled] =  useState(false);
    let [coursed,set_coursed] =  useState(false);



    const handlehr = (e)=>{
        let _hr = e.target.value;
        if(_hr!==""){
            sethr(_hr);
        }else{
            sethr("");
        }
    }

    const handlemin = (e)=>{
        let _min = e.target.value;
        if(_min!==""){
            setmin(_min);
        }else{
            setmin("");
        }
    }

    const handlesec = (e)=>{
        let _sec = e.target.value;
        if(_sec!==""){
            setsec(_sec);
        }else{
            setsec("");
        }
    }
  
      const handlelevel = (e) =>{
          e.preventDefault();
          let thislevel = e.target.value;
          if(thislevel!==""){
              console.log(thislevel);
          setlevel(thislevel);
          set_levelled(true);
          thislevel === "shs"?setIs_shs(true):setIs_shs(false);
        }else{
            setlevel("");
            set_levelled(false);
        }
      };
  
      const handlecourse = (e) =>{
          e.preventDefault()
          let ks = e.target.value;
         if(ks!==""){
            set_coursed(true);
            set_thecourse(ks);
          if(is_shs){
            core_elective==="core"?_setcourse("core "+ks):_setcourse(ks);
            core_elective === "core"?setcourse(core_elective+"_"+ks.replace(" ","_")):setcourse(core_elective+"_"+ks.replace(" ","_"));
          }else{
          _setcourse(ks);
          setcourse(ks.replace(" ","_"));
        }
    }else{
      _setcourse("");
      setcourse("");
      set_coursed(false);
    }
      };
  
      const handlesubmit = () =>{
          let shortname ="gen_"+level.toLowerCase()+"_"+course.toLowerCase();
          let course_pretty = _course.replace("_"," ");
          let level_pretty = level.replace("_"," ");
          let todo ={
              type:quiz_type,
              level:level_pretty,
              course:course_pretty,
              short_name:shortname,
              min:min,
              sec:sec,
              hr:hr
          };


          addCourse(todo).then(res=>{
            if(res.errors){
                let allerr=res.errors;
                for (const er in allerr) {
                    if (allerr.hasOwnProperty(er)) {
                        const element = allerr[er];
                        setcurrmessage(prev=>[...prev,element.msg]);
                        setwaserr(true);
                    }
                }
               }else if(res.success===false){
                setcurrmessage(prev=>[...prev,res.message]);
                setwaserr(true);
               }else{
                setcurrmessage(prev=>[...prev,res.message]);
                setwaserr(false);
               }
          });

      };


      const handlecorElective = (e) =>{
        e.preventDefault();
        let c_r = e.target.value;
        if(c_r!==""){
        setcore_elctive(c_r);
        if(c_r==="core"){
            setcore_(true);
            set_elective_(false);
        }else{
            setcore_(false);
        }
        if(c_r==="elective"){
            set_elective_(true);
            setcore_(false);
        }else{
            set_elective_(false);
        }  
    }else{
        setcore_elctive("");
    }
    };


      useEffect(()=>{
        document.title="add general course";
    },[]);

    useEffect(()=>{
        monitor_fade();
     });




      if(!(isloggedin) && !(user.usertype==="admin")){
        return <Redirect to="/"/>
    }else{ 

    return (
        <div className='mt-5'>

<Grid container>
<Grid item xs={3}></Grid>
<Grid item xs={6}>

<Paper className={agdstyle.root}>
            <div className={agdstyle._agdopad}>

            <h1>Add General courses</h1>

            {
            waserr===true?
            currmessage.length!==0 && currmessage.map((err,index)=>{
                    return <p key={index} className="alert alert-warning tofd">{err}</p>
                }):
            currmessage.length!==0 && currmessage.map((err,index)=>{
                    return <p key={index} className="alert alert-success tofd">{err}</p>
                })

                
                }


            <Grid container spacing={6}>
                <Grid item>
            <select className="form-control" name="level" onChange={handlelevel} value={level}>
                <option value="">Choose Level</option>
                <option value="lower_primary">LOWER PRIMARY</option>
                <option value="upper_primary">UPPER PRIMARY</option>
                <option value="jhs">JHS</option>
                <option value="shs">SHS</option>
            </select>
            </Grid>
            
            {
            is_shs===true && levelled===true &&
            <Grid item>
            <select className="form-control" name="coreorelective" onChange={handlecorElective} value={core_elective}>
                <option value="">core or elective</option>
                <option value="core">CORE</option>
                <option value="elective">ELECTIVE</option>
            </select>
            </Grid>
            }

{
    is_shs===true && core_ === true && core_elective!=="" && 
    <Grid item>
            <select className="form-control" name="course" onChange={handlecourse} value={thecourse}>
                <option value="">Select course</option>
                <option value="english">ENGLISH</option>
                <option value="social studies">SOCIAL STUDIES</option>
                <option value="mathematics">MATHEMATICS</option>
                <option value="integrated science">SCIENCE</option>
                <option value="information and comm technology">INFORMATION AND COMM. TECHNOLOGY</option>
            </select>
            </Grid>

}

{
    is_shs===true && elective_===true && core_elective!=="" && 
    <Grid item>
            <select className="form-control" name="course" onChange={handlecourse} value={thecourse}>
                <option value="">Select course</option>
                <option value="literature">LITERATURE</option>
                <option value="physics">PHYSICS</option>
                <option value="mathematics">MATHEMATICS</option>
                <option value="chemistry">CHEMISTRY</option>
                <option value="information and comm technology">INFORMATION AND COMM. TECHNOLOGY</option>
                <option value="geograpgy">GEOGRAPHY</option>
                <option value="economics">ECONOMICS</option>
                <option value="technical drawing">DRAWING</option>
                <option value="genral knowledge in art">GKA</option>
                <option value="business management">BUSINESS MANAGEMENT</option>
                <option value="food and nutrition">FOOD AND NUTRITION</option>
                <option value="dress making">DRESS MAKING</option>
                <option value="graphic design">GRPHIC DESIGN</option>
                <option value="fante">FANTE</option>
                <option value="french">FRENCH</option>
            </select>
            </Grid>

}

{
    is_shs===false && levelled===true && level==="jhs" &&
    <Grid item>
            <select className="form-control" name="course" onChange={handlecourse} value={thecourse}>
                <option value="">Select course</option>
                <option value="mathematics">MATHEMATICS</option>
                <option value="information and comm technology">INFORMATION AND COMM. TECHNOLOGY</option>
                <option value="pre-technical skills">PRE TECHNICAL SKILLS</option>
                <option value="learther works">LEARTHER WORKS</option>
                <option value="food and nutrition">FOOD AND NUTRITION</option>
                <option value="dress making">DRESS MAKING</option>
                <option value="fante">FANTE</option>
                <option value="french">FRENCH</option>
                <option value="integrated science">SCIENCE</option>
                <option value="social studies">SOCIAL STUDIES</option>
            </select>
            </Grid>

}

{
    is_shs===false && levelled===true && level==="upper_primary" &&
    <Grid item>
            <select className="form-control" name="course" onChange={handlecourse} value={thecourse}>
                <option value="">Select course</option>
                <option value="mathematics">MATHEMATICS</option>
                <option value="information and comm technology">INFORMATION AND COMM. TECHNOLOGY</option>
                <option value="creative art">CREATIVE ART</option>
                <option value="fante">FANTE</option>
                <option value="french">FRENCH</option>
                <option value="integrated science">SCIENCE</option>
                <option value="citizenship education">CITIZENSHIP EDUCATION</option>
            </select>
            </Grid>

}

{
    is_shs===false && levelled===true && level==="lower_primary" &&
    <Grid item>
            <select className="form-control" name="course" onChange={handlecourse} value={thecourse}>
                <option value="">Select course</option>
                <option value="mathematics">MATHEMATICS</option>
                <option value="information and comm technology">INFORMATION AND COMM. TECHNOLOGY</option>
                <option value="creative art">CREATIVE ART</option>
                <option value="fante">FANTE</option>
                <option value="french">FRENCH</option>
                <option value="science and nature">SCIENCE AND NATURE</option>
                <option value="citizenship education">CITIZENSHIP EDUCATION</option>
            </select>
            </Grid>

}


{
    coursed===true && levelled===true &&
    <>
            <Grid item>
            <select className="form-control" name="hr" onChange={handlehr} value={hr}>
                <option value="">choose hour</option>
                <option value="0">0 Hour</option>
                <option value="1">1 Hour</option>
                <option value="2">2 Hours</option>
            </select>
            </Grid>

            <Grid item>
            <select className="form-control" name="min" onChange={handlemin} value={min}>
                <option value="">choose minutes</option>
                <option value="0">0 Minute</option>
                <option value="30">30 Minutes</option>
                <option value="40">40 Minutes</option>
                <option value="45">45 Minutes</option>
                <option value="50">50 Minutes</option>
            </select>
            </Grid>

            <Grid item>
            <select className="form-control" name="sec" onChange={handlesec} value={sec}>
                <option value="">choose seconds</option>
                <option value="0">0 Second</option>
                <option value="30">30 30 Second</option>
            </select>
            </Grid>

 </>
}

            </Grid>
            <br/>
            <p><Button variant="contained" onClick={handlesubmit}>Submit</Button></p>


</div>
</Paper>
</Grid>
<Grid item xs={3}></Grid>
</Grid>
        </div>
    )
    }
}
