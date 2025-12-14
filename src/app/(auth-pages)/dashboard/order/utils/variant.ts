export const rowVariants = {
    hiddenLeft: {
        opacity: 0,
        x: -50,
    },
    hiddenRight: {
        opacity: 0,
        x: 50,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut'
        }
    }
};