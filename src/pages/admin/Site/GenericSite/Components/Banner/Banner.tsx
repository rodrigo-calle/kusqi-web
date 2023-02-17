import './Banner.scss';

type Props = {
    img: string;
}

const Banner = (props: Props) => {
    const { img } = props;

    return(
        <div 
            className='banner-container'
            style={{
                    backgroundImage: `url(${img})`, 
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundColor: '#000'
                }}
        />
    );
}

export default Banner;