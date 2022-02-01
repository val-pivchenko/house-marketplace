import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import VisibilityIcon from '../assets/svg/visibilityIcon.svg'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { db } from '../firebase.config'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-toastify';
import OAuth from "../components/OAuth";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({ name: '', email: '', password: '' })

    const { email, password, name } = formData

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
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            const user = userCredential.user

            updateProfile(auth.currentUser, {
                displayName: name
            })

            const formDataCopy = { ...formData }
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp()

            await setDoc(doc(db, 'users', user.uid), formDataCopy)

            navigate('/')
        } catch (error) {
            toast.error('Something went wrong with registration')
        }
    }

    return <>
        <div className="pageContainer">
            <header>
                <p className="pageHeader">Welcome!</p>
            </header>

            <main>
                <form onSubmit={onSubmit}>
                    <input placeholder="Name" id="name" value={name} onChange={onChange} type="text" className="nameInput" />

                    <input placeholder="Email" id="email" value={email} onChange={onChange} type="email" className="emailInput" />

                    <div className="passwordInputDiv">
                        <input type={showPassword ? 'text' : 'password'} className="passwordInput" placeholder="Password" id="password" value={password} onChange={onChange} />
                        <img src={VisibilityIcon} onClick={() => setShowPassword(!showPassword)} className="showPassword" alt="" />
                    </div>

                    <div className="signUpBar">
                        <p className="signUpText">
                            Sign Up
                        </p>
                        <button className="signUpButton">
                            <ArrowRightIcon fill='#ffffff' width="34px" height="34px " />
                        </button>
                    </div>
                </form>

                <OAuth />

                <Link to='/signin' className="registerLink">
                    Sign In Instead
                </Link>
            </main>
        </div>
    </>;
};

export default SignUp;