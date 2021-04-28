import React from 'react'

const Book = ({Data,deleteHandler,setUpdateId,setUpdateValTodo,setUpdateValUrl,setUpdateValDesc}) => {
    return (
             <div style={{ textAlign: "center",fontFamily:"Montserrat" ,width: "50%",boxShadow:"5px 5px 5px gray",border:"1px solid gray" }}>
                <div onClick={()=>{if(Data.url.substr(0,8) !== "https://"){window.open(`https://${Data.url}`, "_blank")}else{window.open(Data.url, "_blank")} }} style={{textAlign:"left",cursor:"pointer",margin: "20px", padding: "auto", paddingTop: "20px" }}>
                  <h3 style={{fontFamily:"Montserrat"}}>{Data.bookname}</h3>
                  <p>{Data.desc}</p>
                </div>
                <div style={{marginBottom:"3%"}}>
                <button onClick={() => { deleteHandler(Data.id); console.log("data =", JSON.stringify(Data.id)); }}>Delete</button>{"  "}
                <button onClick={() => { setUpdateId(Data.id); setUpdateValTodo(Data.bookname); setUpdateValUrl(Data.url); setUpdateValDesc(Data.desc); }}>Update</button>
                </div>
              </div>
    )
}

export default Book
