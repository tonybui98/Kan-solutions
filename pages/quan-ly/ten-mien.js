import { useState, useEffect } from 'react';
import {    
    Container,
    Row,
    Col,
    Button,
    Sidenav,
    Form,
    Loader ,
    toaster,
    Message,
    Table,
} from 'rsuite';
import { getSession, useSession } from 'next-auth/react';
import axios from 'axios';
import UserNav from '../../components/user-manager/UserNav';
import styles from '../../styles/account.module.css';
import isValidDomain from 'is-valid-domain';
import { IoTrashOutline, IoGlobeOutline } from "react-icons/io5";
import { useRouter } from 'next/router'
import MenuIcon from '@rsuite/icons/Menu';
import Head from 'next/head';
import HTMLReactParser from 'html-react-parser';
import { HomePageSeo } from '../api/HeaderSeo';
import dynamic from 'next/dynamic';

const JoyRideNoSSR = dynamic(
    () => import('react-joyride'),
    { ssr: false }
)

const state = {
    steps: [
        {
            target: '#full-table',
            content: 'Xin chào đây là thông tin quản lý tên miền của bạn!',
        },
        {
            target: '#domain_input',
            content: 'Thêm tên miền riêng của bạn và nhấn vào "Thêm tên miền", xin vui lòng đợi ít phút để yêu cầu được khởi tạo!',
        },
        {
            target: '#avaiable_domain',
            content: 'Thông tin tên miền của bạn sẽ được hiển thị tại đây',
        }
    ]
};

const { steps } = state;

const ROOT_URL = process.env.NEXT_PUBLIC_WP_JSON

