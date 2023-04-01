import Layout from '@/components/Layout'
import Link from 'next/link'
import React from 'react';
import { useForm } from 'react-hook-form';

const LoginPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = ({ email, password }) => {
    console.log(email, password)

  }

  return (
    <Layout title='login'>
      <form className='mx-auto max-w-screen-md' onSubmit={handleSubmit(submitHandler)}>
        <h1 className='mb-4 text-xl'>Login</h1>
        <div className='mb-4'>
          <label htmlFor="email">Email</label>
          <input type="email" className='w-full' id='email' autoFocus
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter a valid email address'
              }
            })} />
          {errors.email && (<div className='text-red-500'>{errors.email.message}</div>)}
        </div>
        <div className='mb-4'>
          <label htmlFor="password">Password</label>
          <input type="password" className='w-full' id='password' autoFocus
            {...register('password', {
              required: 'Please enter your password',
              minLength: { value: 8, message: 'Password need to be at least 8 characters long' }
            })}
          />
          {errors.password && (<div className='text-red-500'>{errors.password.message}</div>)}

        </div>
        <div className='mb-4'>
          <button className='prm-btn'>Login</button>
        </div>
        <div className='mb-4'>
          Don't have an account? &nbsp;
          <Link href='/register' className='underline'>Register here.</Link>
        </div>
      </form>
    </Layout>
  )
}

export default LoginPage