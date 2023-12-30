import Dashboard from './pages/dsashboard';
import { useAppContext} from './context/contextProvider';

function App() {

  const {lightTheme}= useAppContext();

  return (
    <div className={`w-full h-full flex md:w-screen ${lightTheme ? 'bg-white' : 'bg-black'}`}>
        <Dashboard/>
    </div>
  )
}

export default App;
