import Head from "next/head";
import { site, siteTitle } from "../next.config";

function strip(html) {
  var one = html.replace(/<\/?[^>]+(>|$)/gm, "");
  var two = one.replace(/[\r\n]\s*[\r\n]/gm, "");
  return two;
}

const SchemaSite = ({ post }) => {
  const {
    title,
    blurb,
    featuredImage,
    date,
    modified,
    slug,
    commentCount,
    author,
    ratingCount,
    ratingAverage,
    citations
  } = post;
  const published = new Date(date);
  const copyrightYear = published.getFullYear();

  let mediaDetails, sourceUrl;

  if (featuredImage) {
    sourceUrl = featuredImage.sourceUrl;
  }

  const citationsList = citations.map((citation, i) => {
    return `{ "@type": "CreativeWork", "citation": ${JSON.stringify(
      citation
    )} }${i === citations.length - 1 ? "" : ","}\n`;
  });
  const citationsText = citationsList.join("");

  const org = `{ "@id": "${site}#organization", "type": "Organization", "name":"${siteTitle}", "logo": {
    "@type": "ImageObject",
    "name": "${siteTitle} Logo",
    "width": "230",
    "height": "67",
    "url": "${site}images/logo.png"
} }`;

  return (
    <Head>
      <script type="application/ld+json">{`
    {
      "@context":"https://schema.org/",
      "@type":"Article",
      "name":"${title}",
      ${
        ratingAverage > 4
          ? `"aggregateRating": {
        "@type":"AggregateRating",
        "ratingValue":${ratingAverage},
        "reviewCount":${ratingCount}
      },`
          : ""
      }
      "about": "${blurb}",
      "author": { "@type": "Person", "@id": "${site}author/${
        author.slug
      }", "name": "${author.name}" },
      ${
        citationsText.length
          ? `"citation": [
        ${citationsText}
      ],`
          : ""
      }
      "commentCount": ${commentCount},
      "copyrightHolder": { "@id": "${site}#organization" },
      "copyrightYear": ${copyrightYear},
      "datePublished": "${date}",
      "dateModified": "${modified}",
      "description": "${blurb}",
      "discussionUrl": "${site}articles/${slug}#comments",
      "editor": { "@id": "${site}author/${author.slug}#author" },
      "headline": "${title}",
      ${sourceUrl ? `"image": "${sourceUrl}",` : ""}
      "inLanguage": "English",
      "mainEntityOfPage": "${site}articles/${slug}",
      "publisher": { "@id": "${site}#organization" },
      "sourceOrganization": ${org},
      "url": "${site}articles/${slug}"

    }
    `}</script> </Head> );
};
export default SchemaSite;