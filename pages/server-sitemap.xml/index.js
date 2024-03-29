import { getServerSideSitemap, ISitemapField } from 'next-sitemap'

import axios from 'axios'

export const getServerSideProps = async (ctx) => {
  // Method to source urls from cms
  const urls = await axios.get('https://kanbox.vn/wp-json/sitemap/api').then((res) => res.data);
  const fields = urls.map( val => ({
    loc: val,
    changefreq: 'daily',
    priority: 0.7,
    lastmod: new Date().toISOString(),
  }))

  return getServerSideSitemap(ctx, fields);
}

export default function Site() { }