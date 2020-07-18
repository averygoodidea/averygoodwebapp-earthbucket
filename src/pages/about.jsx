import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import ConcentricVictoriesSvg from '../assets/img/concentric-victories.svg'
import { BannerImage, CommentSection, SEO } from 'atoms'
import { ContentWindow, EmailForm } from 'molecules'
import { Layout } from "organisms"
import styles from './about.module.scss'

const AboutPage = ({ data, location }) => (
  <Layout location={location} sectionTitle='About'>
    <SEO title="About" />
    <BannerImage cn={styles.psalm_1_1} src={data.psalm_1_1Jpg.fluid.originalImg}>
		<p>Blessed is the man <br />that <em>walketh</em> not in the <br />counsel of the ungodly, <br />nor <em>standeth</em> in the way of sinners, <br />nor <em>sitteth</em> in the seat of the scornful. - Psalm 1:1</p>
	</BannerImage>
	<BannerImage cn={styles.psalm_1_2} src={data.psalm_1_2Jpg.fluid.originalImg}>
		<p>But his delight is in the law of <br />the Lord; and in his law doth <br />he meditate day and night. <br />- Psalm 1:2</p>
	</BannerImage>
	<BannerImage cn={styles.psalm_1_3} src={data.psalm_1_3Jpg.fluid.originalImg}>
		<p>And he shall be like a tree planted by the rivers of water, <br />that bringeth forth his fruit in his season; his leaf also shall not wither; <br />and whatsoever he doeth shall prosper. - Psalm 1:3</p>
	</BannerImage>
	<ContentWindow>
		<p>Hi,<br />My name is Avery, and I created <strong>Faith Inventory</strong> as a resource to house many of the things I’ve learned and experienced during my journey as a spiritual son of the God of the Bible.</p>
		<p>The Heavenly Father, as referred to by Jesus (YahuSha), has revealed to me certain lessons and perspectives that have helped me better understand my life, and my purpose. So many people have big, arresting questions such as:</p>
		<ul>
			<li>Why do I exist?</li>
			<li>Is the Bible real?</li>
			<li>Where do I come from?</li>
			<li>What should I do in a major life event?</li>
		</ul>
		<p>I don’t know if I’ll be able to answer all of these questions in a way that is satisfactory to you but I will provide you the answers that are satisfactory for me.</p>
		<p>I will answer many of above questions in future posts but as far as faith goes, I'm not here to convince you of the gift of salvation. Having that revelation will allow you to fully utilize what Faith Inventory has to offer. If you do not subscribe to the gospel, much of what is covered is not going to make sense.</p>
		<p>That said, I’d like to refer you to a small pamphlet, entitled, Sit, Walk, Stand.</p>
		<div className='row'>
			<div className='col-xs-12 col-sm-offset-1 col-sm-4'>
				<br />
				<Link to="/album/O2y-vMrVTFSacfWWyofoWQ/" state={{ albumPosts: [], previousPathname: location.pathname }}>
					<Img fluid={data.sitWalkStandJpg.childImageSharp.fluid} />
				</Link>
			</div>
			<div className='col-xs-12 col-sm-offset-1 col-sm-5'>
				<p><strong>Sitting</strong> is resting in Christ, for He is the Sabbath. We must sit with Christ in heavenly places. - Ephesians 2:6</p>
				<p><strong>Walking</strong> is being enveloped in the Mind of Christ, evidence of that is being prepared for his return, by having extra oil in our lamps to be ready for situations that arise while on earth. - Ephesians 4:1-3</p>
				<p><strong>Standing</strong> is dealing with conflict, or wrestling with evil spirits. - Ephesians 6:11</p>
			</div>
		</div>
		<p>This can also be illustrated through a concept I call, “concentric victories":</p>
		<div className='row'>
			<div className='col-xs-12 col-sm-6'>
				<br />
				<img src={ConcentricVictoriesSvg} />
			</div>
			<div className='col-xs-12 col-sm-5'>
				<p><strong>Concentric Victories</strong> are personal areas of mastery that originate from a position of sitting, and then works it way outward to more external areas in one's life.</p>
				<p>This could be likened unto a <a href="https://en.wikipedia.org/wiki/Faberg%C3%A9_egg" target="_blank">Fabergé egg</a>, or <a href="https://en.wikipedia.org/wiki/Concentric_objects" target="_blank">concentric circles</a>.</p>
			</div>
		</div>
		<p>
			---
			<br />
			<a href="/api/1/docs/" target="_blank">Faith Inventory API Docs</a>
		</p>
		<EmailForm />
		<CommentSection mode="fullWidth" />
	</ContentWindow>
  </Layout>
)
export default AboutPage
export const query = graphql`
  query {
    sitWalkStandJpg: file(relativePath: { eq: "sit-walk-stand.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 872) {
	      # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
	      ...GatsbyImageSharpFluid_noBase64
	    }
      }
    }
    psalm_1_1Jpg: imageSharp(fluid: {originalName: {eq: "psalm-1-1.jpg"}})  {
		id
	    fluid {
	      originalImg
	      src
	    }
	}
	psalm_1_2Jpg: imageSharp(fluid: {originalName: {eq: "psalm-1-2.jpg"}})  {
		id
	    fluid {
	      originalImg
	      src
	    }
	}
	psalm_1_3Jpg: imageSharp(fluid: {originalName: {eq: "psalm-1-3.jpg"}})  {
		id
	    fluid {
	      originalImg
	      src
	    }
	}
  }
`