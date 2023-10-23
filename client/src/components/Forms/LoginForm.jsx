import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getCaptcha, login } from '../../redux/auth/authAction'
import { useNavigate } from 'react-router-dom'
import { Button, Container, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

const LoginForm = () => {
  const { loading, captcha } = useSelector(state => state.auth)
  const { userInfo } = useSelector(state => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    const fetchCaptcha = async () => {
      try {
        const captcha = dispatch(getCaptcha())
        console.log(captcha)
      } catch (error) {
        console.error('Failed to load captcha:', error)
      }
    }

    fetchCaptcha()
  }, [dispatch])

  console.log(captcha)

  const onSubmit = data => {
    dispatch(login(data))
  }

  return (
    <Container>
      <Typography variant='h5'>Login</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type='email'
          {...register('email', {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Entered value does not match email format',
            },
          })}
          label='Email'
          autoComplete='email'
          error={!!errors.email}
        />
        <TextField
          type='password'
          {...register('password', {
            required: true,
            minLength: 6,
          })}
          label='Password'
          autoComplete='password'
          error={!!errors.password}
        />
        <img src={captcha} alt='Captcha' />
        <TextField
          type='text'
          {...register('captcha')}
          label='Captcha'
          autoComplete='captcha'
          error={!!errors.captcha}
        />
        <Button variant='contained' color='primary' type='submit'>
          Login
        </Button>
      </form>
    </Container>
  )
}

export default LoginForm
