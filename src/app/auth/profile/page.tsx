import React from 'react'
import ProtectedRoute from '../ProtectedRoute'

const ProfilePage = () => {
  return (
    <ProtectedRoute>
      <div>
        Profile Page
      </div>
    </ProtectedRoute>

  )
}

export default ProfilePage
