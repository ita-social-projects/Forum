import css from "./Loader.module.css";
import { Carousel, CarouselProps, ConfigProvider } from "antd";

export default function Loader() {
  return (
    <div className={css.container}>
      <ConfigProvider
        theme={{
          components: {
            Carousel: {
              colorBgContainer: "#40af85",
              dotActiveWidth: 32,
              dotWidth: 32,
              dotHeight: 6,
              lineHeight: 1
            },
          },
        }}
      >
        <Carousel autoplay autoplaySpeed={1000} infinite dotPosition="top" >
          <div>
            <span/>
          </div>
          <div>
          <span/>
          </div>
          <div>
          <span/>
          </div>
          <div>
          <span/>
          </div>
        </Carousel>
      </ConfigProvider>
      </div>);
}
