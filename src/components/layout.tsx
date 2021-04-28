/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */
 import * as React from "react"
 import PropTypes from "prop-types"
 import "./layout.css"
 import Header from "./header"
 import "./layout.css"
 
 const Layout:React.FC<React.ReactNode> = ({ children }) => {
   return (
     <>
       <Header siteTitle={'Put your book in shelf'} />
       <div
         style={{
           margin: `0 auto`,
           maxWidth: 960,
           padding: `0 1.0875rem 1.45rem`,
         }}
       >
         <main className="main" style={{minHeight:"70vh"}}>{children}</main>
         <footer
           style={{
             marginTop: `2rem`,
           }}
         >
           © {new Date().getFullYear()}, Built with
           {` `}
           <a href="https://www.smashingmagazine.com/2019/10/bookmarking-application-faunadb-netlify-11ty/">GraphQl and Faunadb</a>
         </footer>
       </div>
     </>
   )
 }
 
 Layout.propTypes = {
   children: PropTypes.node.isRequired,
 }
 
 export default Layout
 