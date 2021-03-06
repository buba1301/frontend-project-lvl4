import React, { useContext, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import { asyncActions } from '../slices/index.js';
import Context from '../context';

const MessageInput = () => {
  const { t } = useTranslation();

  const activeChannel = useSelector((state) => state.activeChannel);

  const userName = useContext(Context);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  const dispatch = useDispatch();

  const handleSubmit = async ({ text }, { resetForm, setStatus }) => {
    const { addMessage } = asyncActions;

    const messageData = { activeChannel, userName, text };
    try {
      await dispatch(addMessage(messageData));
    } catch (e) {
      setStatus(t('errors.network'));
    }
    resetForm();
  };

  const f = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: handleSubmit,
  });

  return (
    <Form onSubmit={f.handleSubmit} className="mx-6">
      <FormGroup>
        <FormControl
          name="text"
          type="text"
          placeholder={t('placeholder.message')}
          onChange={f.handleChange}
          value={f.values.text}
          isInvalid={!!f.status}
          disabled={f.isSubmitting}
          ref={inputRef}
        />
        <FormControl.Feedback type="invalid">
          {f.status}
        </FormControl.Feedback>
      </FormGroup>
    </Form>
  );
};

export default MessageInput;
