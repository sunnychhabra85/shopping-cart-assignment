import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
// import './navigation.styles.jsx';
import { ReactComponent as CrwnLogo} from "../../assets/crown.svg";
import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import {NavigationContainer, LogoContainer, NavLinks, NavLink} from './navigation.styles';

const Navigation =()=>{
    // const {currentUser, setCurrentUser} = useContext(UserContext);
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext)
    // const signOutHandler = async () => {
    //   await signOutUser();
    //   setCurrentUser(null);
    // }
    return (
      <>
        <NavigationContainer>
            <LogoContainer to='/'>
                <CrwnLogo className="logo" />
            </LogoContainer>
            <NavLinks>
                <NavLink to="/shop">
                    SHOP
                </NavLink>
                {
                  currentUser ? ( <NavLink as='span' onClick={signOutUser}>
                  SIGN OUT
              </NavLink>):  (<NavLink to="/auth">
                {''}
                    SIGN IN {''}
                </NavLink>)
                }
               <CartIcon />
            </NavLinks>
            {isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet />
      </>
    )
  }
export default Navigation;