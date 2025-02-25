/* @refresh reload */
import { render } from 'solid-js/web';
import { Router, Route, useLocation} from "@solidjs/router";
import { lazy, createSignal, createEffect, Show, Suspense } from "solid-js";


import App from './App';
import Home from './pages/Home';
import NotFound from './pages/404'
import Pricing from './pages/Pricing';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Debug from './pages/Debug';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(
  () => (
    <Router root={App}>
      <Route path="/" component={Home} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/about" component={About} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/debug" component={Debug} />
      <Route path="*" component={NotFound} />
    </Router>
  ), root!

);
