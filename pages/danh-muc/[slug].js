import { useState } from 'react'
import { Grid, Container, Row, Col, Breadcrumb, Form, Pagination  } from 'rsuite';
import Link from 'next/link';
import styles from '../../styles/blog.module.css';
import axios from 'axios';
import SearchIcon from '@rsuite/icons/Search'

import { BlogStyleOne, BlogStyleTwo } from '../../components/blog-templates/BlogContent';
import Loading from '../../components/Loading';
import HTMLReactParser from 'html-react-parser';
import { NewsSeo } from '../api/HeaderSeo';
import Head from 'next/head';

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;


const NewsCategory = ({bai_viet, danh_muc, max_num_pages}) => {

  const [keySearch, setKeySearch] = useState('');
  const [posts, setPosts] = useState(bai_viet);
  const [maxpage, setMaxPage] = useState(max_num_pages);
  const [paged, setPaged] = useState(1);
  const [loading, setLoading] = useState(false);

  const Search_Page = async () => {
    setLoading(true);
    setPaged(1);
    const { data } = await axios.get(rootURL + 'tin-tuc/bai-viet?perpage=10&s=' + keySearch).then((res) => res);
    if(data){
      setPosts(data.posts);
      setMaxPage(data.max_num_pages)
      setLoading(false);
    }
  }

  const Next_Pages = async (num) => {
    setLoading(true);
    setPaged(num);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
  });
    const { data } = await axios.get(rootURL + 'tin-tuc/bai-viet?perpage=7&p=' + num).then((res) => res);
    if(data){
      setPosts(data.posts);
      setLoading(false);
    }
  }

  if(bai_viet == undefined) return '';
    return (
      <>
      <Head>
        { HTMLReactParser(NewsSeo.replaceAll("kanbox", "kansite.com").replaceAll("giao_dien", "giao-dien").replaceAll("kansite.com.vn/wp-content", "kanbox.vn/wp-content")) }
      </Head>
      <div className={'x_breadcum_container'}>
          <Grid className={'x-container'}>
            <Container>
                <Row>
                    <Col xs={24}>
                      <Breadcrumb className={'x_breadcumb'}>
                        <Breadcrumb.Item as={Link} href="/">Trang ch???</Breadcrumb.Item>
                        <Breadcrumb.Item active>Tin t???c</Breadcrumb.Item>
                      </Breadcrumb>
                    </Col>
                </Row>
            </Container>
        </Grid>    
      </div>  
      <section className={styles.x_newsSection}>
        <Grid className={'x-container'}>
          <Container>
              <Row>
                <Col xs={24}>
                  <h1 className={styles.x_wellcome_title}>
                    Cung c???p th??ng tin th????ng m???i ??i???n t??? 
                    <span className={styles.x_highlight}> hi???n t???i v?? t????ng lai</span>
                  </h1>
                </Col>
              </Row>
              <Row className={styles.x_meta_with_form}>
                <Col xs={24}>
                      <Form onSubmit={(event) => Search_Page(event)}>
                        <Form.Group className={styles.x_form_search_group}>
                          <Form.Control 
                            type="text"
                            value={keySearch}
                            name='s'
                            onChange={(value) => setKeySearch(value)}
                            placeholder={'T??m ki???m b??i vi???t...'}
                            className={styles.x_form_search_posts}
                          />
                          <button className={styles.x_search_posts_button}>
                            <SearchIcon width={22} height={22} />
                          </button>
                        </Form.Group>
                      </Form>
                </Col>
              </Row>
              <Row>
                  {
                    loading ?  <Col xs={24}><Loading /></Col>
                    :
                    <>
                      {
                        posts != '' ?
                        <>
                          {
                            posts.map((val, index) => {
                                return(
                                  index == 0 ? 
                                  <Col xs={24} key={val.ID}>
                                    <BlogStyleOne data={val} />
                                  </Col>
                                  :
                                  <Col xs={24} md={12} lg={8} key={val.ID}>
                                    <BlogStyleTwo data={val} />
                                  </Col>
                                )
                            })
                        } 
                        <Col xs={24}>
                          <div className={styles.x_pagination}>
                              <Pagination total={maxpage} limit={1} activePage={paged} onChangePage={(current) => { Next_Pages(current)}} />
                          </div>
                        </Col>
                        </>
                        : 'Kh??ng c?? b??i vi???t'
                      }
                    </>
                }
              </Row>
            </Container>
          </Grid>
        </section>
        </>
    )
}

export default NewsCategory

export async function getServerSideProps(context) {
  const Slug = context.query.slug;
  const res = await axios.get(rootURL + 'tin-tuc/bai-viet?perpage=10&category=' + Slug).then((resonse) => resonse.data);

  // Pass data to the page via props
  return { props: { 
    bai_viet: res.posts,
    danh_muc: res.terms,
    max_num_pages: res.max_num_pages
 }}
}