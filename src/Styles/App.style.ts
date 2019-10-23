import jss from 'jss'

const style = jss.createStyleSheet({
    container: {
        width: 860,
        display: 'flex'
    },
    disabled: {
        pointerEvents: 'none',
        '& button, & input, &select': {
            opacity: .5
        }
    }
})
style.attach()
export default style