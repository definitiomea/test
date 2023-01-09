import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";
import "../css/review.css";

const ReviewStar = ({ star, setStar }) => {
  // 별점 기본값
  const [clicked, setClicked] = useState(null);
  const [hovered, setHovered] = useState(null);

  // map 돌릴 배열선언
  const array = [1, 2, 3, 4, 5];

  // onClick시 노란색을 유지하게하고 reviewInputRecuder로 보냄
  const handleClick = (id) => {
    // e.target.id 값 잘 받아오는지 확인
    // 잘 받아올 때도, 못받을 때도 있는 이유?
    // console.log(id, "점 선택");
    // onclick시 노란색 유지하게 함
    setClicked(id);
    // reviewInputRecuder로 보냄
    setStar(id);
  };

  // 별점에 따른 출력문구
  const starTextList = ["1점 (별로에요)", "2점 (그저 그래요)", "3점 (보통이에요)", "4점 (좋아요)", "5점 (최고예요)"];

  return (
    <div className="review-star-box">
      <div className="review-star">
        {array.map((el) => (
          <FontAwesomeIcon
            icon={faStar}
            key={el} // 1,2,3,4,5
            // 클릭하거나 호버했을 때 클래스네임은 yellow -> css로 노란별 출력
            className={clicked >= el || hovered >= el ? "yellowStar" : undefined}
            onMouseEnter={() => setHovered(el)}
            onMouseLeave={() => setHovered(null)}
            // onClick시 노란색을 유지하게하고 reviewInputRecuder로 보냄
            onClick={() => {
              handleClick(el);
            }}
          />
        ))}
      </div>

      {/* 클릭하거나 호버 시 별점에 따른 출력문구  */}
      {clicked ? (
        <div>
          {array.map((num) => (
            <HiddenText key={num} show={clicked == num}>
              {starTextList[num - 1]}
            </HiddenText>
          ))}
        </div>
      ) : (
        <div>
          <span>선택하세요.</span>
        </div>
      )}
    </div>
  );
};

export default ReviewStar;

const HiddenText = styled.span`
  ${({ show }) => (show ? `display:block` : `display: none`)}
`;
