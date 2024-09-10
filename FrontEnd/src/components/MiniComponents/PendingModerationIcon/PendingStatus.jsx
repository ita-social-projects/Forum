import { Tooltip } from 'antd';
import css from './PendingStatus.css';

const PendingStatus = ({ profile, elementType }) => {

  const bannerApproved = profile?.banner.is_approved;
  const logoApproved = profile?.logo.is_approved;

  const shouldShowTooltip = (elementType === 'banner' && bannerApproved === false)
    || (elementType === 'logo' && logoApproved === false);

  const formattedDate = new Date(profile?.status_updated_at).toLocaleString('uk-UA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  const tooltipText = `Статус модерації: Очікується. Час відправки запиту: ${formattedDate}`;

  return (
    (profile?.status === 'pending' && shouldShowTooltip) ? (
    <div className="tooltip-container">
      <Tooltip
        title={tooltipText}
        placement="bottomLeft"
        overlayStyle={{ marginLeft: '10px' }}
      >
        <img
          src={`${process.env.REACT_APP_PUBLIC_URL}/img/moderation-icon.png`}
          alt="Pending status icon"
          className={css['moderation-icon']}
        />
      </Tooltip>
    </div>
    ) : null
  );
};

export default PendingStatus;
