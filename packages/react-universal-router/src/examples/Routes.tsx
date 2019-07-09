import Home from './routes/Home';
import Modal from './routes/Modal';
import Page2 from './routes/Page2';
import Page3 from './routes/Page3';
import TopNav from './components/TopNav';
import { always } from 'ramda';
import { createRoutes } from '../index';

const Routes = createRoutes({
    routes: {
        Home: {
            route: Home,
            getTitle: always('Home')
        },
        Page2: {
            route: Page2,
            getTitle: always('Page 2')
        },
        Page3: {
            route: Page3
        },
        Modal: {
            route: Modal,
            getTitle: always('Modal'),
            mode: 'modal'
        }
    },
    renderTopNav: TopNav
});

export default Routes;