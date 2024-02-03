import '../elements/emby-itemscontainer/emby-itemscontainer';
import ServerConnections from '../components/ServerConnections';
import focusManager from '../components/focusManager';

class MenuLinkTab {
    constructor(view, params) {
        this.view = view;
        this.params = params;
        this.apiClient = ServerConnections.currentApiClient();

        this.sectionsContainer = view.querySelector('.sections');
        const url = view.dataset.url;
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.style.display = 'flex';
        iframe.style.flexGrow = '100%';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.padding = '0';
        this.sectionsContainer.appendChild(iframe);
    }
    onResume(options) {
        const promises = (this.apiClient, []);
        const view = this.view;

        Promise.all(promises).then(function () {
            if (options.autoFocus) {
                focusManager.autoFocus(view);
            }
        });
        document.querySelector('#indexPage').classList.add('fullscreen');
    }
    onPause() {
        document.querySelector('#indexPage').classList.remove('fullscreen');
    }
    destroy() {
        document.querySelector('#indexPage').classList.remove('fullscreen');
        this.view = null;
        this.params = null;
        this.apiClient = null;
        this.sectionsContainer = null;
    }
}

export default MenuLinkTab;
