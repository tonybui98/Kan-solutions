import React, { useState, useRef } from 'react'
import { Avatar, Modal, Form, Col, Row, Panel, Button, Schema, Loader, toaster, Message, Input, ButtonToolbar,ButtonGroup, Badge, Rate } from 'rsuite';
import { IoPaperPlane, IoReturnUpBack } from "react-icons/io5"
import axios from 'axios';
import styles from '../styles/blog.module.css'
import HTMLReactParser from 'html-react-parser';
import { AiFillDislike, AiFillLike, AiFillStar } from "react-icons/ai";
import Image from 'next/image';
import FrownIcon from '@rsuite/icons/legacy/FrownO';
import MehIcon from '@rsuite/icons/legacy/MehO';
import SmileIcon from '@rsuite/icons/legacy/SmileO';
import Head from 'next/head';
import Script from 'next/script';

const ROOT_URL = process.env.NEXT_PUBLIC_WP_JSON

const CommentsUI = ({data}) => {

  const [open, setOpen] = useState(false);  
  const [comments , setComments] = useState(data.comment ? data.comment : []);
  const [repliedComment, setRepliedComment] = useState(false);
  const [action, setAction] = useState('');
  const post_name = data.post_name;
  const post_id = data.ID;

  let total_score = 0;
  let total_rating = 0;
  let average = 0;
  if(comments.length > 0 ){
    comments.map((val) => {
        if(val.comment_parent == "0"){
          val.comment_meta.rating ? 
          total_score += parseInt(val.comment_meta.rating) : 
          total_score += 5;
          total_rating += 1;
        }
    })
  } else {
    total_score = 50;
    total_rating = 10;
  }
  
  average = Math.round(total_score / total_rating , 1);
  const handleReplied = (id_replied) => {
      setRepliedComment(id_replied);
      setOpen(true)
  };
  const handleCloseReplied = () => setOpen(false);

  const handleLike = async (post_id, comment_id, action) => {
    setAction( action + '_' + comment_id);
    const comment_action_url = `${ROOT_URL}tin-tuc/like-post`;
    let formData = new FormData();
    formData.append('post_id', post_id);
    formData.append('comment_id', comment_id);
    formData.append('action', action);

    const config = {
      method: 'post',
      url: comment_action_url,
      data : formData,
    };

    const response = await axios(config).then((res) => {
      return res.data
    }).catch(function (error) {
      console.log(error);
    });

    if(!response.error){
      let type = 'success';
      toaster.push(<Message showIcon type={type}>{response.message}</Message>);
      setComments(response.comment);
    } else {
      toaster.push(
          <Message showIcon type='error'>
            { response.message ? response.message : '???? c?? l???i x???y ra, xin vui l??ng th??? l???i'}
          </Message>
        );
    }
    setAction('');
  }

  const CommentForm = ({comment_parent, panel}) => {

      const comment_json_url = `${ROOT_URL}tin-tuc/them-binh-luan`;
      const [loading, setLoading] = useState(false);
      const [formValue, setFormvalue] = useState({
        text: '',
        email: '',
        textarea: '',
        rating: 5
      });

      const renderCharacter = (value, index) => {
        // unselected character
        if (value < index + 1) {
          return <MehIcon />;
        }
        if (value < 3) {
          return <FrownIcon style={{ color: '#e74c3c' }} />;
        }
        if (value < 4) {
          return <MehIcon style={{ color: '#f1c40f' }} />;
        }
        return <SmileIcon style={{ color: '#f39c12' }} />;
        
      };

      const formRef = useRef();
      const model = Schema.Model({
        'text': Schema.Types.StringType().isRequired('B???n ch??a nh???p t??n c???a b???n.'),
        'email': Schema.Types.StringType().isRequired('B???n ch??a nh???p ?????a ch??? Email.'),
      });
    
      const handleSubmit = async () => {
        if (!formRef.current.check()) {
          return;
        }
        setLoading(true);
    
        let formData = new FormData();
    
        formData.append('post_id', post_id);
        formData.append('fullname', formValue.text);
        formData.append('email', formValue.email);
        formData.append('content', formValue.textarea);
        formData.append('rating', formValue.rating);
        formData.append('comment_parent', comment_parent ? comment_parent : 0);

        const config = {
          method: 'post',
          url: comment_json_url,
          data : formData,
        };
    
        const response = await axios(config).then((res) => {
          return res.data
        }).catch(function (error) {
          console.log(error);
        });
    
        
        if(!response.error){
          let type = 'success';
          toaster.push(<Message showIcon type={type}>{response.message}</Message>);
          setFormvalue({
            text: '',
            email: '',
            textarea: '',
          })
          setComments(response.comment);
        } else {
          toaster.push(
              <Message showIcon type='error'>
                { response.message ? response.message : '???? c?? l???i x???y ra, xin vui l??ng th??? l???i'}
              </Message>
            );
        }
        setLoading(false);
      }
      return(
        <>
            <div style={{marginBottom: 15, border: '1px solid var(--x-border-color)', padding: '10px', borderRadius: '.45rem', textAlign: 'center'}}>
              <h3 className={styles.x_comment_form_title} style={{marginBottom: 0, fontSize: 12}}>????nh gi?? b??i vi???t</h3>
              <Rate defaultValue={formValue.rating} renderCharacter={renderCharacter} onChange={(e) =>   setFormvalue({...formValue, rating:e})}/>
            </div>
            <Panel bordered={panel}>
                <Form
                  fluid 
                  ref={formRef} 
                  onSubmit={handleSubmit}
                  model={model} 
                  onChange={setFormvalue}
                  formValue={formValue}
                >
                <Form.Group>
                  <Form.ControlLabel>T??n c???a b???n <span style={{color: 'red'}}>*</span></Form.ControlLabel>
                  <Form.Control name='text' type='text' value={EventTarget.value} placeholder={'Nh???p t??n c???a b???n'}/>
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>?????a ch??? Email <span style={{color: 'red'}}>*</span></Form.ControlLabel>
                  <Form.Control name='email'  type='email' value={EventTarget.value} placeholder={'Nh???p ?????a ch??? Email'}/>
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Nh???p n???i dung c???a b???n <span style={{color: 'red'}}>*</span></Form.ControlLabel>
                  <Input name='textarea' as='textarea' value={formValue.textarea} placeholder={'Nh???p n???i dung b??nh lu???n'} rows={8} onChange={(e) => setFormvalue( {...formValue, textarea: e})} />
                </Form.Group>
                <Form.Group>
                  <Button type='submit' className={styles.x_comment_form_button}>
                    {
                      loading ? <Loader size={22}/> : <IoPaperPlane size={22}/>
                    }
                  G???i b??nh lu???n</Button>
                </Form.Group>
              </Form>
          </Panel>
        </>
      )
  }

  const Replied = ({data}) => {
    const comments = data;
    return(
      <>
        {
          comments.map((val) => {
            return (
              <div className={styles.x_comment_list} key={val.comment_ID}>
                <Panel bordered>
                  <div className={styles.x_comment_author_comment}>
                    <div className={styles.x_avatar}>
                      <Image src="/comment.png" width={50} height={50} alt="kanbox" />
                    </div>
                    <div className={styles.x_comment_author_meta}>
                      <span className={styles.x_comment_date}>{val.comment_date_gmt}</span>
                      <h5>{val.comment_author}</h5>
                      {val.comment_author_email ? <p>{val.comment_author_email.substring(0,10)}***</p> : ''}
                    </div>
                  </div>
                  <div className={styles.x_comment_content}>{HTMLReactParser(val.comment_content)}</div>
                </Panel>
              </div>
            ) 
          })
        }
      </>
    )
  }
  
  const CommentList = ({data}) => {
    const comments = data;
    return(
      <>
        {
          comments.map((val) => {
            let repliedList = [];
            comments.map((replied) => {
              if(replied.comment_parent == val.comment_ID){
                repliedList.push(replied);
              }
            });
            return (
              val.comment_parent == 0 ?
              <div className={styles.x_comment_list} key={val.comment_ID}>
                <Panel bordered>
                  <Row className={styles.x_comment_header}>
                    <Col xs={24}>
                      <div className={styles.x_comment_author_comment}>
                        <div className={styles.x_avatar}>
                          <Image src="/comment.png" width={50} height={50} alt="kanbox" />
                        </div>
                        <div className={styles.x_comment_author_meta}>
                          <span className={styles.x_comment_date}>{val.comment_date_gmt}</span>
                          <h5>{val.comment_author} { val.comment_meta.rating ? <span style={{fontSize: 12, marginLeft: 5}}>({val.comment_meta.rating} <AiFillStar color="#f39c12"/>)</span> : ''}</h5>
                          {val.comment_author_email ? <p>{val.comment_author_email.substring(0,10)}***</p> : ''}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className={styles.x_comment_content}>{HTMLReactParser(val.comment_content)}</div>
                  <Row className={styles.x_comment_actions}>
                    <Col xs={24}>
                        <div className={styles.x_control_comments}>
                          <ButtonToolbar>
                            <ButtonGroup className={styles.x_custom_button_group}>
                              <Badge content={val.comment_meta.like ? val.comment_meta.like : 0}>
                                <Button appearance={'link'} onClick={() => {handleLike(post_id, val.comment_ID, 'like')}}>
                                  { action == 'like_' + val.comment_ID ? <Loader size={22}/> : <AiFillLike size={16} /> }
                                </Button>
                              </Badge>
                              <Badge content={val.comment_meta.dislike ? val.comment_meta.dislike : 0} color="yellow">
                                <Button appearance={'link'} onClick={() => {handleLike(post_id, val.comment_ID,  'dislike')}}>
                                  { action == 'dislike_' + val.comment_ID ? <Loader size={22}/> : <AiFillDislike size={16} /> }
                                </Button>
                              </Badge>
                              <Button appearance={'link'} style={{float: 'none'}} onClick={() => {handleReplied(val.comment_ID)}}>
                                  <IoReturnUpBack size={16} /> Tr??? l???i
                              </Button>
                            </ButtonGroup>
                          </ButtonToolbar>
                        </div>
                      </Col>
                  </Row>
                  {
                    repliedList.length > 0 ?  
                    <>
                      <h4 className={styles.x_comment_replies}>Tr??? l???i ({repliedList.length})</h4>
                      <Replied data={repliedList}/>
                    </>
                    : ''
                  }
                </Panel>
              </div>
              : ''
            ) 
          })
        }
      </>
    )
  }

  return (
    <>
    {/* <Head>
      <script type="application/ld+json">
          {data.price ? HTMLReactParser(`{
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "${data.post_title}",
            "operatingSystem": "WEB",
            "applicationCategory": "WebApplication",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "${average}",
              "ratingCount": "${total_rating}"
            },
            "offers": {
              "@type": "Offer",
              "price": "${data.price.sale_price ? data.price.sale_price : data.price.regular_price}",
              "priceCurrency": "VND"
            }}`): ''}
      </script>
    </Head> */}
    {
        comments.length == 0 ? 
        <>
            <h3 className={styles.x_comment_form_title}>Ch??a c?? b??nh lu???n n??o</h3>
            <CommentForm />
        </>
        :
        <div>
            <div style={{marginBottom: '25px'}}>
              <h3 className={styles.x_comment_form_title}>Th??m b??nh lu???n c???a b???n</h3>
              <CommentForm comment_parent={0} panel/>
            </div>
            <h3 className={styles.x_comment_form_title}>B??nh lu???n ({data.length})</h3>
            <CommentList data={comments}/>
        </div>
    }
     <Modal open={open} onClose={handleCloseReplied} backdrop="static">
        <Modal.Header>
          <Modal.Title>Tr??? l???i b??nh lu???n</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <CommentForm comment_parent={repliedComment} panel={false}/>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default CommentsUI