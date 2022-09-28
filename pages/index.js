import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { GraphQLClient, gql } from 'graphql-request'
import BlogCard from '../components/BlogCard';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from "framer-motion"
import Fade from 'react-reveal/Fade';

const graphcms = new GraphQLClient(
  "https://api-eu-west-2.hygraph.com/v2/cl88lf41z1cfp01uj8y99g0qv/master"
);

const QUERY = gql `
  {
    posts {
      id,
      title,
      datePublished,
      slug,
      content{
        html
      }
      author {
        name,
        avatar{
          url
        }
      }
      coverPhoto{
          url
        }
    }
  }
`

export async function getStaticProps() {
  const { posts } = await graphcms.request(QUERY);
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

export default function Home({ posts }) {

  const [cursorX, setCursorX] = useState()
  const [cursorY, setCursorY] = useState()

  useEffect(() => {

    window.addEventListener('mousemove', (e) => {
    setCursorX(e.pageX)
    setCursorY(e.pageY)
  })

}, [])



  return (

    <motion.div  initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.container}>
      <Head>
        <title> Random thoughts </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

     {/*<div class="cursor-wrapper">
        <div class="cursor"
        style={{
          left: cursorX + 'px',
          top: cursorY + 'px'
        }}
        >
      </div>

      </div> */}

      <nav className={styles.navbar}>
        <ul className={styles.navMenu}>
          <li className={styles.navLinksLeft}> zahwah's blog </li>
          <li className={styles.navLinksRight}><Link href="/"> random thoughts &#8594; </Link></li>
        </ul>
      </nav>

      <section className={styles.sectionTitle}>
        <p> Thoughts, musings, and mutterings from my coding journey</p>
      </section>

      <main className={styles.main}
      >
        {posts.map((post) => (
          <Fade bottom effect="fadeInUp" key={post}>
          <BlogCard
          title={post.title}
          coverPhoto={post.coverPhoto}
          key={post.id}
          slug={post.slug}
          />
          </Fade>
        ))}
      </main>
    </motion.div>
  )
}
