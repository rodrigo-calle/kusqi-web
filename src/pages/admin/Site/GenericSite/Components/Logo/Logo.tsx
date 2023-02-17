import './Logo.scss';
export enum Shape {
    Circle = 'circle',
    Square = 'square',
}
export enum Side {
    Left = 'left',
    Rigth = 'rigth',
    Middle = 'middle',
} 

type Props = {
    img: string;
    shape: Shape;
    side: Side;
}

const Logo = (props: Props) => {
    const { img, shape, side } = props;
    return (
        // eslint-disable-next-line quotes
        <div className={`logo ${shape} ${side}`}  style={{
            backgroundImage: `url(${img})`, 
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundColor: '#000'
        }}/>
    );
}

export default Logo;