import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect, useRef, useState, ReactElement } from "react";
import { stagger } from "../../animations";
import Cursor from "../../components/Cursor";
import Header from "../../components/Header";
import data from "../../data/portfolio.json";
import { ISOToDate, useIsomorphicLayoutEffect } from "../../utils";
import { getAllPosts } from "../../utils/api";
import Image from "next/image";

interface Post {
  slug: string;
  title: string;
  image: string;
  preview: string;
  author: string;
  date: string;
}

const Blog = ({ posts }: { posts: Post[] }): ReactElement => {
  const showBlog = useRef(data.showBlog);
  const text = useRef<HTMLHeadingElement>(null);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (text.current) {
      stagger(
        [text.current],
        { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
        { y: 0, x: 0, transform: "scale(1)" }
      );
      if (showBlog.current) stagger([text.current], { y: 30 }, { y: 0 });
      else router.push("/");
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!showBlog.current) {
    return <></>;
  }

  return (
    <>
      {data.showCursor && <Cursor />}
      <Head>
        <title>Blog</title>
      </Head>
      <div
        className={`container mx-auto mb-10 ${
          data.showCursor ? "cursor-none" : ""
        }`}
      >
        <Header
          isBlog
          handleWorkScroll={undefined}
          handleAboutScroll={undefined}
        />
        <div className="mt-10">
          <h1
            ref={text}
            className="mx-auto mob:p-2 text-bold text-6xl laptop:text-8xl w-full"
          >
            Blog.
          </h1>
          <div className="mt-10 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 justify-between gap-10">
            {posts.map((post) => (
              <div
                className="cursor-pointer relative"
                key={post.slug}
                onClick={() => Router.push(`/blog/${post.slug}`)}
              >
                <Image
                  className="w-full h-60 rounded-lg shadow-lg object-cover"
                  src={post.image}
                  alt={post.title}
                  width={500}
                  height={300}
                />
                <h2 className="mt-5 text-4xl">{post.title}</h2>
                <p className="mt-2 opacity-50 text-lg">{post.preview}</p>
                <span className="text-sm mt-5 opacity-25">
                  {ISOToDate(post.date)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const posts = getAllPosts([
    "slug",
    "title",
    "image",
    "preview",
    "author",
    "date",
  ]);

  return {
    props: {
      posts: [...posts],
    },
  };
}

export default Blog;
