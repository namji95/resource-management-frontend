import React from 'react';
import styles from './Loading.module.css';
import { Container } from 'react-bootstrap';
import Spinner from '../../images/loading.gif';


function Loading() {
    return (
        <Container className={styles.Background}>
        <br/>
          <img src={Spinner} alt="로딩중" width="5%" />
          <div className={styles.loadingText}>loading...</div>
        </Container>
      );

}

export default Loading;