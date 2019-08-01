import React from 'react'
import styles from './Bio.module.css'
import { getGravatarURL } from '../utils/getGravatarURL'

interface BioProps {
  className?: string
}

function Bio(props: BioProps) {
  let photoURL = getGravatarURL({
    email: "artemisaliberato@gmail.com",
    size: 56,
  })

  return (
    <div
      className={`
      ${styles.Bio}
      ${props.className || ''}
    `}>
      <img src={photoURL} alt="Me" />
      <p>
        Hi, i'm Juan, Computer Scientist, this blog is about Front end Development, Data visualization and Data Science, in Spanish and English
        <br />
        Checkout my website {' '}
        <a href="https://dascire.com/">dascire.com</a>.<br />
        Contact me : {' '}
        <a href="https://jcliberatol.github.io/">
          CV
        </a>
        , <a href="https://github.com/jcliberatol">github</a>, and{' '}
        <a href="https://www.linkedin.com/in/juan-camilo-liberato-luna-100a2b33/">Linkedin</a>.
     
        <br />
        jcliberatol@unal.edu.co   
        <br />
        +57 3193686868
      </p>
    </div>
  )
}

export default Bio
