import { FiMenu } from 'react-icons/fi'

export default function Hamburguer(props) {
    const { length } = props
    const fn = props.fn ? props.fn : null
    const className = props.className ? props.className : null

    return (
        <button type='button' title='Menu' onClick={fn}>
            <FiMenu className={'text-white hover:text-cyan-300 ' + className} style={{
                fontSize: length
            }} />
        </button>
    )
}
