import React from "react";
import { LinkItemContainer } from "./css/style-LinkItem";

const LinkItem = () => {
  return (
    <LinkItemContainer>
      <a
        href="https://kream.co.kr/products/75508"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src="https://kream-phinf.pstatic.net/MjAyMjA4MjlfMTY5/MDAxNjYxNzU5ODIyNDE3.ktm1LTOaek108u1S894KdXqXhVLn_GlKRaEq5x8prJMg.golOTTV6FDwjPnJLt3jh3UthwS-o7jMG8w0rtzGwvsog.JPEG/a_2c771442a650447c98c58cdb5b7e51ac.jpg?type=l_webp"
          alt=""
        ></img>
        <p>이벤트 상품 : 에르메스 쥬얼리</p>
        <p>주최 : 샘성</p>
        <p>응모 기간: 2022-06-12 ~ 06-18</p>
        <p>당첨자 발표 : 2022-06-19</p>
        <p>당첨 인원 :10000+</p>
      </a>
      {/*  */}
      <a
        href="https://www.ssfshop.com/event/EV202209210126646/view?&utag=ref_tpl:11108$ref_cnr:10771$set:1$dpos:1"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src="https://img.ssfshop.com/display/html/DSP_CTGRY/20220919/m_mkt_jimun_raffle_product1_03_1.jpg"
          alt=""
        ></img>
        <p>이벤트 상품 : 에르메스 쥬얼리</p>
        <p>주최 : 샘성</p>
        <p>응모 기간: 2022-06-12 ~ 06-18</p>
        <p>당첨자 발표 : 2022-06-19</p>
        <p>당첨 인원 :10000+</p>
      </a>
    </LinkItemContainer>
  );
};

export default LinkItem;
