import { UserType, useUser } from "../App";

export function useSave() {
    const {setUser, setUsersList} = useUser()

    const saveCurrentUser = (user:UserType) => {
    setUser(user)
    localStorage.setItem('actualUser', JSON.stringify(user))
  };

  const saveUsersList = (list:UserType[]) => {
    setUsersList(list)
    localStorage.setItem('usersList', JSON.stringify(list))
  };

  return { saveCurrentUser, saveUsersList };
}