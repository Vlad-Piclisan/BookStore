import MainPage from "./Components/MainPage";
import Form from "./Components/Form";
import "./index.css"
import { useAuthContext } from "./Hooks/Contexts/authContext";




function App() {

    
  const {user} = useAuthContext()
  console.log({user});

  return (
    <MainPage />
  );
}

export default App;
