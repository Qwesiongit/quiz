import React,{useContext,useState,useEffect} from 'react';
import {/*useNavigate as useHistory,*/Navigate as Redirect} from 'react-router-dom';
import { getUsers,doActivate,deActivate,doAdminActivates } from './../../services/services';
import userContext from '../../context/userContext';
import { monitor_fade } from '../../services/custom';
import {Grid,Table,
    TableBody,TableRow,
    TableCell,TableHead,Button,Paper,createTheme} from '@mui/material';
    import {makeStyles} from '@mui/styles';

    const theme = createTheme();


    const _acdoStyle=makeStyles(()=>({
        root:{
            backgroundColor:'#fdfdff',
        },
        _acdopad:{
            padding:theme.spacing(2)
        }
    }));

export default function Activations() {
    //let history=useHistory();
    let [state/*,dispatch*/] = useContext(userContext);
    let {user,isloggedin}=state;
    let [_users,set_users]=useState(null);
    let [_adclick,setadclick]=useState(false);
    let [_usclick,set_usclick]=useState(false);
    let [cuerrors, setcuerrors] = useState([]);
    let [iserr, setIserr] = useState(false);
    //let baseuri ="http://localhost:8595/";
    let acdstyle = _acdoStyle();

    const get_all_admin = ()=>{
        set_usclick(false);
        setadclick(true);
     let dt = {
         type:"admin"
     };
     getUsers(dt).then(res=>{
       set_users(res.users);
     
     });

    };

    const get_all_users = ()=>{
        setadclick(false);
        set_usclick(true);
        let dt = {
            type:"normal"
        };
        getUsers(dt).then(res=>{
          set_users(res.users);
        });
       };

       const to_deactivate = (user)=>{
           
            switch(_usclick){

                case true:
                  let _togo={
                      utype:"User",
                      email:user
                  };
                  deActivate(_togo).then(res=>{
                      //console.log(res);
                      res.success?setIserr(false):setIserr(true);
                      setcuerrors(prev=>[...prev,res.message]);
                  }).catch(er=>{
                      console.log(er);
                  });
                  
                break;

                case false:
                    let togo={
                        utype:"Admin",
                        email:user
                    };
                    doAdminActivates(togo).then(res=>{
                        //console.log(res);
                        res.success?setIserr(false):setIserr(true);
                        setcuerrors(prev=>[...prev,res.message]);
                    }).catch(er=>{
                        console.log(er);
                    });
                    
                break;

                default:
                    console.log("wrong user type");
                break;

            }
       };

       const to_activate =(user)=>{
        switch(_usclick){

            case true:
                let togo_={
                    utype:"User",
                    email:user
                };
                doActivate(togo_).then(res=>{
                    //console.log(res);
                    res.success?setIserr(false):setIserr(true);
                    setcuerrors(prev=>[...prev,res.message]);
                }).catch(er=>{
                    console.log(er);
                });
            
            break;

            case false:
                let togo__={
                    utype:"Admin",
                    email:user
                };
                doAdminActivates(togo__).then(res=>{
                    //console.log(res);
                    res.success?setIserr(false):setIserr(true);
                    setcuerrors(prev=>[...prev,res.message]);
                }).catch(er=>{
                    console.log(er);
                });
                
            break;

            default:
                console.log("wrong user type");
            break;

        }
       };


       useEffect(()=>{
        document.title="activations";
    },[]);

    useEffect(()=>{
        monitor_fade();
     });


    if(!(isloggedin) && !(user.usertype==="admin")){
        return <Redirect to="/admin"/>
    }else{
    return (
        <div className='mt-5'>
<Grid container>
<Grid item xs={2}></Grid>

<Grid item xs={8}>
<Paper className={acdstyle.root}>

        
            <div className={acdstyle._acdopad}>
            <h3>DO ACTIVATIONS</h3>

            {
               iserr===true?
               cuerrors.length!==0 && cuerrors.map((err,index)=>{
                   return <p key={index} className="alert alert-warning tofd">{err}</p>
               }):
               cuerrors.length!==0 && cuerrors.map((err,index)=>{
                   return <p key={index} className="alert alert-success tofd">{err}</p>
               })
                
                }

            <Grid container spacing={6}>
                <Grid item>
             <Button variant="contained" onClick={get_all_admin}>ADMINISTRATORS</Button>    
             </Grid>
             <Grid item>
             <Button variant="contained" onClick={get_all_users}>REGULAR USERS</Button>
             </Grid>
             </Grid>
            </div>
            {
                _usclick &&
                <div className={acdstyle._acdopad}>
 
                    <h6>All users</h6>

                 <Grid container spacing={6}>
                <Grid item>
                <table className="table table-striped">
                        <thead>
                            <tr>
                            <th>Full Name</th>
                            <th>Active</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        {_users!==null && _users.map((user,index)=>{
                    return(
                        <tr key={index}>
                        <td>{user.fullname}</td>
                    <td>{user.active}</td>
                    <td>{user.active==="no" && <Button variant="contained"  onClick={()=>{to_activate(user.email)}}>Activate</Button>}{user.active==="yes" && <Button variant="contained"  onClick={()=>{to_deactivate(user.email)}}>De-activate</Button> }</td>
                        </tr>
                    )
                })}

                        </tbody>
                    </table>

                    </Grid>
                    </Grid>

                </div>
            }
            
            {
                _adclick &&
                <div className={acdstyle._acdopad}>
                    <h6>All Admin</h6>

                    <Grid container spacing={6}>
                <Grid item>
                    <Table>
                        <TableHead>
                            <TableRow>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            
                        {_users!==null && _users.map((user,index)=>{
                    return(
                        <TableRow  key={index}>
                        <TableCell>{user.fullname}</TableCell>
                    <TableCell>{user.active}</TableCell>
                    <TableCell>{user.active==="no" && <Button variant="contained" onClick={()=>{to_activate(user.email)}}>Activate</Button>}{user.active==="yes" && <Button variant="contained" onClick={()=>{to_deactivate(user.email)}}>De-activate</Button> }</TableCell>
                        </TableRow >
                    )
                })}
                            

                        </TableBody>
                    </Table>
                    </Grid>
                    </Grid>
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
