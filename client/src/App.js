import React from 'react';
import './App.css';
import Home from './components/Home';
import Myprovider from './components/Myprovider';
import {BrowserRouter as Router,Route,Routes as Switch} from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import AdminHome from './components/admin/AdminHome';
import AdminDashboard from './components/admin/AdminDashboard';
import UserDashboard from './components/user/UserDashboard';
import ToPay from './components/ToPay';
import MakeSuper from './components/admin/MakeSuper';
import QuizHome from './components/user/QuizHome';
import QuizMain from './components/user/QuizMain';
import QuizResult from './components/user/QuizResult';
import ChangePassword from './components/user/ChangePassword';
import UpdateBio from './components/user/UpdateBio';
import QuizHistory from './components/user/QuizHistory';
import Activations from './components/admin/Activations';
import AddAdmin from './components/admin/AddAdmin';
import AddQuestion from './components/admin/AddQuestion';
import AddCourse from './components/admin/AddCourse';
import UpdateBios from './components/admin/UpdateBios';
import PasswordChange from './components/admin/PasswordChange';
import ForgotPassword from './components/user/ForgotPassword';
import ForgottenPassword from './components/admin/ForgottenPassword';
import AddGenCourse from './components/admin/AddGenCourse';
import AddPQCourse from './components/admin/AddPQCourse';
import Header from './components/Header';
import Navbar from './components/AppNavbar';
import AppIndex from './components/AppIndex';
import EduMaterial from './components/EduMaterial';

const App=()=>{
  return (
    <Router>
  <div id="_main">
  
   
     <Myprovider>
     
     {/*<nav>
          <Header title="Quiz App" />
            </nav>
            <br/>
            <br/>
            <br/>
            <br/>*/
  }
  <Navbar/>
    <Switch>
   <Route path="/" element={<AppIndex/>} exact={true}/>
   <Route path="/about" element={<About/>} exact={true}/>
   <Route path="/topay" element={<ToPay/>} exact={true}/>
   <Route path="/contact" element={<Contact/>} exact={true}/>
   <Route path="/login" element={<Login/>} exact={true}/>
   <Route path="/register"  element={<Register/>} exact={true}/>
   <Route path="/admin" element={<AdminHome/>} exact={true}/>
   <Route path="/addsuper" element={<MakeSuper/>} exact={true}/>
   <Route path="/admindashbord" element={<AdminDashboard/>} exact={true}/>
   <Route path="/quizhome" element={<QuizHome/>} exact={true}/>
   <Route path="/quizmain" element={<QuizMain/>} exact={true}/>
   <Route path="/quizresult" element={<QuizResult/>} exact={true}/>
   <Route path="/updatebio" element={<UpdateBio/>} exact={true}/>
   <Route path="/changepassword" element={<ChangePassword/>} exact={true}/>
   <Route path="/quizhistory" element={<QuizHistory/>} exact={true}/>
   <Route path="/userdashboard" element={<UserDashboard/>} exact={true}/>
   <Route path="/doactivations" element={<Activations/>} exact={true}/>
   <Route path="/addadmin"  element={<AddAdmin/>} exact={true}/>
   <Route path="/addquestion"  element={<AddQuestion/>} exact={true}/>
   <Route path="/addcourse" element={<AddCourse/>} exact={true}/>
   <Route path="/alterpassword" element={<PasswordChange/>} exact={true}/>
   <Route path="/userpasswordreset"  element={<ForgotPassword/>} exact={true}/>
   <Route path="/adminpasswordreset"  element={<ForgottenPassword/>} exact={true}/>
   <Route path="/addgencourse" element={<AddGenCourse/>} exact={true}/>
   <Route path="/addpqcourse" element={<AddPQCourse/>} exact={true}/>
   <Route path="/adminupdate" element={<UpdateBios/>} exact={true}/>
   <Route path="/edumaterials" element={<EduMaterial/>} exact={true}/>
   </Switch>
    </Myprovider>
  
   </div>
   </Router>
  );
}  

export default App;


