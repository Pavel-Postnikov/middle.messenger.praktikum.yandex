import Block from '../../utils/Block';
import Link from '../../components/Link';
import template from './Error500.pug';
import * as styles from './Error500.scss'

interface Error500Props {
    title: string;
}

export default class Error500Page extends Block<Error500Props> {
    constructor(props: Error500Props) {
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
