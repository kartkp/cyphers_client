import './App.css';
import Navbar from './components/Navbar';
import KK from './components/Kk';
import About from './components/About';
import Score from './components/Score';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Response from './components/Response';

import Navhome from './components/Navhome';
import Tts from './components/Tts';
import Quizz from './components/Quizz';
import Quizpage from './components/Quizpage';
import Resultpage from './components/Resultpage';
import Bulletin from './components/Bulletin';
import Header from './components/Header';
import Second from './components/Second';
import Third from './components/Third';
import Forth from './components/Forth';
import Fifth from './components/Fifth';
import Button from "./components/Button";
import OurJourney from "./components/OurJourney";
import Footer from './components/Footer';
import Login from './components/Login';
import Navbarx from './components/Navbarx';
import Navbary from './components/Navbary';
import Navbarout from './components/Navbarout';


import Signup from "./components/Signup.jsx";
import Randomprompt from "./components/Randomprompt.jsx";
import ResponseEnh from "./components/ResponseEnh.jsx";

function App() {
    const router = createBrowserRouter([
        {
            path: "/home",
            element: <><Navbar /><Header /><Button /><Second /><Third /><Forth /><Fifth /><Footer /></>,
        },
        {
            path: "/homehkTJ",
            element: <><Navbar /><Header /><Button /><Second /><Third /><Forth /><Fifth /><Footer /></>,
        },
        {
            path: "/hxpZ",
            element: <><Navbarout /><Header /><Button /><Second /><Third /><Forth /><Fifth /><Footer /></>,
        },
        {
            path: "/",
            element: <><Navbar /><Header /><Button /><Second /><Third /><Forth /><Fifth /><Footer /></>,
        },
        {
            path: "/Login",
            element: <><Navbarx /><Login/></>,
        },
        {
            path: "/randomprompt",
            element: <><Navbar /><Randomprompt/></>,
        },
        {
            path: "/Signup",
            element: <><Navbarx /><Signup/></>,
        },
        {
            path: "/response",
            element: <><Navbar /><ResponseEnh /></>,
        },
        {
            path: "/bulletin",
            element: <><Navbar /><Bulletin /></>,
        },
        {
            path: "/about",
            element: <><Navbar /><About /></>,
        },
        {
            path: "/aboutzhK",
            element: <><Navbarx /><About /></>,
        },
        {
            path: "/enhance",
            element: <><Navbar /><Score /></>,
        },
        {
            path: "/score",
            element: <><Navbar /><Quizz /></>,
        },
        {
            path: "/quizz",
            element: <><Navbar /><Quizz /></>,
        },
        {
            path: "/responsetwo",
            element: <><Navbar /><Response/></>,
        },
        {
            path: "/Quizpage",
            element: <><Navbar /><Quizpage /></>,
        },
        {
            path: "/Resultpage",
            element: <><Navbar /><Resultpage /></>,
        },
        {
            path: "/OurJourney",
            element: <><Navbar /><OurJourney /></>,
        },
        {
            path: "/OurJourneyhzkG",
            element: <><Navbarx /><OurJourney /></>,
        }
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
