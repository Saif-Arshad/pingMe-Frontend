/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect } from 'react';
import { User, Lock } from 'lucide-react';
import "../../components/styles/Login.scss";

const SignInSignUp = () => {
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
                    <form action="#" className="sign-in-form">
                        <h2 className="title">Welcome Back</h2>
                        <div className="input-field">
                            <User className="icon" />
                            <input type="text" placeholder="Username or Email" />

                        </div>
                        <div className="input-field">
                            <Lock className="icon" />
                            <input type="password" placeholder="Password" />
                        </div>
                        <div className='w-9/12 items-start mt-2'>
                            <input type="submit" value="Login" className="btn solid" />
                        </div>
                        {/* <p className="social-text">Or Sign in with social platforms</p> */}
                        {/* Add social icons here */}
                    </form>

                    <form action="#" className="sign-up-form">
                        <h2 className="title">Join Us</h2>
                        <div className="input-field">
                            <User className="icon" />
                            <input type="text" placeholder="Username or Email" />
                        </div>
                        <div className="input-field">
                            <Lock className="icon" />
                            <input type="password" placeholder="Password" />
                        </div>
                        <div className='w-9/12 items-start mt-2'>
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
