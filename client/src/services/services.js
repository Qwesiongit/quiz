//import Axios from 'axios';
import axios from 'axios';

const _axios = axios.create({
    withCredentials:true
});
//axios.defaults.withCredentials=true;

const DO_SOMETHING_ENDPOINT = 'http://localhost:8595/api/user/something';
const USER_LOGIN_API_ENDPOINT = 'http://localhost:8595/api/user/login';
const USER_LOGOUT_API_ENDPOINT = 'http://localhost:8595/api/user/logout';
const USER_REGISTER_API_ENDPOINT = 'http://localhost:8595/api/user/register';
const USER_UPDATE_API_ENDPOINT = 'http://localhost:8595/api/user/updateuser';
const ADMIN_LOGIN_API_ENDPOINT = 'http://localhost:8595/api/admin/login';
const ADMIN_LOGOUT_API_ENDPOINT = 'http://localhost:8595/api/admin/logout';
const ADMIN_REGISTER_API_ENDPOINT = 'http://localhost:8595/api/admin/register';
const ADMIN_UPDATE_API_ENDPOINT = 'http://localhost:8595/api/admin/updateadmin';
const USER_PAYMENTS_API_ENDPOINT = 'http://localhost:8595/api/user/mypayments';
const IFADMIN_API_ENDPOINT ='http://localhost:8595/api/admin/isexist';
const COURSE_ADD_API_ENDPOINT ='http://localhost:8595/api/admin/addcategory';
const GET_COURSES_ENDPOINT="http://localhost:8595/api/admin/getcourses";
const ADD_QUESTION_ENDPOINT="http://localhost:8595/api/admin/addquestion";
const GET_PAYMENTS_ENDPOINT="http://localhost:8595/api/admin/showpayments";
const ADD_FILE_END_POINT ='http://localhost:8595/api/admin/addqfile';
const DO_CHECK_LOGGED_IN_ENDPOINT ='http://localhost:8595/api/user/checkwhologged';
const GET_USERS_ENDPOINT ='http://localhost:8595/api/admin/getusers';
const GET_COURSES_USER_ENDPOINT="http://localhost:8595/api/user/getcourses";
const GET_COURSES_HOME_ENDPOINT="http://localhost:8595/api/user/getcourses_";

const ADMIN_FORGOT_PASSWORD_ENDPOINT ='http://localhost:8595/api/admin/resetpassword';
const USER_FORGOT_PASSWORD_ENDPOINT ='http://localhost:8595/api/user/resetpassword';
const ADMIN_CHANGE_PASSWORD_ENDPOINT ='http://localhost:8595/api/admin/changepassword';
const USER_CHANGE_PASSWORD_ENDPOINT ='http://localhost:8595/api/user/changepassword';
const ADD_SCORE_ENDPOINT='http://localhost:8595/api/user/addscore';
const SHOW_SCORES_ENDPOINT='http://localhost:8595/api/user/getscores';
const ACTIVATE_ENDPOINT='http://localhost:8595/api/admin/doactivate';
const DEACTIVATE_ENDPOINT='http://localhost:8595/api/admin/dodeactivate';
const ADMIN_ACTIVATES_ENDPOINT="http://localhost:8595/api/admin/adminactivates";

export const do_something = ()=>{
    return _axios.get(DO_SOMETHING_ENDPOINT).then(res=>{
     console.log(res);
    });
}

export const checkloggein = ()=>{
    return _axios.get(DO_CHECK_LOGGED_IN_ENDPOINT).then(res=>{
     return res.data;
     //console.log(res.data);
    });
}

export const do_login = (user)=>{
    switch (user.usertype) {
        case "normal":
      return _axios.post(USER_LOGIN_API_ENDPOINT,user).then(res=>{
           return res.data;
        }).catch(err=>{
            console.log(err)
        });

         case "admin":
         return _axios.post(ADMIN_LOGIN_API_ENDPOINT,user).then(resp=>{
            return resp.data;
            }).catch(er=>{
                console.log(er)
            });
        default:
            console.log("invalid usertype");
            break;
    }
}


export const do_register = (user)=>{
    let utype = user.get('usertype');
    let smth={
        headers:{
            'Content-Type':'multipart/form-data'
        }
    };

    switch (utype) {
        case "normal":
           return _axios.post(USER_REGISTER_API_ENDPOINT,user,smth).then(res=>{
                //console.log(res.data)
                return res.data;
            }).catch(err=>{
                console.log(err)
            });

         case "admin":
           return _axios.post(ADMIN_REGISTER_API_ENDPOINT,user,smth).then(res=>{
                return res.data;
            }).catch(err=>{
                console.log(err)
            });
        default:
            console.log("invalid usertype");
            break;
    }
};

export const do_updatebio = (user)=>{
    let utype = user.get('usertype');
    let smth={
        headers:{
            'Content-Type':'multipart/form-data'
        }
    };

    switch (utype) {
        case "normal":
           return _axios.post(USER_UPDATE_API_ENDPOINT,user,smth).then(res=>{
                return res.data;
            }).catch(err=>{
                console.log(err)
            });
         case "admin":
           return _axios.post(ADMIN_UPDATE_API_ENDPOINT,user,smth).then(res=>{
                return res.data;
            }).catch(err=>{
                console.log(err)
            });
        default:
            console.log("invalid usertype");
            break;
    }
}



