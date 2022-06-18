import $ from 'jquery';

export const monitor_fade = ()=>{
    let sa = $('.tofd');
    if(sa.is(':visible')){
    setTimeout(()=>{sa.fadeOut("slow")},2000);
    }
    
   };


export const durations = {
    eng:{
        min:120,
    },

    maths_core:{
        min:60
    },

    home_rcons:{
        min:60
    },

    social:{
        min:45
    }
};

export const update_user_tick = (d)=>{
    d--;
    if(d===0){
    //history.push("/contact");
    console.log("time up");
    }else{
        console.log(d);

    }
    
};

export const userTimed =(ref,fun)=>{
    ref = setInterval(fun,1000);
};


export const reset_time = (d)=>{
    d=50;
};

export const check_active = (fun)=>{
    window.addEventListener("mousemove",fun);
    window.addEventListener("mouseover",fun);
    window.addEventListener("keydown",fun);
};

export const handle_img  = ()=>{
    var img = null;
    let ran =null;
    var my_images =["sc2.jpeg","sc3.png","sc4.jpg","sc5.png","sc6.jpg","sc7.jpg","sc8.jpg","sc9.jpg"];
     ran = Math.floor(Math.random()*my_images.length);
     img = my_images[ran];
    return img;

}
export const rand_course = (arr)=>{
  var q_arr = [];
  let course_info = {};
  let ran = null;
  let ran1 = null;
  let ran2 = null;
  let c_s = null;
  let db={};
  ran = Math.floor(Math.random()*arr.length);
  c_s = arr[ran];
  
   c_s.level ==="bece"|| c_s.level==="wassce"?
   course_info ={
       level:c_s.level,
       course:c_s.course,
       year:c_s.year,
   }:
   course_info = {
    level:c_s.level,
    course:c_s.course
}
  let qs = c_s.question_items;
  if(!(qs.length===0)){
  ran1 = Math.floor(Math.random()*qs.length);
  ran1===qs.length?ran2=ran1-1:ran2=ran1+1;
  let first = qs[ran1];
  let second = qs[ran2];
  if(first!==undefined && second!==undefined){
    q_arr=[first,second];
  }
  if(first!==undefined && second===undefined){
    q_arr=[first];
  }
  if(first===undefined && second!==undefined){
    q_arr=[second];
  }
  let togo = {
      info:course_info,questions:q_arr
  }

   db = {
      status:true,
      data:togo
  }

}else{
    db= {
       status:false,
       data:"no data"
   }
}
//console.log("final",db);
return(db);
}

