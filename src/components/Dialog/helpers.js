const normalizeDialog = (dialog, userName) => {
  console.log('userName', dialog[dialog.length - 1], userName);

  const mapMessage = dialog.map((message) => ({
    ...message,
    isReverse: message.userName === userName,
    isRemovable: message.userName === userName,
  }));

  return mapMessage;
};

export default normalizeDialog;
