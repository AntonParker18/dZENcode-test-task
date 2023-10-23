import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button, Container, Typography } from '@mui/material'
import { registration } from '../../redux/auth/authAction'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const RegistrationForm = () => {
  const { loading, success, token } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm()

  useEffect(() => {
    success && token && navigate('/login')
  }, [navigate, token, success])

  const onSubmit = data => {
    dispatch(registration(data))
  }

  if(loading) {
    return <h3>Loading...</h3>
  }

  return (
    <Container>
      <Typography variant='h5'>Registration</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type='text'
          {...register('userName', {
            maxLength: 70,
          })}
          label='User name'
          autoComplete='userName'
          error={!!errors.userName}
        />

        <TextField
          label='Email'
          name='email'
          {...register('email', {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Entered value does not match email format',
            },
          })}
          autoComplete='email'
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label='Password'
          type='password'
          name='password'
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password should be at least 6 symbols',
            },
          })}
          autoComplete='password'
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <TextField
          type='password'
          required
          {...register('confirmPassword', {
            validate: value => {
              return value === getValues('password') || 'Passwords do not match'
            },
          })}
          label='Confirm Password'
          autoComplete='new-password'
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        <Button variant='contained' color='primary' type='submit'>
          Register
        </Button>
      </form>
    </Container>
  )
}

export default RegistrationForm
