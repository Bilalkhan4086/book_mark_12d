const dotenv = require('dotenv')
const fauna = require("faunadb")
const {gql,ApolloServer} = require("apollo-server-lambda")

dotenv.config();
q = fauna.query;


const typeDefs = gql`
type data {
  id : ID!
  bookname : String
  url : String
  desc : String
}


type Query {
  message : [data]
}

type Mutation {
  delete_todo(id:ID!) : data
  add_todo(bookname:String!,url:String!,desc:String) : String
  update_todo(id:ID!,bookname:String!,url:String!,desc:String) : data
}

`;

const resolvers = {

// Queries

 Query : {
    message : async(parent, args, context)=>{
      try {
        var client = new fauna.Client({ secret: process.env.FAUNADB_SERVER_SECRET });
        let result = await client.query(
          q.Map(
            q.Paginate(q.Documents(q.Collection('bookShelfs'))),
            q.Lambda(x => q.Get(x))
          ));
           
         const allData = result.data.map((d)=>{
           return({
            id: d.ref.id,
            bookname: d.data.bookname,
            url: d.data.url,
            desc: d.data.desc,
           })
         })

        console.log("Results form server are here =",allData)
        return allData;

      } catch (err) {
        return ("Error is",err.toString());
      }

    },}
    
    ,

    // Mutations

    Mutation:{

// Delete Book

      delete_todo : async(_,{id})=>{
      try {
        var client = new fauna.Client({ secret: process.env.FAUNADB_SERVER_SECRET });
        console.log("id from server =",id)
        let result = await client.query(
          q.Delete(
            q.Ref(
              q.Collection("bookShelfs"), 
              id)
              )
          );    
        console.log("Results form server are here =",result)
        return `${result}`;
      } catch (err) {
        return ("Error is",err.toString());
      }
      }  
    
      ,    
      
// Update Book

update_todo : async(_,{id,bookname,url,desc})=>{
        try {
          var client = new fauna.Client({ secret: process.env.FAUNADB_SERVER_SECRET });
          console.log("id from server =",id)
          let result = await client.query(
            q.Update(
             q.Ref( q.Collection("bookShelfs"),id),
             {data:{bookname:bookname,url:url,desc:desc}}
            )
            );
             
          console.log("Results form server are here =",result)
          return {
            id: result.ref.id,
            bookname: result.data.bookname,
            url: result.data.url,
            desc: result.data.desc,
           };

        } catch (err) {
          return ("Error is",err.toString());
        }
      },  
      
// Add Book      

      add_todo : async(_,{bookname,url,desc})=>{
        try {
          var client = new fauna.Client({ secret: process.env.FAUNADB_SERVER_SECRET });
          let result = await client.query(
            q.Create(
            q.Collection("bookShelfs"),
             {data:{bookname:bookname,url:url,desc:desc}})
            );
             
          console.log("Results form server are here =",result)
          return("Done")
        } catch (err) {
          return ("Error is",err.toString());
        }
      },    
    }}

// Configuring Server

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground:true,
  introspection:true
});
 
exports.handler = server.createHandler();

