import { r as reactDom, a as react } from '../../chunks/index-7834555d.js';

const App = () => {
    return (react.createElement("div", { className: 'text-green-500' }, "Popup"));
};

const root = document.querySelector('#root');
reactDom.render(react.createElement(App, null), root);
