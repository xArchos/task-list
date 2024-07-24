import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
};

function FormPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data);
    console.log(JSON.stringify(data));
    localStorage.setItem('formData', JSON.stringify(data));
  };

  return (
    <div>
      <h1>Example Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" {...register('firstName', { required: true })} />
          {errors.firstName && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" {...register('lastName', { required: true })} />
          {errors.lastName && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" {...register('email', { required: true, pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ })} />
          {errors.email && <span>Invalid email address</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormPage;
