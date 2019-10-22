import jss from 'jss'

export default (props) => {
    const style = jss.createStyleSheet({
        wrapper: {
            width: 120,
            height: 300,
            display: 'flex',
            flexDirection: 'column',
        },

        spin: {
            animation: `$spinUp ${props.landOffset + 2}s ease-in-out`,
            '-webkit-animation-fill-mode': 'forwards',
        },
        
        image: {
            height: 100,
            width: 120,
            //border: '1px dashed #000',
            '& img': {
                width: '100%'
            }
        },
        
        '@keyframes spinUp': {
            '0%' : { transform: 'translateY(0);' },
            '100%' : { transform: 'translateY(calc(-100px * 10))'},
        },
    })
    style.attach()
    return style
}  
