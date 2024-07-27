import React from 'react'
import Navbar from '../components/BankerNavbar'
import BankNavbar2 from '../components/BankNav2'
import Namaste from '../components/Namaste'
import CustDashGrid from '../components/CustDashGrid'

const CustDash2 = () => {
  return (
    <div className='flex flex-col bg-[#EFEFEF] h-full pb-3'>
        <BankNavbar2 />
        <Namaste />
        <CustDashGrid />
    </div>
  )
}

export default CustDash2