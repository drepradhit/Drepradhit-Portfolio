import React from "react";
import "./ProfileCard.css";

const ProfileCardComponent = ({
  avatarUrl = "./assets/andre.jpg",
  className = "",
}) => {
  return (
    <div className={`pc-polaroid-wrapper ${className}`.trim()}>
      <div className="pc-polaroid-card">
        {/* Grain overlay */}
        <div className="pc-grain-overlay" />
        
        <div className="pc-photo-area">
          <img
            className="pc-avatar"
            src={avatarUrl}
            alt="UI UX Designer"
            loading="lazy"
          />
          <div className="pc-film-shine" />
        </div>
        
        <div className="pc-polaroid-info">
          {/* Only showing Drepradhit's Portfolio with project card font style */}
          <h3 className="pc-polaroid-name">Drepradhit's Portfolio</h3>
        </div>
      </div>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;
