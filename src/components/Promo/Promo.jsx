import './Promo.css';
import { NavTab } from "../NavTab/NavTab";

export default function Promo() {
    return (
        <section className="promo">
            <div className="promo__container">
                <div className="promo__about-project">
                    <h1 className="promo__title">
                        Учебный проект студента факультета Веб&#8209;разработки.
                    </h1>
                    <NavTab />
                </div>
            </div>
        </section>
    );
}
