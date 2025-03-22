import { createSignal } from 'solid-js';
import type { Component } from 'solid-js';
import { useNavigate, A } from '@solidjs/router';
import { supabase } from '../supabaseClient';
import Card from '../components/Card';

const Login: Component = () => {
    const navigate = useNavigate();
    const [email, setEmail] = createSignal('');
    const [password, setPassword] = createSignal('');
    const loginUser = async (e: Event) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email(),
            password: password(),
        });

        if (error) {
            alert(error.message);
            return;
        }

        if (data) {
            if (data.user.email !== 'helakjack@gmail.com') {
                navigate('/');
            } else {
                navigate('/portal');
            }
        }
    };

    return (
        <div class='center-content'>
            <Card style={{ 'justify-items': 'center' }}>
                <form class='auth-container' onSubmit={(e) => loginUser(e)}>
                    <h3 style='font-size: 48px; color: #0084FF;'> Login </h3> <br />
                    <span class='form'>
                        <input
                            class='box-shadow'
                            type='text'
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                        />{' '}
                        <br />
                        <input
                            class='box-shadow'
                            type='password'
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                        />{' '}
                        <br />
                        <button type='submit' class='center shadow '>
                            <img
                                src='svgs/login.svg'
                                style='width: 2rem; height: 2rem'
                                alt='Vercel'
                            />
                        </button>
                    </span>
                </form>
            </Card>
        </div>
    );
};

export default Login;
