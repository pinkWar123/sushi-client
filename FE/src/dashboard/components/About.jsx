import './css/About.css'
function About() {
    return (
        <div id='about' className="w-screen h-screen bg-[url('')] bg-center">
            <div id="about-title" className="relative  text-8xl text-center pt-24 font-bold text-red-900 2xl:h-1/4">
                寿司は日本の伝統料理。
            </div>
            <div id="about-content" className="relative grid grid-cols-3 gap-4 text-center text-3xl 2xl:h-3/4">
                <div id="about-column-content">
                    <div id='title-col'>NGUYÊN LIỆU TƯƠI NGON</div>
                    <img id='image-col' src="https://i.pinimg.com/564x/a8/5a/45/a85a456403479d31797655ebc1bb9082.jpg" alt="" />
                </div>
                <div id="about-column-content">
                    <div id='title-col'>KHÔNG GIAN SANG TRỌNG</div>
                    <img id='image-col' src="https://i.pinimg.com/564x/cd/ee/47/cdee4776ce3baf217c1aaea7688dc411.jpg" alt="" />
                </div>
                <div id="about-column-content">
                    <div id='title-col'>GIAO HÀNG TẬN NƠI</div>
                    <img id='image-col' src="https://i.pinimg.com/564x/09/ec/dc/09ecdcaac89a15a9aa0ea902b17c0173.jpg" alt="" />
                </div>
 
            </div>
        </div>
    )
}
export default About