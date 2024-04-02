import "./Home.css";

export const Home = () => {
    return (
        // <div className="viewDesign">
        <div className="homeDesign">
            
            <div className="home-main-banner">
                <div className="home-main-banner-text">
                    <h1>Inkdin</h1>
                    <h3> Tattoos & piercings in San Francisco</h3>
                </div>
            </div>
            
            <section>
                {/* <div>
                    <h2>Show your personality</h2>
                    <p>We offer the best selection of piercings and the best artists to let you express yourself freely</p>
                </div> */}
                <article>
                    <div className="home-article-left">
                        <div className="home-article-grid">
                            <div className="home-article-text">
                                <h2>The best tattoo artists in San Francisco</h2>
                                <p>
                                    We have artists specialized in many
                                    different styles from tribal, fine line, watercolor to UV tattoos. Check out our catalogue!
                                </p>
                            </div>
                            <div className="home-article-image-container">
                                <img src="https://i.imgur.com/sWMP0Q7.jpeg" alt="tattoo" />
                            </div>
                        </div>
                    </div>
                </article>
                <article>
                    <div className="home-article-right">
                        <div className="home-article-grid">
                            <div className="home-article-image-container">
                                <img src="https://i.imgur.com/lnmPhOA.jpeg" alt="tattoo" />
                            </div>
                            <div className="home-article-text">
                                <h2>Right in the heart of San Francisco</h2>
                                <p>
                                    Our studio is located in the heart of San Francisco.
                                    It is designed to make you feel comfortable and relaxed during your time with us.
                                </p>
                            </div>
                        </div>
                    </div>
                </article>
                    <div className="home-where">
                        <h2>Where to find us</h2>
                        <p>We are open from Monday to Saturday from 10:00 to 20:00</p>
                        <p>Contact us: <a href="https://www.linkedin.com/in/pedro-fernandez-bel-68a2b9155/">here</a></p>
                        <div className="home-map-container">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d8919.84982051217!2d-122.42486454269346!3d37.77496479366142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1stattoo!5e0!3m2!1ses!2ses!4v1711750331416!5m2!1ses!2ses" width="600" height="450"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
            </section>
        </div>
        // </div>
    );
}