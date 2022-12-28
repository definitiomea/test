import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";

const ReviewStar = () => {
  // 별점 기본값
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  // map 돌릴 배열선언
  const array = [0, 1, 2, 3, 4];

  // <FaStar /> svg가 map함수에 의해 돌아가고 클릭한 별의 인덱스 값이 star에 찍힘

  {
    /*
클릭한 star값을 index로 받는 handleStarClick 함수
별3개를 클릭했을 떄 for문을 돌리면 i<=3 이 될 때까지는 true값을 반환함
이런 과정으로 별 3점을 클릭하면 [true,true,true,false,false]
*/
  }
  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i <= 4; i++) {
      clickStates[i] = i = index ? true : false;
    }
    setClicked(clickStates);
    console.log(clicked);
  };

  // filter을 이용해 true값만 뽑아서 length를 이용해 개수를 확인 후 별점값을 내보냄
  const sendStar = () => {
    let score = clicked.filter(Boolean).length;
  };

  // 클릭하면 리뷰 제출
  useEffect(() => {
    sendStar();
  }, [clicked]);

  // 별 색깔 스타일
  const RatingBox = styled.div`
    margin: 0;

    &svg {
      color: gray;
      cursor: pointer;
    }

    :hover svg {
      color: #fcc419;
    }

    /* hover된 별 이외에 나머지 별들(hover~svg)는 회색 */
    & svg:hover ~ svg {
      color: gray;
    }

    .yellowStar {
      color: #fcc419;
    }
  `;

  return (
    <div>
      <RatingBox>
        {array.map((star, index) => (
          <FontAwesomeIcon
            icon={faStar}
            key={index}
            size="lg"
            onClick={() => handleStarClick(star)}
            className={clicked[star] ? "yellowStar" : undefined}
          />
        ))}
      </RatingBox>
    </div>
  );
};

export default ReviewStar;
