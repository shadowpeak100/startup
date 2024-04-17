import React from 'react';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { About } from './about/about';
import { All } from './all/allSongs';
import { Home } from './home/home';
import { New } from './new/newSong';
import { Popular } from './popular/popularSongs';
import { Privacy } from './privacy/privacy_policy';
import { AuthState } from './authState';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);
    const [loginBox, setLoginBox] = React.useState(false);
    const [proposedUserName, setProposedUserName] = React.useState('');
    const [proposedPassword, setProposedPassword] = React.useState('');
    const navigate = useNavigate()

    function loginUser() {
        setLoginBox(false);

        fetch('/api/auth/login', {
            method: 'post',
            body: JSON.stringify({ userName: proposedUserName, password: proposedPassword }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((userName) => {
                setUserName(userName);
            });
        if(userName !== ""){
            return
        }
        console.log("welcome, signed in successfully")
        navigate("/newSong");
    }

    function createUser() {
        setLoginBox(false);

        fetch('/api/auth/create', {
            method: 'post',
            body: JSON.stringify({ userName: proposedUserName, password: proposedPassword }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((userName) => {
                setUserName(userName);
            });
        if(userName !== ""){
            return
        }

        console.log("user created successfully")
    }

    return (
        <>
            <div className="navbar">
                <header>
                    <NavLink to=''>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M18.586 10.081c-1.439 0-1.35 2.802-2.029 4.071-.114.211-.425.184-.5-.044-.771-2.364-.419-8.108-2.51-8.108-2.189 0-1.648 7.433-2.5 10.462-.063.23-.381.25-.474.028-.9-2.161-.799-6.875-2.502-6.875-1.762 0-1.612 3.949-2.302 5.54-.091.213-.392.22-.493.01-.503-1.049-.664-3.165-2.564-3.165h-2.213c-.275 0-.499.224-.499.499s.224.501.499.501h2.213c1.572 0 1.038 3.484 2.854 3.484 1.684 0 1.502-3.79 2.223-5.47.088-.208.382-.202.466.006.805 2.047.79 6.98 2.641 6.98 2.077 0 1.337-7.856 2.443-10.621.083-.211.384-.222.479-.012 1.029 2.25.487 8.126 2.344 8.126 1.639 0 1.737-2.706 2.23-4.038.081-.212.373-.227.474-.027.516 1.001.846 2.572 2.4 2.572h2.235c.275 0 .499-.224.499-.499 0-.276-.224-.5-.499-.5h-2.235c-1.323 0-1.117-2.92-2.68-2.92z"/>
                        </svg>
                    </NavLink>
                    <div className="main-menu">
                        <div className="menu-icon">
                            <svg viewBox="0 0 60 60" width="60px" height="60px">
                                <line x1="5%" y1="50%" x2="95%" y2="50%"/>
                                <line x1="5%" y1="50%" x2="95%" y2="50%"/>
                            </svg>
                        </div>
                        <nav>
                            <h2 className="hidden">Main Menu</h2>
                            <ul className="left">
                                <li>
                                    <div id="wrap">
                                        <form action="" autoComplete="on">
                                            <input id="search" name="search" type="text"
                                                   placeholder="Whatcha want?"/><input
                                            id="search_submit" value="Rechercher" type="submit"/>
                                        </form>
                                    </div>
                                </li>
                                <li className="button">
                                    <NavLink className='nav-item' to='newSong'>
                                        New
                                    </NavLink>
                                </li>
                                <li className="button">
                                    <NavLink className='nav-item' to='allSongs'>
                                        All
                                    </NavLink>
                                </li>
                                {userName !== '' ? (
                                    <li className="button">
                                        <a className='nav-item' onClick={() => setUserName('')}>
                                            Log Out
                                        </a>
                                    </li>
                                ) : (
                                    <li className="button">
                                        <a className='nav-item' onClick={() => setLoginBox(prevState => !prevState)}>
                                            Log In
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>
                    {loginBox === true &&
                        <div className="login-box" id="loginBox">
                            <h2>Login</h2>
                            <form>
                                <div className="user-box">
                                    <input type="text" id="userName" name="" required="" value={proposedUserName} onChange={(event) => setProposedUserName(event.target.value)}/>
                                    <label>Username</label>
                                </div>
                                <div className="user-box">
                                    <input type="password" id="userPassword" name="" required="" value={proposedPassword} onChange={(event) => setProposedPassword(event.target.value)}/>
                                    <label>Password</label>
                                </div>
                                <a href="#" onClick={loginUser}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    Login
                                </a>
                                <a href="#" onClick={createUser}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    Register
                                </a>
                            </form>
                        </div>
                    }
                </header>
            </div>

            <Routes>
                <Route path='/' exact element={<Home/>}/>
                <Route path='/popularSongs' element={<All/>}/>
                <Route path='/newSong' element={<New userName={userName}/>}/>
                <Route path='/allSongs' element={<All/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>

            <footer>
                <span className="text-reset footer-item">Brayden Lewis</span>
                <a className="footer-item" href="https://github.com/shadowpeak100">Visit my Github!</a>
                <a className="footer-item" href="../archivedWebpages/privacy_policy.html">Privacy Policy</a>
                <a className="footer-item" href="../archivedWebpages/about_us.html">About Us</a>
            </footer>
        </>
    );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

function Login() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}
