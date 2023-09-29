import css from "./Loader.module.css";
import { Carousel, CarouselProps, ConfigProvider } from "antd";

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
