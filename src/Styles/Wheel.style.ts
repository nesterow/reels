import jss from 'jss'

let styles = null
export default (props) => {
    document.querySelectorAll(`[data-meta="spin${props.landOffset}"]`).forEach((e) => {
        e.remove()
    })
    const style = styles || jss.createStyleSheet({
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

        win: {
            animationDelay: `${1.5 + 2}s`,
            animation: `$winCombo 1s ease-in-out`,
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

        '@keyframes winCombo': {
            'from': {
                transform: 'scale3d(1, 1, 1)',
            },
            
            '10%,20%': {
                transform:' scale3d(0.6, 0.6, 0.6) rotate3d(0, 0, 1, -3deg)',
            },
            
            '30%,50%,70%,90%': {
                transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
            },
            
            '40%,60%,80%': {
                transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)'
            },   
            'to' : {
                transform: 'scale3d(1, 1, 1)'
            }
        }
    }, {index: 1, meta: 'spin' + props.landOffset}).attach()
    
    return style
}  
