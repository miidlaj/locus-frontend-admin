import React from 'react'
import logo from '../../assests/oie_fCAaxhclGNkh.png'

interface Props {
    className?: string
}
const MainSmallIcon = (props: Props) => {
  return (
    <>
        <img src={logo} alt="Logo" className={props.className} />
    </>
  )
}

export default MainSmallIcon