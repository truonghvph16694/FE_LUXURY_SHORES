import { TiTick } from 'react-icons/ti';
import { Vortex } from 'react-loader-spinner';
import './styles.css';




const Loading = () => {
    return (
        <div className='container'>
            <div>
                <Vortex
                    visible={true}
                    height="130"
                    width="130"
                    ariaLabel="vortex-loading"
                    wrapperStyle={{}}
                    wrapperClass="vortex-wrapper"
                    colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                />
            </div>

            <span>LUXURY SHOES</span><TiTick />
        </div>
    )
}

export default Loading