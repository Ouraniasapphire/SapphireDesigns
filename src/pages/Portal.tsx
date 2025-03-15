import type { Component } from 'solid-js';
import { createSignal, createResource, onMount } from 'solid-js';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from '@solidjs/router';
import Card from '../components/Card';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

const Portal: Component = () => {
    const navigate = useNavigate(); // Move inside the component
    const [user, setUser] = createSignal(null);

    const getLoggedUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        if (!user) {
            navigate("/login", { replace: true });
        }
    };

    onMount(() => {
        getLoggedUser();
    });

    const handleClick = (url) => {
        const newTab = window.open(url, "_blank");
        if (newTab) newTab.focus();};

    const fetchUsers = async () => {
        const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SERVICE_ROLE_KEY )

        const { data, error } = await supabase.auth.admin.listUsers();
        if (error) { console.error('Error fetching auth users:', error); return [];
        }
        return data.users.map(user => user.email); }
    
    const [emails] = createResource(fetchUsers);  

    return (
        <div class="center-content">
            <Card style={{"text-align": "center", "justify-items": "center"}} id='card'>
                <h1 id="home-header">Portal</h1>
                <div class="horizontal-divider"/>
                <div class="grid-layout" style="align-items: start; justify-items: center;">
                    <div class="grid-layout form" style="padding: 0; display: flex; align-items: center; justify-content: center;">
                        <div class="form" style="padding-bottom: 20px; text-align: center;">
                            <h2>Links</h2>
                            <button class="box-shadow flex" onClick={() => handleClick("https://vercel.com")}>
                                <span class="left">Vercel</span>
                                <span class="right"><img src="svgs/vercel.svg" class="icon" alt="Vercel"/></span>
                            </button> 
                            <br />
                            <button class="box-shadow flex" onClick={() => handleClick("https://supabase.com")}>
                                <span class="left">Supabase</span> 
                                <span class="right"><img src="svgs/supabase.svg" class="icon" alt="Supabase"/></span>
                            </button> <br />
                            <button class="box-shadow flex" onClick={() => handleClick("https://github.com")}>
                                <span class="left">Github</span>
                                <span class="right"><img src="svgs/github.svg" class="icon" alt="Github"/></span>
                            </button> <br />
                            <button class="box-shadow flex" onClick={() => handleClick("https://account.squarespace.com")}>
                                <span class="left">Squarespace</span> 
                                <span class="right"><img src="svgs/squarespace.svg" class="icon" alt="Squarespace"/></span>
                            </button> <br />
                            <button class="box-shadow flex" onClick={() => handleClick("https://wakatime.com/dashboard")}>
                                <span class="left">Wakatime</span>
                                <span class="right"><img src="svgs/wakatime.svg" class="icon" alt="Wakatime"/></span>
                            </button> <br />
                            <button class="box-shadow flex" onClick={() => handleClick("https://mailadmin.zoho.com/cpanel/home.do#dashboard")}>
                                <span class="left">Zoho</span>
                                <span class="right"><img src="svgs/wakatime.svg" class="icon" alt="Wakatime"/></span>
                            </button> <br />
                        </div>
                    </div>

                    <div class="grid-layout" style="padding: 0; display: flex; align-items: center; justify-content: center;">
                        <div class="portal" style="padding-bottom: 20px; text-align: center;">
                            <div class="portal" style="padding-bottom: 20px; text-align: center;">
                                <h2>Users</h2>
                                {emails()?.map(email => ( <div style="display: flex; align-items: center; justify-content: center; height: calc(3rem + 4px)"><li > {email}</li></div> ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Portal;
