import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
};

function FormPage() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormValues>();
    const [storedData, setStoredData] = useState<FormValues | null>(null);
   
    useEffect(() => {
      const data = localStorage.getItem('formData');
      if (data) {
        const parsedData = JSON.parse(data);
        setStoredData(parsedData);
        setValue('firstName', parsedData.firstName);
        setValue('lastName', parsedData.lastName);
        setValue('email', parsedData.email);
      }
    }, [setValue]);
   
    const onSubmit: SubmitHandler<FormValues> = data => {
      console.log(data);
      console.log(JSON.stringify(data));
      localStorage.setItem('formData', JSON.stringify(data));
      setStoredData(data);
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
        {storedData && (
          <div>
            <h2>Stored Data</h2>
            <p>First Name: {storedData.firstName}</p>
            <p>Last Name: {storedData.lastName}</p>
            <p>Email: {storedData.email}</p>
          </div>
        )}
      </div>
    );
}

export default FormPage;
