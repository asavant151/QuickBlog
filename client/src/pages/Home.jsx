import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { Helmet } from 'react-helmet-async'

const Home = () => {
  return (
    <>
     <Helmet>
        <title>QuickBlog - Discover Great Articles</title>
        <meta name="description" content="Discover great articles and stay updated with our latest news." />
     </Helmet>
     <Navbar />
     <Header />
     <BlogList />
     <Newsletter />
     <Footer />
    </>
  )
}

export default Home
