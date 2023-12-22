

function Carousel() {
    return (
        <section className="carousel">
            <div id="carouselExampleIndicators" className="carousel slide">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://tleejewelry.vn/wp-content/uploads/2022/06/1-banner-tlee-jewelry.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item active">
                        <img src="https://tleejewelry.vn/wp-content/uploads/2023/12/Banner-web-Noel-TLEE-psd-min.gif" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </section>

    );
}

export default Carousel;