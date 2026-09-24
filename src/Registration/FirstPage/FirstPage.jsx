import React from 'react'
import { useState } from 'react';
import { TextField } from '@mui/material'
import styles from './FirstPage.module.css'

const FirstPage = () => {

  return (
    <div className={`${styles.container} text-white `}>
        <div>
            <form>
                <div>
                    <label htmlFor='name'> What do we call the artisan?</label>
                    <input
                        id="name"
                        name="name"
                        required
                        type="text"
                        placeholder='Michelangelo Buonarroti'
                    />
                </div>
                <div>
                    <label htmlFor='number'>How do we reach the master?</label>
                    <p>{`(Phone Number)`}</p>
                    <input
                        id="number"
                        name="number"
                        required
                        type="number"
                        placeholder='Your golden ration...'
                    />
                </div>
                
            </form>
        </div>
    </div>
  )
}

export default FirstPage