import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";

const ReviewStar = () => {
  // 별점 기본값
  const [clicked, setClicked] = useState(null);
  const [hovered, setHovered] = useState(null);

  // map 돌릴 배열선언
  const array = [1, 2, 3, 4, 5];

  // onClick시 노란색을 유지하게하고 reviewInputRecuder로 보냄
  const handleClick = (e) => {
    // e.target.id 값 잘 받아오는지 확인
    // 잘 받아올 때도, 못받을 때도 있는 이유?
    console.log(e.target.id, "점 선택");
    // onclick시 노란색 유지하게 함
    setClicked(e.target.id);
    // reviewInputRecuder로 보냄
  };

  // 별점에 따른 출력문구
  const starTextList = [
    "별로에요",
    "그저 그래요",
    "보통이에요",
    "좋아요",
    "최고예요",
  ];

  return (
    <div>
      <RatingBox>
        {array.map((el) => (
          <FontAwesomeIcon
            icon={faStar}
            key={el} // 1,2,3,4,5
            id={el}
            // 클릭하거나 호버했을 때 클래스네임은 yellow -> css로 노란별 출력
            className={
              clicked >= el || hovered >= el ? "yellowStar" : undefined
            }
            onMouseEnter={() => setHovered(el)}
            onMouseLeave={() => setHovered(null)}
            // onClick시 노란색을 유지하게하고 reviewInputRecuder로 보냄
            onClick={handleClick}
          />
        ))}
      </RatingBox>

      {/* 클릭하거나 호버 시 별점에 따른 출력문구  */}
      {array.map((num) => {
        return clicked || hovered ? (
          <HiddenText key={num} show={clicked == num || hovered == num}>
            {/* array와 map의 index 값이 1차이나므로 */}
            {starTextList[num - 1]}
          </HiddenText>
        ) : (
          // 한번만 출력하려면?
          <span>선택하세요.</span>
        );
      })}
    </div>
  );
};

export default ReviewStar;

// 별 색깔 스타일
const RatingBox = styled.div`
  margin: 0;

  .yellowStar {
    color: #fcc419;
    opacity: 1;

    &svg {
      color: gray;
      cursor: pointer;
    }

    /* hover된 별 이외에 나머지 별들(hover~svg)는 회색 */
    & svg:hover ~ svg {
      color: gray;
    }
  }
`;

const HiddenText = styled.span`
  ${({ show }) => (show ? `display:block` : `display: none`)}
`;
