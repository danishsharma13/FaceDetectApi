import React from "react";

const Navigation = ({onRouteChange, isSignedIn}) => {
		if(isSignedIn){
			return(
				<nav className="flex justify-end">
					<input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib ma3" type="submit" value="Sign Out" onClick={() => onRouteChange('signout')} />
				</nav>
			);
		} else {
			return(
				<nav className="flex justify-end">
					<input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib ma3" type="submit" value="Sign In" onClick={() => onRouteChange('signin')} />
					<input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib ma3" type="submit" value="Register" onClick={() => onRouteChange('register')} />
				</nav>
			);
		}
}

export default Navigation;