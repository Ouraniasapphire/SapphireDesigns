/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route} from "@solidjs/router";
import { createClient } from "@supabase/supabase-js";
import { SupabaseProvider } from "solid-supabase";

import App from "./App";
import Home from './pages/Home';
import NotFound from './pages/404'
import Pricing from './pages/Pricing';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Debug from './pages/Debug';
import Login from './pages/Login'
import Portal from './pages/Portal'
import Confirmation from './pages/Confirmation'

const root = document.getElementById("root");
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error("Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?");
}

render(
  () => (
    <Router root={App}>
      <Route path="/" component={Home} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/about" component={About} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/debug" component={Debug} />
      <Route path="/confirmation" component={Confirmation} />
      <Route path="*" component={NotFound} />

      <SupabaseProvider client={supabase}>
        <Route path="/login" component={Login}/>
        <Route path="/portal" component={Portal}/>
      </SupabaseProvider>
    </Router> 
  ), root!
);
