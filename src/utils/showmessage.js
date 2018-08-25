import { Message } from 'element-ui';

export function showMessage(msg,type) {
    Message({
        showClose: true,
        message: msg,
        type: type
    });
}
