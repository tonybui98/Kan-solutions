import { useState, useEffect  } from 'react'
import { Container, Row, Col, Button, Divider, Whisper, Tooltip, ButtonToolbar, Modal } from 'rsuite' 
import { IoCheckmarkCircle, IoCaretForwardSharp, IoChevronBackOutline, IoChevronForwardOutline, IoCheckmarkCircleSharp  }  from "react-icons/io5"
import { ServicesWebsiteManager } from '../api/HeaderSeo'
import { MarketingTable, MarketingHead } from '../api/services'
import styles from '../../styles/services/managerwebsite.module.css'
import Image from 'next/image'
import Head from 'next/head'
import HTMLReactParser from 'html-react-parser'
 import ServicesSubmitForm from '../../components/handleSubmitServices'

const WebsiteManager = () => {
  const [priceTab, setPriceTab] = useState(1);
  const [width, setWidth] = useState(0);

  const [open, setOpen] = useState(false);  
  const [service, setService] = useState(''); 

  const handleOpen = (service) => {
     setService(service);
     setOpen(true)
  };

  const handleClose = () => setOpen(false);
  const handleResize = () => setWidth(window.innerWidth);

  const handlePrePriceTab = () => {
    if(priceTab >= 0 && priceTab <= 2){
      if(priceTab == 0){
        setPriceTab(0);
      } else {
        let Pre = --priceTab;
        setPriceTab(Pre);
      }
    }
  }

  const handleNextPriceTab = () => {
    
    console.log(priceTab)
    if(priceTab <= 2 && priceTab >= 0){
      if(priceTab == 2){
        setPriceTab(2);
      } else {
        let Next = ++priceTab;
        setPriceTab(Next);
      }
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);
  
  console.log(width);

  return (
    <>
      <Head>
        { HTMLReactParser(ServicesWebsiteManager.replaceAll("kanbox", "kansite.com").replaceAll("giao_dien", "giao-dien").replaceAll("kansite.com.vn/wp-content", "kanbox.vn/wp-content")) }
      </Head>
      <div className={styles.x_webite_manager_main}>
        <div className={styles.x_banner_web_mannager}>
            <Container>
              <Row>
                <Col xs={24} md={12}>
                    <div className={styles.x_website_manager_image}>
                        <Image alt="D???ch v??? qu???n tr??? website" src={'/marketing.svg'} width={500} height={400}/>
                    </div>
                </Col>
                <Col xs={24} md={12}>
                    <div className={styles.x_position_relative}>
                        <div className={styles.x_website_manager_banner}>
                          <h1 className={styles.x_website_manager_banner_title}>
                            D???ch v??? qu???n tr??? website.
                          </h1>
                          <p className={styles.x_website_manager_banner_description}>
                            bao g???m c??c m???ng c??ng vi???c ch??nh l?? b???o tr??, v???n h??nh k??? thu???t ?????m b???o website lu??n ho???t ?????ng ???n ?????nh v?? hi???u qu???
                          </p>
                          <ul className={styles.x_website_manager_list}>
                            <li>
                              <div className={styles.x_website_manager_list_content}>
                                  <span><IoCheckmarkCircle size={18} color={'#6FCF97'}/></span>
                                  <p>V??? c?? b???n, qu???n tr??? website bao g???m:  B???o tr?? k??? thu???t, t???i ??u h??a server v?? code.</p>
                              </div>
                            </li>
                            <li>
                                <div className={styles.x_website_manager_list_content}>
                                  <span><IoCheckmarkCircle size={18} color={'#6FCF97'}/></span>
                                  <p>C???p nh???t, ph??t tri???n n???i dung chu???n SEO, ?????m b???o website lu??n c?? t??nh c???p nh???t v?? th??n thi???n v???i Google.</p>
                              </div>
                          </li>
                          <li>
                                <div className={styles.x_website_manager_list_content}>
                                  <span><IoCheckmarkCircle size={18} color={'#6FCF97'}/></span>
                                  <p>H??? tr??? c??c ho???t ?????ng k???t n???i social, qu???ng b?? website tr??n m??i tr?????ng internet.</p>
                              </div>
                          </li>
                          </ul>
                          <Button className={styles.x_adsButton} onClick={() => {handleOpen('????ng k?? t?? v???n d???ch v??? qu???n tr??? website')}}>
                              ????ng k?? t?? v???n mi???n ph??
                          </Button>
                      </div>  
                    </div>
                </Col>
              </Row>  
            </Container>    
        </div>
        <div className={styles.x_section}>
              <Container>
                <Row>
                    <Col xs={24}>
                        <div className={styles.x_website_manager_why}>
                          <h2 className={styles.x_website_manager_title}>T???i sao c???n qu???n tr??? webiste?</h2>
                          <p>B???n c???n ?????i ng?? nh??n s??? b??n ngo??i h??? tr??? x??y d???ng v?? ph??t tri???n website d?????i g??c nh??n c???a m???t chuy??n gia k??? thu???t</p>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                      <div className={styles.x_website_manager_image}>
                        <Image alt="H??? tr??? x??y d???ng trang ????ch qu???ng c??o" src={'/layout/multipe_screen.png'} width={800} height={440}/>
                      </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <ul className={styles.x_website_manager_features_why}>
                          <li>
                            <p>
                              <span><IoCaretForwardSharp size={14}/></span>
                              H??? tr??? x??y d???ng trang ????ch qu???ng c??o kh??ng t??nh ph?? m???i khi c?? nhu c???u</p>
                          </li>
                          <li>
                            <p>
                              <span><IoCaretForwardSharp size={14}/></span>
                              Google s??? ghi nh??? v?? gia t??ng th??? h???ng v???i website ???????c c???p nh???t n???i dung</p>
                          </li>
                          <li>
                            <p>
                              <span><IoCaretForwardSharp size={14}/></span>
                              Trang web ???????c c???p nh???t n???i dung m???i, t??? vi???t v?? v???i c???u tr??c chu???n SEO mang l???i hi???u qu??? c??o</p>
                          </li>
                          <li>
                            <p>
                              <span><IoCaretForwardSharp size={14}/></span>
                              Website ???????c l??m t????i m???i m???i ng??y v??? c??? n???i dung l???n h??nh th???c, c??c h??nh ???nh, banner v?? th??ng ??i???p</p>
                          </li>
                          <li>
                            <p>
                              <span><IoCaretForwardSharp size={14}/></span>
                              T?? v???n v?? ch??? ?????ng n???i dung website theo h?????ng t???p trung v??o t??? kh??a c???n thi???t gi??p b???n d??? d??ng ti???p c???n kh??ch h??ng</p>
                          </li>
                          <li>
                            <p>
                              <span><IoCaretForwardSharp size={14}/></span>
                              N??ng cao kh??? n??ng k???t n???i c???a website v???i m??i tr?????ng m???ng nh?? social, backlink, forum ????? n??ng cao hi???u qu??? qu???ng c??o</p>
                          </li>
                        </ul>
                    </Col>
                  </Row>  
            </Container>      
        </div>
        <Container>
            <Divider />
        </Container>
        <div className={styles.x_section}>
                <Container>
                  <Row>
                    <Col md={24}>
                      <h3 className={styles.x_website_manager_title + ' ' + styles.x_margin_bottom}>
                        Nh???ng v???n ????? b???n th?????ng g???p sau khi ???? x??y d???ng website l??m cho website tr??? n??n k??m hi???u qu???, kh??ng ???????c ng?????i d??ng v?? kh??ch h??ng bi???t ?????n th???m ch?? ???nh h?????ng ?????n th????ng hi???u
                      </h3>
                    </Col>
                    <Col md={24}>
                      <ul className={styles.x_website_manager_features_list}>
                        <li>
                          <div className={styles.x_website_manager_features}>
                            <div className={styles.x_website_manager_features_icon}>
                              <Image alt="Ch??m s??c webiste" src={'/icons/Time_atack_light.svg'} width={45} height={45}/>
                            </div>
                            <div className={styles.x_website_manager_content}>
                              <h3><IoCaretForwardSharp size={14}/> B???n kh??ng c?? th???I gian v?? nh??n s??? ????? ch??m s??c, vi???t b??I ????? n??ng th??? h???ng website?</h3>  
                              <p>H??y xem ch??ng t??i nh?? ?????i ng?? nh??n vi??n c???a b???n, ch??ng t??i s??? l??m vi???c d?????i g??c ????? chuy??n m??n k??? thu???t v?? trao ?????i v???i b???n nh???ng v???n ????? v??? ng??nh ngh??? kinh doanh c???a b???n ????? website mang l???i hi???u qu??? nh???t</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className={styles.x_website_manager_features}>
                            <div className={styles.x_website_manager_features_icon}>
                              <Image alt="V???n h??nh webiste" src={'/icons/Chield_check_fill.svg'} width={45} height={45}/>
                            </div>
                            <div className={styles.x_website_manager_content}>
                              <h3><IoCaretForwardSharp size={14}/> B???n c???m th???y kh?? hi???u khi mu???n v???n h??nh m???t website hi???u qu???</h3>  
                              <p>Ngo??i vi???c h??? tr??? b???n th???i gian ?????u trong vi???c ph??t tri???n website, ch??ng t??i c??ng h??? tr??? b???n ho???c nh??n vi??n c???a b???n nh???ng v???n ????? c???t l??i ????? c?? th??? qu???n tr??? website t???t nh???t trong t????ng lai m???t c??ch ch??? ?????ng</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className={styles.x_website_manager_features}>
                            <div className={styles.x_website_manager_features_icon}>
                              <Image alt="Ti???t ki???m chi ph??" src={'/icons/Wallet_alt_fill.svg'} width={35} height={35}/>
                            </div>
                            <div className={styles.x_website_manager_content}>
                              <h3><IoCaretForwardSharp size={14}/> B???n c???m th???y t???n k??m r???t nhi???u t??i nguy??n v?? chi ph?? ????? qu???n tr??? website</h3>  
                              <p>Ch??ng t??i mang ?????n cho b???n gi???i ph??p qu???n tr??? website l??u d??i, ph??t tri???n ???n ?????nh v???i m???t m???c chi ph?? b???n c?? th??? kh??ng ng??? ?????n m?? kh??ng c???n th??m ngu???n l???c n??o kh??c. D???ch v??? c???a ch??ng t??i ch??? c?? m???c ph?? b???ng 50% m???t nh??n vi??n chuy??n tr??ch cho c??ng vi???c n??y</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </Col>
                  </Row>
              </Container>     
        </div>
        <Container>
            <Divider />
        </Container>
        <div className={styles.x_marketing_section}>
            <Container>
                  <Row className='x_flex_center'>
                      <Col xs={24}>
                        <h3 className={styles.x_marketing_title}>B???ng gi?? d???ch v???</h3>
                      </Col>
                      <Col xs={24} className={styles.x_showing_on_desktop}>
                        <div className={styles.x_web_manager_container}>
                          <div className={styles.x_webite_manager_featured_container}>
                              <div className={styles.x_table_job}>
                              </div>
                                <div className={styles.x_table_column}>
                                  <ul className={styles.x_webite_manager_featured_list}>
                                      {
                                        MarketingHead.map((val, index) => {
                                          let featuredServicesClass = priceTab == index ? styles.x_featured_table_heading : ''
                                          return(
                                              <li key={index} className={featuredServicesClass}>
                                                <div className={styles.x_table_content_heading} onClick={ () => { setPriceTab(index) } }>
                                                  <h4><IoCheckmarkCircleSharp size={14} color={'#00cc88'}/> {val.name}</h4>
                                                  <strong>{val.price}</strong>
                                                  <Button className={styles.x_table_button}
                                                    onClick={() => {handleOpen('????ng k?? d???ch v??? marketing g??i ' + val.name)}}>
                                                      ????ng k??
                                                  </Button>
                                                </div>
                                              </li>
                                          )
                                        })
                                      }
                                  </ul>
                                </div>
                              </div>
                              <div className={styles.x_table_content_wrapper}>
                                {
                                  MarketingTable.map((val, index) => {
                                    return(
                                      <div className={styles.x_table_content_table} key={index}>
                                        <h5 className={styles.x_table_title}>{val.name}</h5>
                                          <div className={styles.x_table_index}>
                                              {
                                                val.data.map((valChild, indexChild) => {
                                                  return(
                                                  <div className={styles.x_table_row} key={indexChild}>
                                                    <div className={styles.x_table_job}>
                                                      <p><IoCaretForwardSharp size={8}/> {valChild.name}</p>
                                                    </div>
                                                    <div className={styles.x_table_column}>
                                                      <ul className={styles.x_table_list}>
                                                          {
                                                            valChild.data.map((valServices, indexServices) => {
                                                              let ClassIndexServices = indexServices == priceTab ? styles.x_featured_table : '';
                                                              return(
                                                                  <li key={indexServices} className={ ClassIndexServices }>
                                                                    <Whisper
                                                                      trigger="click"
                                                                      placement={'top'}
                                                                      controlId={`control-id-${indexServices}`}
                                                                      speaker={
                                                                        <Tooltip>{valChild.description}</Tooltip>
                                                                      }
                                                                    >
                                                                      <Button appearance="subtle">{valServices}</Button>
                                                                    </Whisper>
                                                                  </li>
                                                              )
                                                            })
                                                          }
                                                      </ul>
                                                    </div>
                                                  </div>
                                                  )
                                                })
                                              }
                                            </div>
                                        </div>
                                      )
                                  })
                                }
                          </div>
                        </div>
                      </Col>
                      
                      <Col xs={24} className={styles.x_showing_on_mobile}>
                          <div className={styles.x_pricing_tab}>
                            <ul className={styles.x_pricing_tab_list}>
                              <li className={styles.x_pricing_navigation}>
                                <ButtonToolbar className={styles.x_pricing_navigation_toolbar}>
                                    <Button onClick={handlePrePriceTab}>
                                      <IoChevronBackOutline size={16}/>
                                    </Button>
                                    <Button onClick={handleNextPriceTab}>
                                      <IoChevronForwardOutline size={16}/>
                                    </Button>
                                </ButtonToolbar>
                              </li>
                                  {
                                    MarketingHead.map((val, index) => {
                                      if(index != priceTab) return '';
                                        return(
                                          <li key={index} className={styles.x_featured_table_heading + ' ' + styles.x_featured_table_heading_mobile}>
                                            <div className={styles.x_table_content_heading}>
                                              <h4><IoCheckmarkCircleSharp size={14} color={'#00cc88'}/> {val.name}</h4>
                                              <strong>{val.price}</strong>
                                              <Button 
                                                type='submit' 
                                                className={styles.x_table_button}
                                                onClick={() => {handleOpen('????ng k?? d???ch v??? marketing g??i ' + val.name)}}
                                              >
                                                ????ng k??</Button>
                                            </div>
                                          </li>
                                        )
                                    })
                                  }
                              </ul>
                          </div>
                        
                          <div className={styles.x_pricing_tab_content}>
                          {
                            MarketingTable.map((val, index) => {
                              return(
                                <div className={styles.x_table_content_table} key={index}>
                                  <h5 className={styles.x_table_title}>{val.name}</h5>
                                  <div className={styles.x_table_index}>
                                    {
                                      val.data.map((valChild, indexChild) => {
                                        return(
                                        <div className={styles.x_table_row} key={indexChild}>
                                          <div className={styles.x_table_job_mobile}>
                                            <p><IoCaretForwardSharp size={8}/> {valChild.name}</p>
                                          </div>
                                          <div className={styles.x_table_column_mobile}>
                                            <ul className={styles.x_table_list_mobile}>
                                              {
                                                valChild.data.map((valServices, indexServices) => {
                                                  if(indexServices != priceTab) return '';
                                                    return(
                                                        <li key={indexServices} className={styles.x_featured_table_mobile}>
                                                          <Whisper
                                                            trigger="click"
                                                            placement={'top'}
                                                            controlId={`control-id-${indexServices}`}
                                                            speaker={
                                                              <Tooltip>{valChild.description}</Tooltip>
                                                            }
                                                          >
                                                            <Button appearance="subtle">{valServices}</Button>
                                                          </Whisper>
                                                        </li>
                                                    )
                                                })
                                              }
                                              
                                            </ul>
                                          </div>
                                        </div>
                                        )
                                      })
                                    }
                                    </div>
                                  </div>
                                )
                            })
                          }
                        </div>
                      </Col>
                  </Row>  
              </Container>
        </div>
      </div>
      <Modal open={open} onClose={handleClose} backdrop="static">
        <Modal.Header>
          <Modal.Title>????ng k?? t?? v???n d???ch v??? qu???n tr??? website</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ServicesSubmitForm service={service}/>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default WebsiteManager