import Block from '../../utils/Block';
import Link from '../../components/Link';
import template from './Error404.pug';
import * as styles from './Error404.scss'

interface Error404Props {
    title: string;
}

export default class Error404Page extends Block<Error404Props> {
    constructor(props: Error404Props) {
        super('div', props);
    }

    init() {
        this.children.button = [
            new Link({
                label: 'Перейти обратно в ЧАТ',
                to: '/messenger',
                events: {
                    click: () => { },
                },
            }),
        ];
    }

    render() {
        return this.compile(template, { ...this.props, styles });
    }
}
