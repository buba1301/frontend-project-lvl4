import React, { useState, useRef } from 'react';
import { TextInput, Button, Modal } from '@mantine/core';
import { useForm } from '@mantine/hooks';

import './styles.css';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const Form = () => {
  const [opened, setOpened] = useState(true);
  const [error, setError] = useState(null);

  const ref = useRef(null);

  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false,
    },

    validationRules: {
      email: (value) => /^\S+@\S+$/.test(value),
    },
  });

  const handleClickOutside = () => {
    setError('Please register befor close form');
    form.setFieldError('email', true);
  };

  const handleSubmit = (values) => {
    console.log(values);
    setOpened(false);
  };

  const handleChange = (event) => form.setFieldValue('email', event.currentTarget.value);

  const handleFocus = () => {
    setError(null);
    form.setFieldError('email', false);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <Modal
      hideCloseButton="true"
      title="Introduce yourself!"
      opened={opened}
      onClose={() => setOpened(true)}
      overlayOpacity={0.99}
    >
      <form ref={ref} onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          required
          label="Email"
          value={form.values.email}
          onChange={handleChange}
          onFocus={handleFocus}
          error={form.errors.email && (error || 'Please specify valid email')}
        />

        <Button className="button" type="submit">
          Register
        </Button>
      </form>
    </Modal>
  );
};

export default Form;
