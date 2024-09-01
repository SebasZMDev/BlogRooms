import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';

export type UserType = {
  id: string;
  email: string;
  username: string;
  password: string;
  userInfo: {
    pfp:string;
    banner:string;
    description: string;
    posts: PostData[];
    likes: PostData[];
  };
};

export type PostData = {
  id: string;
  content: string;
  media: string | null;
  score: number;
  repost: number;
  comments: PostData[];
  fecha: string;
};

export type UserContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  usersList: UserType[] | null;
  setUsersList: (usersList: UserType[] | null) => void;
  isUserLogged: boolean;
  setIsUserLogged: (isLogged: boolean) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [usersList, setUsersList] = useState<UserType[]| null>(null);
  const [isUserLogged, setIsUserLogged] = useState(false);
  useEffect(() => {
    const savedUser = localStorage.getItem('actualUser');
    const savedList = localStorage.getItem('usersList');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsUserLogged(true);
    }
    if (savedList) {
      const parsedList = JSON.parse(savedList);
      setUsersList(parsedList)
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser,usersList, setUsersList, isUserLogged, setIsUserLogged}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};


function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomeOrLogin />} />
          <Route path="/pages/Login" element={<Login />} />
          <Route path="/pages/Home" element={<Home />} />
          <Route path="/pages/Profile" element={<Profile />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

function HomeOrLogin() {
  const { isUserLogged } = useUser();
  return isUserLogged ? <Home />: <Login />;
}


export default App;
