const normalizeDialog = (dialog, userName) => {
  const mapMessage = dialog.map((message) => ({
    ...message,
    isReverse: message.userName === userName,
    isRemovable: message.userName === userName,
  }));

  return mapMessage;
};

export default normalizeDialog;
