import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useGlobalContext } from "./context";

const Identity = ({ user, createdAt, edited }) => {
  const { currentUser } = useGlobalContext();

  // initializations
  dayjs.extend(relativeTime);

  // methods & functions
  const getCreatedAt = () => {
    if (createdAt.includes("ago") || createdAt.includes("Now")) {
      return createdAt;
    }
    return dayjs(new Date(createdAt)).fromNow();
  };

  return (
    <section className="identity">
      <img src={user.image.png} alt="avi" className="profile-img" />
      <h4>{user.username}</h4>
      {user.username === currentUser.username && (
        <h6 className="indicator">YOU</h6>
      )}
      <p>{getCreatedAt()}</p>
      {edited && <p className="edited">{edited}</p>}
    </section>
  );
};

export default Identity;
