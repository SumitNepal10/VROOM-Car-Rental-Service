import React from 'react'
import { Box, ThemeProvider } from '@mui/material';

function Activity() {
  return (
    <div className='main-dashboard'>
         <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: 1,
          bgcolor: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
        }}
      />
  
        </div>
  )
}

export default Activity