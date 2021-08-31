import dayjs from 'dayjs';

const normalizeDialog = (dialog, userName) => {
  const newMessages = dialog.reduce((acc, message, index) => {
    if (index === 0 || dialog[index - 1]) {
      const first = dayjs((index === 0 ? message : dialog[index - 1]).date);

      const diff = first.diff(message.date, 'day');

      if (index === 0 || diff) {
        acc.push({
          type: 'title',
          id: `item-title-${message.id}`,
          date: message.date,
        });
      }
    }

    const newMessage = {
      type: 'message',
      isReverse: message.userName === userName,
      isRemovable: message.userName === userName,
      ...message,
    };
    acc.push(newMessage);
    return acc;
  }, []);

  return newMessages;
};

export default normalizeDialog;
