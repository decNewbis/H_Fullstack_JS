import "./_notification-line.scss";

export function NotificationLine({onClick}) {

  return (
    <div className="notification">
      <div className="notification__wrapper">
          <div className="notification__line">
            <span className="notification__close" onClick={onClick}>x</span>
            <span className="notification__message">
              New to Demy? Learning leds to opportunity
            </span>
            <span> | </span>
            <span className="notification__offer">
              Shop now to get an exclusive offer: Courses from €14.99.
            </span>
          </div>
          <div className="notification__line">
            <span className="notification__deadline">Ends</span>
            <span className="notification__date">12.06.24</span>
          </div>
      </div>
    </div>
  );
}