import React from 'react';

function Main() {
    return (
        <div className="flex flex-col md:flex-row bg-background px-4 py-8 sm:p-8 rounded-lg shadow-lg md:max-h-screen">
            <div className="w-full hidden md:flex md:w-1/2  items-center justify-center">
                <img alt="Two women chatting" src="https://openui.fly.dev/openui/500x500.svg?text=Image" className="rounded-lg" />
            </div>
            <div className="w-full md:w-1/2 sm:p-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Join us today 🤝</h2>
                <p className="text-muted-foreground my-4">Connect seamlessly with friends and colleagues using our powerful chat platform, designed to make communication effortless and enjoyable.</p>
                <button className="bg-gray-200  hover:bg-gray-300 w-full p-2 rounded-lg mb-4 flex items-center justify-center gap-x-2">
                    <img src="/src/assets/icons/google.png" alt=" Google" className='h-6 w-6' />
                    Sign up with Google</button>
                <form>
                    <label className="block mb-2 text-muted-foreground" htmlFor="username">Username or Email</label>
                    <input className="border border-border rounded-lg p-2 w-full mb-4" type="text" id="username" placeholder="Yourmail@gmail.com" required />

                    <label className="block mb-2 text-muted-foreground" htmlFor="password">Password</label>
                    <input className="border border-border rounded-lg p-2 w-full mb-4" type="password" id="password" placeholder='********' required />

                    <div className="flex items-center mb-4">
                        <input type="checkbox" id="terms" className="mr-2" required />
                        <label className="text-muted-foreground" htmlFor="terms">I agree with the <a href="#" className="text-blue-700 font-semibold">Terms & Conditions</a> of Clarity</label>
                    </div>

                    <button className="bg-slate-900 hover:bg-slate-950 text-white  w-full p-2 rounded-lg">Create Account</button>
                </form>
                <p className="text-muted-foreground mt-4">Already have an account? <a href="#" className="text-blue-700 font-semibold">Log in</a></p>
            </div>
        </div>
    );
}

export default Main;
