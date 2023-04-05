import Link from 'next/link'
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';

import Layout from '@/components/Layout'
import { getError } from '@/utils/error';
import axios from 'axios';

const RegisterPage = () => {

  const router = useRouter();
  const { redirect } = router.query;
  const { data: session } = useSession();

  const { register, getValues, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/')
    }
  }, [router, session, redirect])

  const submitHandler = async ({ name, email, password }) => {
    try {

      await axios.post('/api/auth/signup', {
        name, email, password
      })

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password
      })
      if (result.error) toast.error(result.error)
    } catch (error) {
      toast.error(getError(error))
    }

  }

  return (
    <Layout title='Create Account'>
      <form className='mx-auto max-w-screen-md' onSubmit={handleSubmit(submitHandler)}>
        <h1 className='mb-4 text-xl'>Create Account</h1>

        <div className='mb-4'>
          <label htmlFor="name">Name</label>
          <input type="text" className='w-full' id='name' autoFocus
            {...register('name', {
              required: 'Please enter name',
            })} />
          {errors.name && (<div className='text-red-500'>{errors.name.message}</div>)}
        </div>



        <div className='mb-4'>
          <label htmlFor="email">Email</label>
          <input type="email" className='w-full' id='email'
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
          <input type="password" className='w-full' id='password'
            {...register('password', {
              required: 'Please enter your password',
              minLength: { value: 8, message: 'Password need to be at least 8 characters long' }
            })}
          />
          {errors.password &&
            (<div className='text-red-500'>{errors.password.message}</div>)}

        </div>

        <div className='mb-4'>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" className='w-full' id='confirmPassword'
            {...register('confirmPassword', {
              required: 'Please enter your password again to confirm',
              validate: (value) => value === getValues('password'),
            })}
          />
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' &&
            (<div className='text-red-500'>Password do not match</div>)}
          {errors.confirmPassword &&
            (<div className='text-red-500'>{errors.confirmPassword.message}</div>)}
        </div>
        <div className='mb-4'>
          <button className='prm-btn'>Register</button>
        </div>
        <div className='mb-4'>
          Already have an account? &nbsp;
          <Link href={`/Login`} className='underline'>Login here.</Link>
        </div>
      </form>
    </Layout>
  )
}

export default RegisterPage