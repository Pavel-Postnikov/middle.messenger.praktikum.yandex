import Block from '../../utils/Block';
import template from './ActiveDialogItem.pug';
import img from '../../../static/img/avatarTest.jpg';
import * as styles from './ActiveDialogItem.scss'

interface ActiveDialogItemProps {
    NameDialog: string;
    message?: string;
    time?: string;
    counterMessage?: number;
    events?: {
        click: () => void;
    };

}

export default class ActiveDialogItem extends Block<ActiveDialogItemProps> {
    constructor(props: ActiveDialogItemProps) {
        super('div', props);
        this.element?.classList.add('componentActiveDialogItem');
    }

    render() {
        return this.compile(template, { ...this.props, styles, img });
    }
}
