import React from "react"

import styles from "./MyInput.module.css"

export let MyInput:any = React.forwardRef((props) => {
    return (
        <input className={styles.myInput} {...props}/>
    )
})