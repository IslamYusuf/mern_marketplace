import React from 'react'
import { Route, Routes, Link } from 'react-router-dom'

import { Home, Menu } from './core'
import { Profile, Signup, Users, EditProfile } from './user'
import { PrivateRoute, Signin } from './auth'

const MainRouter = () => {
    return (
        <div>
            <Menu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="users" element={<Users />} />
                <Route path="/user/edit/:userId" element={
                    <PrivateRoute>
                        <EditProfile />
                    </PrivateRoute>
                } />
                <Route path="/user/:userId" element={<Profile />} />
                <Route path="signup" element={<Signup />} />
                <Route path="signin" element={<Signin />} />
                <Route path="*"
                    element={
                        <main style={{ padding: "1rem", marginTop: 45 }}>
                            <p>
                                There&apos;s nothing here! &nbsp;
                                <Link to='/' replace={true}>Return to Home Page</Link>
                            </p>
                        </main>
                    }
                />
            </Routes>
        </div>
    )
}

export default MainRouter