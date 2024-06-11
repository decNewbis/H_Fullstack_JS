import "./_notification-line.scss";

import React, {useRef} from "react";

export function NotificationLine() {
  const notificationRef = useRef(null);
  const handleCloseClick = () => {
    if (notificationRef.current) {
      notificationRef.current?.classList.toggle('hidden');
    }
  };

  return (
    <div className="notification" ref={notificationRef}>
      <div className="notification__wrapper">
        <ul className="notification__list">
          <li className="notification__item">
            <span className="notification__close" onClick={handleCloseClick}>x</span>
            <span className="notification__message">
              New to Demy? Learning leds to opportunity
            </span>
            <span> | </span>
            <span className="notification__offer">
              Shop now to get an exclusive offer: Courses from €14.99.
            </span>
          </li>
          <li className="notification__item">
            <span className="notification__deadline">Ends</span>
            <span className="notification__date">12.06.24</span>
          </li>
        </ul>
      </div>
    </div>
  );
}