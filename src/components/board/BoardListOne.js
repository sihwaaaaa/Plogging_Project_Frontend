
function BoardListOne(props) {
  const boardOne = props;
  console.log(boardOne);

  return (
    <>
      <div className="sliderWrapper">
        <div className="mapWrapper">
          <div className="mapHover">
            <div>
              <h4>{boardOne.board.title}</h4>
              <h3>{boardOne.board.content}</h3>
              <p>{boardOne.board.userId}</p>
              <p>{boardOne.board.category}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BoardListOne;