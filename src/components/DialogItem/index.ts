import Block from '../../utils/Block';
import template from './DialogItem.pug';
import img from '../../../static/img/avatarTest.jpg';
import * as styles from './DialogItem.scss'

interface DialogItemProps {
    NameDialog: string;
    message: string;
    time: string;
    counterMessage: number;
    events: {
        click: () => void;
    };

}

export default class DialogItem extends Block<DialogItemProps> {
    constructor(props: DialogItemProps) {
        super('div', props);
        this.element?.classList.add('componentDialogItem');
    }

    render() {
        return this.compile(template, { ...this.props, styles, img });
    }
}
