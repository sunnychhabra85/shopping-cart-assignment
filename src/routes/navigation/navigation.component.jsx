import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import './navigation.styles.scss';
import { ReactComponent as CrwnLogo} from "../../assets/crown.svg";
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";


const Navigation =()=>{
    // const {currentUser, setCurrentUser} = useContext(UserContext);
    const {currentUser} = useContext(UserContext);
    // const signOutHandler = async () => {
    //   await signOutUser();
    //   setCurrentUser(null);
    // }
    return (
      <>
        <div className="navigation">
            <Link className="logo-container" to='/'>
                <CrwnLogo className="logo" />
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to="/shop">
                    SHOP
                </Link>
                {
                  currentUser ? ( <span className="nav-link" onClick={signOutUser}>
                  SIGN OUT
              </span>):  (<Link className="nav-link" to="/auth">
                {''}
                    SIGN IN {''}
                </Link>)
                }
               
            </div>
        </div>
        <Outlet />
      </>
    )
  }
export default Navigation;