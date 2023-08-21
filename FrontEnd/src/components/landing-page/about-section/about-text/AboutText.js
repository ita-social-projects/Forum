import './AboutText.css';
import Ellipses from "../../ellipses/Ellipses";

const AboutSectionText = () => {
    return (
          <div className="about-us-text-section">
            <div className="about-us-text-section__text-field">
              <div className="about-us-text-section__header-text">ДЛЯ КОГО</div>
              <div className="about-us-text-section__text">
                Об’єднання представників найрізноманітніших галузей для пошуку інноваційних рішень проблемних питань,
                <br/>перспектив співпраці з прогресивними учасниками еко середовища галузі, зокрема з технологічними парками,
                <br/>з можливостями доступу до інвестиційних програм та інноваційних пропозицій.
                <br/></div>
              <div className="about-us-text-section__paragraphs">
                <div className="about-us-text-section__paragraph-one">
                  <span>виробників крафтової продукції у сфері виноробства,</span>
                  <br/>
                  <span>сироваріння, медоваріння тощо;</span>
                  <br/>
                  <span>сомельє та рестораторів;</span>
                  <br/>
                  <span>представників готельно-ресторанного бізнесу;</span>
                  <br/>
                  <span>представників роздрібних та гуртових торгових мереж;</span>
                </div>
                <div className="about-us-text-section__paragraph-two">
                  <span>представників пакувальної індустрії;</span>
                  <br/>
                  <span>представників логістичних компаній та служб доставки;</span>
                  <br/>
                  <span>стартаперів у сфері виноробства, сироваріння,</span>
                  <br/>
                  <span>медоваріння та інших супутніх галузей;</span>
                  <br/>
                  <span>інших фахівців галузі.</span>
                </div>
              </div>
            </div>
            <div className="about-us-text-section__ellipses-groups">
              <div className="about-us-text-section__first_ellipses-group">
                <Ellipses type="green" count={7} />
                <Ellipses type="green" count={7} />
                <Ellipses type="green" count={7} />
                <Ellipses type="green" count={7} />
                <Ellipses type="green" count={7} />
                <Ellipses type="green" count={7} />
              </div>
              <div className="about-us-text-section__second_ellipses-group">
                <Ellipses type="green" count={7} />
                <Ellipses type="green" count={7} />
                <Ellipses type="green" count={7} />
                <Ellipses type="green" count={7} />
                <Ellipses type="green" count={7} />
                <Ellipses type="green" count={7} />
              </div>
              <div className="about-us-text-section__third_ellipses-group">
                <Ellipses type="green" count={7} />
                <Ellipses type="green" count={7} />
                <Ellipses type="green" count={7} />
                <Ellipses type="green" count={7} />
                <Ellipses type="green" count={7} />
                <Ellipses type="green" count={7} />
              </div>
              <div className="about-us-text-section__fourse_ellipses-group">
                <Ellipses type="green" count={7} />
                <Ellipses type="green" count={7} />
                <Ellipses type="green" count={7} />
                <Ellipses type="green" count={7} />
                <Ellipses type="green" count={7} />
                <Ellipses type="green" count={7} />
              </div>
            </div>
          </div>
    )
}

export default AboutSectionText;
