import {LOGOUT_USER,RE_QUIZ,RESET_QUIZ,
    RESET_CHOICE,SET_CURRENT_USER,SET_QUIZ,
    SET_CHOICE,SET_SCORE,SET_TO_PAY_USER,
    SET_DONE_SUPER,SET_CONTAIN_ADMIN,SET_QUIZ_TYPE} from './actions';


export default function userReducer(state,action) {
    switch (action.type) {
        case SET_CURRENT_USER:
          return{
            ...state,
            user:action.user,isloggedin:action.isloggedin,loggedin_time:action.loggedin_time
          }
        case SET_TO_PAY_USER:
            return{
              ...state,
              user:action.user,topay:action.topay
            }
          case LOGOUT_USER:
          return{
            ...state,
            user:action.user,isloggedin:false,loggedin_time:null
          }

          case SET_QUIZ:
          return{
            ...state,
            quiz_type:action.quiz_type,course:action.course,quiz_questions:action.quiz_questions
          }

          case SET_CHOICE:
          return{
            ...state,
            current_question:action.current_question,user_choice:action.user_choice,correct_ans:action.correct_ans
          }

          case RE_QUIZ:
          return{
            ...state,
            current_question:" ",user_choice:"",correct_ans:"",score:{}
          }

          case RESET_QUIZ:
          return{
            ...state,
            quiz_type:"",quiz_questions:{}
          }

          case SET_QUIZ_TYPE:
          return{
            ...state,
            quiz_type:action.quiz_type
          }

          case SET_SCORE:
          return{
            ...state,
            score:action.score
          }

          case SET_CONTAIN_ADMIN:
          return{
            ...state,
            containadmin:action.containadmin
          }

          case SET_DONE_SUPER:
          return{
            ...state,
            fosuper:action.forsuper
          }

          case RESET_CHOICE:
          return{
            ...state,
            current_question:" ",user_choice:" "
          }
        default:
          return state;
      }
}

