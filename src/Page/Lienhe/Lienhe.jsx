import React from 'react';
import styles from './Contact.module.css'; // Import CSS module

const ContactMap = () => {
  return (
    <div className={styles.container}>
      <div className={styles.map}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.863981044336!2d105.74459841473154!3d21.038127785993204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b991d80fd5%3A0x53cefc99d6b0bf6f!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1663677788324!5m2!1svi!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className={styles.contact}>
          <h2 className={styles.title}>Liên Hệ</h2>
          <div className={styles.contact_item}>
            <span>Địa chỉ chúng tôi</span>
            <p>
              58/23/4 số nhà 2F Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội, Việt Nam
            </p>
          </div>
          <div className={styles.contact_item}>
            <span>Email chúng tôi</span>
            <p>cskh@luxuryshoes.vn</p>
          </div>
          <div className={styles.contact_item}>
            <span>Điện thoại</span>
            <p>0123456789</p>
          </div>
          <div className={styles.contact_item}>
            <span>Thời gian mở cửa</span>
            <p>Thứ 2 đến Thứ 7 từ 8h30 đến 17h30</p>
          </div>
        </div>
    </div>
  );
};

export default ContactMap;
