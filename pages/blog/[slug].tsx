import React, { useRef, useState, ReactElement } from "react";
import Image from "next/image";
import { getPostBySlug, getAllPosts } from "../../utils/api";
import Header from "../../components/Header";
import ContentSection from "../../components/ContentSection";
import Footer from "../../components/Footer";
import Head from "next/head";
import { useIsomorphicLayoutEffect } from "../../utils";
import { stagger } from "../../animations";
import Button from "../../components/Button";
import { useRouter } from "next/router";
import Cursor from "../../components/Cursor";
import data from "../../data/portfolio.json";

interface BlogPostProps {
  post: {
    date: string;
    slug: string;
    preview: string;
    title: string;
    tagline: string;
    image: string;
    content: string;
  };
}

const BlogPost = ({ post }: BlogPostProps): ReactElement => {
  const [showEditor, setShowEditor] = useState(false);
  const textOne = useRef<HTMLHeadingElement>(null);
  const textTwo = useRef<HTMLHeadingElement>(null);
  const router = useRouter();

  useIsomorphicLayoutEffect(() => {
    if (textOne.current && textTwo.current) {
      stagger([textOne.current, textTwo.current], { y: 30 }, { y: 0 });
    }
  }, []);

  return (
    <>
      <Head>
        <title>{"Blog - " + post.title}</title>
        <meta name="description" content={post.preview} />
      </Head>
      {data.showCursor && <Cursor />}

      <div
        className={`container mx-auto mt-10 ${
          data.showCursor ? "cursor-none" : ""
        }`}
      >
        <Header
          isBlog
          handleWorkScroll={undefined}
          handleAboutScroll={undefined}
        />
        <Image
          className="w-full h-96 rounded-lg shadow-lg object-cover"
          src={post.image}
          alt={post.title}
          layout="responsive"
          width={700}
          height={400}
        />
        <h1
          ref={textOne}
          className="mt-10 text-4xl mob:text-2xl laptop:text-6xl text-bold"
        >
          {post.title}
        </h1>
        <h2
          ref={textTwo}
          className="mt-2 text-xl max-w-4xl text-darkgray opacity-50"
        >
          {post.tagline}
        </h2>
      </div>
      <ContentSection content={post.content} />
      <Footer />
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-6 right-6">
          <Button
            onClick={() => setShowEditor(true)}
            type="primary"
            classes={undefined}
          >
            Edit this blog
          </Button>
        </div>
      )}
    </>
  );
};

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug, [
    "date",
    "slug",
    "preview",
    "title",
    "tagline",
    "preview",
    "image",
    "content",
  ]);

  return {
    props: {
      post: {
        ...post,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

export default BlogPost;
