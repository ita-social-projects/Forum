import { Carousel } from 'antd';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.container}>
        <Carousel autoplay autoplaySpeed={1000} infinite dotPosition="top">
          <div>
            <span />
          </div>
          <div>
            <span />
          </div>
          <div>
            <span />
          </div>
          <div>
            <span />
          </div>
        </Carousel>
    </div>
  );
}
