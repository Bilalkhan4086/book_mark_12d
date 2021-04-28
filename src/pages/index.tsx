import * as React from "react"
import Layout from "../components/layout"
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import EmptyCart from "../components/EmptyCart";
import Book from "../components/Book";


const APOLLO_QUERY = gql`
  {
    message{
      bookname
      id 
      url
      desc
    }
  }
  `;

const DELETE_TODO = gql`
  mutation delete_todo($id:ID!){
    delete_todo(id:$id){
      bookname
      url
      desc
    }
  }
  `;

const UPDATE_TODO = gql`
  mutation update_todo($id:ID!,$bookname:String!,$url:String!,$desc:String){
    update_todo(id:$id,bookname:$bookname,url:$url,desc:$desc){
      bookname
      url
      desc
    }
  }
  `;

const ADD_TODO = gql`
  mutation add_todo($bookname:String!,$url:String!,$desc:String){
    add_todo(bookname:$bookname,url:$url,desc:$desc)
  }
  `;

const IndexPage:React.FC = () => {

  const { loading, error, data } = useQuery(APOLLO_QUERY);
  const [delete_todo] = useMutation(DELETE_TODO);
  const [update_todo] = useMutation(UPDATE_TODO);
  const [add_todo] = useMutation(ADD_TODO);
  const [UpdateValTodo, setUpdateValTodo] = React.useState("");
  const [UpdateValUrl, setUpdateValUrl] = React.useState('');
  const [UpdateId, setUpdateId] = React.useState('');
const [UpdateValDesc, setUpdateValDesc] = React.useState('')
  // delete Handler

  const deleteHandler = (id) => {
    delete_todo({
      variables: {
        id,
      },
      refetchQueries: [{ query: APOLLO_QUERY }]
    })
  };

  // Update Handler

  const updateHandler = (id, bookname, url,desc) => {
    update_todo({
      variables: {
        id,
        bookname,
        url,
        desc
      },
      refetchQueries: [{ query: APOLLO_QUERY }]
    })
  };

  // Add Todo Handler

  const addHandler = (bookname, url,desc) => {
    add_todo({
      variables: {
        bookname,
        url,
        desc
      },
      refetchQueries: [{ query: APOLLO_QUERY }]
    })
  }

  // If error arrived

  if (error) {
    <div>Sorry Here is Some Error = {error}  </div>
  }



  return (
    <Layout>

      <div style={{ display: "flex", justifyContent: "center" }}>

        <form style={{ textAlign: "left" }} onSubmit={(e) => { e.preventDefault(); UpdateId.length ? updateHandler(UpdateId, UpdateValTodo, UpdateValUrl,UpdateValDesc) : addHandler(UpdateValTodo, UpdateValUrl,UpdateValDesc); setUpdateId(""); setUpdateValTodo(''); setUpdateValUrl('');setUpdateValDesc(''); }}>
          <label htmlFor="todo">Text</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input className="todo" type="text" value={UpdateValTodo} onChange={(e) => { setUpdateValTodo(e.target.value) }} /><br /><br />
    <label htmlFor="url">Url</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input className="url" type="text" value={UpdateValUrl} onChange={(e) => { setUpdateValUrl(e.target.value) }} /><br /><br />
          <label htmlFor="url">Description</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input className="desc" type="text" value={UpdateValDesc} onChange={(e) => { setUpdateValDesc(e.target.value) }} /><br /><br />
          <button disabled={UpdateValTodo === "" || UpdateValDesc === '' || UpdateValUrl === '' ? true : false}>submit</button>
        </form>

      </div>


      <h2 style={{textAlign:"center",fontFamily:"Montserrat"}}>Shelve</h2>
      {loading ?
        <div style={{fontFamily:"Montserrat",fontWeight:"bolder"}}>Loading ...</div>
        :
        data && data.message.length === 0 ? <div><EmptyCart/> </div> :
        data && data.message.slice(0).reverse().map((Data, id) => {
          return (
            <div key={id} style={{display:"flex",justifyContent:"center",margin:"3%"}}>
              <Book Data={Data} setUpdateId={setUpdateId} setUpdateValTodo={setUpdateValTodo} setUpdateValUrl={setUpdateValUrl} setUpdateValDesc={setUpdateValDesc} deleteHandler={deleteHandler} />
            </div>
          )
        })
      }</Layout>
  )
}

export default IndexPage


