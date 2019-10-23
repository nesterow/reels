import jss from 'jss'

const style = jss.createStyleSheet({
    box: {
        width: 360,
        height: 300,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        boxShadow: "0px 0px 30px #000 inset",
        borderRadius: 26,
        borderLeft: '6px solid',
        borderRight: '6px solid',
        transform: 'skewX(-2deg)',
        margin: 26,
        marginBottom: 2
    },
    spinButton: {
        padding: 10,
        fontSize: 20,
        borderRadius: 6,
        width: 'calc(100% - 70px)',
        background: '#a00',
        color: '#fff',
        outline: 'none',
        marginLeft: 30,
        marginRight: 30,
        transform: 'skewX(-2deg)',
    }
})
style.attach()
export default style