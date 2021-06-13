import Head from 'next/head'
import Router from 'next/router';
import classes from '../styles/Home.module.css'
import Link from 'next/link'
import React, {useState} from 'react';
import Card from '../components/ui/Card';

const Signup = () => {
    const [signupError, setSignupError] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, phone, email, password })
        }).then((r) => {
            return r.json()
        }).then((res) => {
            if (res && res.status === "ERROR") {
                setSignupError(res.message);
            }
            if (res && res.status === "SUCCESS") {
                console.log(JSON.stringify(res.data));
                Router.push({
                    pathname: '/otp', query: { userId: res.data.id },
                })
            }
        });
    }
    return (
        <Card>
            <Head>
                <title>SignUp</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.control}>
                    <label htmlFor="firstName"> FirstName
                        <input type='firstName' required id='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} name="firstName" type="firstName" />
                    </label>
                </div>
                <div className={classes.control}>
                    <label htmlFor="lastName"> LastName
                        <input type='lastName' required id='lastName' value={lastName}onChange={(e) => setLastName(e.target.value)} name="lastName" type="lastName" />
                    </label>
                </div>

                <div className={classes.control}>
                    <label htmlFor="phone"> Phone
                        <input type='phone' required id='phone' value={phone} onChange={(e) => setPhone(e.target.value)} name="phone" type="phone" />
                    </label>
                </div>
                <div className={classes.control}>
                    <label htmlFor="email"> Email
                        <input type='email' required id='email' value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" />
                    </label>
                </div>

                <div className={classes.control}>
                <label htmlFor="password"> Password
                    <input type='password' required id='password' value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" />
                </label>
                </div>
                <div className={classes.actions}>
                    <button>SignUp</button>
                </div>
                {signupError && <p style={{color: 'red'}}>{signupError}</p>}
            </form>
            <>
                Already Have Account <Link href="/">Login</Link>
            </>
        </Card>
    );
};

export default Signup;
