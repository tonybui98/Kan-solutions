import { Grid, Container, Row, Col, Button, Divider, Modal  } from 'rsuite'
import styles from '../../styles/services/webdesign.module.css'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import HTMLReactParser from 'html-react-parser'
import { ServiceWordpress } from '../api/HeaderSeo'
import { HostingTable } from '../api/services'
import { IoCheckmarkOutline } from "react-icons/io5";
import { useState } from 'react'
import ServicesForm from '../../components/ServicesForm'

const Wordpress = () => {
 
 const [open, setOpen] = useState(false);  
 const [service, setService] = useState(''); 

 const handleOpen = (service) => {
    setService(service);
    setOpen(true)
 };
 const handleClose = () => setOpen(false);

  return (
    <>
    <Head>
        { HTMLReactParser(ServiceWordpress) }
    </Head>
    <div className={styles.x_wordpress_section}>
        <section className={styles.x_banner}>
            <Grid className='x-container'>
            <Container>
                <Row className={styles.x_centered}>
                    <Col xs={24} md={12}>
                        <div className={styles.x_banner_content}>
                            <h3 className={styles.x_section_secondary_title}>Tối ưu chi phí vận hành</h3>
                            <h2 className={styles.x_primary_title}>Tạo lập Webiste doanh nghiệp của bạn bằng wordpress</h2>
                            <Link href='/giao-dien-mau'>
                                <a>
                                    <Button className={styles.x_call_to_action}>Tạo website miễn phí</Button>
                                </a>
                            </Link>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <div className={styles.x_banner_image}>
                            <Image src={'/layout/wordpress-banner.svg'} width={500} height={500}/>
                        </div>
                    </Col>
                </Row>
            </Container>
            </Grid>
        </section>
        <section className={styles.x_why_choose}>
            <Grid className='x-container'>
            <Container>
                <Row className={styles.x_centered}>
                    <Col xs={24} md={12}>
                        <div className={styles.x_why_choose_content}>
                            <h3 className={styles.x_section_secondary_title}>Tạo lập miễn phí</h3>
                            <h2 className={styles.x_primary_title}>Miễn phí tạo trang và hàng trăm giao diện chất lượng cao</h2>
                            <ul className={styles.x_features}>
                                <li><p><IoCheckmarkOutline className={styles.x_features_icon} width={12} height={12}/>Không giới hạn trang</p></li>
                                <li><p><IoCheckmarkOutline className={styles.x_features_icon} width={12} height={12}/>Cập nhật miễn phí và liên tục</p></li>
                                <li><p><IoCheckmarkOutline className={styles.x_features_icon} width={12} height={12}/>Tích hợp quản lý dữ liệu, báo cáo hệ thống</p></li>
                                <li><p><IoCheckmarkOutline className={styles.x_features_icon} width={12} height={12}/>Tài liệu sử dụng</p></li>
                                <li><p><IoCheckmarkOutline className={styles.x_features_icon} width={12} height={12}/>SEO toàn trang</p></li>
                            </ul>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <Image alt='layout' src={'/layout/web_creation-01.svg'} width={800} height={600}/>
                    </Col>
                </Row>
            </Container>
            </Grid>
        </section>
        <Divider/>
        <section className={styles.x_why_choose}>
            <Grid className='x-container'>
            <Container>
                <Row className={styles.x_centered}>
                    <Col xs={24} md={12}>
                        <div className={styles.x_supporter}>
                            <h3 className={styles.x_section_secondary_title}>Hỗ trợ 24/7</h3>
                            <h2 className={styles.x_primary_title}>Hỗ trợ tận tâm, nhiệt tình với công việc</h2>
                            <ul className={styles.x_features}>
                                <li><p><IoCheckmarkOutline className={styles.x_features_icon} width={12} height={12}/>Lỗi hệ thống</p></li>
                                <li><p><IoCheckmarkOutline className={styles.x_features_icon} width={12} height={12}/>Nhắn tin trực tuyến</p></li>
                                <li><p><IoCheckmarkOutline className={styles.x_features_icon} width={12} height={12}/>Bảo mật hệ thống</p></li>
                                <li><p><IoCheckmarkOutline className={styles.x_features_icon} width={12} height={12}/>Phản hồi nhanh chóng</p></li>
                                <li><p><IoCheckmarkOutline className={styles.x_features_icon} width={12} height={12}/>Diễn đàn hỗ trợ</p></li>
                            </ul>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <Image alt='layout' src={'/layout/helper-01.svg'} width={800} height={600}/>
                    </Col>
                </Row>
            </Container>
            </Grid>
        </section>
        <section className={styles.x_hosting_section}>
            <Grid className='x-container'>
            <Container>
                <Row className={styles.x_centered}>
                    <Col xs={24}>
                        <div className={styles.x_hosting_title}>
                            <h3 className={styles.x_section_secondary_title}>Sử dụng dễ dàng</h3>
                            <h2 className={styles.x_primary_title}>Bảng giá Hosting</h2>
                        </div>
                        <div className={styles.x_hosting_table_container}>
                            <Row>
                                 {
                                    HostingTable.map((val, index) => {
                                        return(
                                            <Col xs={24} md={12} lg={8} key={index}>
                                                <div className={styles.x_hosting}>
                                                    <div className={styles.x_hosting_header}>
                                                        <h3>{val.name}</h3>
                                                        <p>{val.price} /năm</p>
                                                        <Button className={styles.x_hosting_button} onClick={() => { handleOpen('Dịch vụ hosting ' + val.name) }}>Đăng ký</Button>
                                                    </div>
                                                    <div className={styles.x_hosting_features}>
                                                        <ul>
                                                            {
                                                                val.checklist.map((val, index) => {
                                                                    return(
                                                                        <li key={index}>
                                                                            <span className={styles.x_hosting_check}>
                                                                                <IoCheckmarkOutline color='white'/>
                                                                            </span>
                                                                            {val}
                                                                        </li>
                                                                    )
                                                                })    
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            </Col>
                                        )
                                    })
                                 }       
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
            </Grid>
        </section>
        <Divider/>
        <section className={styles.x_services_container}>
            <Grid className='x-container'>
            <Container>
                <Row>
                    <Col xs={24}>
                        <div className={styles.x_supporter}>
                            <h3 className={styles.x_section_secondary_title}>Lựa chọn dịch vụ</h3>
                            <h2 className={styles.x_primary_title}>Xây dựng thương hiệu riêng cho bạn</h2>
                            <div className={styles.services}>
                                <Row>
                                    <Col xs={24} md={12} lg={8} className={styles.x_padding}>
                                        <div className={styles.x_services_content}>
                                            <div className={styles.x_wordpress_icon_service}>
                                             <Image src={'/icons/landing-page.png'} height={50} width={50}/>
                                            </div>
                                            <h3 className={styles.x_services_content_title}>Website Landing Page</h3>
                                            <h2 className={styles.x_services_content_main_title}>Xây dựng kênh quảng bá sản phẩm nhanh</h2>
                                            <Button className={styles.x_services_button}>Đăng ký tư vấn</Button>
                                        </div>
                                    </Col>
                                    <Col xs={24} md={12} lg={8} className={styles.x_padding}>
                                        <div className={styles.x_services_content}>
                                            <div className={styles.x_wordpress_icon_service}>
                                             <Image src={'/icons/content.png'} height={50} width={50}/>
                                            </div>
                                            <h3 className={styles.x_services_content_title}>Website Doanh Nghiệp</h3>
                                            <h2 className={styles.x_services_content_main_title}>Xây dựng thương hiệu doanh nghiệp</h2>
                                            <Button className={styles.x_services_button}>Đăng ký tư vấn</Button>
                                        </div>
                                    </Col>
                                    <Col xs={24} md={12} lg={8} className={styles.x_padding}>
                                        <div className={styles.x_services_content}>
                                            <div className={styles.x_wordpress_icon_service}>
                                             <Image src={'/icons/laptop.png'} height={50} width={50}/>
                                            </div>
                                            <h3 className={styles.x_services_content_title}>Website Thương Mại</h3>
                                            <h2 className={styles.x_services_content_main_title}>Mở rộng quy mô phân phối sản phẩm</h2>
                                            <Button className={styles.x_services_button}>Đăng ký tư vấn</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            </Grid>
        </section>
    </div>
    
    <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Đăng ký dịch vụ hosting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ServicesForm service={service}/>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Wordpress