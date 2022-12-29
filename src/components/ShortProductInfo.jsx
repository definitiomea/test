import React from "react";

const ShortProductInfo = () => {
  return (
    <div className="product-info-component">
      <p className="info-section"><b>상품 정보</b></p>
      <div className="info-detail">
        <p>
          면 100% 코마사 16수 싱글 저지 원단을 사용해 편안한 착용감과 시원한
          계절감을 제공하는 반팔 티셔츠입니다.
        </p>
        <ul>
          <li>소재: 면 100%</li>
          <li>제조사: MOTI</li>
          <li>제조국: 베트남</li>
          <li>사이즈: XS,S,M,L,XL,2XL,3XL,4XL</li>
          <li>신축성: 신축성 약간 있음</li>
          <li>감촉: 부드러운 감촉</li>
        </ul>
        <p className="info-notice"><b>주의사항</b></p>
        <ul>
          <li>
            모델 컷의 경우 촬영장소의 환경, 혹은 보시는 모니터에 따라 실제
            색상과 상이할 수 있습니다.
          </li>
        </ul>
        <p className="info-notice"><b>세탁방법</b></p>
        <ul>
          <li>단독 손세탁가능합니다.</li>
          <li>나염/프린트 제품 세탁시 뒤집어 찬물에 세탁하셔야 합니다.</li>
          <li>다리미 사용 시 천을 올린 후 다림질해 주십시오.</li>
        </ul>
        <p className="info-notice"><b>MODEL SIZE</b></p>
        <ul>
          <li>181, 70kg XL size</li>
        </ul>
        <p className="info-notice"><b>구매 시 주의사항</b></p>
        <ul>
          <li>
            전자상거래 등에서의 소비자보호에 관한 법률에 의거하여 미성년자가
            물품을 구매하는 경우, 법정대리인이 동의하지 않으면 미성년자 본인
            또는 법정대리인이 구매를 취소할 수 있습니다.
          </li>
        </ul>
      </div>
      <p className="info-section"><b>사이즈 정보</b></p>
      <div className="info-detail">
        <table>
          <thead>
            <tr>
              <td>
                <b>size(cm)</b>
              </td>
              <td>XS</td>
              <td>S</td>
              <td>M</td>
              <td>L</td>
              <td>XL(LL)</td>
              <td>2XL(3L)</td>
              <td>3XL(4L)</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>총기장</b>
              </td>
              <td>59</td>
              <td>63</td>
              <td>66</td>
              <td>70</td>
              <td>72</td>
              <td>76</td>
              <td>77</td>
            </tr>
            <tr>
              <td>
                <b>어깨넓이</b>
              </td>
              <td>37.5</td>
              <td>40</td>
              <td>43</td>
              <td>46</td>
              <td>48.5</td>
              <td>51.5</td>
              <td>54</td>
            </tr>
            <tr>
              <td>
                <b>가슴둘레</b>
              </td>
              <td>46</td>
              <td>48.5</td>
              <td>51</td>
              <td>54</td>
              <td>56</td>
              <td>59</td>
              <td>61</td>
            </tr>
            <tr>
              <td>
                <b>소매길이</b>
              </td>
              <td>17.5</td>
              <td>19</td>
              <td>19</td>
              <td>21</td>
              <td>21.5</td>
              <td>23</td>
              <td>23</td>
            </tr>
          </tbody>
        </table>
        <div className="size-notice">
          <img
            src="https://s3.marpple.co/files/u_1703564/2022/3/original/50f6577e7112d573b332583f2e9840f34977d1eb1.jpg"
            alt=""
          />
          <ul>
            <li>
              상세 사이즈는 측정 방법과 위치에 따라 1~3cm 오차가 발생할 수
              있습니다. 기재된 상세 사이즈와 실측 오차(1~3cm)에 대한 불량처리는
              어려우며 교환 및 환불 사유가 될 수 없습니다.
            </li>
            <li>
              마플에서 판매되는 상품은 각 브랜드, 도매처에서 각각의 샘플링을
              거쳐 공급되는 제품이므로, 특정 브랜드 또는 가지고 계신 상품과 상세
              사이즈가 다를 수 있습니다.
              <br></br>실측구매 시 상세 사이즈를 반드시 확인 부탁드립니다.
            </li>
            <li>
              사이즈 측정은 상품을 바닥에 펼친 후 끝선과 끝선까지 측정해야하며,
              신축성 있는 소재일 경우, 잡아당기지 않고 바닥에 펼쳐진 상태 그대로
              측정해야합니다. 오차범위 이외 잘못된 측정으로 인한 반품 및 교환은
              어려운 점 양해 부탁드립니다.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShortProductInfo;
