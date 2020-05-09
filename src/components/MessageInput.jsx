import React, { useContext, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import { asyncActions } from '../slices/index.js';
import Context from '../context';

const MessageInput = () => {
  const { activeChannel } = useSelector((state) => state);
  const userName = useContext(Context);
  console.log('INPUT_userName', userName);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  const dispatch = useDispatch();

  const handleSubmit = async ({ text }, methods) => {
    console.log('INPUT_ACTIONS', methods); //
    const { resetForm, setStatus } = methods;
    const { addMessage } = asyncActions;
    console.log('INPUT_ACTIONS', resetForm, setStatus); //

    const messageData = { activeChannel, userName, text };
    try {
      await dispatch(addMessage(messageData));
      resetForm();
    } catch (e) {
      setStatus('Network Problem');
      console.log(e);
    }
  };

  const f = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: handleSubmit,
  });

  console.log('INPUT', f);
  return (
    <Form onSubmit={f.handleSubmit} className="mx-6">
      <FormGroup>
        <FormControl
          name="text"
          type="text"
          placeholder=""
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
