import {
    ElMessage
} from 'element-plus';

/**
 * @description 依次执行消息弹窗队列
 */
function exeQueue() {
    // 获取待执行队列
    const queue = JSON.parse(sessionStorage.msgQueue);

    // 将第一个待执行的消息弹窗取出
    const waitExe = queue.shift();

    // 执行消息弹窗
    ElMessage(waitExe);

    // 当前消息弹窗结束后，继续以下操作
    setTimeout(() => {
        // 获取最新的待执行队列（可能在执行一个期间又添加了，所以要重新获取）
        const newQueue = JSON.parse(sessionStorage.msgQueue);

        // 因为第一个已经执行完成了，所以需要移除掉。
        newQueue.shift();

        if (newQueue.length === 0) {
            // 待执行队列为空，则直接移除这个会话存储
            sessionStorage.removeItem('msgQueue');
        } else {
            // 待执行队列不为空，则保存新的待执行队列，然后递归调用继续执行下一个
            sessionStorage.msgQueue = JSON.stringify(newQueue);
            exeQueue();
        }
    }, waitExe.duration);
}

/**
 * @description 消息提示弹窗队列
 * @param {string} message 提示文本，默认‘操作成功’
 * @param {string} type 弹窗类型('success', 'error', 'warning')，默认‘success’
 * @param {number} duration 弹窗持续时间，默认1500ms
 */
const messageQueue = (message = '操作成功', type = 'success', duration = 1500) => {
    if (typeof message !== 'string' || message.trim().length === 0) {
        console.error('msgQueue() arguments type error(message).');
        return;
    }

    if (typeof type !== 'string' || ['error', 'success', 'warning'].indexOf(type) === -1) {
        console.error('msgQueue() arguments error(type).');
        return;
    }

    if (typeof duration !== 'number' || duration <= 0) {
        console.error('msgQueue() arguments error(duration).');
        return;
    }

    if (sessionStorage.msgQueue) {
        // 将当前要执行的消息提示弹窗加入队列中
        const msgQueue = JSON.parse(sessionStorage.msgQueue);
        msgQueue.push({message, type, duration});

        sessionStorage.msgQueue = JSON.stringify(msgQueue);
    } else {
        // 当前消息提示弹窗执行队列为空
        const msgQueue = [];
        msgQueue.push({
            message,
            type,
            duration
        });
        
        // 将当前要执行的消息提示弹窗保存到会话存储中
        sessionStorage.msgQueue = JSON.stringify(msgQueue);

        // 调用执行方法
        exeQueue();
    }
};

export default messageQueue;