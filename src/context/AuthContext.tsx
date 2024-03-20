import { Component, createContext, ReactNode, useContext } from "react";
import { LOCAL_AUTH } from "../constant/Constant";

interface AuthContextType {
  auth: boolean;
  setAuth: (auth: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  auth: false,
  setAuth: () => {},
});

export default class AuthContextProvider extends Component<
  { children: ReactNode },
  { auth: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = {
      auth: false,
    };
  }

  setAuth = (auth: boolean) => {
    this.setState({ auth });
    if(!auth){
      localStorage.removeItem(LOCAL_AUTH);
    }
  };

  render() {
    const contextValues = {
      auth: this.state.auth,
      setAuth: this.setAuth,
    };

    return (
      <AuthContext.Provider value={contextValues}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export const useAuthContext = () => useContext(AuthContext);
