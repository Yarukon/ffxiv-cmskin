import style from './index.scss';
import { Job as JobData } from '../../data';

// Bounces per second, clamped to 0.2-10; invalid input falls back to 1.1.
const jellyStyle = rate => {
  const value = parseFloat(rate);
  const bounce = value > 0 ? Math.min(10, Math.max(0.2, value)) : 1.1;
  return { animationDuration: 0.5 / bounce + 's' };
};

// Anchor the bounce to the page clock so icons mounted at different times stay in phase.
const syncJelly = el => {
  if (el && el.getAnimations) el.getAnimations().forEach(a => { a.startTime = 0; });
};

export default ({ size = '2.5rem', deaths = 0, job, diy, iconSet = "icon_default", jelly = false, jellyRate = 1.1 }) => {
  const avatarStyle = {
    minWidth: size,
    width: size,
    height: size,
  };

  const Jobs = Object.keys(JobData);
  const Job = Jobs.indexOf(job) === -1 ? 'default' : job;
  const Img = diy ? (
    <div className={style.diy}>
      <div style={{ backgroundImage: `url(${job})` }} />
    </div>
  ) : (
    <img src={"img/" + iconSet + "/" + Job + ".webp"} />
  );
  return (
    <div className={style.avatar} style={avatarStyle}>
      {deaths > 0 ? <div className={style.deaths}>✗{deaths}</div> : null}
      {jelly ? <div className={style.jelly} style={jellyStyle(jellyRate)} ref={syncJelly}>{Img}</div> : Img}
    </div>
  );
};
