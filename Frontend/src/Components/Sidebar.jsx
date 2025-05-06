import React from 'react'

const Sidebar = () => {
  return (
    <div>
      <div style={{height:"250px",backgroundColor:"white",width:"200px",margin:"10px",display:"flex",alignItems:"center",flexDirection:"column"}}>
        <img src=""/>
        <p>userinfo</p>
        <img style={{height:"100px",width:"100px",borderRadius:"50%"}} src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b8d517e6-2c88-453b-8d3a-3f79ff39b7c0/dgmmn3s-46371f14-ee56-425a-9cfc-a2d565bf192f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2I4ZDUxN2U2LTJjODgtNDUzYi04ZDNhLTNmNzlmZjM5YjdjMFwvZGdtbW4zcy00NjM3MWYxNC1lZTU2LTQyNWEtOWNmYy1hMmQ1NjViZjE5MmYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BI_m7F3HyOW5hmcwfrEFDj63TlBcx5sDXlUgCO6K3YQ"/>
        <div style={{display:"flex",gap:"5px"}}>

            <div>posts</div>
            <div>Followers</div>
            <div>Following</div>

        </div>
        <button>My Profile</button>
        


      </div>
      <div style={{height:"250px",backgroundColor:"white",width:"200px",margin:"10px"}}>
        Your shortcuts
      </div>

    </div>
  )
}

export default Sidebar
