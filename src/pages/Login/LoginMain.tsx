/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect } from 'react';
import { User, Lock, Mail } from 'lucide-react';
import "../../components/styles/Login.scss";
import { useFormik } from 'formik';
import { useUser } from '../../customHooks/useUser';
import * as Yup from 'yup';
const SignInSignUp = () => {
    const loginValidationSchema = Yup.object({
        Credential: Yup.string()
            .required('Email or Username is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    // Formik validation schema for signup form
    const signupValidationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        userName: Yup.string()
            .matches(/^\S*$/, 'User Name cannot contain spaces') // Ensures no spaces
            .required('User Name is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });
    const { registerUser } = useUser();
    const loginFormik = useFormik({
        initialValues: {
            Credential: '',
            password: '',
        },
        validationSchema: loginValidationSchema,
        onSubmit: (values) => {
            console.log('Login form values:', values);
            // Add your login logic here
        },
    });

    // Formik for signup form
    const signupFormik = useFormik({
        initialValues: {
            email: '',
            userName: '',
            password: '',
        },
        validationSchema: signupValidationSchema,
        onSubmit: (values) => {
            registerUser(values)
        },
    });
    useEffect(() => {
        const sign_in_btn = document.querySelector("#sign-in-btn");
        const sign_up_btn = document.querySelector("#sign-up-btn");
        const container = document.querySelector(".container");
        // @ts-expect-error  
        sign_up_btn.addEventListener("click", () => {
            // @ts-expect-error  
            container.classList.add("sign-up-mode");
        });

        // @ts-expect-error  
        sign_in_btn.addEventListener("click", () => {
            // @ts-expect-error  
            container.classList.remove("sign-up-mode");
        });

        // Clean up event listeners when component is unmounted
        return () => {
            // @ts-expect-error  
            sign_up_btn.removeEventListener("click", () => {
                // @ts-expect-error  
                container.classList.add("sign-up-mode");
            });
            // @ts-expect-error  
            sign_in_btn.removeEventListener("click", () => {
                // @ts-expect-error  
                container.classList.remove("sign-up-mode");
            });
        };
    }, []);

    return (
        <div className="container">
            <div className="forms-container">
                <div className="signin-signup">
                    <form onSubmit={loginFormik.handleSubmit} className="sign-in-form">
                        <h2 className="title">Welcome Back</h2>
                        <div className='flex flex-col w-full'>

                            <div className="input-field">
                                <User className="icon" />
                                <input type="text" placeholder="Username or Email"
                                    name='Credential'
                                    value={loginFormik.values.Credential}
                                    onChange={loginFormik.handleChange}
                                    onBlur={loginFormik.handleBlur}
                                />

                            </div>
                            {loginFormik.touched.Credential && loginFormik.errors.Credential ? (
                                <div className="text-red-500 text-xs italic">{loginFormik.errors.Credential}</div>
                            ) : null}
                        </div>
                        <div className='flex flex-col w-full'>

                            <div className="input-field">
                                <Lock className="icon" />
                                <input type="password" placeholder="Password"
                                    name='password'
                                    value={loginFormik.values.password}
                                    onChange={loginFormik.handleChange}
                                    onBlur={loginFormik.handleBlur}
                                />
                            </div>
                            {loginFormik.touched.password && loginFormik.errors.password ? (
                                <div className="text-red-500 text-xs italic">{loginFormik.errors.password}</div>
                            ) : null}
                        </div>
                        <div className='w-full items-start mt-2'>
                            <input type="submit" value="Login" className="btn solid" />
                        </div>
                        {/* <p className="social-text">Or Sign in with social platforms</p> */}
                        {/* Add social icons here */}
                    </form>

                    <form onSubmit={signupFormik.handleSubmit} className="sign-up-form">
                        <h2 className="title">Join Us</h2>
                        <div className='flex flex-col w-full'>

                            <div className="input-field">
                                <User className="icon" />
                                <input type="text" placeholder="Username"
                                    name='userName'
                                    value={signupFormik.values.userName}
                                    onChange={signupFormik.handleChange}
                                    onBlur={signupFormik.handleBlur}
                                />
                            </div>
                            {signupFormik.touched.userName && signupFormik.errors.userName ? (
                                <div className="text-red-500 text-xs italic">{signupFormik.errors.userName}</div>
                            ) : null}
                        </div>
                        <div className='flex flex-col w-full'>

                            <div className="input-field">
                                <Mail className="icon" />
                                <input type="email" placeholder="Email"
                                    name='email'
                                    value={signupFormik.values.email}
                                    onChange={signupFormik.handleChange}
                                    onBlur={signupFormik.handleBlur}
                                />

                            </div>
                            {signupFormik.touched.email && signupFormik.errors.email ? (
                                <div className="text-red-500 text-xs italic">{signupFormik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className='flex flex-col w-full'>

                            <div className="input-field">
                                <Lock className="icon" />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={signupFormik.values.password}
                                    onChange={signupFormik.handleChange}
                                    onBlur={signupFormik.handleBlur}
                                />
                            </div>
                            {signupFormik.touched.password && signupFormik.errors.password ? (
                                <div className="text-red-500 text-xs italic">{signupFormik.errors.password}</div>
                            ) : null}
                        </div>
                        <div className='w-full items-start mt-2'>
                            <input type="submit" className="btn" value="Sign up" />
                        </div>
                        {/* <p className="social-text">Or Sign up with social platforms</p> */}
                        {/* Add social icons here */}
                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>New here?</h3>
                        <p>Join the conversation! Create an account to connect with others, send messages, and stay in touch.</p>
                        <button className="btn transparent" id="sign-up-btn">
                            Sign up
                        </button>
                    </div>
                    <img src="img/log.svg" className="image" alt="" />
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>One of us?</h3>
                        <p>Welcome back! Log in to reconnect, continue the conversation, and start chatting with friends!</p>
                        <button className="btn transparent" id="sign-in-btn">
                            Login
                        </button>
                    </div>
                    <img src="img/register.svg" className="image" alt="" />
                </div>
            </div>
        </div>
    );
};

export default SignInSignUp;
