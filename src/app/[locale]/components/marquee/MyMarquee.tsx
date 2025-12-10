import Marquee from "react-fast-marquee";

export default function MyMarquee() {
    return (
        <Marquee style={{
            backgroundColor: "yellow",
            color: "black"
        }}>
            <div style={{
                display: "flex",
                gap: "50px",
                textTransform: "uppercase",
                marginRight: 50
            }}>
                <span>Sayt test rejimida ishlamoqda!</span>
                <span>Sayt test rejimida ishlamoqda!</span>
                <span>Sayt test rejimida ishlamoqda!</span>
                <span>Sayt test rejimida ishlamoqda!</span>
                <span>Sayt test rejimida ishlamoqda!</span>
            </div>
        </Marquee>
    )
}
