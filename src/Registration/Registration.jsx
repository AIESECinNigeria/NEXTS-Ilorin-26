import React from 'react'
import FirstPage from './FirstPage/FirstPage'
import styles from './Registration.module.css'

const Registration = () => {
  return (
    <div className={`${styles.container}`}>
        <FirstPage />
    </div>
  )
}

export default Registration