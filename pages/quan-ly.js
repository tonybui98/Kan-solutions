import { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button, ButtonToolbar, Sidenav, Progress, Badge } from 'rsuite'
import { IoSearchOutline, 
    IoAlbumsOutline, 
    IoAddSharp, 
    IoLinkOutline, 
    IoCalendarClearOutline,
    IoBuild,
    IoCafeSharp, 
    IoBookmark,
    IoCalendarOutline } from "react-icons/io5";
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'; 
import moment from 'moment';
import 'moment/locale/vi'
import dynamic from 'next/dynamic'
import { getSession } from 'next-auth/react';
import styles from '../styles/account.module.css'
import UserNav from '../components/user-manager/UserNav';
import { RateUser } from './api/services';
import MenuIcon from '@rsuite/icons/Menu';

const Chart = dynamic(
  () => {
    return ( import('react-apexcharts') )
  },
  { ssr: false }
)

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

export const BlogContent = ({data}) => {
    const [LineStroke, setLineStroke] = useState({
        strokeColor : '',
        status: ''
    });
    const [percent, setPercent] = useState('');
    const SiteIcon = data.site_icon && data.site_icon != 'empty' ? data.site_icon : '/icons/favicon.png'
    const StoreAvaiable = parseInt(data.quota);
    const DisplayAvaiableUpload = StoreAvaiable < 1000 ? StoreAvaiable + 'mb' : (StoreAvaiable/1000) + 'gb';
    const Uploaded = parseInt(data.upload);
    const DisplayUploaded = Uploaded < 1000 ? Uploaded + 'mb' : (Uploaded/100) + 'gb'
    const Remain = StoreAvaiable - Uploaded;
    const registed = new Date(data.registered);
    const expired = new Date(parseInt(data.get_expire, 10) * 1000);
    const current = new Date();
    const DateRegisted = moment(registed).format('LL');
    const expiredDate = moment(expired).format('LL');

    const expiredClass = current <= expired ? styles.x_danger : styles.x_success;
    const chartValue = {
        options: { 
            colors: ['#e74c3c', '#2d88e2'],
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                stroke: {
                    show: false,
                }
        },
        dataLabels: {
            enabled: true,
            position: 'bottom',
            style:{
                fontSize: '10px',
                fontWeight: 'bold',
                color: '#000'
            },
            background: {
                enabled: true,
                foreColor: '#333',
                padding: 4,
                borderRadius: 2,
            },
            dropShadow: {
                enabled: false,
                top: 1,
                left: 1,
                blur: 1,
                color: '#000',
                opacity: 0.45
            }
            },
            labels: ['???? t???i l??n', 'C??n tr???ng'],
            theme: {
            mode: 'light', 
            palette: 'palette1', 
            monochrome: {
                enabled: false,
                color: '#255aee',
                shadeTo: 'light',
                shadeIntensity: 0.65
            },
        }
        },
        series: [Uploaded, Remain],
    }

    const site_lever = RateUser.filter((value) => {
        if(value.lever == data.lever){
            return value;
        }
    })[0];

    useEffect(() => {
        let total = expired - registed;
        let progress = current - registed;
        let percentNumber =  Math.round(progress/ total * 100 );
        setPercent(percentNumber);
    }, [])

    useEffect(() => {
        if(percent >= 0 && percent <= 50){
            setLineStroke({
                strokeColor: '#4caf50',
                status: 'success'
            });
        } else if(percent> 50 && percent <= 75){
            setLineStroke({
                strokeColor: '#ffc107',
                status: 'active'
            });
        } else if(percent > 75 && percent <= 100){
            setLineStroke({
                strokeColor: '#f44336',
                status: 'fail'
            });
        } else {
            setLineStroke({
                strokeColor: '#b02318',
                status: 'fail'
            });
        }
    }, [percent])

    return(
        <div className={styles.x_blog}>
            <Row>
                <Col xs={24} md={12}>
                    <a className={styles.x_blog_link} target={'_blank'} rel="noreferrer" href={data.home}>
                        <IoLinkOutline size={18} color='#999'/>
                    </a>
                    <div className={styles.x_blog_content}>
                        <div className={styles.x_flex_blog_image}>
                            <span className={styles.x_blog_favicon}>
                                <Image width={40} height={40} alt={data.blogname} src={ SiteIcon } />
                            </span>
                            <div className={styles.x_blog_flex_content}>
                                <Link href={'/quan-ly/quan-ly-trang/site?id=' + data.blog_id}>
                                    <a>
                                        <h3>{data.blogname}</h3>
                                    </a>
                                </Link>
                                <p style={{
                                    display: 'inline-block',
                                    padding: '3px',
                                    border: '1px solid #e5e5e5',
                                    borderRadius: '5px'
                                }}><IoBookmark/> {site_lever.name}</p>
                            </div>
                        </div>
                        
                        <div className={styles.x_flex_qouta}>
                            <div className={styles.x_flex_qouta_content}>
                                <div>
                                    <span>Gi???i h???n:</span><strong>{DisplayAvaiableUpload}</strong>
                                </div>
                            </div>
                            <div className={styles.x_flex_qouta_content}>
                                <div>
                                <span>???? t???i l??n:</span><strong>{DisplayUploaded}</strong>
                                </div>
                            </div>
                            <div className={styles.x_flex_qouta_content}>
                                <div>
                                    <span>B??i vi???t:</span><strong>{data.post_count}</strong>
                                </div>
                            </div>
                        </div>
                        <div className={styles.x_blog_meta}>
                            <div>
                                <p className={styles.x_blog_meta_title}><IoCalendarClearOutline /> Ng??y ????ng k??:</p> 
                                <span className={styles.x_date_badge}>{ DateRegisted }</span>
                            </div>
                            <div className={expiredClass}>
                                <p className={styles.x_blog_meta_title}><IoCalendarOutline /> S??? d???ng ?????n:</p>
                                <span className={styles.x_date_badge}>{expiredDate}</span>
                            </div>
                        </div>
                        <Progress.Line percent={percent} strokeColor={LineStroke.strokeColor}/>
                        <ButtonToolbar style={{marginBottom: 15}}>
                            <Link href={'/quan-ly/thanh-toan/nang-cap?site_id=' + data.blog_id}>
                                <a>
                                    <Button className={styles.x_upgrade_button}>
                                        <IoBuild />
                                        N??ng c???p website
                                    </Button>
                                </a>
                            </Link>
                            <Link href={'/quan-ly/thanh-toan/gia-han?site_id=' + data.blog_id}>
                            <Button className={styles.x_extend_button}>
                                <IoCafeSharp />
                                Gia h???n
                            </Button>
                            </Link>
                        </ButtonToolbar>
                    </div>
                </Col>
                <Col xs={24} md={12}>
                    <div className={styles.x_blog_chart}>
                        <Chart options={chartValue.options} labels={chartValue.labels} series={chartValue.series} type="donut" width="180" />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

const UserManager = ({blogInfor}) => {
  const [expanded, setExpanded] = useState(true);
  const[showMobileNav, setShowMobileNav] = useState(true);

  return (
    <>
    <section className={styles.x_app_section}>
        <Container>
            <Row>
                <Col xs={24} md={!expanded ? 2 : 6}>
                    <Button 
                        onClick={() => {setShowMobileNav(!showMobileNav)}} 
                        className={styles.x_mobile_menu_button} 
                        style={{width: '100%'}}
                    >   
                        <MenuIcon />
                         Menu qu???n l??
                    </Button>
                    {
                        showMobileNav ?
                        <div className={styles.x_account_nav}>
                            <Sidenav expanded={expanded}>
                                <Sidenav.Body>
                                    <UserNav active={'quan-ly'} expanded={expanded}/>
                                    <Sidenav.Toggle expanded={expanded} onToggle={expanded => setExpanded(expanded)} />
                                    <Button 
                                        className={styles.x_nav_mobile_close_button}
                                        onClick={() => {setShowMobileNav(!showMobileNav)}} 
                                        color={'primary'} 
                                        style={{width: '100%'}}
                                        >
                                        ????ng
                                    </Button>
                                </Sidenav.Body>
                            </Sidenav> 
                        </div> : ''
                    }
                </Col>
                <Col xs={24} md={!expanded ? 22 : 18}>
                    <Row className={styles.x_create_section}>
                        <Col xs={24} md={12} className={styles.x_padding}>
                            <Form>
                                <Form.Group className={styles.x_form_search_container}>
                                    <Form.Control className={styles.x_search_page_input} name='s' value={EventTarget.value} placeholder='T??m ki???m trang...'></Form.Control>
                                    <Button className={styles.x_search_page_button}>
                                        <IoSearchOutline size={20}/>
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col xs={24} md={12} className={styles.x_padding}>
                            <Row>
                                <Col xs={12}>
                                    <Link href={'/giao-dien'}>
                                        <a className={styles.x_account_button}>
                                            <Button className={styles.x_outline_view}>
                                                <IoAlbumsOutline size={20}/>
                                                Xem m???u giao di???n
                                            </Button>
                                        </a>
                                    </Link>
                                </Col>
                                <Col xs={12}>
                                    <Link href={'/giao-dien'}>
                                        <a className={styles.x_account_button}>
                                            <Button className={styles.x_outline_create}>
                                                <IoAddSharp size={20}/>
                                                T???o trang m???i
                                            </Button>
                                        </a>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className={styles.x_flex}>
                        {
                        blogInfor .length > 0 ? 
                            blogInfor.map((val, index) => {
                            return (
                                <Col key={index} xs={24} md={12} lg={24} className={styles.x_padding}>
                                    <BlogContent data={val} /> 
                                </Col>  
                            )
                            }) : <p style={{textAlign: 'center', width: '100%', padding: '35px 0px'}}>
                                    B???n ch??a c?? trang n??o, vui l??ng t???o m???i
                                </p>
                        }
                    </Row>
                </Col>
            </Row>
        </Container>
    </section>
    </>
  )
}

export default UserManager

export async function getServerSideProps (context) {
  const session = await getSession(context);
  const token = session ? session.user.token.token : '';
  const config = {
    headers: { 
      'Authorization':  `Bearer ${token}`
    }
  };
  const URL =  rootURL + 'quan-ly/tai-khoan';
  let response = '';

  response = await axios.post(URL, false, config)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        console.log(error);
    });

  return { props: {
      blogInfor:  response ? response : [],
      role: token ? token : 'Kh??ng c??'
  }};
}