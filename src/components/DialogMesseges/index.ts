import Block from '../../utils/Block';
import { withStore } from '../../utils/store';
import Messages from '../Messeges';
import template from './DialogMessages.pug';
import * as styles from './DialogMessages.scss'

interface BasseDialogMessagesProps {
  messages: Record<string, any>;
}

class BasseDialogMessages extends Block<BasseDialogMessagesProps> {
  constructor(props: BasseDialogMessagesProps) {
    super('div', props);
    this.element!.classList.add('blockMessageItem');
  }

  render() {
    
    if (this.props.messages) {
      this.children.Messages = this.props.messages.map((messages: any) => new Messages({
        Message: messages.content,
        who: this.props.id === messages.user_id
      }))
    }

    return this.compile(template, { ...this.props, styles });
  }
}

const withUser = withStore((state) => ({ ...state.user }))

export default withUser(BasseDialogMessages);