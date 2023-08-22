import React, { useState } from 'react'
import styles from './Leftbar.module.css'
import Image from "next/image";


export default function Leftbar(props) {
    const {scrollTop} = props

  return (
    <>
      <button
        className={styles.burger_button_style}
        // onClick={toggleDrawer('left', true)}
      >
      
    <Image
            width="25"
            height="25" 
            src={scrollTop ? "./menu-icon-white.svg" : "./menu-icon.svg" } alt="Restaurant Image" />
      </button>
{/*  
      <Drawer anchor="left" open={state.left} onClose={toggleDrawer('left', false)}>
        {list('left')}
      </Drawer> */}
    </>
  )
}
