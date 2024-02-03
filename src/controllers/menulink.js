import '../elements/emby-itemscontainer/emby-itemscontainer';

class MenuLinkTab {
    constructor(view) {
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
    onResume() {}
    onPause() {}
    destroy() {
        this.sectionsContainer = null;
    }
}

export default MenuLinkTab;
