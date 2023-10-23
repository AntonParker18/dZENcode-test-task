import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../redux/user/userAction'

import { useNavigate } from 'react-router-dom'
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material'

import style from './Profile.module.css'
import userPhoto from '../../assets/img/user.jpg'


const Profile = memo(() => {
  const { userInfo, loading } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUser())
  }, [navigate, dispatch])

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <div className={style.profile}>
      <div>
        <Card>
          <Grid container alignItems='center'>
            <Grid
              container
              item
              direction='column'
              gap={'15px'}
              xs={12}
              md={3}
              sx={{ p: '1rem' }}
              justifyContent='center'
            >
              <Avatar
                sx={{ width: '150px', height: '150px', m: '0 auto', border: 'solid 1px #000' }}
                src={userInfo?.photo || userPhoto}
              />
            </Grid>
            <Divider
              className={style.divider}
              orientation='vertical'
              flexItem
            />
            <Grid container item xs={12} md={6} sx={{ p: '2rem' }}>
              <List sx={{ width: '100%' }}>
                <ListItem>
                  <Typography variant='h6'>Email: {userInfo?.email}</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant='h6'>
                    UserName: {userInfo?.userName}
                  </Typography>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Card>
      </div>
    </div>
  )
})

export default Profile
