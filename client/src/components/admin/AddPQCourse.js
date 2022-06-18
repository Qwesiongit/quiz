import React,{useContext,useState,useEffect} from 'react';
import {Navigate as Redirect} from 'react-router-dom';
import {addCourse } from './../../services/services';
import userContext from '../../context/userContext';
//import { SET_QUIZ_TYPE} from '../../store/actions';
import {Grid,TextField,Button,Paper,createTheme} from '@mui/material';
import { monitor_fade } from '../../services/custom';
import {makeStyles} from '@mui/styles';

const theme = createTheme();


    const _apqdoStyle=makeStyles(()=>({
        root:{
            backgroundColor:'#fdfdff',
        },
        _apqdopad:{
            padding:theme.spacing(2)
        }
    }));

export default function AddPQCourse() {
    let apqdstyle = _apqdoStyle();
    //let history=useHistory();
    let [state/*,dispatch*/] = useContext(userContext);
    let [course,setcourse] =  useState("");
    let [_course,_setcourse] =  useState("");
    let [level,setlevel] =  useState("");
    let [year,setyear] =  useState("");
    let [_type,set_type] =  useState("");
    let [currmessage,setcurrmessage] =  useState([]);
    let {user,quiz_type,isloggedin}=state;
    let [waserr,setwaserr] =  useState(false);
    //let baseuri ="http://localhost:8595/";
    let [is_wassce,setIs_wassce] =  useState(false);
    let [is_tp,set_tp] =  useState(false);
    let [rank,_setrank] =  useState("");
    let [core_elective,setcore_elctive] =  useState('');

    let [min,setmin] =  useState("");
    let [hr,sethr] =  useState("");
    let [sec,setsec] =  useState("");
    let [levelled,set_levelled] =  useState(false);
    let [thecourse,set_thecourse] =  useState("");


    const handleyear = (e) =>{
      e.preventDefault();
      setyear(e.target.value);
      
    };

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
        //setlevel(e.target.value);
        let thislevel = e.target.value;
        if(thislevel!==""){
          setlevel(thislevel);
          set_levelled(true);
          if(thislevel === "wassce"){
            setIs_wassce(true);
          }else
          {
            setIs_wassce(false);
          }
          if(thislevel === "teacher_promotion"){
            set_tp(true);
          }else
          {
            set_tp(false);
          }
        }else{
        setlevel("");
        set_levelled(false);
        }
    };

    const handleType = (e)=>{
        e.preventDefault();
        let t_p = e.target.value;
        t_p!==""?set_type(t_p):set_type("");
    }

    const handlecourse = (e) =>{
        e.preventDefault();
        let ks =e.target.value;
        if(ks!==""){
            set_thecourse(ks);
        if(is_wassce){
            core_elective==="core"?_setcourse("core "+ks):_setcourse(ks);
            core_elective === "core"?setcourse(core_elective+"_"+ks.replace(" ","_")):setcourse(core_elective+"_"+ks.replace(" ","_"));
          }else{
          _setcourse(ks);
          setcourse(ks.replace(" ","_"));
        }

        }else{
            set_thecourse("");
            _setcourse("");
            setcourse("");
        }
    };

    const handlerank = (e)=>{
        let c = e.target.value

      }


    const handlecorElective = (e) =>{
        e.preventDefault()
        setcore_elctive(e.target.value);
    };

    const handlesubmit = () =>{
        console.log("quiz type",quiz_type);
        console.log("level",level);
        console.log("year",year);
        console.log("course",course);

        let shortname ="pq_"+level.toLowerCase()+"_"+_type.toLowerCase()+"_"+year.toLowerCase()+"_"+course.toLowerCase();
              let course_pretty = _course.replace("_"," ");
        let todo ={
              exam_type:_type,
              type:quiz_type,
              level:level,
              course:course_pretty,
              year:year,
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

    useEffect(()=>{
        document.title="add course";
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
<Grid item xs={2}></Grid>
<Grid item xs={8}>


<Paper className={apqdstyle.root}>
            <div className={apqdstyle._apqdopad}>

            <h3>ADD PAST QUESTION COURSE</h3>
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
                <Grid item xs={5}>
            <select className="form-control" name="level" onChange={handlelevel} value={level}>
            <option value="">Choose Level</option>
                <option value="bece">BECE</option>
                <option value="wassce">WASSCE</option>
                <option value="teacher_promotion">TEACHER PROMOTION</option>
            </select>
            </Grid>
            
            {
            is_wassce===true && levelled===true &&
            <Grid item>
            <select className="form-control" name="coreorelective" onChange={handlecorElective} value={core_elective}>
                <option value="">core or elective</option>
                <option value="core">CORE</option>
                <option value="elective">ELECTIVE</option>
            </select>
            </Grid>
            }

{
            is_tp===true && levelled===true &&
            <Grid item>
            <select className="form-control" name="course" onChange={handlecourse} value={course}>
                <option value="">Rank</option>
                <option value="principal_sup">Pinc. Sup</option>
                <option value="assist_director_2">AD 2</option>
                <option value="assist_director_1">AD 1</option>
                <option value="deputy_director">Dep Director</option>
                <option value="director">Director</option>
            </select>
            </Grid>
            }

{
    is_tp===false && levelled===true &&
            <Grid item xs={5}>
            <select className="form-control" name="type" onChange={handleType} value={_type}>
            <option value="">Choose Type</option>
                <option value="regular">REGULAR</option>
                <option value="private">PRIVATE</option>
            </select>
            </Grid>
}

          
{
    is_tp===false && levelled===true && level==="wassce" && _type!=="" && core_elective==="core" &&
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
    is_tp===false && levelled===true && level==="wassce" && _type!=="" && core_elective==="elective" &&
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
    is_tp===false && levelled===true && level==="bece" && _type!=="" &&
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
    </select>
    </Grid>

}

{
    thecourse!=="" && levelled===true &&
    <>
 <Grid item xs={5}>
            <select className="form-control" name="year" onChange={handleyear} value={year}>
            <option value="">Choose Year</option>
                <option value="1990">1990</option>
                <option value="1991">1991</option>
                <option value="1992">1992</option>
                <option value="1993">1993</option>
                <option value="1994">1994</option>
                <option value="1995">1995</option>
                <option value="1996">1996</option>
                <option value="1997">1997</option>
                <option value="1998">1998</option>
                <option value="1999">1999</option>
                <option value="2000">2000</option>
                <option value="2001">2001</option>
                <option value="2002">2002</option>
                <option value="2003">2003</option>
                <option value="2004">2004</option>
                <option value="2005">2005</option>
                <option value="2006">2006</option>
                <option value="2007">2007</option>
                <option value="2008">2008</option>
                <option value="2009">2009</option>
                <option value="2010">2010</option>
                <option value="2011">2011</option>
                <option value="2012">2013</option>
                <option value="2013">2013</option>
                <option value="2014">2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
            </select>
            </Grid>



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
<Grid item xs={2}></Grid>
</Grid>
        </div>
    )
    }
}
