import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SoundPage from './SoundPage';
import VideosPage from './VideosPage';
import Admin from './Admin';


function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element = {<SoundPage/>}/>
                <Route path='/videos' element = {<VideosPage/>} />
                <Route path='/admin' element = {<Admin/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;