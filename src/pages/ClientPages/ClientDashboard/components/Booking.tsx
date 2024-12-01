import InputBox from "../../../../components/InputBox/InputBox"
import Button from "../../../../components/Button/Button"

const Booking = (): JSX.Element => {
    return (
        <div id='booking' className="h-screen  flex justify-start items-center flex-column text-red-700 font-bold">
            <div className="booking-title">
                <div className="pt-24 text-center font-bold text-9xl">よやく</div>
                <div className="text-center font-bold font-italic text-2xl">BOOKING</div>
            </div>
            <div id="booking-form" className="w-1/2 h-screen  mt-10">
                <form action="" className='flex justify-between items-center flex-col'>
                    <InputBox type='text' label='Nhập tên' id='Name' />
                    <InputBox type='date' label='Ngày đặt' id='Name' />
                    <InputBox type='number' label='Số lượng người' id='Name' />
                    <Button type='submit' content='submit' />
                </form>
            </div>
        </div>
    )
}
export default Booking