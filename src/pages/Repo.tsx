import { onMount } from 'solid-js';
import Loading from '../components/Loader';

const Repo = () => {
    onMount(() => {
        window.location.href = 'https://github.com/Ouraniasapphire/SapphireDesigns';
    });

    return <Loading />;
};

export default Repo;
