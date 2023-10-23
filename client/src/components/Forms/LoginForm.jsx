import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getCaptcha, login } from '../../redux/auth/authAction'
import { useNavigate } from 'react-router-dom'
import { Button, Container, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import SvgComponent from '../../assets/svg/SvgComponent'

const LoginForm = () => {
  const { captcha, success, token, loading } = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (success && token) {
      localStorage.setItem('userToken', token)
      navigate('/comment')
    }
  }, [navigate, token, success])

  const fetchCaptcha = async () => {
    try {
      dispatch(getCaptcha())
    } catch (error) {
      console.error('Failed to load captcha:', error)
    }
  }

  const onSubmit = data => {
    dispatch(login(data))
    console.log(data)
  }

  if (loading) {
    return <h3>Loading...</h3>
  }

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant='h5' sx={{p: '10px'}}>Login</Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          minWidth: '15vw',
        }}
      >
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
        <TextField
          type='text'
          {...register('captcha')}
          label='Captcha'
          autoComplete='captcha'
          error={!!errors.captcha}
        />

        <SvgComponent svgCode={captcha} />

        <Button
          variant='contained'
          color='primary'
          onClick={() => fetchCaptcha()}
        >
          get captcha
        </Button>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => navigate('/registration')}
          >
            Go to registration
          </Button>
          <Button variant='contained' color='primary' type='submit'>
            Login
          </Button>
        </div>
      </form>
    </Container>
  )
}

export default LoginForm
