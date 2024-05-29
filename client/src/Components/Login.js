import React from 'react';

const Login = () => {

    const loginwithgoogle = () => {
        window.open("http://localhost:6005/auth/google/callback", "_self");
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <h1 className="text-2xl text-center mb-6">Login</h1>
                    <div className="space-y-4">
                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="username"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="password"
                                placeholder="password"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                            >
                                Login
                            </button>
                            <p className="text-center">
                                Not Registered?{' '}
                                <a href="#" className="text-blue-500 hover:underline">
                                    Create an account
                                </a>
                            </p>
                        </form>
                        <button
                            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
                            onClick={loginwithgoogle}
                        >
                            Sign In With Google
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
