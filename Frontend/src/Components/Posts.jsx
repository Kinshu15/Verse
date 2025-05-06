import React from 'react'

const Posts = () => {
    const x=[1,2,3,4,5,6,7,8,9,10];
  return (
    
        <div style={{backgroundColor:"silver",width:"500px",height:"auto",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:'center'}}>
            {x.map((post)=>{
                return (
                    <div style={{width:"400px",height:"auto",backgroundColor:"white",border:"black 2px solid",margin:"10px",borderRadius:"15px",padding:"15px"}}>
                        <div style={{display:"flex",alignItems:"center"}}>
                            <img style={{height:"30px",width:"30px",borderRadius:"50%"}} src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1de01e31-8016-4b9e-aef2-863c1e52ad1e/dg1adon-330b53e9-7934-497f-b961-78982ad43e6e.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzFkZTAxZTMxLTgwMTYtNGI5ZS1hZWYyLTg2M2MxZTUyYWQxZVwvZGcxYWRvbi0zMzBiNTNlOS03OTM0LTQ5N2YtYjk2MS03ODk4MmFkNDNlNmUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.OuKR7rRr4uOXQzqAlI0wh1Viy8ySsff-Aviiek4yN0c"/>
                            <p>John Doe</p>
                        </div>
                        <div>#{post}</div>
                        <div style={{display:"flex",justifyContent:"center"}}>
                        <img style={{borderRadius:"10px"}} src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"/>
                        </div>
                        <div>
                            <button>Like</button>
                            <button>Comment</button>
                            <button>Save</button>
                        </div>
                        <div style={{display:"flex", alignItems:"center",gap:"10px"}}>
                            <img style={{width:"25px",height:"25px",borderRadius:"50%"}} src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b8d517e6-2c88-453b-8d3a-3f79ff39b7c0/dgmmn3s-46371f14-ee56-425a-9cfc-a2d565bf192f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2I4ZDUxN2U2LTJjODgtNDUzYi04ZDNhLTNmNzlmZjM5YjdjMFwvZGdtbW4zcy00NjM3MWYxNC1lZTU2LTQyNWEtOWNmYy1hMmQ1NjViZjE5MmYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BI_m7F3HyOW5hmcwfrEFDj63TlBcx5sDXlUgCO6K3YQ"/>
                            <input style={{width:"250px",height:"25px",borderRadius:"10px"}} placeholder='Write your comment'/>
                        </div>
                    </div>
                )
            })}
        </div>   
   
  )
}

export default Posts
