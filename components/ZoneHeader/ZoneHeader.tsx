import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {} from '@fortawesome/free-solid-svg-icons';
import styles from './ZoneHeader.module.css';
const ZoneHeader: React.FC<{ zoneName: string }> = ({ zoneName }) => {
  let style;
  switch (zoneName) {
    case 'Backlog': {
      style = styles.backlog;
      break;
    }
    case 'In progress': {
      style = styles.wip;
      break;
    }
    case 'Completed': {
      style = styles.completed;
      break;
    }
  }
  console.log(style);
  return (
    <div className={styles.header + ' ' + style}>
      {/* <FontAwesomeIcon icon={faStar} /> */}
      <h3>{zoneName}</h3>
    </div>
  );
};
export default ZoneHeader;
