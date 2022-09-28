import { GraphQLClient, gql } from "graphql-request";
import styles from "../../styles/Slug.module.css";
import moment from "moment";
import Link from 'next/link';


const graphcms = new GraphQLClient(
  "https://api-eu-west-2.hygraph.com/v2/cl88lf41z1cfp01uj8y99g0qv/master"
);

const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      datePublished
      author {
        id
        name
        avatar {
          url
        }
      }
      content {
        html
      }
      coverPhoto {
        id
        url
      }
    }
  }
`;
const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { posts } = await graphcms.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY, { slug });
  const post = data.post;
  return {
    props: {
      post,
    },
    revalidate: 30,
  };
}

export default function BlogPost({ post }) {


  return (
    <div className={styles.container}>

      <nav className={styles.navbar}>
        <ul className={styles.navMenu}>
          <li className={styles.navLinksLeft}> zahwah&apos;s blog </li>
          <li className={styles.navLinksRight}> <Link href="/"> random thoughts &#8594; </Link></li>
        </ul>
      </nav>

    <main className={styles.blog}>
        <h1 className={styles.title}> {post.title}</h1>
        <div className={styles.authdetails}>
          <div className={styles.authtext}>
            <h6 className={styles.date}>
              &#9788; created on {moment(post.datePublished).format("MMMM d, YYYY")}
            </h6>
          </div>
      </div>

      <div
        className={styles.content}
      >
        <div dangerouslySetInnerHTML={{ __html: post.content.html }}></div>
      </div>
    </main>

      <footer className={styles.footerContainer}>
        <button className={styles.homeBtn}><Link href="/"> Home </Link> </button>
      </footer>
    </div>
  );
}