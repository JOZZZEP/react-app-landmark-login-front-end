import { createContext, FC, ReactNode, useContext, useState } from "react";
import { UserResponse } from "../model/UserResponse";

interface UserContextType {
  user: UserResponse | null;
  setUser: (user: UserResponse | null) => void;
}

const initialUserState: UserResponse | null = null;

const UserContext = createContext<UserContextType>({
  user: initialUserState,
  setUser: () => {},
});

export const UserContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserResponse | null>(initialUserState);

  const contextValues = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
