

import * as motion from "motion/react-client"

export default function Rotate() {
    return (
        <motion.div
            style={box}
            animate={{ rotate: 180,scale:1 }}
            transition={{ duration: 1 }}
        />
    )
}

/**
 * ==============   Styles   ================
 */

const box = {
    width: 100,
    height: 100,
    backgroundColor: "#ff0088",
    borderRadius: 5,
}
