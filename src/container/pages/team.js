import React from "react";
import team from "../../static/img/team.png"
import "../../static/css/indexPageStyle.scss"

const Team = () => {
  return (
    <div className="team-wrapper">
      <img src={team} alt={"team groot"} />
    </div>
  );
};

export default Team;