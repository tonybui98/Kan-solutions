import { useState, useRef, useEffect } from 'react'
import { Panel, Container, Row, Col, Button, Form, Schema, Loader, toaster, Message, SelectPicker, RadioGroup, Radio, DatePicker, Divider, Sidenav  } from 'rsuite'
import { DVHCVN } from '../api/Dvhcvn'
import { locales } from '../api/locales'
import { signIn } from 'next-auth/react'
import { IoLogoFacebook, IoLogoGoogle, IoPaperPlane } from "react-icons/io5";
import axios from 'axios'
import styles from '../../styles/account.module.css'
import UserNav from '../../components/user-manager/UserNav'
import { getSession } from 'next-auth/react';
import MenuIcon from '@rsuite/icons/Menu';
import moment from 'moment'

const rootURL = process.env.NEXT_PUBLIC_WP_JSON;

const UserEditor = ({user_info, nonce}) => {
  const [expanded, setExpanded] = useState(true);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [google, setGoogle] = useState(user_info.google ? user_info.google : []);
  const [facebook, setFacebook] = useState(user_info.facebook ? user_info.facebook : []);
  const user_login = user_info ? user_info.user_login : '';
  const nonce_key = nonce ? nonce : '';
  const[showMobileNav, setShowMobileNav] = useState(true);

  const[formValue, setFormValue] = useState({
    firstname: user_info.firstname ? user_info.firstname : '',
    lastname: user_info.lastname ? user_info.lastname : '',
    phone: user_info.phone ? user_info.phone : '',
    email: user_info.email ? user_info.email : '',
    birth: user_info.birth ? user_info.birth : '',
    gender: user_info.gender ? user_info.gender : '',
    billing_city: user_info.billing_city ? user_info.billing_city : '',
    billing_district: user_info.billing_district ? user_info.billing_district : '',
    billing_ward: user_info.billing_ward ? user_info.billing_ward : '',
    billing_address: user_info.billing_address ? user_info.billing_address : '',
  });

  const[passwordUpdate, setPasswordUpdate] = useState({
    password: '',
    repassword: '',
  });
  const passwordRef = useRef();
  const passWordsModel = Schema.Model({
    password: Schema.Types.StringType().isRequired('M???t kh???u m???i kh??ng ???????c ????? tr???ng.'),
    repassword: Schema.Types.StringType()
      .addRule((value, data) => {
        if (value !== data.password) {
          return false;
        }
        return true;
      }, 'Hai m???t kh???u ph???i gi???ng nhau')
      .isRequired('M???t kh???u m???i kh??ng ???????c ????? tr???ng.')
  });

  const HandleResetPassword = async () => {
    if(!passwordRef.current.check()){
       return toaster.push(<Message showIcon type={'warning'}>C??c tr?????ng th??ng tin ch??a h???p l???</Message>);
    }
    setLoadingPassword(true);
    let formData = new FormData();
    formData.append('user_login', user_login);
    formData.append('user_password', passwordUpdate.password);
    formData.append('nonce', nonce_key);

    const URL =  rootURL + 'user-info/reset-password';
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }
    
    const response = await axios.post( URL, formData , config ).then((res) => {
      return res.data
    }).catch(function (error) {
      toaster.push(<Message showIcon type={'warning'}>L???i kh??ng mong mu???n</Message>);
    });

    if(response){
      if(response.error){
        toaster.push(<Message showIcon type={'warning'}>{response.message}</Message>);
      } else {
        toaster.push(<Message showIcon type={'success'}>{response.message}</Message>);
      }
    }
    setLoadingPassword(false);
    setPasswordUpdate({
      password: '',
      repassword: '',
    })
  }

  // Tinh
  const [dataTinh, setDataTinh] = useState([]);
  const [tinh, setTinh] = useState(formValue.billing_city);
  // Huyen
  const [dataHuyen, setDataHuyen] = useState([]);
  const [huyen, setHuyen] = useState(formValue.billing_district);
  // Xa
  const [dataXa, setDataXa] = useState([]);
  const [xa, setXa] = useState(formValue.billing_ward);

  // Update DataTinh OnLoad 
  useEffect(() => {
    const new_city = () => {
      let cities = [{
        "label": "Nh???p t???nh/ th??nh ph???",
        "value": "",
        "role": "Master"
      }];
      DVHCVN.map((val, index) => {
        cities[index] = {
          "label": val.name,
          "value": val.name,
          "role": "Master"
        };
      })
      setDataTinh(cities)
    }
    new_city();
  }, [true])

  // Update huyen 
  useEffect(() => {
    setDataXa([]);
    const new_district = () => {
      DVHCVN.map((val, index) => {
        if(val.name == tinh){
          let districts = [];
          val.level2s.map((val, index)=>{
                districts[index] = {
                  "label": val.name,
                  "value": val.name,
                  "role": "Master"
                };
          })
          setDataHuyen(districts)
        }
      })
    }
    new_district();
  }, [tinh])

  // Update Xa
  useEffect(() => {
    const new_wards = () => {
      DVHCVN.map((val, index) => {
        if(val.name == tinh){
          val.level2s.map((val, index)=>{
              if(val.name == huyen) {
                let wards = [];
                val.level3s.map((val, index) => {
                  wards[index] = {
                    "label": val,
                    "value": val,
                    "role": "Master"
                  };
                })
                setDataXa(wards)
              }
          })
        }
      })
    }
    new_wards();
  }, [huyen])

  const formRef = useRef();

  const model = Schema.Model({
    'firstname': Schema.Types.StringType().isRequired('B???n ch??a nh???p h??? c???a b???n.'),
    'lastname': Schema.Types.StringType().isRequired('B???n ch??a nh???p t??n c???a b???n.'),
    'phone': Schema.Types.StringType().isRequired('B???n ch??a nh???p s??? ??i???n tho???i.'),
  });

  const HandleChangeCity = (value) => {
    setTinh(value);
  }

  const HandleChangeDistrict = (value) => {
    setHuyen(value);
  }  
  
  const HandleChangeWard = (value) => {
    setXa(value);
  }

  const handleUpdateUser = async () => {

    if(!formRef.current.check()){
        return toaster.push(<Message showIcon type={'warning'}>C??c tr?????ng th??ng tin ch??a h???p l???</Message>);
    }

    setLoading(true);
    let formData = new FormData();
    formData.append('user_login', user_login);
    formData.append('nonce', nonce_key);
    formData.append('firstname', formValue.firstname);
    formData.append('lastname', formValue.lastname);
    formData.append('birth', moment(formValue.birth).format('L'));
    formData.append('phone', formValue.phone);
    formData.append('email', formValue.email);
    formData.append('gender', formValue.gender);
    formData.append('billing_city', tinh);
    formData.append('billing_district', huyen);
    formData.append('billing_ward', xa);
    formData.append('billing_address', formValue.billing_address);

    const URL =  rootURL + 'user-info/update';
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }
    
    const response = await axios.post( URL, formData , config ).then((res) => {
      return res.data
    }).catch(function (error) {
      console.log(error);
    });

    if(response){
      setLoading(false);
      if(response.error){
        toaster.push(<Message showIcon type={'warning'}>{response.message}</Message>);
      } else {
        toaster.push(<Message showIcon type={'success'}>{response.message}</Message>);
      }
    }
  }
  const birth = new Date(formValue.birth);
  return (
   <>
    <section className={styles.x_edit_profile_section}>
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
                                <UserNav active={'chinh-sua-tai-khoan'} expanded={expanded}/>
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
                <Row>
                  <Col md={16} xs={24}>
                    <Panel header="Ch???nh s???a t??i kho???n" bordered style={{background: 'white'}} className={'x_panel_account'}>
                      <Form
                          fluid
                          ref={formRef}
                          formValue={formValue}
                          onChange={setFormValue}
                          onSubmit={handleUpdateUser}
                          model={model}
                        >
                          <Row>
                            <Col xs={24} md={12}>
                              <Form.Group className={styles.x_form_group}>
                                <Form.ControlLabel>Nh???p h??? c???a b???n</Form.ControlLabel>
                                <Form.Control name="firstname" value={formValue.firstname} placeholder='Nh???p h??? c???a b???n...'/>
                              </Form.Group>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Group className={styles.x_form_group}>
                                <Form.ControlLabel>Nh???p t??n c???a b???n</Form.ControlLabel>
                                <Form.Control name="lastname" value={formValue.lastname} placeholder='Nh???p t??n c???a b???n...'/>
                              </Form.Group>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Group controlId="radioList" className={styles.x_form_group}>
                              <Form.ControlLabel>Gi???i t??nh</Form.ControlLabel>
                                <RadioGroup name="gender" inline defaultValue={formValue.gender} onChange={(e) => { setFormValue({...formValue, gender: e})} }>
                                  <Radio value="male">Nam</Radio>
                                  <Radio value="female">N???</Radio>
                                  <Radio value="orther">Kh??c</Radio>
                                </RadioGroup>
                              </Form.Group>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Group className={styles.x_form_group}>
                                  <Form.ControlLabel>Ng??y sinh</Form.ControlLabel>
                                  <DatePicker name="birth" defaultValue={birth ? birth : ''} style={{width: '100%'}} onChange={(e) => {setFormValue({...formValue, birth: e})}}/>
                                </Form.Group>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Group className={styles.x_form_group}>
                                <Form.ControlLabel>S??? ??i???n tho???i</Form.ControlLabel>
                                <Form.Control name="phone" defaultValue={formValue.phone} placeholder='Nh???p s??? ??i???n tho???i...'/>
                              </Form.Group>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Group className={styles.x_form_group}>
                                <Form.ControlLabel>?????a ch??? Email</Form.ControlLabel>
                                <Form.Control disabled name="email" defaultValue={formValue.email} placeholder='Nh???p ?????a ch??? Email...'/>
                              </Form.Group>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Group className={styles.x_form_group}>
                                <Form.ControlLabel>T???nh/ Th??nh ph???</Form.ControlLabel>
                                <SelectPicker 
                                  locale={locales.Picker} 
                                  style={{width: '100%'}} 
                                  name="billing_city" 
                                  data={dataTinh} 
                                  defaultValue={formValue.billing_city}
                                  placeholder='Nh???p th??nh ph???...' 
                                  onChange={HandleChangeCity}
                                />
                              </Form.Group>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Group className={styles.x_form_group}>
                                <Form.ControlLabel>Qu???n/ Huy???n</Form.ControlLabel>
                                <SelectPicker 
                                  locale={locales.Picker} 
                                  style={{width: '100%'}} 
                                  name="billing_district" 
                                  defaultValue={formValue.billing_district}
                                  data={dataHuyen} 
                                  placeholder='Nh???p qu???n/ Huy???n...' 
                                  onChange={HandleChangeDistrict}
                                />
                              </Form.Group>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Group className={styles.x_form_group}>
                                <Form.ControlLabel>Qu???n/ Huy???n</Form.ControlLabel>
                                <SelectPicker 
                                  locale={locales.Picker} 
                                  style={{width: '100%'}} 
                                  name="billing_ward" 
                                  defaultValue={formValue.billing_ward}
                                  data={dataXa} 
                                  placeholder='Nh???p x??/ Ph?????ng/ Th??? tr???n...' 
                                  onChange={HandleChangeWard}
                                />
                              </Form.Group>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Group className={styles.x_form_group}>
                                <Form.ControlLabel>?????a ch??? chi ti???t</Form.ControlLabel>
                                <Form.Control name="billing_address" defaultValue={formValue.billing_address} placeholder='Nh???p ?????a ch???...'/>
                              </Form.Group>
                            </Col>
                          </Row>
                          <Form.Group className={styles.x_form_group}>
                              <Button type='submit' className={styles.x_update_button}>
                                {
                                  loading ? <Loader size={16}/> : <IoPaperPlane size={16}/>
                                }
                                Ch???nh s???a th??ng tin
                              </Button>
                          </Form.Group>
                      </Form>
                      </Panel>
                      <Divider />
                      <Panel header="thay ?????i m???t kh???u" bordered style={{background: 'white'}} className={'x_panel_account'}>
                        <Form
                            fluid
                            ref={passwordRef}
                            model={passWordsModel}
                            onSubmit={HandleResetPassword}
                            onChange={setPasswordUpdate}
                            formValue={passwordUpdate}
                          >
                            <Row>
                              <Col xs={24} md={12}>
                                  <Form.Group className={styles.x_form_group}>
                                    <Form.ControlLabel>Nh???p m???t kh???u m???i</Form.ControlLabel>
                                    <Form.Control type="password" name="password" value={passwordUpdate.password} placeholder='Nh???p m???t kh???u m???i...'/>
                                  </Form.Group>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Group className={styles.x_form_group}>
                                    <Form.ControlLabel>Nh???p l???i m???t kh???u m???i</Form.ControlLabel>
                                    <Form.Control type="password" name="repassword" value={passwordUpdate.repassword} placeholder='Nh???p l???i m???t kh???u m???i...'/>
                                  </Form.Group>
                              </Col>
                            </Row>
                            <Form.Group className={styles.x_form_group}>
                                <Button type='submit' className={styles.x_change_password_button}>
                                  {
                                    loadingPassword ? <Loader size={16}/> : <IoPaperPlane size={16}/>
                                  } ?????i m???t kh???u
                                </Button>
                            </Form.Group>
                        </Form>
                      </Panel>
                  </Col>
                  <Col md={8} xs={24}>
                      <Panel header="K???t n???i m???ng x?? h???i" bordered style={{background: 'white'}} className={'x_panel_account'}>
                        <div className={styles.x_social_login}> 
                          <Button className={styles.x_facebook_login} onClick={() => signIn("facebook")} style={{width: '100%', marginBottom: '15px'}}>
                            <IoLogoFacebook size={24}/> K???t n???i v???i facebook
                          </Button>
                          <Button className={styles.x_google_login} onClick={() => signIn("google")} style={{width: '100%'}}>
                            <IoLogoGoogle size={24}/> K???t n???i v???i google
                          </Button>
                        </div>
                     </Panel>
                  </Col>
              </Row>
            </Col>
        </Row>
      </Container>
    </section>
  </>
  )
}

export default UserEditor

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const token = session ? session.user.token.token : '';
  const URL =  rootURL + 'user-info/detail';
  const config = {
    headers: {
      'Authorization':  `Bearer ${token}`
    }
  }

  const response = await axios.post( URL, false , config ).then((res) => {
    return res.data
  }).catch(function (error) {
  });
  // Pass data to the page via props
  return { props: { 
      nonce: response ? response.nonce : '',
      user_info: response ? response.user : '',
  }}
}