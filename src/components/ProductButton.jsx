import React from 'react'
import Button from '@mui/material/Button'

/*  */

const ProductButton = () => {
  return (
    <div className='product-button'>
      <Button>앞/뒤 뒤집기</Button>
      <input type='file' accept='image/*' onChange={(event) => {}}></input>
      <Button>텍스트 추가하기</Button>
      <input type='color' onChange={(event) => {}}></input>
      <Button>편집 되돌리기</Button>
      <Button>편집 되돌리기 취소</Button>
      <Button>편집 내역 초기화</Button>
      <Button>이미지 내보내기(Dispatch)</Button>
      <Button>편집한 면의 이미지 저장</Button>
      <Button>이미지 저장 내역 지우기</Button>
    </div>
  )
}

export default ProductButton
