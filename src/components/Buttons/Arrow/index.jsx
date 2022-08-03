import { BsArrowRight } from 'react-icons/bs'
import "./style.css"

export default function Arrow(props) {
    const { length } = props
    return (
        <div className="wmsArrowButton">
            <BsArrowRight className='text-wmsPink' style={{
                fontSize: length
            }} />
        </div>
    )
}