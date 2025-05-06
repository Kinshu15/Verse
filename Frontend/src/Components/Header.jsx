import React from 'react'

const Header = () => {
  return (
    <div style={{display:"flex",backgroundColor:"white",justifyContent:"space-between",margin:"10px",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
        <img style={{width:"40px",height:"40px"}} src="https://static.vecteezy.com/system/resources/previews/003/651/643/non_2x/v-letter-logo-icon-for-business-and-company-vector.jpg"/>
        <h2>Verse</h2>
        </div>
        <div style={{display:"flex",gap:"20px",justifyContent:"space-evenly",alignItems:"center"}}>
            <input style={{height:"25px",width:"250px",borderRadius:"10px"}} placeholder='Search'/>
            <h3>Home</h3>
            <h3>Explore</h3>
            <h3>People</h3>
            <h3>Notification</h3>
        </div>
        <div>
            <div>
                <img />
                <button>Profile</button>
            </div>
      </div>
    </div>
  )
}

export default Header
