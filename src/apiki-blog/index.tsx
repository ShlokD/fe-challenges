import { FC, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Blog, RawBlogs } from "./types";

type BlogCardProps = {
  title: string;
  description: string;
  slug: string;
  image: string;
};

type HomeProps = {
  blogs: Record<string, string>[];
  appState: string;
  handleLoadMore: () => void;
};

type InternalProps = {
  slug: string;
};

const BLOG_CACHE: Record<string, Blog> = {};

const transformBlogs = (blogs: RawBlogs[]): Record<string, string>[] => {
  if (!blogs) {
    return [];
  }
  return blogs.map((blog) => ({
    title: blog?.title?.rendered,
    description: blog?.excerpt?.rendered,
    slug: blog.slug,
    image:
      blog["_embedded"]["wp:featuredmedia"][0].media_details.sizes.full
        .source_url,
  }));
};

const BlogCard: FC<BlogCardProps> = (props) => {
  const { title, description, image, slug } = props;
  return (
    <Link
      to={`/apiki-blog?slug=${slug}`}
      className="w-11/12 lg:w-1/3 flex flex-col shadow-lg border-2 border-black p-2 m-2"
    >
      <img alt={title} src={image} style={{ minHeight: "120px" }} />
      <p className="text-2xl font-bold p-1">{title}</p>
      <div
        className="text-xl"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </Link>
  );
};

const Home: FC<HomeProps> = (props) => {
  const { blogs, appState, handleLoadMore } = props;

  return (
    <>
      <h1 className="self-center text-5xl font-bold p-6">Untitled Blog</h1>

      <div className="flex flex-col lg:flex-row flex-wrap w-full items-center lg:items-stretch justify-center">
        {blogs?.map((b, k: number) => (
          <BlogCard
            key={`blog-${k}`}
            title={b.title}
            description={b.description}
            image={b.image}
            slug={b.slug}
          />
        ))}
      </div>
      {appState === "LOADING" && (
        <div className="self-center p-4 text-2xl font-bold">Loading...</div>
      )}
      {blogs.length !== 0 && (
        <button
          onClick={handleLoadMore}
          className="bg-black p-4 text-white text-2xl font-bold w-2/3 self-center"
        >
          Load More
        </button>
      )}
    </>
  );
};

const Internal: FC<InternalProps> = (props) => {
  const { slug } = props;
  const [blog, setBlog] = useState<Blog>(
    BLOG_CACHE[slug] || {
      title: "",
      description: "",
    },
  );

  const fetchBlog = async () => {
    window.scrollTo(0, 0);

    if (!BLOG_CACHE[slug]) {
      const url = `https://blog.apiki.com/wp-json/wp/v2/posts?_embed&slug=${slug}`;
      const res = await fetch(url);
      const json = await res.json();
      const newBlog = {
        title: json[0]?.title?.rendered,
        content: json[0]?.content?.rendered,
      };
      BLOG_CACHE[slug] = newBlog;
      setBlog(newBlog);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <article className="w-full p-3 m-2">
      <Link className="text-2xl underline p-2" to="/apiki-blog">
        &larr;Back
      </Link>
      <h1
        className="font-bold p-2 my-2 text-4xl"
        dangerouslySetInnerHTML={{ __html: blog.title }}
      ></h1>
      <div
        className="text-xl flex flex-col w-11/12 "
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
};
const ApikiBlog = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [slug, setSlug] = useState(params.get("slug"));
  const [blogs, setBlogs] = useState<Record<string, string>[]>([]);
  const [appState, setAppState] = useState("READY");
  const page = useRef(1);
  const total = useRef(1);

  const fetchBlogs = async () => {
    const url = `https://blog.apiki.com/wp-json/wp/v2/posts?_embed&categories=518${
      page.current && page.current > 1 ? `&page=${page.current}` : ""
    }`;
    setAppState("LOADING");
    const res = await fetch(url);
    const headers = res.headers;
    total.current = parseInt(headers.get("x-wp-totalpages") || "1");
    const json = await res.json();
    setBlogs((prev) => [...prev, ...transformBlogs(json)]);
    setAppState("READY");
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleLoadMore = () => {
    if (page.current !== total.current && appState !== "LOADING") {
      page.current += 1;
      fetchBlogs();
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSlug(params.get("slug"));
  }, [location.search]);

  return (
    <div className="flex flex-col w-full">
      <Link to="/">
        <img src="/chess.ico" alt="To Home" />
      </Link>
      {slug && slug.length > 0 ? (
        <Internal slug={slug} />
      ) : (
        <Home
          blogs={blogs}
          appState={appState}
          handleLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
};

export default ApikiBlog;
