import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBook, faRocket } from '@fortawesome/free-solid-svg-icons';
import styles from './ZoneHeader.module.css';
const ZoneHeader: React.FC<{ zoneName: string }> = ({ zoneName }) => {
  let style;
  let icon;
  switch (zoneName) {
    case 'Backlog': {
      style = styles.backlog;
      icon = faBook;
      break;
    }
    case 'In progress': {
      style = styles.wip;
      icon = faRocket;
      break;
    }
    case 'Completed': {
      style = styles.completed;
      icon = faStar;
      break;
    }
  }

  return (
    <div className={styles.header + ' ' + style}>
      <FontAwesomeIcon icon={icon} />
      <h3>{zoneName}</h3>
    </div>
  );
};
export default ZoneHeader;
