import React from "react"

import styles from "./MyInput.module.css"

export let MyInput = React.forwardRef((props, ref) => {
    return (
        <input ref={ref} className={styles.myInput} {...props}/>
    )
})