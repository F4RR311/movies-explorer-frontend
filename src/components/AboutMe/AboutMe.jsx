import './AboutMe.css';
import avatar from '../../images/avatar.jpg';
import Portfolio from "../Portfolio/Portfolio";

export default function AboutMe() {
    return (
        <section className="about-me">
            <div className="about-me__container">
                <h2 className="about-me__title">Студент</h2>
                <div className="about-me__bio-container">
                    <div className="about-me__bio">
                        <h3 className="about-me__name">Валерий</h3>
                        <p className="about-me__age">Фронтенд-разработчик, 31 год</p>
                        <p className="about-me__text">
                            Я родился в Харькове, сейчас живу в Рыбинске, закончил
                            авиационный факультет им. Н.Е. Жуковского "ХАИ".
                            Помимо работы и учебы обожаю занятия спортом, чтение художественной литературы.
                        </p>
                        <ul className="about-me__socials">
                            <li>
                                <a
                                    href="https://vk.com/fucking.selfish"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="about-me__social-link"
                                >
                                    ВКонтакте
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/F4RR311"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="about-me__social-link"
                                >
                                    Github
                                </a>
                            </li>
                        </ul>
                    </div>
                    <img
                        className="about-me__avatar"
                        src={avatar}
                        alt="фотография разработчика приложения"
                    />
                </div>
            </div>
            <Portfolio/>
        </section>

    );
}
