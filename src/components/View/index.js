import classnames from 'classnames/bind';
import { Lang } from '../';
import style from './index.scss';
import { history } from '../../history';

const View = ({ transparent, children, bgMode, ...other }) => {
  if (history.location.pathname.indexOf('setting') !== -1) transparent = false;
  
  const shouldDrawKaguya = !transparent && bgMode === 'bg_kaguya';
  const shouldDrawYachiyo = !transparent && bgMode === 'bg_yachiyo';

  return (
    <div
      className={classnames.bind(style)({
        view: !transparent,
        viewTrans: transparent
      })}
      {...other}>
        
      <div className={classnames(style.inner, { [style.kaguya]: shouldDrawKaguya, [style.yachiyo]: shouldDrawYachiyo })}>
        {shouldDrawKaguya && (
          <>
            <div className={style.kaguya_border} />
            <img className={style.kaguya_logo} src="img/kaguya/center.webp" alt="kaguya_logo" />
            <div className={style.kaguya_hime}>
              <img src="img/kaguya/kaguya.webp" alt="kaguya" />
            </div>
            <div className={style.view_mask} />
          </>
        )}
        {shouldDrawYachiyo && (
          <>
            <div className={style.yachiyo_scene}>
              <div className={style.yachiyo_bubbles} />
              <div className={style.yachiyo_fishes} />
              <img className={style.yachiyo_coral_left} src="img/yachiyo/coral-left.webp" alt="coral_left" />
              <img className={style.yachiyo_coral_right} src="img/yachiyo/coral-right.webp" alt="coral_right" />
              <div className={style.yachiyo_band_top} />
              <div className={style.yachiyo_band_bottom} />
            </div>
            <div className={classnames(style.view_mask, style.yachiyo_mask)} />
          </>
        )}

        <div className={style.subInner}>
          {children}
        </div>
      </div>
    </div>
  );
};

View.Header = ({ className, children, uiMini, ...other }) => (
  <div className={classnames.bind(style)('header', className, { uiMini: uiMini })} {...other}>
    {children}
  </div>
);
View.Content = ({ className, children, ...other }) => (
  <div className={style.content}>
    <div className={classnames.bind(style)('body', className)} {...other}>
      {children}
    </div>
  </div>
);
View.Footer = ({ className, children, hasBtn, rightContent, ...other }) => {
  const FooterClass = classnames.bind(style)('footer', { hasBtn: hasBtn });
  const InFooterClass = classnames.bind(style)('infooter', className);
  return (
    <div className={FooterClass}>
      <div className={InFooterClass} {...other}>
        {children}
      </div>
      {rightContent}
    </div>
  );
};
View.Bar = ({ className, children, ...other }) => (
  <div className={classnames.bind(style)('bar', className)} {...other}>
    {children}
  </div>
);
View.Split = ({ right, className, title, id, ...other }) => {
  const rightContent = right ? <div>{right}</div> : null;
  return [
    id ? (
      <div key="title" className={style.title}>
        {Lang(id)}
        {rightContent}
      </div>
    ) : null,
    title ? (
      <div key="title" className={style.title}>
        {title}
        {rightContent}
      </div>
    ) : null,
    <div key="split" className={classnames.bind(style)('split', className)} {...other} />,
  ];
};
export default View;
