import jss from 'jss'

export default (props) => {
    document.querySelectorAll(`[data-meta="paytable"]`).forEach((e) => {
        e.remove()
    })
    const style = jss.createStyleSheet({
        table: {
            transform: 'skewX(-2deg)',
            listStyle: 'none',
            '& li': {
                padding: 6
            }
        },

        blink: {
            animationDelay: '3.5s',
            animation: '$blinking 1.5s'
        },

        multiplier: {
            opacity: 0,
            fontSize: 20,
            animationDelay: '3.5s',
            animation: '$blinkAndHide 2s'
        },

        hidden: {
            opacity: 0
        },

        '@keyframes blinking': {
            "0%": {
            color: '#ff3d50',
            borderBottom: '2px solid #871924',
            },
            '100%':{
            color: '#222291',
            borderBottom: '2px solid #6565f2',
            }
        },

        '@keyframes blinkAndHide': {
            "0%": {
                opacity: 1,
                color: '#ff3d50',
            },
            "10%": {
                opacity: 1,
                color: '#FFF',
            },
            "20%": {
                opacity: 1,
                color: '#ff3d50',
            },
            "30%": {
                opacity: 1,
                color: '#FFF',
            },
            "40%": {
                opacity: 1,
                color: '#ff3d50',
            },
            "50%": {
                opacity: 1,
                color: '#FFF',
            },
            "60%": {
                opacity: 1,
                color: '#ff3d50',
            },
            '100%':{
                opacity:0
            }
        },

    }, {meta: 'paytable'}).attach()

    return style
}