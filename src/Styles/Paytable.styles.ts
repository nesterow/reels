import jss from 'jss'

const style = jss.createStyleSheet({
    table: {
        transform: 'skewX(-2deg)',
        listStyle: 'none',
        '& li': {
            padding: 6
        }
    },

    blink: {
        animation: '$blinking 1s infinite'
    },

    '@keyframes blinking': {
        "0%": {
          backgroundColor: '#ff3d50',
          border: '5px solid #871924',
        },
        '100%':{
          backgroundColor: '#222291',
          border: '5px solid #6565f2',
        }
    }
})

style.attach()
export default style