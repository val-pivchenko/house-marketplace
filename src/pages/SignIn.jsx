import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import VisibilityIcon from '../assets/svg/visibilityIcon.svg'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify';
import OAuth from "../components/OAuth";

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({ email: '', password: '' })

    const { email, password } = formData

    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const auth = getAuth()

            const userCredential = await signInWithEmailAndPassword(auth, email, password)

            if (userCredential.user) {
                navigate('/')
            }
        } catch (error) {
            toast.error('Bad User Credentials')
        }

    }

    return <>
        <div className="pageContainer">
            <header>
                <p className="pageHeader">Welcome Back!</p>
            </header>

            <main>
                <form onSubmit={onSubmit}>
                    <input placeholder="Email" id="email" value={email} onChange={onChange} type="email" className="emailInput" />

                    <div className="passwordInputDiv">
                        <input type={showPassword ? 'text' : 'password'} className="passwordInput" placeholder="Password" id="password" value={password} onChange={onChange} />
                        <img src={VisibilityIcon} onClick={() => setShowPassword(!showPassword)} className="showPassword" alt="" />
                    </div>

                    <Link to='/forgotpassword' className="forgotPasswordLink">
                        Forgot Password?
                    </Link>

                    <div className="signInBar">
                        <p className="signInText">
                            Sign In
                        </p>
                        <button className="signInButton">
                            <ArrowRightIcon fill='#ffffff' width="34px" height="34px " />
                        </button>
                    </div>
                </form>

                <OAuth />

                <Link to='/signup' className="registerLink">
                    Sign Up Instead
                </Link>
            </main>
        </div>
    </>;
};

export default SignIn;