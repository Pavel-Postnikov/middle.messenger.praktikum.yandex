import Block from '../../utils/Block';
import template from './Messages.pug';
import * as styles from './Messages.scss'

interface MessagesProps {
  Message: string;
  who: boolean;
}

export default class Messages extends Block<MessagesProps> {
  constructor(props: MessagesProps) {
    super('div', props);
    
    if (this.props.who) {
      this.element!.classList.add('message1')
    }
    else this.element!.classList.add('message2');

  }

  render() {

    return this.compile(template, { ...this.props, styles });

  }
}
