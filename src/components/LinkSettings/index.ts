import Block from '../../utils/Block';
import template from './button.pug';
import { PropsWithRouter, withRouter } from '../hocs/withRouter';
import * as styles from './LinkSettings.scss'

interface LinkSettingsProps extends PropsWithRouter {
    label: string;
    events: {
        click: () => void;
    };
    to: string;
}

class LinkSettings extends Block<LinkSettingsProps> {
    constructor(props: LinkSettingsProps) {
        super('span', props);
        this.element?.classList.add('linkButtonTest');
        this.props.events = {
            click: () => this.navigate(),
        }
    };

    navigate() {
        this.props.router.go(this.props.to);
    }

    render() {
        return this.compile(template, { ...this.props, styles });
    }
}

export default withRouter(LinkSettings);