export type Blog = {
  title: string;
  content: string;
};

export type RawBlogs = {
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  _embedded: {
    "wp:featuredmedia": {
      media_details: {
        sizes: {
          full: {
            source_url: string;
          };
        };
      };
    }[];
  };
};
