import React from "react";
import { MapPin, Clock, Users, Fish, ShoppingBag, Shirt, Tent } from "lucide-react";
import "./AboutUs.css";

const AboutUs = () => {
    return (
        <div className="about-us-page"> {/* Додано унікальний клас */}
            {/* Hero Section */}
            <section className="about-hero-section">
                <div className="about-hero-overlay"></div>
                <div className="about-hero-content">
                    <h1 className="about-hero-title">
                        Поплавок — це більше<br />
                        ніж просто магазин<br />
                        рибальського спорядження!
                    </h1>

                    <div className="about-stats-container">
                        <div className="about-stat-card">
                            <div className="about-stat-number">2</div>
                            <div className="about-stat-label">локації</div>
                            <div className="about-stat-sublabel">по всій країні</div>
                            <MapPin className="about-stat-icon" />
                        </div>

                        <div className="about-stat-card">
                            <div className="about-stat-number">10</div>
                            <div className="about-stat-label">років досвіду</div>
                            <div className="about-stat-sublabel">та справжня пристрасть до риболовлі</div>
                            <Clock className="about-stat-icon" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Community Section */}
            <section className="about-community-section">
                <div className="about-community-image">
                    <img
                        src="https://images.unsplash.com/photo-1506873589908-63bc22175dd7?w=800&h=600&fit=crop"
                        alt="Рибалки на озері"
                    />
                </div>
                <div className="about-community-content">
                    <h2>
                        Ми об'єднуємо тисячі<br />
                        рибалок, забезпечуючи їх найкращим<br />
                        спорядженням і даруючи враження, що<br />
                        залишаються в серці назавжди
                    </h2>
                    <Users className="about-community-icon" />
                </div>
            </section>

            {/* Mission Section */}
            <section className="about-mission-section">
                <div className="about-mission-card">
                    <div className="about-mission-image">
                        <img
                            src="https://images.unsplash.com/photo-1730048891249-6e532a31bc92?w=600&h=400&fit=crop"
                            alt="Рибалка з уловом"
                        />
                    </div>
                    <div className="about-mission-content">
                        <h3>Наша місія</h3>
                        <p>
                            Ми ті, хто розвиває риболовну культуру в Україні. Кожен наш товар,
                            кожен магазин і кожна взаємодія з клієнтом — це крок до того, щоб
                            риболовля стала стилем життя, можливістю для спілкування з
                            однодумцями та єднання з природою.
                        </p>
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="about-vision-section">
                <div className="about-vision-header">
                    <h3>Наша візія</h3>
                    <p>
                        Ми прагнемо лишатися лідером у розвитку риболовної культури та
                        активного відпочинку, надихаючи людей відкривати нові горизонти,
                        берегти довкілля і насолоджуватися кожною миттю на природі.
                    </p>
                </div>

                <div className="about-vision-cards">
                    <div className="about-vision-card">
                        <img
                            src="https://images.unsplash.com/photo-1566122026582-ea7b2d70de33?w=400&h=300&fit=crop"
                            alt="Риболовля"
                        />
                        <p>
                            Ми віримо, що якісне спорядження — це не просто інструмент, а ключ
                            до незабутніх пригод і досягнень. Поплавок об'єднує спільноту рибалок
                            і мандрівників, допомагаючи кожному створювати власну історію успіху.
                        </p>
                    </div>

                    <div className="about-vision-card">
                        <img
                            src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=400&h=300&fit=crop"
                            alt="Активний відпочинок"
                        />
                        <p>
                            Ми воліємо бути всюди, де є наші люди, а наші люди — всюди.
                            Тому розширюємо горизонти, відкриваючи нові магазини у кожному
                            куточку України та забезпечуючи зручну доставку туди, де нас поки що немає.
                        </p>
                    </div>

                    <div className="about-vision-card">
                        <img
                            src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop"
                            alt="Кемпінг"
                        />
                        <p>
                            Завдяки нашому інтернет-магазину ми завжди поруч,
                            щоб ти міг легко знайти все необхідне спорядження
                            та отримати його швидко і зручно.
                        </p>
                    </div>
                </div>
            </section>

            {/* What We Offer Section */}
            <section className="about-offer-section">
                <div className="about-offer-header">
                    <h2>Що ми пропонуємо?</h2>
                    <p>
                        Наш асортимент створений професіоналами та практикуючими рибалками,
                        які знають, що потрібно для ідеальної риболовлі та активного відпочинку.
                    </p>
                </div>

                <div className="about-offer-grid">
                    <div className="about-offer-card">
                        <div className="about-offer-image">
                            <img
                                src="https://images.unsplash.com/photo-1529230117010-b6c436154f25?w=400&h=300&fit=crop"
                                alt="Вудлища та котушки"
                            />
                        </div>
                        <div className="about-offer-content">
                            <Fish className="about-offer-icon" />
                            <h4>Вудлища, котушки та аксесуари</h4>
                            <p>стануть твоїми надійними супутниками на водоймах.</p>
                        </div>
                    </div>

                    <div className="about-offer-card">
                        <div className="about-offer-image">
                            <img
                                src="https://images.unsplash.com/photo-1625013964767-0e4b3c041607?w=400&h=300&fit=crop"
                                alt="Одяг і взуття"
                            />
                        </div>
                        <div className="about-offer-content">
                            <Shirt className="about-offer-icon" />
                            <h4>Одяг і взуття</h4>
                            <p>забезпечать комфорт і захист у будь-яких умовах.</p>
                        </div>
                    </div>

                    <div className="about-offer-card">
                        <div className="about-offer-image">
                            <img
                                src="https://images.unsplash.com/photo-1493787039806-2edcbe808750?w=400&h=300&fit=crop"
                                alt="Туристичне спорядження"
                            />
                        </div>
                        <div className="about-offer-content">
                            <Tent className="about-offer-icon" />
                            <h4>Туристичне спорядження</h4>
                            <p>яке робить кожну подорож приємною і безпечною.</p>
                        </div>
                    </div>

                    <div className="about-offer-card">
                        <div className="about-offer-image">
                            <img
                                src="https://images.unsplash.com/photo-1605750416507-734370f71920?w=400&h=300&fit=crop"
                                alt="Рюкзаки та сумки"
                            />
                        </div>
                        <div className="about-offer-content">
                            <ShoppingBag className="about-offer-icon" />
                            <h4>Рюкзаки та сумки</h4>
                            <p>подбають про зручне транспортування і зберігання вашого спорядження.</p>
                        </div>
                    </div>
                </div>

                <p className="about-offer-footer">
                    Все це створено з думкою про практичність, довговічність і комфорт.
                    Ми пропонуємо рішення, яким довіряють як новачки, так і досвідчені професіонали!
                </p>
            </section>

            {/* Final CTA Section */}
            <section className="about-cta-section">
                <div className="about-cta-content">
                    <p className="about-cta-text">
                        Ми бачимо Україну країною, де риболовна культура процвітає,
                        де відпочинок біля водойми дарує моменти справжньої гармонії.
                    </p>
                    <h2 className="about-cta-brand">Поплавок — ваш надійний партнер на цьому шляху.</h2>
                    <p className="about-cta-subtext">
                        Разом ми створюємо традиції, об'єднуємо спільноти та відкриваємо нові горизонти.
                    </p>
                </div>
            </section>


        </div>
    );
};

export default AboutUs;