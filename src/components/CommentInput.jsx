import { useState } from "react";
import { useParams } from "react-router-dom";

const CommentInput = () => {
  const { id } = useParams;
  const [textinput, setTextInput] = useState("");
  const {action, state} = 

  return (
    <div>
      <form className="CommentInsert" onSubmit={onSubmit}>
        <input
          classNames="inputNames"
          placeholder="이름"
          value={value.name}
          onChange={onChange}
        />
        <input placeholder="댓글" value={value.content} onChange={onChange} />
        <button type="submit">
          <MdAdd />
        </button>
      </form>
    </div>
  );
};

export default CommentInput;
