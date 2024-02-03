import TabbedView from '../components/tabbedview/tabbedview';
import globalize from '../scripts/globalize';
import '../elements/emby-tabs/emby-tabs';
import '../elements/emby-button/emby-button';
import '../elements/emby-scroller/emby-scroller';
import { appRouter } from '../components/appRouter';

class HomeView extends TabbedView {
    constructor(view, params) {
        super(view, params);
        this.addMenuLinksToIndexPage(this);
        this.getTabs = this.getTabs.bind(this);
    }

    getMenuLinks() {
        return [{
            'name': 'Anfragen',
            'url': 'https://jellyseerr.sunder-mann.eu'
        }];
    }

    setTitle() {
        appRouter.setTitle(null);
    }

    onPause() {
        super.onPause(this);
        document.querySelector('.skinHeader').classList.remove('noHomeButtonHeader');
    }

    onResume(options) {
        super.onResume(this, options);
        document.querySelector('.skinHeader').classList.add('noHomeButtonHeader');
    }

    getDefaultTabIndex() {
        return 0;
    }

    getTabs() {
        const links = this.getMenuLinks();
        const linkNames = links.map(link => ({ name: link.name }));

        return [
            { name: globalize.translate('Home') },
            { name: globalize.translate('Favorites') },
            ...linkNames
        ];
    }

    getTabController(index) {
        if (index == null) {
            throw new Error('index cannot be null');
        }

        let depends = '';

        switch (index) {
            case 0:
                depends = 'hometab';
                break;

            case 1:
                depends = 'favorites';
                break;
            default:
                depends = 'menulink';
                break;
        }

        const instance = this;
        return import(/* webpackChunkName: "[request]" */ `../controllers/${depends}`).then(({ default: controllerFactory }) => {
            let controller = instance.tabControllers[index];

            if (!controller) {
                controller = new controllerFactory(instance.view.querySelector(".tabContent[data-index='" + index + "']"), instance.params);
                instance.tabControllers[index] = controller;
            }

            return controller;
        });
    }

    addMenuLinksToIndexPage() {
        const indexPage = document.querySelector('#indexPage');

        // Add CSS style tag to the header
        const style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode('.page.fullscreen { padding-bottom: 0 !important; padding-top: 4.3em !important; }'));
        document.head.appendChild(style);

        let i = 0;
        this.getMenuLinks().forEach(link => {
            const div = document.createElement('div');
            div.style.cssText += 'padding-bottom: 0 !important';
            div.style.display = 'flex';
            div.style.width = '100%';
            div.style.height = '100%';
            div.classList.add('tabContent', 'pageTabContent', 'menuLink');
            div.dataset.index = (i + 2).toString();
            div.dataset.url = link.url;

            const sectionsDiv = document.createElement('div');
            sectionsDiv.className = 'sections';
            sectionsDiv.style.display = 'flex';
            sectionsDiv.style.width = '100%';
            sectionsDiv.style.height = '100%';

            div.appendChild(sectionsDiv);
            indexPage.appendChild(div);
            i++;
        });
    }
}

export default HomeView;
