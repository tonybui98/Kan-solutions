import { useRef, useState } from 'react'
import { 
  Container, Row, Col, 
  Form,InputGroup, Button, 
  Schema, Loader, Toggle, Message, 
  useToaster 
} from 'rsuite'
import Link from 'next/link'
import styles from '../styles/account.module.css';
import { IoHomeOutline, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useSession, signIn, signOut } from "next-auth/react"
import SocialButton from '../components/SocialButton';
import Image from 'next/image';

const Login = () => {
  const toaster = useToaster();
  const { data: session } = useSession();

  const [visible, setVisible] = useState(false);
  const handleChange = () => {
    setVisible(!visible);
  };

  const [formValues, setFormValue] = useState({
    username: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const formRef = useRef();
  const model = Schema.Model({
    username: Schema.Types.StringType().isRequired('Bạn chưa nhập tên tài khoản.'),
    password: Schema.Types.StringType().isRequired('Bạn chưa nhập mật khẩu.')
  });

  const handleSubmit = async () => {
     if (!formRef.current.check()) {
       return;
    }
    setLoading(true);
    const res = await signIn('credentials', {
      redirect: false,
      username: formValues.username,
      password: formValues.password,
      callbackUrl: `${window.location.origin}`,
    }).catch((error) => {
      console.log(error)
    })

    setLoading(false);

    if(res.error){
      toaster.push(
        <Message type='error' showIcon>Tên tài khoản hoặc mật khẩu không đúng</Message>, 
        { placement : 'topStart'}
      )
    }
  }

 if (session) {
    const userName = session.user.token.user_display_name;
    const userEmail = session.user.token.user_email;

    return (
      <>
       <section className={styles.x_account_container}>
          <span className={styles.x_neumorphic}>
                <Image alt='layout' src={'/layout/decorations-01.svg'} width={800} height={800}/>
          </span>
          <Container className={styles.x_container}>
            <Row>
              <Col xs={24}>
                <div className={styles.x_login + ' ' + styles.x_logged_form}>
                  <Link href = '/'>
                    <a className={styles.x_back_home}>
                      <IoHomeOutline size={20}/>
                      Trở về trang chủ
                    </a>
                  </Link>
                  <h1 className={styles.x_account_title}>Xin chào {userName}</h1>
                  <small>({userEmail})</small>
                  <p className={styles.x_greeting}>Bạn đã đăng nhập vào hệ thống của chúng tôi, hãy bắt đầu tạo website của bạn</p>
                  <small className={styles.x_account_navigate}>Vào trang <Link href="/quan-ly">quản lý tài khoản</Link></small>
                    <Button className={styles.x_login_button + ' ' + styles.x_margin_bottom} appearance="primary" onClick={() => signOut()}>
                        Đăng xuất
                    </Button>
                  <SocialButton />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    )
  }

  return (
    <section className={styles.x_account_container}>
       <span className={styles.x_neumorphic}>
            <Image alt='layout' src={'/layout/decorations-01.svg'} width={800} height={800}/>
      </span>
      <Container className={styles.x_container}>
        <Row>
          <Col xs={24}>
            <div className={styles.x_login}>
              <Link href = '/'>
                <a className={styles.x_back_home}>
                  <IoHomeOutline size={20}/>
                  Trở về trang chủ
                </a>
              </Link>
              <h1  className={styles.x_account_title}>Đăng nhập</h1>
              <Form 
                fluid
                onSubmit={handleSubmit}
                className={styles.x_login_form}
                model={model} 
                ref={formRef}
              >
                <Form.Group>
                  <Form.ControlLabel>Tên đăng nhập hoặc địa chỉ Email</Form.ControlLabel>
                  <Form.Control name='username' type='text' value={formValues.username} onChange={(e) => setFormValue({...formValues, username:e})} placeholder='Nhập tên tài khoản'></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Mật khẩu</Form.ControlLabel>
                  <div className={styles.x_password_input_group}>
                    <Form.Control 
                          name='password' 
                          value={formValues.password} 
                          onChange={(e) => setFormValue({...formValues, password:e})} 
                          placeholder='Nhập mật khẩu'
                          type={visible ? 'text' : 'password'} 
                        />
                      <InputGroup.Button onClick={handleChange}>
                        {visible ? <IoEyeOutline /> : <IoEyeOffOutline />}
                      </InputGroup.Button>
                  </div>
                </Form.Group>
                <Form.Group>
                  <div className={styles.x_toggle_button}>
                    <Toggle size="sm" /><span>Đăng nhập tự động</span>
                  </div>
                  <small className={styles.x_account_navigate}>Bạn chưa có tài khoản? xin vui lòng <Link href="/dang-ky">đăng ký</Link></small>
                </Form.Group>
                <Form.Group>
                  <Button className={styles.x_login_button} appearance="primary" type='submit'>
                    {
                      loading ? <span className={styles.x_loading_icon}><Loader /> </span>: ''
                    }
                    Đăng nhập</Button>
                </Form.Group>
                
              </Form>
              <SocialButton />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login