const Domain = ({posts, token}) => {
    const { data: session } = useSession();
    const [domainValue, setValueDomain] = useState('');
    const [expanded, setExpanded] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loadingRmdomain, setRMdomain] = useState([]);
    const router = useRouter();
    const [showMobileNav, setShowMobileNav] = useState(false);
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
    });

    const handleResize = () => {
        setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        });
    }

    useEffect(() => {
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        window.addEventListener("resize", handleResize, false);
    }, [true]);

    useEffect(() => {
        dimensions.width <= 992 ? setShowMobileNav(false) : setShowMobileNav(true); 
    }, [dimensions]);

  const HandleRemoveDoimain = async (domain_id, status) => {
    
        setRMdomain(domain_id);

        if(status == 'su-dung'){
            toaster.push(<Message showIcon={true} type={'warning'}>Tên miền này đang hoạt động, không thể vô hiệu hóa</Message>);
            return;
        }

        if(!domain_id){
            setTimeout(() => {
                    setRMdomain('');
                }, 1000 );
            return;
        } 

        let fd = new FormData();
        const WP_JSON_URL = ROOT_URL + 'domain/delete';
        fd.append('domain_id', domain_id);
        fd.append('user_email', session.user.token.user_email);

        const config = {
            method: 'POST',
            data: fd,
            url: WP_JSON_URL,
        }
        const response = await axios(config).then((res) => res.data).catch((error) => { console.log(error)});
        let type = 'warning';
        if(!response){
            toaster.push(<Message showIcon={true} type={'warning'}>Đã có lỗi xảy ra, xin vui lòng thử lại</Message>);
            return;
        }
        if(!response.error) { type = 'success'; }
        toaster.push(<Message showIcon={true} type={type}>{response.message}</Message>);
        setLoading(false);
        setTimeout(() => {
            location.reload();
        }, 1000);
    }

    const ActionCell = ({ rowData, dataKey, ...props }) => {
        return (
        <Table.Cell {...props} className="link-group">
            <Button disabled={ rowData.status == 'su-dung' ? true : false } className={styles.x_rm_domain} onClick={() => HandleRemoveDoimain(rowData.ID, rowData.status)}>
                    { loadingRmdomain == rowData.ID ? <Loader size={16}/> : <IoTrashOutline size={16}/> } 
                Xóa
            </Button>
        </Table.Cell>
        );
    };

  useEffect(() => {
    if(!token){
        router.push('/dang-nhap/')
       }
  },[true]);
  
  const HandleCreateDomain = async () => {
        setLoading(true);
        if(!isValidDomain(domainValue)){
            toaster.push(<Message showIcon={true} type="warning">Tên miền nhập vào không hợp lệ</Message>);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
            return;
        } else {
            let fd = new FormData();
            const WP_JSON_URL = ROOT_URL + 'domain/add';
            fd.append('domain', domainValue);
            fd.append('user_email', session.user.token.user_email);
            
            const config = {
                method: 'POST',
                data: fd,
                url: WP_JSON_URL,
            }
            const response = await axios(config).then((res) => res.data).catch((error) => { console.log(error)});
            let status = 'warning';
            if(!response.error) { 
                status = 'success'; 
            }
            toaster.push(<Message showIcon={true} type={status}>{response.message}</Message>);
            setLoading(false);
            setTimeout(() => {
                location.reload();
            }, 1000);
        }
  }

  return (
    <>
        <Head>
            { HTMLReactParser(HomePageSeo.replaceAll("kanbox", "kansite.com").replaceAll("giao_dien", "giao-dien").replaceAll("kansite.com.vn/wp-content", "kanbox.vn/wp-content")) }
        </Head>
        <section className={styles.x_app_section}>
            <Container>
                <JoyRideNoSSR
                    steps={steps}
                    showProgress
                    showSkipButton
                    continuous
                    styles={{
                    options: {
                            arrowColor: '#ffffff',
                            backgroundColor: '#ffffff',
                            overlayColor: 'rgb(0 0 0 / 40%)',
                            primaryColor: '#2d88e2',
                            textColor: '#000000',
                            width: 400,
                            zIndex: 1000,
                        }
                    }}
                />
                <Row>
                    <Col xs={24} md={!expanded ? 2 : 6}>
                        <Button 
                            onClick={() => {setShowMobileNav(!showMobileNav)}} 
                            className={styles.x_mobile_menu_button} 
                            style={{width: '100%'}}
                        >   <MenuIcon />
                                Menu quản lý
                            </Button>
                        {
                            showMobileNav ?
                            <>
                                <div className={styles.x_account_nav}>
                                    <Sidenav expanded={expanded}>
                                        <Sidenav.Body>
                                            <UserNav active={'ten-mien'} expanded={expanded}/>
                                            <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)} />
                                            <Button 
                                                className={styles.x_nav_mobile_close_button}
                                                onClick={() => {setShowMobileNav(!showMobileNav)}} 
                                                appearance="primary" 
                                                style={{width: '100%'}}
                                            >
                                                Đóng
                                            </Button>
                                        </Sidenav.Body>
                                    </Sidenav>
                                </div> 
                                <div className={styles.x_overlay}></div>
                            </>
                            : ''
                        }
                    </Col>
                    <Col xs={24} md={!expanded ? 22 : 18}>
                        <div id="full-table">
                            <div className={styles.x_domain_section}>
                                <Form 
                                    fluid
                                    id="domain_input"
                                >
                                    <Form.Group>
                                        <Form.ControlLabel>Thêm tên miền</Form.ControlLabel>
                                        <Form.Control name="domain" onChange={(e) => setValueDomain(e)} value={domainValue} placeholder="tenmien.com"/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button 
                                            className={styles.x_button_add_domain} 
                                            onClick={HandleCreateDomain} 
                                            appearance="primary" 
                                        >
                                            {
                                            loading ? <Loader size={16}/> : <IoGlobeOutline size={16}/>
                                            }
                                            Thêm tên miền
                                            </Button>
                                    </Form.Group>
                                </Form>
                            </div>
                            <div id="avaiable_domain">
                                <Table
                                    height={400}
                                    data={posts}
                                    rowHeight={65}
                                    >
                                        <Table.Column width={70} align="center" sortable>
                                            <Table.HeaderCell><strong>STT</strong></Table.HeaderCell>
                                            <Table.Cell dataKey="log">
                                                {rowData => rowData.key}
                                            </Table.Cell>
                                        </Table.Column>
                                        <Table.Column flexGrow={1}>
                                            <Table.HeaderCell><strong>Tên miền</strong></Table.HeaderCell>
                                            <Table.Cell dataKey="log">
                                                {rowData => rowData.domain}
                                            </Table.Cell>
                                        </Table.Column>
                                        <Table.Column flexGrow={2}>
                                            <Table.HeaderCell><strong>Trình trạng</strong></Table.HeaderCell>
                                            <Table.Cell dataKey="log">
                                                {rowData => {
                                                    switch(rowData.status){
                                                        case 'xoa':  
                                                            return <span style={{
                                                                padding: '4px 12px', 
                                                                borderRadius: '5px', 
                                                                backgroundColor: '#ff6a6a', 
                                                                fontSize: '12px',
                                                                color: 'white'}}>Vô hiệu hóa</span>;
                                                        break;
                                                        case 'su-dung':  
                                                            return <span style={{
                                                                padding: '4px 12px', 
                                                                borderRadius: '5px', 
                                                                backgroundColor: '#03a84e', 
                                                                fontSize: '12px',
                                                                color: 'white'}}>Đang sử dụng</span>;
                                                            break;
                                                        case 'khoi-tao':  
                                                        return <span style={{
                                                                padding: '4px 12px', 
                                                                borderRadius: '5px', 
                                                                backgroundColor: '#6f6f6f', 
                                                                fontSize: '12px',
                                                                color: 'white'}}>Chưa sử dụng</span>;
                                                            break;
                                                    }
                                                }}
                                            </Table.Cell>
                                        </Table.Column>
                                        <Table.Column width={200} fixed="right" align='center'>
                                            <Table.HeaderCell>Hành động</Table.HeaderCell>
                                            <ActionCell dataKey="id" />
                                        </Table.Column>
                                </Table>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
  )
}

export default Domain

export async function getServerSideProps (context) {
    const session = await getSession(context);
    if(!session){
        return { props: {
            posts: [],
            token: ''
        }};
    }
    const token = session ? session.user.token.token : '';
    const config = {
      headers: { 
        'Authorization':  `Bearer ${token}`
      }
    };
    const URL =  ROOT_URL + 'quan-ly/ten-mien';
    let response = '';
  

    response = await axios.post(URL, false, config)
      .then(function (response) {
          return response.data
      })
      .catch(function (error) {
          console.log(error);
      });

    if(response){
        return { props: {
            posts:  response.domains ? response.domains : [],
            token: token
        }};
    }  
    return { props: {
        posts: [],
        token: token
    }};
  }