export const do_logout = (usertype)=>{
    switch (usertype) {
        case "normal":
       return _axios.get(USER_LOGOUT_API_ENDPOINT).then(res=>{
            //console.log(res.data);
            return(res.data);
        }).catch(err=>{
            console.log(err)
        });
            
         case "admin":
          return _axios.get(ADMIN_LOGOUT_API_ENDPOINT).then(resp=>{
                return(resp.data);
            }).catch(er=>{
                console.log(er)
            });
            
        default:
            console.log("invalid usertype");
            break;
    }
};


export const do_reset_password = (user)=>{
    switch (user.usertype) {
        case "normal":
       return _axios.post(USER_FORGOT_PASSWORD_ENDPOINT,user).then(res=>{
            return(res.data);
        }).catch(err=>{
            console.log(err)
        });     
         case "admin":
          return _axios.post(ADMIN_FORGOT_PASSWORD_ENDPOINT,user).then(resp=>{
                return(resp.data);
            }).catch(er=>{
                console.log(er)
            });
            
        default:
            console.log("invalid usertype");
            break;
    }
};


export const do_change_password = (user)=>{
    switch (user.usertype) {
        case "normal":
       return _axios.post(USER_CHANGE_PASSWORD_ENDPOINT,user).then(res=>{
            return(res.data);
        }).catch(err=>{
            console.log(err);
        });
            
         case "admin":
          return _axios.post(ADMIN_CHANGE_PASSWORD_ENDPOINT,user).then(resp=>{
                return(resp.data);
            }).catch(er=>{
                console.log(er)
            });
            
        default:
            console.log("invalid usertype");
            break;
    }
};



export const doAdminExist = ()=>{
  return _axios.get(IFADMIN_API_ENDPOINT).then(resp=>{
        return(resp.data);
    }).catch(er=>{
        console.log(er)
    });
};


export const addCourse = (subject)=>{
    return _axios.post(COURSE_ADD_API_ENDPOINT,subject).then(resp=>{
        return(resp.data);
    }).catch(er=>{
        console.log(er)
    });

};

export const getCourses = (type)=>{
    return _axios.post(GET_COURSES_ENDPOINT,type).then(resp=>{
        return(resp.data);
    }).catch(er=>{
        console.log(er)
    });

};

export const _getCourses = (type)=>{
    return _axios.post(GET_COURSES_USER_ENDPOINT,type).then(resp=>{
        //console.log(resp.data);
        return(resp.data);
    }).catch(er=>{
        console.log(er)
    });

};

export const getCourses_ = (type)=>{
    return _axios.post(GET_COURSES_HOME_ENDPOINT,type).then(resp=>{
        //console.log(resp.data);
        return(resp.data);
    }).catch(er=>{
        console.log(er)
    });

};

export const getUsers = (dt)=>{
    return _axios.post(GET_USERS_ENDPOINT,dt).then(res=>{
        return(res.data);
    }).catch(er=>{
        console.log(er)
    });

};


export const addQuestion = (data)=>{
    return _axios.post(ADD_QUESTION_ENDPOINT,data).then(resp=>{
        return(resp.data);
    }).catch(er=>{
        console.log(er)
    });
};

export const add_question_file = (data)=>{
    let smth={
        headers:{
            'Content-Type':'multipart/form-data'
        }
    };

    return _axios.post(ADD_FILE_END_POINT,data,smth).then(res=>{
        return(res.data);
    }).catch(er=>{
        console.log(er)
    });
    
};


export const addScore = (score)=>{
    return _axios.post(ADD_SCORE_ENDPOINT,score).then(res=>{
        return(res.data);
    }).catch(er=>{
        console.log(er)
    });

};

export const showScore = (_user)=>{
    return _axios.post(SHOW_SCORES_ENDPOINT,_user).then(res=>{
        return(res.data);
    }).catch(er=>{
        console.log(er)
    });

};

export const show_my_payments = (_user)=>{
    return _axios.post(USER_PAYMENTS_API_ENDPOINT,_user).then(res=>{
        return(res);
    }).catch(er=>{
        console.log(er);
    });

};

export const doActivate = (__user)=>{
    return _axios.post(ACTIVATE_ENDPOINT,__user).then(res=>{
        return(res.data);
    }).catch(er=>{
        console.log(er);
    });
};

export const deActivate = (__user)=>{
    return _axios.post(DEACTIVATE_ENDPOINT,__user).then(res=>{
        return(res.data);
    }).catch(er=>{
        console.log(er);
    });
};

export const doAdminActivates = (__user)=>{
    return _axios.post(ADMIN_ACTIVATES_ENDPOINT,__user).then(res=>{
        return(res.data);
    }).catch(er=>{
        console.log(er);
    });
};


export const all_payments = ()=>{
    return _axios.post(GET_PAYMENTS_ENDPOINT).then(res=>{
        return(res.data);
    }).catch(er=>{
        console.log(er);
    });
};


