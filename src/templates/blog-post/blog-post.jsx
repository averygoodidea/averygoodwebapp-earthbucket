import { BannerImage, CommentSection, SEO } from "atoms";
import { BlogNavbar, ContentWindow, EmailForm } from "molecules";
import { BlogPostActivityMenu, Layout } from "organisms";
import React from "react";
import styles from "./blog-post.module.scss";

const BlogPost = ({ location, pageContext }) => {
  const {
    author,
    coverPhoto,
    date,
    excerpt,
    html,
    next,
    previous,
    s3ObjectMap,
    tags,
    title
  } = pageContext;
  const bannerImageSrc = s3ObjectMap[coverPhoto].childImageSharp.fluid.src;
  const bannerImage = (
    <BannerImage
      backgroundPosition="center"
      cn={styles.bannerImage}
      src={bannerImageSrc}
    >
      <h2>{title}</h2>
    </BannerImage>
  );
  // reach router doesn't trigger a browser refresh, therefore the scrollTo Y position never resets
  // therefore, manualy reset scroll position on blog post render
  if (
    typeof window !== `undefined` &&
    window.___AVERYGOODWEBAPP_INITIAL_RENDER_COMPLETE
  ) {
    window.scrollTo(0, 0);
  }
  return (
    <Layout location={location} sectionTitle="Blog">
      <SEO
        description={excerpt}
        keywords={tags}
        openGraphImgSrc={bannerImageSrc}
        title={title}
      />
      <BlogNavbar next={next} previous={previous} />
      <ContentWindow bannerImage={bannerImage}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <BlogPostActivityMenu author={author} date={date} tags={tags} />
        <EmailForm />
        <CommentSection mode="fullWidth" />
      </ContentWindow>
      <BlogNavbar next={next} previous={previous} />
    </Layout>
  );
};

export default BlogPost;
